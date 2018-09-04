import React from 'react';

export default class UserProfileView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user || '',
            margeFullName: ''
        }
    }
    componentDidMount = () => {
        const margeFullName = this.props.user.fname + " " + this.props.user.lname; 
        this.setState(() => ({margeFullName}));
    }

    render(){
        return(
            <div className="profile_view___non-edit">
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