import classes from "./background-canvas.module.css";
import vertex from "../../public/files/shaders/a1-sha0-vertex.glsl";
import fragment from "../../public/files/shaders/a1-sha0-fragment.glsl.js";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import LogoCanvas from "./LogoCanvas";
import Link from "next/link";

//Camera//

function Background(...props) {
  const shader = useRef();

  // Set up state for the hovered and active state
  // Subscribe this component to the render-loop, rotate the mesh every frame

  useFrame(({ clock, mouse }) => {});

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props} scale={1}>
      <planeBufferGeometry args={[100, 100]} />
      <shaderMaterial
        ref={shader}
        attach="material"
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          u_time: { value: 280.0 },
        }}
      />
    </mesh>
  );
}

function BackgroundCanvas(props) {
  return (
    <div className={classes.canvas}>
      <Canvas
        className={classes.background}
        camera={{ fov: 75, position: [0, 0, 4] }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Background position={[0, 0, -20]} /> */}
        <Background />
      </Canvas>
    </div>
  );
}

export default BackgroundCanvas;
