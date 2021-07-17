import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMe } from '../redux/actions/auth';

export function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated, isLoading } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // setTimeout(() => setstate(true), 2000);
    dispatch(fetchMe());
  }, [isAuthenticated]);
  return isLoading ? (
    <Route {...rest} render={() => <span>Загрузка...</span>} />
  ) : isAuthenticated ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Route
      {...rest}
      render={(props) => (
        <Redirect
          to={{
            pathname: '/admin-login',
            state: {
              from: props.location,
            },
          }}
        />
      )}
    />
  );
}
