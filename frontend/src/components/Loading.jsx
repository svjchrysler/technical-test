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

const Loading = ({ visible = false, message = "getting information..." }) => {
  return (
    <Modal isOpen={visible} style={customStyles} contentLabel="Loading">
      <div className="flex flex-col items-center">
        <svg
          className="svg-container"
          height="100"
          width="100"
          viewBox="0 0 100 100"
        >
          <circle className="loader-svg bg" cx="50" cy="50" r="45"></circle>
          <circle
            className="loader-svg animate"
            cx="50"
            cy="50"
            r="45"
          ></circle>
        </svg>
        <span className="mt-3.5">{message}</span>
      </div>
    </Modal>
  );
};

export default Loading;
