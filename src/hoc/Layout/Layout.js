import Aux from '../Aux';
import React, {useState} from "react";
import classes from './Layout.css';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };


    return (
        <Aux>
            <div>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    drawerToogleClicked={sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={sideDrawerIsVisible}
                    closed={sideDrawerClosedHandler}/>
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )


};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);



