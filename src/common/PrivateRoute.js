import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
  
  
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
      {...rest}
      render={props =>
        {
          if(authenticated){
            console.log("go to component")
            return <Component {...rest} {...props} />
          }else{
            alert('You need to login to view this page', 3);
            return <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />}
        }
      }
    />
    // <Route
    //   {...rest}
    //   render={props =>
    //     authenticated ? (
    //       <Component {...rest} {...props} />
    //     ) : (
    //       <Redirect
    //         to={{
    //           pathname: '/login',
    //           state: { from: props.location }
    //         }}
    //       />
    //     )
    //   }
    // />
);
  
export default PrivateRoute