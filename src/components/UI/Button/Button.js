import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button className={[classes.Button, classes[props.btnType]].join(' ')} {props.children} onClick={props.clicked}></button>
);

export default button;
