import classes from "../styles/room.module.css";

import React, { Fragment, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { UI } from "../fiber/UI";
import { Crosshair } from "../fiber/Crosshair";
import { Scene } from "../fiber/Scene";
import Spinner from "../components/Spinner";
//Camera//

function RoomPage() {
  const canvas = useRef();
  console.log(canvas);

  useEffect(() => {
    if (!canvas.current) {
      return (
        <div className="pgContain">
          <h1>...loading.....</h1>
        </div>
      );
    }
  }, [canvas]);

  console.log(canvas, "2");

  return (
    <div className={classes.contain}>
      <>
        <UI>
          <Crosshair />
        </UI>

        <Canvas ref={canvas} className={classes.canvas}>
          <Scene />
        </Canvas>
      </>
    </div>
  );
}

export default RoomPage;
