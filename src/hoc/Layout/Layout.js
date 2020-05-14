import Aux from '../Aux';
import React, {Component} from "react";
import classes from './Layout.css';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    sideDrawerToggleHandler =() =>{
        this.setState((prevState) =>{ return {showSideDrawer: !prevState.showSideDrawer}})
    };

    render(){
        return(
            <Aux>
                <div>
                    <Toolbar drawerToogleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

};

export default Layout;



