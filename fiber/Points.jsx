import { Canvas, useLoader } from "@react-three/fiber";

export function Points() {
  // [(),(),()...]
  // [x1, y1, z1, x1, y2 ...]

  const count = 100;
  const sep = 3;
  let positions = useMemo(() => {
    let positions = [];

    return new Float32Array(positions);
  });

  return (
    <points>
      <bufferGeometry atttach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color={"pink"}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}
