import classes from "../styles/room.module.css";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { UI } from "../fiber/UI";
import { Crosshair } from "../fiber/Crosshair";
import { Scene } from "../fiber/Scene";
import { useRouter } from "next/router";
import { getAllArtistData } from "../DUMMY/dummy-backend";
import { getAllData, getAllFiles } from "../firebase/helpers";
//Camera//

function RoomPage() {
  const allArtists = getAllArtistData();

  const [allData, setAllData] = useState([]);
  const [allFiles, setAllFiles] = useState([]);

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
    if (!allData[1]) getAllData().then((res) => setAllData(res));
    return () => {
      if (!allFiles[1])
        getAllFiles().then((res) => {
          res.forEach((user) => {
            user.then((data) => {
              setAllFiles((prev) => [
                ...prev,
                ...data.filter((data) => data?.url),
              ]);
            });
          });
        });
      console.log(allFiles, allData);
    };
  });

  if(!allData[1]) return <div>...loading data...</div>
  if(!allFiles[1]) return <div>...loading files...</div>

  return (
    <div className={classes.contain}>
      <>
        <UI>
          <Crosshair />
        </UI>
        <Canvas className={classes.canvas}>
          <Scene allData={allData} allFiles={allFiles}/>
        </Canvas>
      </>
    </div>
  );
}

export default RoomPage;
