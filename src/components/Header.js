import React from 'react';
import { connect } from 'react-redux';
import {startLogout} from '../actions/auth';
import AccountSearcher from './AccountSearcher/AccountSearcher';
import  { Link } from 'react-router-dom';


export const Header = ({startLogout}) => (
    <div className="header">
        <div className="content-container">
            <div className="justify-container">
                <Link to="/dashboard"><h1 className="header__title">Sportify</h1></Link>
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
