/* eslint-disable react/prop-types */

import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import Button from "../UI/Button/Button";
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onCloseModal, largeImage }) => {
  const closeForEsc = (e) => {
    if (e.code === "Escape") {
      onCloseModal();
    }
  };

  const closeModal = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", closeForEsc);
    return () => window.removeEventListener("keydown", closeForEsc);
  });

  return createPortal(
    // портал принимает два парамерта: 1-шаблон разметкиБ 2й-элемент из домДерева, который будет контейнером для шаблона разметки
    <div className={s.overlay} onClick={closeModal}>
      <div className={s.modal}>
        <Button
          className={s.closeButtonModal}
          onClick={onCloseModal}
          icon="iconcross"
        />
        <img className={s.image} src={largeImage} alt="big size image" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
