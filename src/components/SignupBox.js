import React from 'react';
import { connect } from 'react-redux';
import { startUploadImage } from '../actions/storage';

export class SignupBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:{
                fname: this.props.fname || '',
                lname: this.props.lname || '',
                email: this.props.email || '',
                password: this.props.password || '',        
            },
            c_password: '',
            error: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
    };

    onFnameChange = (e) => {
        const fname = e.target.value;
        this.setState(() => ( { user: { ...this.state.user, fname } } ));
    }

    onLnameChange = (e) => {
        const lname = e.target.value;
        this.setState(() => ( { user: { ...this.state.user, lname } } ));
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ( { user: { ...this.state.user, email } } ));
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        if(password.length < 20) {
            this.setState(() => ( { user: { ...this.state.user, password } } ));
        }
    }

    onConfirmPasswordChange = (e) => {
        const c_password = e.target.value;
        if(c_password.length < 20) {
            this.setState(() => ( { c_password } ));
        }
    }

    checkCompatibilityPasswords = (e) => {
        const r_password = this.state.user.password;
        const c_password = this.state.c_password;
        if(c_password !== r_password){
            this.setState(() => ({ error:'Passwords do not match' }));
        }
        else{
            this.setState(() => ({ error:'' }));
        }
    }

    onChangeImagePicker = (e) => {
        e.preventDeafule();
        const picture = e.target.files[0];
        if(picture.type !== 'image/jpeg' && picture.type !== 'image/jpg' && picture.type !== 'image/png'){
            this.setState({error:'נא בחר קובץ תמונה (jpg,jpeg,png)'});
        }
        else if(picture.size > 585750){
            this.setState({error:'נא בחר קובץ תמונה פחות מ 585,750 בית'});            
        }
        else{
            this.setState(() => ({error:''}));  
            this.props.startUploadImage(picture);        
        }
    }

    render(){
        return (
            <div className="content-container">
                <form 
                    onSubmit={this.onSubmit}
                    className="signup-form"
                >
                    <h2>CREATE NEW ACCOUNT</h2>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <label>First Name:
                        <input 
                            type="text"
                            onChange={this.onFnameChange}
                            required
                        />
                    </label>
                    <label>Last Name:
                        <input 
                            type="text"
                            onChange={this.onLnameChange}
                            required
                        />
                    </label>
                    <label>Email:
                        <input 
                            type="text"
                            onChange={this.onEmailChange}
                            required
                        />
                    </label>
                    <label>Password:
                        <input 
                            type="password"
                            onChange={this.onPasswordChange}
                            required
                        />
                    </label>
                    <label>Confirm Password:
                        <input 
                            type="password"
                            onChange={this.onConfirmPasswordChange}
                            onBlur={this.checkCompatibilityPasswords}
                            required
                        />
                    </label>
                    <button className="signup__box">CREATE ACCOUNT</button>
                </form>
            </div>
        );
    };
};

const mapPropsToDispatch = (dispatch) => {
    startUploadImage: (picture) => dispatch(startUploadImage(picture));
}


export default connect(undefined,mapPropsToDispatch)(SignupBox);