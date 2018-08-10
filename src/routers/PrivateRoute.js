import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import VerificationPage from '../components/VerificationPage';
import LetMeKnowYouMorePage from '../components/LetMeKnowYouMorePage';
import { isEmailVerified } from '../actions/auth';

export const PrivateRoute = ({
  isAuthenticated,
  isVerified,
  isFirst,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        isVerified() ? (
          isFirst ? (
            <div>
              <Header/>
              <Component {...props} />
            </div>  
          ):(
            <div>
              <Header/>
              <LetMeKnowYouMorePage />
            </div>  
          )
        ) : (
          <div>
            <Header/>
            <VerificationPage />
          </div>  
        )
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  isFirst: !!state.user.detail
});

const mapPropsToDispatch = (dispatch) => ({
  isVerified: () => dispatch(isEmailVerified())
});

export default connect(mapStateToProps,mapPropsToDispatch)(PrivateRoute);
