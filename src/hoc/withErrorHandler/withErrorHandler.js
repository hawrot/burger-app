import React, {useState, useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';

import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, setError] = useState(null);

        const reqInterceptopr = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        })
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error);

        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptopr);
                axios.interceptors.response.eject(resInterceptor);
            }
            }, [reqInterceptopr, resInterceptor]);

      const errorConfirmedhandler = () => {
            setError(null);
        };


        return (
            <Aux>
                <Modal show={error}
                       modalClosed={errorConfirmedhandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        )
    }

};

export default withErrorHandler;
