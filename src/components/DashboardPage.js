import React from 'react';
import { connect } from 'react-redux';
import {startLogout} from '../actions/auth';

export const DashboardPage = ({startLogout}) => (
    <div>
        <p>wellcome my frined</p>
        <button onClick={startLogout}>Logout</button>
    </div>
);


const mapPropsToDispatch = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});


export default connect(undefined,mapPropsToDispatch)(DashboardPage);
