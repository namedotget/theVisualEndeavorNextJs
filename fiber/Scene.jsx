import React, { Suspense, useEffect, useRef } from "react";

// Physics
import { Physics, Debug } from "@react-three/cannon";

// Three
import { extend, useThree } from "@react-three/fiber";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

// Prefabs
import { Plane } from "./Plane";
import { Player } from "./Player";
import { Skybox } from "./Skybox";
import { Cube } from "./Cube";
import { ArtImage } from "./ArtImage";
import { ArtShader } from "./ArtShader";
import { Model } from "./Model";
import { StartModal } from "./StartModal";

import fragment0 from "../public/files/shaders/a1-sha0-fragment.glsl";
import vertex0 from "../public/files/shaders/a1-sha0-vertex.glsl";
import { initFog } from "./scene-config";
extend({ PointerLockControls });

export const Scene = (props) => {
  initFog();
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  function keyQuit(e) {
    if (e.key === "q") {
      //Remove all modals//
      document.querySelector(".roomModal")?.remove();
      document.querySelector(".roomStartModal")?.remove();

      //click logo//
      const logo = document.querySelector(".logo-canvas_canvas__3WjCv");
      console.log(logo);
      logo.click();
      document.removeEventListener("keypress", keyQuit);
    }
  }

  useEffect(() => {
    const handleFocus = () => {
      controls.current.lock();
    };
    document.addEventListener("click", handleFocus);

    document.addEventListener("keypress", keyQuit);

    StartModal();
    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [gl]);

  return (
    <>
      {/** Skybox */}
      {/* <Skybox /> */}
      {/** Pointer lock */}
      <pointerLockControls ref={controls} args={[camera, gl.domElement]} />
      {/** Lighting */}
      <directionalLight position={[0, 5, -5]} intensity={0.2} castShadow />
      <pointLight position={[0, 0, -3]} intensity={0.6} castShadow />
      <pointLight position={[0, 0, 4]} intensity={0.8} castShadow />
      <pointLight position={[10, 0, 4]} intensity={0.8} castShadow />
      <pointLight
        position={[-5, 0, 4]}
        intensity={0.8}
        castShadow
        fog={false}
        color={"red"}
      />
      {/** Physic objects */}
      <Physics
        gravity={[0, -9, 0]}
        tolerance={0}
        iterations={50}
        broadphase={"SAP"}
      >
        {/** Plane */}
        <Plane />
        {/** Player */}
        <Player />
        {/** Cubes */}
        <Cube position={[0, 0, -5]} layers={1} />
        <Cube position={[-0.6, 0, -5]} />
        <Cube position={[0.6, 0, -5]} />
        <Cube position={[-0.3, 0.5, -5]} />
        <Cube position={[0.3, 0.5, -5]} />
        <Cube position={[0, 1, -5]} />
        <Cube position={[-5, 0, -5]} />
        <Cube position={[-5, 0.5, -5]} />
        <Cube position={[-5, 1, -5]} />
        <Cube position={[-5, 1.5, -5]} />
        {/** Static cubes */}
        <Cube position={[0, 0, 5]} type={"Static"} />
        <Cube position={[0, 0, 5.5]} type={"Static"} />
        <Cube position={[0, 0.5, 5.5]} type={"Static"} />
        <ArtImage
          position={[-3, 1.5, 2]}
          type={"Static"}
          image={"../room-preview.jpg"}
        />
        <ArtImage
          position={[-15, 1.5, 2]}
          type={"Static"}
          image={"../room-preview.jpg"}
        />
        <ArtShader
          position={[4, 1.5, 2]}
          type={"Static"}
          vertex={vertex0}
          fragment={fragment0}
        />
        <Model
          type={"Static"}
          gltf={"../textures/logo.gltf"}
          position={[3, 1, -4]}
        />
      </Physics>
      <fogExp2 attach="fog" args={[0x6d527d, 0.28]} />
    </>
  );
};
