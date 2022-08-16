import React, { useRef, useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import * as THREE from "three";
import { handleModalClick, handleModalKeys } from "./Modal";
import { Detailed } from "@react-three/drei";
import { Camera, FrontSide, LOD, Mesh, Vector3 } from "three";
import { useContext } from "react";
import ModalContext from "../components/ui/modal-context";

// Constants
export const ArtImage = (props) => {
  const ctx = useContext(ModalContext);

  const { artwork, artist } = props;
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

  const geo = useRef();

  ///LOD////

  function handleLeftClick(e) {
    handleModalClick(e, artwork, artist);
  }

  // const picture = require("../public/room-preview.jpg");
  //Load Images//
  // const img = useLoader(TextureLoader, picture);
  const url = artwork.url;
  const map = useLoader(TextureLoader, url);

  return (
    <Detailed ref={cubeRef} distances={[0, 14]} {...props}>
      <mesh castShadow={true} onClick={handleLeftClick}>
        <boxBufferGeometry args={[5, 3, 0.5]} />
        <meshStandardMaterial castShadow map={map} />
        {/* <meshBasicMaterial color="black" /> */}
      </mesh>
      <mesh></mesh>
    </Detailed>
  );
};
