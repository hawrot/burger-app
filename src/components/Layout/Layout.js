import Aux from '../../hoc/Aux';
import React, {Component} from "react";
import classes from './Layout.css';
import Toolbar from '../navigation/toolbar/Toolbar';
import SideDrawer from '../navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    render(){
        return(
            <Aux>
                <div>
                    <Toolbar/>
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



