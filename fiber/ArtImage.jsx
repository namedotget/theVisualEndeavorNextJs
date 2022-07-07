import React, { useMemo } from "react";
import { useBox } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

// Constants

export const ArtImage = (props) => {
  //Physics//
  const [cubeRef] = useBox(() => ({
    mass: 1,
    args: [5, 3, 0.5],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));

  // const picture = require("../public/room-preview.jpg");
  //Load Images//
  // const img = useLoader(TextureLoader, picture);
  const map = useLoader(TextureLoader, props.image);
  return (
    <mesh ref={cubeRef} castShadow layers={props.layers}>
      <boxBufferGeometry args={[5, 3, 0.25]} />
      <meshLambertMaterial map={map} />
    </mesh>
  );
};
