import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { startCreateAccountOnGoogle } from '../../actions/user';
import { startLoginOnEmail } from '../../actions/auth';

export class LoginAccountBox extends React.Component{
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
                {this.state.error && <div className="error">{this.state.error}</div>}
                <h1 className="login-box__title">התחברות לספורטיפיי</h1>
                    <form  className="login-form" onSubmit={this.onSubmit}>
                        <input 
                            type="text"
                            placeholder="אימייל"
                            autoFocus
                            value={this.state.email}
                            onChange={this.onEmailInputChange}  
                        />
                        <input 
                            type="password"
                            placeholder="סיסמא"
                            value={this.state.password}
                            onChange={this.onPasswordInputChange}  
                        />
                        <div className="login__non-provider">
                            <button type="submit" className="login_email">התחברות</button>
                            <Link className="signup" to="/signup">יצירת חשבון</Link>
                        </div>
                        <button type="button" className="login__google" onClick={this.props.startCreateAccountOnGoogle}>התחברות עם גוגל</button>
                    </form>
                </div>
            </div>
        );
    };
}; 



const mapPropsToDispatch = (dispatch) => ({
    startCreateAccountOnGoogle: () => dispatch(startCreateAccountOnGoogle()),
    startLoginOnEmail: (email,password) => dispatch(startLoginOnEmail(email,password)),
});


export default connect(undefined,mapPropsToDispatch)(LoginAccountBox);