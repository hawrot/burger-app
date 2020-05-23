import * as actionTypes from './actionTypes';
import axios from 'axios';
import {AUTH_LOGOUT} from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (token, userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(() =>{
            dispatch(logout());
        }, expirationTime);
    };
}

export const auth = (email, password, isSignup) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url =  process.env.REACT_APP_API_KEY;
        if(!isSignup){
          url = process.env.REACT_APP_SIGN_IN;
        }

        axios.post(url, authData)
            .then(res =>{
                console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err =>{
                dispatch(authFail(err.response.data.error));
            })
    }
}
