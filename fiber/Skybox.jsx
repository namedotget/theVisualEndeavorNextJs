import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";

export const Skybox = () => {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new CubeTextureLoader()
      .setPath("/textures/skybox/")
      .load([
        "left.bmp",
        "right.bmp",
        "top.bmp",
        "bottom.bmp",
        "back.bmp",
        "front.bmp",
      ]);
  }, [scene]);

  return <></>;
};
