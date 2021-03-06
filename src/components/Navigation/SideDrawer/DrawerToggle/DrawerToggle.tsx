import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (props: { clicked: () => void }) => (
  <div onClick={props.clicked} className={classes.DrawerToggle}>
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggle;
