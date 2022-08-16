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
        <Image src={"/../../icons/tve-icon.png"} width={500} height={500} />
        <label htmlFor="movement">move/look</label>
        <label htmlFor="qkey">quit</label>
        <label htmlFor="ekey">close pop-up</label>
        <label htmlFor="leftmouse">open artwork pop-up</label>
        <label htmlFor="rightmouse">pew-pew</label>
        <Image
          id="movement"
          src={"/../../icons/a1-icon.png"}
          width={200}
          height={200}
        />
        <Image
          id="movement"
          src={"/../../icons/a1-icon.png"}
          width={200}
          height={200}
        />
        <Image
          id="qkey"
          src={"/../../icons/a1-icon.png"}
          width={200}
          height={200}
        />
        <Image
          id="ekey"
          src={"/../../icons/a1-icon.png"}
          width={200}
          height={200}
        />
        <Image
          id="leftmouse"
          src={"/../../icons/a1-icon.png"}
          width={200}
          height={200}
        />
        <Image
          id="rightmouse"
          src={"/../../icons/a1-icon.png"}
          width={200}
          height={200}
        />
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
          {(data?.type === "start" && showModal && <StartModal />) ||
            (data?.type === "artwork" && showModal && <ArtworkModal />) ||
            (!data.type && "")}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Modal;
