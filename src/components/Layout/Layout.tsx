import React, { PropsWithChildren } from 'react';

const layout = (props: PropsWithChildren<{}>) => (
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </>
);

export default layout;
