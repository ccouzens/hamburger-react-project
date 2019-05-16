import React, { ReactNode } from 'react';
import classes from './Modal.module.css';
const modal = (props: { children: ReactNode }) => (
  <div className={classes.Modal}>{props.children}</div>
);

export default modal;
