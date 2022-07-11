import React, { useRef } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { UniformsUtils, UniformsLib } from "three";

// Constants

export const ArtShader = (props) => {
  //Physics//
  const [cubeRef] = useBox(() => ({
    mass: 1,
    args: [5.5, 4.5, 1],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));
  //animation loop
  const shader = useRef();
  useFrame(({ clock, mouse }) => {
    shader.current.uniforms.u_time = { value: clock.getElapsedTime() };
  });
  // grab files from props//
  const { fragment, vertex } = props;
  return (
    <mesh ref={cubeRef} castShadow layers={props.layers}>
      <boxBufferGeometry args={[5, 3, 0.5]} />
      <shaderMaterial
        ref={shader}
        attach="material"
        fog={true}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={UniformsUtils.merge([
          UniformsLib["fog"],

          {
            someCustomUniform: { u_time: { value: 0.5 } },
          },
        ])}
      />
    </mesh>
  );
};
