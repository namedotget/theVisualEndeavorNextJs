import classes from "../styles/room.module.css";

import React, { Fragment } from "react";
import { Canvas } from "@react-three/fiber";
import { UI } from "../fiber/UI";
import { Crosshair } from "../fiber/Crosshair";
import { Scene } from "../fiber/Scene";
//Camera//

function RoomPage() {
  return (
    <div className={"pgContain"}>
      <>
        <UI>
          <Crosshair />
        </UI>
        <Canvas className={classes.canvas}>
          <Scene />
        </Canvas>
      </>
    </div>
  );
}
export default RoomPage;
