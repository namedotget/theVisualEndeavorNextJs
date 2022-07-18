import React, { useRef, useEffect } from "react";
import { usePlane } from "@react-three/cannon";

import { useFrame } from "@react-three/fiber";
import { UniformsUtils, UniformsLib } from "three";

export const Plane = (props) => {
  /** Plane collider */
  const { vertex } = props;
  const { fragment } = props;
  const shader = useRef();

  const [floorRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.25, 0],
    material: {
      friction: 0.1,
    },
  }));

  const [wallRef1] = usePlane(() => ({
    rotation: [0, 0, 0],
    position: [0, -0.25, -25],
    material: {
      friction: 0.1,
    },
  }));
  const [wallRef2] = usePlane(() => ({
    rotation: [0, Math.PI, 0],
    position: [0, -0.25, 25],
    material: {
      friction: 0.1,
    },
  }));
  const [wallRef3] = usePlane(() => ({
    rotation: [0, Math.PI / 2, 0],
    position: [-25, -0.25, 0],
    material: {
      friction: 0.1,
    },
  }));
  const [wallRef4] = usePlane(() => ({
    rotation: [0, -Math.PI / 2, 0],
    position: [25, -0.25, 0],
    material: {
      friction: 0.1,
    },
  }));
  const [ceilRef] = usePlane(() => ({
    rotation: [Math.PI / 2, 0, 0],
    position: [0, 14.75, 0],
    material: {
      friction: 0.1,
    },
  }));

  useFrame(({ clock, mouse }) => {
    shader.current.uniforms.u_time = {
      value: clock.getElapsedTime(),
    };
  });

  return (
    <group>
      <mesh ref={floorRef} receiveShadow={true} scale={[50, 50, 100]}>
        <planeBufferGeometry />
        <shaderMaterial
          ref={shader}
          attach="material"
          fog={true}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={UniformsUtils.merge([
            UniformsLib["fog"],

            {
              customUniform: { u_time: { value: 0.5 } },
            },
          ])}
        />
      </mesh>
      <mesh
        ref={wallRef1}
        receiveShadow={true}
        rotation={[0, 0, 0]}
        scale={[50, 30, 100]}
      >
        <planeBufferGeometry />
        <meshPhongMaterial color={"black"} receiveShadow />
      </mesh>
      <mesh
        ref={wallRef2}
        receiveShadow={true}
        rotation={[0, 0, 0]}
        scale={[50, 30, 100]}
      >
        <planeBufferGeometry />
        <meshPhongMaterial color={"skyblue"} receiveShadow />
      </mesh>
      <mesh
        ref={wallRef3}
        receiveShadow={true}
        rotation={[0, 0, 0]}
        scale={[50, 30, 100]}
      >
        <planeBufferGeometry />
        <meshPhongMaterial color={"skyblue"} receiveShadow />
      </mesh>
      <mesh
        ref={wallRef4}
        receiveShadow={true}
        rotation={[0, 0, 0]}
        scale={[50, 30, 100]}
      >
        <planeBufferGeometry />
        <meshPhongMaterial color={"skyblue"} receiveShadow />
      </mesh>
      <mesh
        ref={ceilRef}
        receiveShadow={true}
        rotation={[0, 0, 0]}
        scale={[50, 50, 100]}
      >
        <planeBufferGeometry />
        <meshPhongMaterial color={"skyblue"} receiveShadow />
      </mesh>
    </group>
  );
};
