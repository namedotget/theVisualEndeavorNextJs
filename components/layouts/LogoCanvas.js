import classes from "./logo-canvas.module.css";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import Link from "next/link";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three";
import { useEffect } from "react";
//Camera//
function Logo(...props) {
  //Reference values and gltfLoader
  const group = useRef();
  const { nodes, materials } = useGLTF("../../textures/logo.gltf");

  //Rotation state
  const [active, setActive] = useState(false);

  // Set up state for the hovered and active state
  // Subscribe this component to the render-loop, rotate the mesh every frame

  function handleClick() {
    setActive(!active);
  }

  //rotation speed
  let rotation = 0.1;
  //Animation loop
  useFrame(({ clock, mouse }) => {
    if (group.current.rotate) {
      group.current.rotation.x += rotation;
      if (group.current.rotation.x >= 6.28) {
        setActive(!active);
        group.current.rotation.x -= 6.28;
      }
    }
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      rotate={active}
      onClick={handleClick}
    >
      <group position={[0, 0, -5]} scale={0.1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node_#2"].geometry}
          material={nodes["Node_#2"].material}
          position={[-217.89, -91.31, -25.68]}
          rotation={[0, 0, -2.02]}
          scale={1.1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node_#3"].geometry}
          material={nodes["Node_#3"].material}
          position={[-170.28, -269.5, -25.68]}
          rotation={[0, 0, -1.11]}
          scale={1.1}
        />
      </group>
      <group position={[0, 0, 0.01]} scale={0.1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node_#5"].geometry}
          material={nodes["Node_#5"].material}
          position={[-196.75, -178.77, 0]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node_#6"].geometry}
          material={nodes["Node_#6"].material}
          position={[198.07, 0.01, 0]}
        />
      </group>
      <group scale={0.1}>
        <group position={[0, 0, -127.96]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Node_#10"].geometry}
            material={nodes["Node_#10"].material}
            position={[-352.86, -184.99, 0]}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Node_#11"].geometry}
            material={nodes["Node_#11"].material}
            position={[-200.1, 213.61, 0]}
            rotation={[0, 0, Math.PI]}
            scale={[0.56, 1, 1]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Node_#12"].geometry}
            material={nodes["Node_#12"].material}
            position={[-214.88, 54.38, 0]}
            rotation={[0, 0, Math.PI]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Node_#8"].geometry}
          material={nodes["Node_#8"].material}
          position={[198.07, 0.01, -125.8]}
        />
      </group>
    </group>
  );
}

function CameraController() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.autoRotate = true;
    controls.minDistance = 60;
    controls.maxDistance = 70;
    controls.rotateSpeed = 0.25;
    controls.maxAzimuthAngle = 1.57;
    controls.minAzimuthAngle = -1.57;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
}

function LogoCanvas(props) {
  return (
    <div className={classes.contain}>
      <Link href="/" className="logoLink">
        <Canvas
          className={classes.canvas}
          camera={{ fov: 75, position: [0, 5, 57] }}
        >
          {/* <CameraController /> */}
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <Background position={[0, 0, -20]} /> */}

          <Logo />
        </Canvas>
      </Link>
    </div>
  );
}

useGLTF.preload("../../textures/logo.gltf");

export default LogoCanvas;
