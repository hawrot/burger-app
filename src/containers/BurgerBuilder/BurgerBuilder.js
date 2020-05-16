import React, {Component} from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";




const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {



    state = {
        ingredients: null,
        purchasable: false,
        totalPrice: 7,
        purchasing: false,
        loading: false,
        error : false
    }



    componentDidMount() {
        axios.get(process.env.REACT_APP_FIREBASE_INGREDIENTS)

            .then(res => {
                this.setState({ingredients: res.data});
            }).catch(err =>{
                this.setState({error: true});
        });
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

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
      /*  this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Matt Hawrot',
                email: 'matt@hawrot.com',
                phone: '+447711223344'
            },
            deliveryMethod: 'express'
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(err => {
                this.setState({loading: false, purchasing: false});
                console.log(err);
            });*/
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let keu in disabledInfo) {
            disabledInfo[keu] = disabledInfo[keu] <= 1;
        }
        let orderSummary =  null;

        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientRemoved={this.removeIngredientHandler}
                                   ingredientAdded={this.addIngredientHandler}
                                   disabled={disabledInfo}
                                   price={this.state.totalPrice}
                                   ordered={this.purchaseHandler}
                                   purchasable={this.state.purchasable}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);
