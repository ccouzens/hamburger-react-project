import React, { ReactNode } from 'react';

import classes from './Button.module.css';

const button = (props: {
  children: ReactNode;
  clicked: () => void;
  btnType: 'Success' | 'Danger';
}) => (
  <button
    className={`${classes.Button} ${classes[props.btnType]}`}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
