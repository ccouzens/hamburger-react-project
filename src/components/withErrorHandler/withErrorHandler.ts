import {
  ComponentClass,
  FunctionComponent,
  createElement,
  Fragment,
  useState
} from 'react';
import Modal from '../UI/Modal/Modal';
import { AxiosInstance } from 'axios';

const withErrorHandler = <P>(
  WrappedComponent: FunctionComponent<P> | ComponentClass<P>,
  axios: AxiosInstance
) => (props: P) => {
  const [error, setError] = useState<null | string>(null);
  axios.interceptors.request.use(r => {
    setError(null);
    return r;
  });
  axios.interceptors.response.use(
    r => r,
    err => {
      setError(`${err}`);
    }
  );
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
