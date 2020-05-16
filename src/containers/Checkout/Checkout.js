import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';

import Contact from "./Contact/Contact";

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice : 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()){
            // ['salad' + '1']
            if(param[0] === 'price'){
                price = param[1];
            }else {
                ingredients[param[0]] = +param[1];
            }

        }
        console.log('Ing: ' + ingredients.salad)
        this.setState({ingredients: ingredients, totalPrice: price})

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
                <Route path={this.props.match.path + '/contact-data'}
                       render={(props) =>(<Contact ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}/>
            </div>
        );
    }

}

export default Checkout;
