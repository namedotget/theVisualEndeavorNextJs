import React, { useRef } from "react";
import { useBox } from "@react-three/cannon";
import { Detailed, useGLTF } from "@react-three/drei";
import { handleArtistModalClick } from "./ArtistModal";
import { useFrame } from "@react-three/fiber";

// Constants

export const ArtistCenterPiece = (props) => {
  const { artist } = props;

  const [ref] = useBox(() => ({
    mass: 1,
    args: [2, 3, 2],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));

  const centerPiece = useRef();

  function handleLeftClick(e) {
    handleArtistModalClick(e, artist);
  }

  useFrame(({ clock }) => {
    if (centerPiece.current) {
      centerPiece.current.rotation.y += clock.getElapsedTime() * 0.0001;
    }
  });

  return (
    <Detailed distances={[0, 15]} ref={ref} {...props}>
      <mesh onClick={handleLeftClick} ref={centerPiece}>
        <boxBufferGeometry args={[1.5, 2.5, 1.5]} />
        <meshLambertMaterial color={"red"} />
      </mesh>
      <mesh />
    </Detailed>
  );
};
