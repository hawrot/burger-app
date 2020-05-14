import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate(){

    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                    </li>
                )
            })

        return (
            <Aux>
                <h3>Your Order:</h3>
                <p>Burger with the following ingredients:</p>
                <p>The price is £{this.props.totalPrice.toFixed(2)}</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Go to checkout? </p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">Cancel</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">Continue</Button>
            </Aux>
        );
    }

}

export default OrderSummary;
