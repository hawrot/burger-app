import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (authData) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(process.env.REACT_APP_API_KEY, authData)
            .then(res =>{
                console.log(res);
                dispatch(authSuccess(res));
            })
            .catch(err =>{
                console.log(err);
                dispatch(authFail(err));
            })
    }
}
