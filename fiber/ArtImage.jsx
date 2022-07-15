import React, { useRef, useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { handleModalClick, handleModalKeys } from "./Modal";
import { Detailed } from "@react-three/drei";
import { Camera, LOD, Mesh, Vector3 } from "three";

// Constants
export const ArtImage = (props) => {
  const { artwork } = props;
  //Physics//

  const [cubeRef] = useBox(() => ({
    mass: 10,
    args: [5.5, 3.5, 0.75],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));

  ///LOD////

  function handleLeftClick(e) {
    //open modal//
    handleModalClick(e, artwork);
  }

  // const picture = require("../public/room-preview.jpg");
  //Load Images//
  // const img = useLoader(TextureLoader, picture);
  const map = useLoader(TextureLoader, artwork.src);

  return (
    <Detailed ref={cubeRef} distances={[0, 12]} {...props}>
      <mesh castShadow={true} layers={props.layers} onClick={handleLeftClick}>
        <boxBufferGeometry args={[5, 3, 0.5]} />
        <meshLambertMaterial castShadow map={map} />
      </mesh>
      <mesh></mesh>
    </Detailed>
  );
};
