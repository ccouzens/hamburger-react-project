import React, { ReactNode } from 'react';
import classes from './NavigationItem.module.css';

const navigationItem = (props: {
  children: ReactNode;
  link: string;
  active?: boolean;
}) => (
  <li className={classes.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : undefined}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;
