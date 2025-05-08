import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Validate Cloudflare credentials
if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN) {
  throw new Error(
    "CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN is not defined in the environment variables"
  );
}

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from Cloudflare Workers AI ROUTES" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 5) {
      return res.status(400).json({
        message:
          "Prompt is required and must be a descriptive string (minimum 5 characters)",
      });
    }

    // Call Cloudflare Workers AI API with Stable Diffusion XL Lightning
    const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`;
    const response = await fetch(cloudflareUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt.trim(),
      }),
    });

    // Check the Content-Type of the response
    const contentType = response.headers.get("Content-Type") || "";
    let image;

    if (contentType.includes("application/json")) {
      // If the response is JSON, parse it as expected
      const data = await response.json();

      // Validate response
      if (!response.ok || !data.success) {
        throw new Error(
          data.errors?.[0]?.message ||
            "Failed to generate image from Cloudflare Workers AI"
        );
      }

      image = data.result?.image;
      if (!image) {
        throw new Error("No image data returned from Cloudflare Workers AI");
      }
    } else if (contentType.includes("image")) {
      // If the response is a raw image, convert it to base64
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      image = buffer.toString("base64");
    } else {
      throw new Error("Unexpected response type from Cloudflare Workers AI");
    }

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res
      .status(500)
      .json({ message: error.message || "Failed to generate image" });
  }
});

export default router;
