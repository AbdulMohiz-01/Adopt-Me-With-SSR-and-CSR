import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // createPortal takes two arguments, the first is the element you want to render, the second is the element you want to render it in. The reason that why I put the div in the first argument is cuz my .css classes require it. I don't want to put the div directly in the modleRoot
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
