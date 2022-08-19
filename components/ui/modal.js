import classes from "../styles/modal.module.scss";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import ModalContext from "./modal-context";

function Modal(props) {
  const modalCtx = useContext(ModalContext);
  const { data, artistData, artwork } = props;
  const [showModal, setShowModal] = useState(true);

  console.log(data);
  function closeModal(e) {
    if (e.key === "e") {
      setShowModal(false);
      modalCtx.hideModal();
    }
  }

  useEffect(() => {
    setShowModal(true);
    document.addEventListener("keypress", closeModal);
    return () => {
      document.removeEventListener("keypress", closeModal);
    };
  }, []);

  //Start Modal Format
  function StartModal() {
    return (
      <>
        <div className={classes.logo}>
          <Image src={"/icons/tve-icon.jpg"} width={128} height={128} />
        </div>
        <div className={classes.row}>
          <div className={classes.description}>
            <p>Movement</p>
            <Image
              className={classes.img}
              id="movement"
              src={"/icons/modal/wasd_colin.png"}
              width={85}
              height={85}
            />
          </div>
          <div className={classes.description}>
            <p>Look</p>
            <Image
              className={classes.img}
              src={"/icons/modal/mouse-icon.png"}
              width={80}
              height={80}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.description}>
            <p>Quit</p>
            <Image
              id="qkey"
              src={"/icons/modal/q-icon.png"}
              width={50}
              height={50}
            />
          </div>
          <div className={classes.description}>
            <p>Exit Pop-up</p>
            <Image
              id="ekey"
              src={"/icons/modal/e-icon.png"}
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.description}>
            <p>Open Pop-up</p>
            <Image
              id="leftmouse"
              src={"/icons/modal/left-click.png"}
              width={75}
              height={75}
            />
          </div>
          <div className={classes.description}>
            <p>Pew-Pew</p>
            <Image
              id="rightmouse"
              src={"/icons/modal/right-click.png"}
              width={75}
              height={75}
            />
          </div>
        </div>
      </>
    );
  }

  //Artwork Modal Format
  function ArtworkModal() {
    return (
      <>
        <h2>{artistData?.name}</h2>
        <h3>{artwork?.name}</h3>
        <label>instagram</label>
        <img src={"/../../icons/a1-icon.png"} />
        <label>twitter</label>
        <img src={"/../../icons/a1-icon.png"} />
        <label>website</label>
        <img src={"/../../icons/a1-icon.png"} />
      </>
    );
  }

  return (
    <>
      {showModal ? (
        <div className={classes.modalContain}>
          {(data?.type === "start" && <StartModal />) ||
            (data?.type === "artwork" && <ArtworkModal />) ||
            (!data.type && "")}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Modal;
