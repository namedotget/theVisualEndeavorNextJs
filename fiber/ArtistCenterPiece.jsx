import React from "react";
import { useBox } from "@react-three/cannon";
import { Detailed, useGLTF } from "@react-three/drei";
import { handleArtistModalClick } from "./ArtistModal";
// Constants

export const ArtistCenterPiece = (props) => {
  const { artist } = props;

  const [ref] = useBox(() => ({
    mass: 1,
    args: [3.5, 3.5, 3.5],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));

  function handleLeftClick(e) {
    handleArtistModalClick(e, artist);
  }

  return (
    <Detailed
      distances={[0, 15]}
      ref={ref}
      {...props}
      onClick={handleLeftClick}
    >
      <mesh>
        <boxBufferGeometry args={[3, 3, 3]} />
        <meshLambertMaterial color={"red"} />
      </mesh>
      <mesh />
    </Detailed>
  );
};
