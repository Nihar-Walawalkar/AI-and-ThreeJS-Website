# AI-Powered 3D T-Shirt Customizer 👕✨

<div align="center">
  <strong>Unleash your creativity with this innovative web application that combines the power of 3D graphics and artificial intelligence. Design your own unique T-shirts in a dynamic 3D space, using AI to generate custom logos and textures from simple text prompts.</strong>
</div>

<br/>

<!-- Badges -->
<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
- [Technologies Used](#️-technologies-used)
- [API Endpoint](#-api-endpoint)
- [Getting Started](#-getting-started)
- [File Structure](#-file-structure)
- [Contributing](#-contributing)

---

## 🌟 About The Project

This project is a cutting-edge 3D product customization tool that allows users to design their own T-shirts in an interactive, real-time 3D environment. It brilliantly merges the creative possibilities of **Three.js** for 3D rendering with the generative power of **OpenAI's DALL-E** for creating unique graphics.

Users can change the color of the T-shirt, upload their own logos or textures, and, most impressively, use an AI-powered tool to generate textures and logos from text prompts. The application provides a seamless and intuitive user interface, making T-shirt design an engaging and fun experience. The state of the design is managed efficiently using **Valtio**, and the UI is beautifully crafted with **React** and styled with **Tailwind CSS**.

---

## ✨ Key Features

- **👕 Interactive 3D Model**: A high-quality 3D model of a T-shirt that users can rotate and inspect from any angle.
- **🎨 Color Customization**: An easy-to-use color picker to change the T-shirt's base color in real-time.
- **🖼️ Custom Texture/Logo Upload**: Users can upload their own images to be used as a logo or a full texture on the T-shirt.
- **🤖 AI-Powered Generation**:
    -   **AI Logo**: Generate a unique logo by typing a text prompt for the DALL-E AI.
    -   **AI Texture**: Create a full, repeating texture for the T-shirt fabric from a text prompt.
- **🔄 Real-time State Management**: Uses Valtio for a simple and powerful proxy-based state management solution.
- **🎬 Smooth Animations**: Engaging UI animations powered by Framer Motion for a fluid user experience.
- **💾 Download Functionality**: Ability to download the final T-shirt design.
- ** responsive Design**: A modern and fully responsive interface that works on all screen sizes.

---

## ⚙️ How It Works

1.  **Landing Page**: The user is greeted with an animated intro page.
2.  **Enter the Customizer**: Clicking the "Customize It" button takes the user to the main design interface.
3.  **3D Interaction**: The user can interact with the 3D shirt model, rotating it to view all sides.
4.  **Customization Options**: A set of editor tabs on the left allows the user to:
    -   **Color Picker**: Select a new color for the shirt.
    -   **File Picker**: Upload an image to be used as a logo or a full texture.
    -   **AI Picker**: Enter a text prompt to generate a logo or texture using the DALL-E API.
5.  **AI Generation**: When a user submits an AI prompt, the request is sent to the backend Node.js server. The server then communicates with the OpenAI DALL-E API to generate the image and returns it to the client.
6.  **Apply Design**: The generated or uploaded image is then applied to the 3D model as a texture or decal in real-time.
7.  **Finalize**: Once happy with the design, the user can download their creation.

---

## 🛠️ Technologies Used

This project is a full-stack application that combines a modern frontend with a powerful backend.

### Frontend (Client)

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **Three.js & React Three Fiber**: For creating and displaying the 3D graphics in the browser.
- **Drei**: A collection of useful helpers and abstractions for React Three Fiber.
- **Valtio**: A simple proxy-based state management library for React.
- **Framer Motion**: For creating fluid animations and gestures.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend (Server)

- **Node.js**: A JavaScript runtime for the server-side application.
- **Express**: A minimal and flexible web application framework for Node.js.
- **OpenAI DALL-E API**: For generating images from text prompts.
- **Cloudinary**: A cloud-based service for image and video management, used here for storing generated images.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Dotenv**: For managing environment variables.

---

## 🔌 API Endpoint

The backend provides a single main endpoint for AI image generation.

| Method | Endpoint         | Description                                     |
| :----- | :--------------- | :---------------------------------------------- |
| `POST` | `/api/v1/dalle`  | Takes a text prompt and generates an image using DALL-E. |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js & npm**: Ensure you have Node.js (LTS version) and npm installed.
- **OpenAI API Key**: You'll need an API key from [OpenAI](https://platform.openai.com/signup/).
- **Cloudinary Account**: You'll need your Cloud Name, API Key, and API Secret from [Cloudinary](https://cloudinary.com/users/register/free).

### Environment Variables

Create a file named `.env` in the `server` directory and add the following credentials:

```env
# OpenAI API Key
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
```

## 📂 File Structure

```
.
├── client/
│   ├── public/
│   │   └── shirt_baked.glb  # 3D model for the T-shirt
│   ├── src/
│   │   ├── assets/
│   │   ├── canvas/          # Three.js related components (Backdrop, Camera, Shirt)
│   │   ├── components/      # Reusable React components (AIPicker, ColorPicker, etc.)
│   │   ├── config/          # Configuration files and helpers
│   │   ├── pages/           # Main pages (Home, Customizer)
│   │   ├── store/           # Valtio state management
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── server/
    ├── routes/
    │   └── dalle.routes.js  # Route for the DALL-E API
    ├── .env
    ├── index.js             # Main server entry point
    └── package.json
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**
