import Aux from '../../hoc/Aux';
import React from "react";
import classes from './Layout.css';
import Toolbar from '../navigation/toolbar/Toolbar';

const layout = (props) => (
    <Aux>
        <div>
            <Toolbar/>
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;



