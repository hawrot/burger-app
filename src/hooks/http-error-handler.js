import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptopr = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    })
    const resInterceptor = httpClient.interceptors.response.use(res => res, error => {
        setError(error);

    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptopr);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptopr, resInterceptor]);

    const errorConfirmedhandler = () => {
        setError(null);
    };

    return [error, errorConfirmedhandler];
}
