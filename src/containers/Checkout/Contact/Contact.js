import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Contact extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Matt Hawrot',
                email: 'matt@hawrot.com',
                phone: '+447711223344'
            },
            deliveryMethod: 'express'
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
            });

    }

    render() {
        let form = (
            <form action="">
                <input className={classes.Input} name="name" placeholder="Your Name" type="text"/>
                <input className={classes.Input} name="email" placeholder="email" type="text"/>
                <input className={classes.Input} name="street" placeholder="street" type="text"/>
                <input className={classes.Input} name="postCode" placeholder="Post Code" type="text"/>
                <Button clicked={this.orderHandler} btnType="Success">Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.Contact}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default Contact;
