import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 7,
    error: false
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const order = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            const updatedIngredient = {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = {
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            }
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedSt);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 7
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {
                error: true
            })
        default:
            return state;
    }

};

export default order;
