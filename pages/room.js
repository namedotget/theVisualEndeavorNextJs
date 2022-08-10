import classes from "../styles/room.module.css";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { UI } from "../fiber/UI";
import { Crosshair } from "../fiber/Crosshair";
import { Scene } from "../fiber/Scene";
import { useRouter } from "next/router";
//Camera//

function RoomPage(props) {
  const { allData, allFiles } = props;
  const [roomFiles, setRoomFiles] = useState([]);

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

  //data fetching
  useEffect(() => {
    if (allFiles[1]) {
      setRoomFiles(allFiles?.filter((file) => file?.url));
    }
  }, [allFiles]);

  if (!allData[1]) return <div>...loading data...</div>;
  if (!allFiles[1]) return <div>...loading files...</div>;

  return (
    <div className={classes.contain}>
      <>
        <UI>
          <Crosshair />
        </UI>
        <Canvas className={classes.canvas}>
          <Scene allData={allData} allFiles={roomFiles} />
        </Canvas>
      </>
    </div>
  );
}

export default RoomPage;
