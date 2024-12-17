import { useEffect } from "react";
import { createPortal } from "react-dom";
import { modalBackStyle, modalContainerStyle } from "../../styles/styles";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
