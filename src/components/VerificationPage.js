//Test

import React from 'react';
import { connect } from 'react-redux';
import { sendEmailVerification } from '../actions/auth';

export const VerificationPage = ({sendEmailVerification}) => (
    <div>
        <div className="content-container">
            <div className="verification_box">
                <h3>חשבון לא מאומת</h3>
                <p>
                חשבונך עדין לא אומת מול המערכת, במידה ולא קיבלת מייל אימות, באפשרותך לבצע שליחה חוזרת של המייל.<br/>
                תהליך זה הכרחי על-מנת למטב את המערכת וליצור עבורך כלי איכותי לצרכייך.<br/> 
                </p>
                <button onClick={sendEmailVerification}>שלח אימות במייל</button>        
            </div>
        </div>
    </div>
); 

const mapPropsToDispatch = (dispatch) => ({
    sendEmailVerification: () => dispatch(sendEmailVerification())
});

export default connect(undefined,mapPropsToDispatch)(VerificationPage);
