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
                dispatch(authSuccess(res));
            })
            .catch(err =>{
                console.log(err);
                dispatch(authFail(err));
            })
    }
}
