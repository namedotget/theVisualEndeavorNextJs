import { AudioListener, AudioLoader } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense } from "react";
import { Detailed } from "@react-three/drei";

export function Sound(props) {
  const { mp3 } = props;
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, mp3);
  useEffect(() => {
    console.log(camera.position);
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(0.1);
    sound.current.setLoop(true);
    sound.current.play();
    camera.add(listener);
    if (!camera) sound.current.stop();
    return () => camera.remove(listener);
  }, []);

  return (
    <Suspense>
      <positionalAudio ref={sound} args={[listener]} {...props} />
    </Suspense>
  );
}
