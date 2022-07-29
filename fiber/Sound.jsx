import { AudioListener, AudioLoader } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense } from "react";

export function Sound(props) {
  const mp3 = useRef();
  const music = useRef();
  const [listener, setListener] = useState(() => new AudioListener());
  const { camera, gl, scene } = useThree();
  // const [listener, setListener] = useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, props.mp3);
  const pos = props.position;

  useEffect(() => {
    mp3.current = music.current;
    music.current.autoPlay = false;
    music.current.setBuffer(buffer);
    music.current.setLoop(true);
    music.current.setRefDistance(0.4);
    camera.add(listener);
    return () => {
      if (mp3.current.isPlaying) mp3.current.pause();
      camera.remove(listener);
    };
  }, []);

  useFrame(() => {
    if (
      Math.abs(camera.position.x - pos[0]) >= 12 ||
      Math.abs(camera.position.z - pos[2]) >= 12
    ) {
      if (music.current.isPlaying || close) music.current.pause();
    } else if (!music.current.isPlaying) music.current.play();
  });

  return (
    <Suspense>
      <positionalAudio ref={music} args={[listener]} {...props} />
    </Suspense>
  );
}
