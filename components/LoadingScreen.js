import { Canvas, useFrame } from "@react-three/fiber";
import classes from "./styles/loading-screen.module.scss";
import vertex from "../public/files/shaders/a1-sha1-vertex.glsl";
import fragment from "../public/files/shaders/a1-sha1-fragment.glsl";
import { useRef } from "react";

function LoadingShader(props) {
  const shader = useRef();

  useFrame(({ clock, mouse }) => {
    if (props.loading)
      shader.current.uniforms.u_time = { value: clock.getElapsedTime() * 0.3 };
  });

  return (
    <mesh>
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

function LoadingScreen(props) {
  return (
    <div className={props.loading ? "pgContain" : classes.none}>
      <div className={classes.body_loading}>
        <h1 className={classes.title}>...LOADING....</h1>
        {props.loading ? (
          <Canvas className={classes.canvas}>
            <LoadingShader loading={props.loading} />
          </Canvas>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
