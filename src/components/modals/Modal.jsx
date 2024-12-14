import React from "react";
import { createPortal } from "react-dom";
import { modalBackStyle, modalContainerStyle } from "../../styles/styles";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div css={modalBackStyle} onClick={onClose}>
      <div css={modalContainerStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
