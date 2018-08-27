import React from 'react';
import { connect } from 'react-redux';
import {startLogout} from '../actions/auth';
import AccountSearcher from './AccountSearcher/AccountSearcher';

export const Header = ({startLogout}) => (
    <div className="header">
        <div className="content-container">
            <div className="justify-container">
                <h1 className="header__title">Sportify</h1>
                <AccountSearcher/>
                <button onClick={startLogout}>התנתק</button>
            </div>
        </div>
    </div>
);

const mapPropsToDispatch = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});


export default connect(undefined,mapPropsToDispatch)(Header);
