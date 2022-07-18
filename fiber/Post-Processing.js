import { Bloom } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize } from "postprocessing";

export function Post() {
  return (
    <Bloom
      intensity={1.0} // The bloom intensity.
      blurPass={BlurPass} // A blur pass.
      width={Resizer.AUTO_SIZE} // render width
      height={Resizer.AUTO_SIZE} // render height
      kernelSize={KernelSize.LARGE} // blur kernel size
      luminanceThreshold={2.5} // luminance threshold. Raise this value to mask out darker elements in the scene.
      luminanceSmoothing={0.25} // smoothness of the luminance threshold. Range is [0, 1]
    />
  );
}
