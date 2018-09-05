import React from 'react';
import { connect } from 'react-redux';
import { startEditUser } from '../../actions/user';
import { history } from '../../routers/AppRouter';

export class UserProfileView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user || '',
            margeFullName: '',
            myUser: this.props.myUser || ''
        }
    }
    componentDidMount = () => {
        const margeFullName = this.props.user.fname + " " + this.props.user.lname; 
        this.setState(() => ({margeFullName}));

        if(this.props.user.email === this.props.myUser.email){
            history.push('/dashboard');
        }
    }

    onRequestFollow = () => {
        var follows = this.props.myUser.follows || [];
        follows.push(this.props.uid);
        const myUser = {
            ...this.state.myUser,
            follows
        }
        this.setState({myUser});
        this.props.startEditUser(myUser);
    }
    onRequestUnfollow = () => {
        var follows = this.props.myUser.follows || [];
        follows = follows.filter((follow) => follow !== this.props.uid);
        const myUser = {
            ...this.state.myUser,
            follows
        }
        this.setState({myUser});
        this.props.startEditUser(myUser);
    }

    allreadyFollow = () => {
        var follows = this.props.myUser.follows || [];
        for(var i = 0; i< follows.length; i++){
            if(follows[i] === this.props.uid)
                return false;
        }
        return true;
    }
    isMyProfile = () => {

    }
    render(){
        return(
            <div className="profile_view___non-edit">
            {
                this.allreadyFollow()?
                <button className="deshboard__button_edit" onClick={this.onRequestFollow}>עקוב</button>:
                <button className="deshboard__button_edit" onClick={this.onRequestUnfollow}>בטל עוקב</button>
            }
            <h1>{this.state.margeFullName}</h1>
            <div className="img_wrapper"><img src={this.state.user.profile}/></div>
            <div className="profile_view__your-age">
                <span className="profile_view__label">גיל</span>
                {this.state.user &&
                <span>{this.state.user.detail.age}</span>}
            </div>
            <div className="profile_view__your-hobbies">
                <span className="profile_view__label___block">עיסוקי ספורט</span>
                {this.state.user && this.state.user.detail.hobbies.map((hobbie,i) => { 
                    return i < this.state.user.detail.hobbies.length-1? (<div className="hobbie" key={i}>{hobbie},</div>):(<div className="hobbie" key={i}>{hobbie}</div>)
                })}
            </div>
            <div className="profile_view__your-moto">
                <span className="profile_view__label___block">טיפ לחיים</span>                   
                {this.state.user &&
                <span>{this.state.user.detail.moto}</span>}
            </div>
            </div>  
        )
    }
} 


const mapPropsToDispatch = (dispatch) => ({
    startEditUser: (update) => dispatch(startEditUser(update))
});


const mapStateToProps = (state, props) => ({
    myUser: state.user
});


export default connect(mapStateToProps,mapPropsToDispatch)(UserProfileView);