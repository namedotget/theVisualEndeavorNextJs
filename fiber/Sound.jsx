import { AudioListener, AudioLoader, AudioAnalyser } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense } from "react";

export function Sound(props) {
  const { mp3 } = props;
  const music = useRef();
  const { camera, gl, scene } = useThree();
  const [listener] = useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, mp3);

  const pos = props.position;

  useEffect(() => {
    if (music.current.isPlaying) music.current.stop();
    music.current.autoPlay = false;
    music.current.setBuffer(buffer);
    music.current.setRefDistance(0.1);
    music.current.setLoop(true);
    camera.add(listener);
    return () => {
      camera.remove(listener);
    };
  }, []);

  useFrame(() => {
    if (music.current) {
      if (
        Math.abs(camera.position.x - pos[0]) >= 12 ||
        Math.abs(camera.position.z - pos[2]) >= 12
      ) {
        music.current.pause();
      } else if (!music.current.isPlaying && scene) {
        music.current.play();
      }
    }
  });

  return <positionalAudio ref={music} args={[listener]} {...props} />;
}
