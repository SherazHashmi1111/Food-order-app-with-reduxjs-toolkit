import React, { Fragment } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { visibilityActions } from "../../store";

const BackDrop = () => {
  const dispatch = useDispatch();
  const hideCartHandler = (e) => {
    e.preventDefault();
    dispatch(visibilityActions.hideCart());
  };
  return <div className={styles.backdrop} onClick={hideCartHandler}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("backdrop");
function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}

export default Modal;
