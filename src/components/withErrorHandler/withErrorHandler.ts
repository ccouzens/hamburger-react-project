import {
  ComponentClass,
  FunctionComponent,
  createElement,
  Fragment,
  useState,
  useEffect
} from 'react';
import Modal from '../UI/Modal/Modal';
import { AxiosInstance } from 'axios';

const withErrorHandler = <P>(
  WrappedComponent: FunctionComponent<P> | ComponentClass<P>,
  axios: AxiosInstance
) => (props: P) => {
  const [error, setError] = useState<null | string>(null);
  const requestInterceptor = axios.interceptors.request.use(r => {
    setError(null);
    return r;
  });
  const responseInterceptor = axios.interceptors.response.use(
    r => r,
    err => {
      setError(`${err}`);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  });
  return createElement(
    Fragment,
    null,
    createElement(
      Modal,
      {
        show: error !== null,
        modalClosed: () => {
          setError(null);
        }
      },
      error
    ),
    createElement(WrappedComponent, props)
  );
};

export default withErrorHandler;
