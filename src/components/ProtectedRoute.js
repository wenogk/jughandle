import React from "react";
import { Route, Redirect } from "react-router-dom";


export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {

  const authToken = localStorage.getItem('jwtToken');

  console.log("IS AUTHENTICATED: " + (authToken!=null))
  return (
    <Route
      {...rest}
      component={props => {
        if (authToken!=null) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to="/"
            />
          );
        }
      }}
    />
  );
};
