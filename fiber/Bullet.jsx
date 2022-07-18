import { useSphere } from "@react-three/cannon";
import React, { useRef, useEffect } from "react";
import { Object3D } from "three";
export const Bullet = (props) => {
  /** Bullet collider */
  const [sphereRef] = useSphere(() => ({
    mass: 1,
    args: [0.15],
    ...props,
  }));

  return (
    <mesh ref={sphereRef} castShadow>
      <sphereBufferGeometry args={[0.15, 32, 32]} />
      <meshLambertMaterial color="white" />
    </mesh>
  );
};
