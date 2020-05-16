import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.css';

class Contact extends Component {
    state = {
        name: '',
        email: '',
        address: {
          street: '',
          postCode: ''
        }
    }

    orderHandler = () =>{

    }

    render() {
        return (
            <div className={classes.Contact}>
                <h4>Enter your Contact Data</h4>
                <form action="">
                    <input className={classes.Input} name="name" placeholder="Your Name" type="text"/>
                    <input className={classes.Input} name="email" placeholder="email" type="text"/>
                    <input className={classes.Input} name="street" placeholder="street" type="text"/>
                    <input className={classes.Input} name="postCode" placeholder="Post Code" type="text"/>
                    <Button clicked={this.orderHandler} btnType="Success">Order</Button>
                </form>
            </div>
        )
    }
}

export default Contact;
