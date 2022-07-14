import React from "react";
import { useBox } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { handleModalClick, handleModalKeys } from "./Modal";
import { Detailed } from "@react-three/drei";

// Constants
export const ArtImage = (props) => {
  const pos = props.position;
  //Physics//
  const [cubeRef] = useBox(() => ({
    mass: 1,
    args: [5.5, 3.5, 0.75],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));

  function handleClick() {
    //open modal//
    handleModalClick();
  }

  // const picture = require("../public/room-preview.jpg");
  //Load Images//
  // const img = useLoader(TextureLoader, picture);
  const map = useLoader(TextureLoader, props.image);
  return (
    <Detailed distances={[0, 15]}>
      <mesh
        ref={cubeRef}
        castShadow={true}
        layers={props.layers}
        onClick={handleClick}
      >
        <boxBufferGeometry args={[5, 3, 0.5]} />
        <meshLambertMaterial castShadow map={map} fog={true} />
      </mesh>
      {/* if 15 or more away render :  */}
      <mesh></mesh>
    </Detailed>
  );
};
