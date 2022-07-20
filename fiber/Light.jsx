import { useSphere } from "@react-three/cannon";
import { Detailed } from "@react-three/drei";
import { Suspense } from "react";
import { Sound } from "./Sound";
export function Lamp(props) {
  const pos = props.position;
  const { mp3 } = props;
  const [lampRef] = useSphere(() => ({
    mass: 1,
    args: [1],
    material: {
      friction: 1,
      restitution: 0,
    },
    type: "Static",
    ...props,
  }));
  return (
    <group>
      <spotLight
        color={"green"}
        position={[pos[0], pos[1] + 2, pos[2]]}
        intensity={0.8}
        lookAt={pos}
      />
      <Sound mp3={mp3} position={pos} />
      <mesh ref={lampRef}>
        <sphereBufferGeometry args={[1]} />
        <meshBasicMaterial {...props} color={"lightgreen"} />
      </mesh>
    </group>
  );
}
