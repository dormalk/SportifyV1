import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { startLoginOnGoogle } from '../actions/auth';
import { startLoginOnEmail } from '../actions/auth';

export class SignInBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: this.props.email || '', 
            password: this.props.password || '',
            error: this.props.error || ''
        }
    };

    onEmailInputChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };

    onPasswordInputChange = (e) => {
        const password = e.target.value;
        if(password.length < 20){
            this.setState(() => ({ password }));
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        if(!validator.isEmail(this.state.email)){
            this.setState(() => ({ error:'Not valid email' }));            
        }
        else if(this.state.password.length < 6) {
            this.setState(() => ({ error:'Not valid password' }));
        }
        else{
            this.setState(() => ({ error:'' }));
            this.props.startLoginOnEmail(this.state.email,this.state.password);
        }
    }

    render() {
        return (
            <div className="content-container">
                <div className="login-box">
                    <h1 className="login-box__title">Login Sportify</h1>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <form  className="login-form" onSubmit={this.onSubmit}>
                        <input 
                            type="text"
                            placeholder="Email"
                            autoFocus
                            value={this.state.email}
                            onChange={this.onEmailInputChange}  
                        />
                        <input 
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onPasswordInputChange}  
                        />
                        <div className="login__non-provider">
                            <button type="submit" className="login_email">SIGN IN</button>
                            <Link className="signup" to="/signup">CREATE ACCOUNT</Link>
                        </div>
                        <button type="button" className="login__google" onClick={this.props.startLoginOnGoogle}>SIGN IN WITH GOOGLE</button>
                    </form>
                </div>
            </div>
        );
    };
}; 



const mapPropsToDispatch = (dispatch) => ({
    startLoginOnGoogle: () => dispatch(startLoginOnGoogle()),
    startLoginOnEmail: (email,password) => dispatch(startLoginOnEmail(email,password)),
});


export default connect(undefined,mapPropsToDispatch)(SignInBox);