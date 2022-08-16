import { createContext, useContext } from "react";
import { useState } from "react";
const ModalContext = createContext({
  type: null,
  showModal: function (modal) {},
  hideModal: function () {},
});

export function ModalContextProvider(props) {
  const [activeModal, setActiveModal] = useState();

  function handleShowModal(modal) {
    console.log(modal);
    setActiveModal(modal);
  }

  function handleHideModal() {
    setActiveModal(null);
  }

  const context = {
    modal: activeModal,
    showModal: handleShowModal,
    hideModal: handleHideModal,
  };

  return (
    <ModalContext.Provider value={context}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
