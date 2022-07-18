import classes from "../styles/room.module.css";

import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { UI } from "../fiber/UI";
import { Crosshair } from "../fiber/Crosshair";
import { Scene } from "../fiber/Scene";
import { useRouter } from "next/router";
import { getAllArtistData } from "../DUMMY/dummy-backend";
//Camera//

function RoomPage() {
  const allArtists = getAllArtistData();

  //Close all modals in Room on back button//
  const router = useRouter();
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        document.querySelector(".roomStartModal")?.remove();
        document.querySelector(".roomModal")?.remove();
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  return (
    <div className={classes.contain}>
      <>
        <UI>
          <Crosshair />
        </UI>
        <Canvas className={classes.canvas}>
          <Scene artists={allArtists} />
        </Canvas>
      </>
    </div>
  );
}

export default RoomPage;
