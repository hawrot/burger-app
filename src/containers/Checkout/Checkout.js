import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';

import Contact from "./Contact/Contact";

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meet: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()){
            // ['salad' + '1']
            ingredients[param[0]] = +param[1];
        }
        console.log('Ing: ' + ingredients.salad)
        this.setState({ingredients: ingredients})

    }


    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    CheckoutCancelled={this.CheckoutCancelledHandler}
                    CheckoutContinued={this.CheckoutContinuedHandler}

                />
                <Route path={this.props.match.path + '/contact-data'} component={Contact}/>
            </div>
        );
    }

}

export default Checkout;
