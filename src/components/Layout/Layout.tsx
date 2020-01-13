import React, { PropsWithChildren } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props: PropsWithChildren<{}>) => (
  <>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>{props.children}</main>
  </>
);

export default layout;
