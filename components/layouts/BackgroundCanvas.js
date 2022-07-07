import classes from "./background-canvas.module.css";
import vertex from "../../public/files/shaders/a1-sha0-vertex.glsl";
import fragment from "../../public/files/shaders/a1-sha0-fragment.glsl.js";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

//Camera//

function Background(...props) {
  const shader = useRef(null);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(({ clock, mouse }) => {
    if (shader.current) {
      shader.current.uniforms.u_time = { value: clock.getElapsedTime() };
    }
  });

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <planeBufferGeometry args={[100, 100]} />
      <shaderMaterial
        ref={shader}
        attach="material"
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          u_time: { value: 0.5 },
        }}
      />
    </mesh>
  );
}

function BackgroundCanvas(props) {
  return (
    <div>
      <Canvas className={classes.canvas}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Background position={[0, 0, 0]} />
      </Canvas>
      {props.children}
    </div>
  );
}
export default BackgroundCanvas;
