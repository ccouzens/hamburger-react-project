import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = (props: { show: boolean; clicked: () => void }) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;

export default backdrop;
