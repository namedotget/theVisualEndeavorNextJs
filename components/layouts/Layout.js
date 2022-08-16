import { Fragment, useContext } from "react";
import ModalContext from "../ui/modal-context";
import BackgroundCanvas from "./BackgroundCanvas";
import LogoCanvas from "./LogoCanvas";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import Modal from "../ui/modal";

function Layout(props) {
  const modalCtx = useContext(ModalContext);

  const activeModal = modalCtx.modal;

  return (
    <>
      <LogoCanvas />
      <MainHeader />
      <main>{props.children}</main>
      {activeModal && <Modal data={activeModal} />}
      <MainFooter />
    </>
  );
}

//USE FRAGMENT TO IMPORT REACT COMPONENTS INTO NEXTJS//

export default Layout;
