import classes from "../styles/room.module.css";

import React, { forwardRef, Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "../fiber/Scene";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import ModalContext from "../components/ui/modal-context";
//Camera//

function RoomPage(props) {
  const { allData, allFiles } = props;
  const [roomFiles, setRoomFiles] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  const modalCtx = useContext(ModalContext);
  function StartModal() {
    modalCtx.showModal({ type: "start" });
  }
  function ArtworkModal() {
    modalCtx.showModal({ type: "artwork" });
  }
  //Close all modals in Room on back button//
  const router = useRouter();
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        modalCtx.hideModal();
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

  useEffect(() => {
    if (!modalCtx.modal?.type) setActiveModal(false);
    else setActiveModal(true);
  }, [modalCtx.modal?.type]);

  if (!allData[1]) return <div>...loading data...</div>;
  if (!allFiles[1]) return <div>...loading files...</div>;

  return (
    <div className={classes.contain}>
      <>
        <Canvas className={classes.canvas}>
          <Scene
            allData={allData}
            allFiles={roomFiles}
            start={StartModal}
            artModal={ArtworkModal}
          />
        </Canvas>
        {!modalCtx.modal?.type ? <div className="crosshair" /> : ""}
      </>
    </div>
  );
}

//if no modal is present show crosshair

export default RoomPage;
