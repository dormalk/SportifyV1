import React from 'react';
import {startLogout} from '../actions/auth';
import {connect} from 'react-redux';

export class MobileMenu extends React.Component{


    render(){
        return (
            <div className="show-for-mobile mobile_menu">
                <button onClick={this.props.onOpenChat}>Chat</button>
                <button onClick={this.props.startLogout}>Logout</button>
                <button onClick={console.log('')}>Profile</button>
                <button onClick={console.log('')}>+</button>
            </div>
        )
    }

}



const mapPropsToDispatch = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});


export default connect(undefined,mapPropsToDispatch)(MobileMenu);