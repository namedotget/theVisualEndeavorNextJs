import React from "react";
import { useBox } from "@react-three/cannon";
import { useFBX, useGLTF } from "@react-three/drei";

// Constants

export const Model = (props) => {
  const fbx = useFBX("../textures/source/fixa.fbx");
  const { scene, nodes, materials } = useGLTF("../textures/scene.gltf");
  const [ref] = useBox(() => ({
    mass: 1,
    args: [2, 3, 1],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));

  return (
    <>
      <primitive
        {...props}
        ref={ref}
        object={scene}
        material={materials}
        scale={0.01}
      />
    </>
  );
};
