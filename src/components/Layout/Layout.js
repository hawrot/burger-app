import Aux from '../../hoc/Aux';
import React from "react";
import classes from './Layout.css';
import Toolbar from '../navigation/toolbar/Toolbar';
import SideDrawer from '../navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <Aux>
        <div>
            <Toolbar/>
            <SideDrawer/>
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;



