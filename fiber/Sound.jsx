import { AudioListener, AudioLoader } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense } from "react";

export function Sound(props) {
  const music = useRef();
  const [listener] = useState(() => new AudioListener());
  const { camera, gl, scene } = useThree();
  // const [listener, setListener] = useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, props.mp3);
  const pos = props.position;

  useEffect(() => {
    music.current.autoPlay = false;
    music.current.setBuffer(buffer);
    music.current.setRefDistance(1);
    music.current.setLoop(true);
    camera.add(listener);
    return () => {
      console.log(listener);
      if (listener?.context.state === "running") {
        listener.context.close();
      }
      camera.remove(listener);
    };
  }, []);

  useFrame(() => {
    if (
      Math.abs(camera.position.x - pos[0]) >= 12 ||
      Math.abs(camera.position.z - pos[2]) >= 12
    ) {
      if (music.current.isPlaying) music.current.pause();
    } else if (!music.current.isPlaying) music.current.play();
  });

  return (
    <Suspense>
      <positionalAudio ref={music} args={[listener]} {...props} />
    </Suspense>
  );
}
