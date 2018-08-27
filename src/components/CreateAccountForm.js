import React from 'react';
import { connect } from 'react-redux';
import { startUploadImage } from '../actions/storage';
import { startCreateNewUser } from '../actions/user';
import ErrorMassage from './ErrorMassage';


export class CreateAccountForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:{
                fname: this.props.fname || '',
                lname: this.props.lname || '',
                email: this.props.email || '',
                password: this.props.password || '',
                profile: this.props.profile || ''       
            },
            c_password: '',
            error: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.startCreateNewUser(this.state.user).then(() => {
            this.setState(() => ({ error:'' }));
        }).catch((error) => {
            if(error.code === 'auth/email-already-in-use'){
                this.setState(() => ({ error:'המייל שהזנת נימצא בשימוש' }));
            }
            
        });
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

    onProfileChange = (e) => {
        const picture = e.target.files[0];
        if(picture.type !== 'image/jpeg' && picture.type !== 'image/jpg' && picture.type !== 'image/png'){
            this.setState({error:'נא בחר קובץ תמונה (jpg,jpeg,png)'});
        }
        else if(picture.size > 585750){
            this.setState({error:'נא בחר קובץ תמונה פחות מ 585,750 בית'});
            console.log('Hello');
        }
        else{
                this.setState(() => ({error:''}));  
                this.props.startUploadImage(picture).then((profile) => {
                    this.setState({error:''});
                    this.setState(() => ( { user: { ...this.state.user, profile } } ));
                }).catch((error) => {
                    this.setState({error:'לא ניתן לעלות קובץ תמונה ברגע זה'});
                });
        }
    }

    render(){
        return (
            <div>
                {this.state.error && <ErrorMassage error={this.state.error}/>}
                <div className="content-container">
                    <div className="signup-box">
                        <form 
                            onSubmit={this.onSubmit}
                            className="signup-form"
                        >
                            <h2>יצירת משתמש חדש</h2>
                            {this.state.error && <p className="form__error">{this.state.error}</p>}
                            <label>שם פרטי
                                <input 
                                    type="text"
                                    onChange={this.onFnameChange}
                                    required
                                />
                            </label>
                            <label>שם משפחה
                                <input 
                                    type="text"
                                    onChange={this.onLnameChange}
                                    required
                                />
                            </label>
                            <label>אימייל
                                <input 
                                    type="text"
                                    onChange={this.onEmailChange}
                                    required
                                />
                            </label>
                            <label>סיסמא
                                <input 
                                    type="password"
                                    onChange={this.onPasswordChange}
                                    required
                                />
                            </label>
                            <label>אימות סיסמא
                                <input 
                                    type="password"
                                    onChange={this.onConfirmPasswordChange}
                                    onBlur={this.checkCompatibilityPasswords}
                                    required
                                />
                            </label>
                            <label>תמונת פרופיל
                                <input type="file" onChange={this.onProfileChange}/>
                            </label>
                            {this.state.profile && <img src={this.state.profile}/>}
                            <button className="signup__box">צור חשבון</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

const mapPropsToDispatch = (dispatch) => ({
    startUploadImage: (picture) => dispatch(startUploadImage(picture)),
    startCreateNewUser: (user) => dispatch(startCreateNewUser(user))
});


export default connect(undefined,mapPropsToDispatch)(CreateAccountForm);