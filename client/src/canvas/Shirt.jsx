import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  // Load textures with error handling
  const logoTexture = useTexture(snap.logoDecal, (texture) => {
    if (texture instanceof Error) {
      console.error(
        "Failed to load logo texture:",
        snap.logoDecal,
        texture.message
      );
    } else {
      console.log("Logo texture loaded successfully:", snap.logoDecal);
      // Set anisotropy if supported (optional)
      texture.anisotropy = texture.anisotropy
        ? Math.min(16, texture.anisotropy)
        : 1;
    }
  });
  const fullTexture = useTexture(snap.fullDecal, (texture) => {
    if (texture instanceof Error) {
      console.error(
        "Failed to load full texture:",
        snap.fullDecal,
        texture.message
      );
    } else {
      console.log("Full texture loaded successfully:", snap.fullDecal);
    }
  });

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && fullTexture && !fullTexture.message && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && logoTexture && !logoTexture.message && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
