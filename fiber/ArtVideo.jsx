import React, { useRef, useEffect, useState } from "react";
import { useBox, usePlane } from "@react-three/cannon";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { handleModalClick, handleModalKeys } from "./Modal";
import { Detailed } from "@react-three/drei";
import { sRGBEncoding, Texture, LinearFilter, VideoTexture } from "three";

// Constants
export const ArtVideo = (props) => {
  const { artwork } = props;

  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: artwork.src,
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );

  useEffect(() => void video.play(), [video]);

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

  function handleLeftClick(e) {
    //open modal//
    handleModalClick(e, artwork);
  }

  // const picture = require("../public/room-preview.jpg");
  //Load Images//

  return (
    <Detailed ref={cubeRef} distances={[0, 15]} {...props}>
      <mesh castShadow={true} layers={props.layers} onClick={handleLeftClick}>
        <boxBufferGeometry args={[5, 3, 0.5]} />
        <meshBasicMaterial toneMapped={false}>
          <videoTexture attach="map" args={[video]} encoding={sRGBEncoding} />
        </meshBasicMaterial>
      </mesh>
      <mesh></mesh>
    </Detailed>
  );
};
