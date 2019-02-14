import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
    <Route
      {...rest}
      render={props => (
        sessionStorage.getItem('myData') ?
          <Component {...props} />
          : <Redirect to='/' />
      )}
    />
  );
  
  export default PrivateRoute;