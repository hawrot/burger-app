import React, {useState, useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';

import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {




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
