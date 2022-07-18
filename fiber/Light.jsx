import { useSphere } from "@react-three/cannon";
export function Lamp(props) {
  const pos = props.position;

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
        color={"yellow"}
        position={[pos[0], pos[1] + 2, pos[2]]}
        intensity={0.8}
        lookAt={pos}
      />
      <mesh ref={lampRef}>
        <sphereBufferGeometry args={[1]} />
        <meshBasicMaterial {...props} transparent={true} />
      </mesh>
    </group>
  );
}
