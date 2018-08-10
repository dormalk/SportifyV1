//Test

import React from 'react';
import { connect } from 'react-redux';
import { sendEmailVerification } from '../actions/auth';

export const VerificationPage = ({sendEmailVerification}) => (
    <div>
        <p>חשבון לא מאומת</p>
        <button onClick={sendEmailVerification}>שלח אימות במייל</button>
    </div>
); 

const mapPropsToDispatch = (dispatch) => ({
    sendEmailVerification: () => dispatch(sendEmailVerification())
});

export default connect(undefined,mapPropsToDispatch)(VerificationPage);
