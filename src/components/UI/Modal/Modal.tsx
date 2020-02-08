import React, { ReactNode, useMemo } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
const Modal = (props: {
  children: ReactNode;
  show: boolean;
  modalClosed: () => void;
}) =>
  useMemo(
    () => (
      <>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? 1 : 0
          }}
        >
          {props.children}
        </div>
      </>
    ),
    [props.show, props.children, props.modalClosed]
  );

export default Modal;
