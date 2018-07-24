import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import SignupBox from './SignupBox';

export const SignupPage = () => (
    <div className="signup-page">
        <Header/>
        <SignupBox/>
    </div>
);

export default SignupPage; 
