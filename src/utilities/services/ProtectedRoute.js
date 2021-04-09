import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isRegistered } from './authService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isRegistered() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/register" {...props} />
        )
      }
    />
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
};

export default ProtectedRoute;
