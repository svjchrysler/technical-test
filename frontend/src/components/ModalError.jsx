import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ModalError = ({
  visible = false,
  message = "Uppp... there is a problem",
  onCloseModal,
}) => {
  return (
    <Modal isOpen={visible} style={customStyles} contentLabel="Loading">
      <div className="flex flex-col items-center">
        <span className="mt-3.5 text-red-500">{message}</span>
        <button
          className="bg-red-300 mt-3 p-2 rounded text-white"
          onClick={onCloseModal}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ModalError;
