import React, {Component} from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';




class BurgerBuilder extends Component {


    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }


    componentDidMount() {
        /*axios.get(process.env.REACT_APP_FIREBASE_INGREDIENTS)

            .then(res => {
                this.setState({ingredients: res.data});
            }).catch(err =>{
                this.setState({error: true});
        });*/
    }

    updatePurchaseState(ingredients) {
        ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 5})
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        }
        for (let keu in disabledInfo) {
            disabledInfo[keu] = disabledInfo[keu] <= 1;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientRemoved={ this.props.onIngredientRemoved}
                                   ingredientAdded={this.props.onIngredientAdded}
                                   disabled={disabledInfo}
                                   price={this.props.price}
                                   ordered={this.purchaseHandler}
                                   purchasable={this.state.purchasable}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                totalPrice={this.state.totalPrice}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
