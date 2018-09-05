import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import CreateAccountForm from './CreateAccountForm';

export const CreateAccountPage = () => (
    <div className="signup-page">
        <CreateAccountForm/>
    </div>
);

export default CreateAccountPage; 
