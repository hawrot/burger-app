import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <ul className={classes.NavigationItem}>
        <li>
            <NavLink exact to={props.link} activeClassName={classes.active}> {props.children}</NavLink>
        </li>
    </ul>
);

export default navigationItem;
