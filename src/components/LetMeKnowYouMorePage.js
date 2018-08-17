//Test
import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {isPartOfHobbie,isHobbie,fields} from '../selectors/HobbiesSuggestion'; 
import EditabelInput from './EditabelInput';


export const CheckDetail = ({fname,lname,onChangeFname,onChangeLname,onContinueButton}) => (
    <div className="check_detail">
        <h2>האם הפרטים נכונים?</h2>
        <EditabelInput val={fname} onChangeValue={onChangeFname} label={"שם פרטי"}/>
        <EditabelInput val={lname} onChangeValue={onChangeLname} label={"שם משפחה"}/>
        <button className="confirm_detail" onClick={onContinueButton}>אישור</button>
    </div>
)

export const YourGender = ({hendelGenderChange}) => {
    const genders = ['זכר','נקבה','לא מעוניין למסור']
    return(
        <div className="your_gender">
            <h2>מהו מינך?</h2>
            {genders.map((gender,i) => (
                <label key={i}>
                    <input 
                        key={i}
                        onChange={hendelGenderChange}
                        type='radio'
                        name='gender'
                        value={gender}/>
                        <span className="radiomark"><span className="radiomark_checked"></span></span>
                        {gender}
                </label>
            ))}
    </div>
    )
}

export const YourAge = ({hendelAgeChange}) => (
    <div>
        <h2>גיל</h2>
        <input type="number" placeholder="18" min="16" max="99" onChange={hendelAgeChange}/>
    </div>
);

export const YourHobbies = ({currHobbie,Hobbies,onHobbieEntered,onHobbieRemoved,onHobbieChanged,onHobbieChangedFromSuggest,suggestHobbie}) => (
    <div>
        <h2>מה התחביבים שלך?</h2>
        <input type="text" value={currHobbie} onChange={onHobbieChanged.bind(this)} onKeyPress={onHobbieEntered.bind(this)}/>
        {Hobbies.map((hobbie,i) => (<div key={i}>{hobbie}<button onClick={onHobbieRemoved.bind(this,hobbie)}>x</button></div>))}
        {currHobbie!='' && suggestHobbie(currHobbie).map((val,i) => (<div key={i} onClick={onHobbieChangedFromSuggest.bind(this,val)}>{val}</div>))}
    </div>
)

export class LetMeKnowYouMorePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                ...this.props.user,
                detail: {
                    gender: '',
                    age:'',
                    hobbies: []    
                }
            },
            autocompleat:'',
            flow: 1,
        }
        
        this.isStateHobbie = this.isStateHobbie.bind(this);
    }
    
    onChangeFname = (e) => {
        const fname = e.target.value;
        const user = {
            ...this.state.user,
            fname,
            detail: {
               ...this.state.user.detail 
            }
        }
        this.setState({user});
    };


    onChangeLname = (e) => {
        const lname = e.target.value;
        const user = {
            ...this.state.user,
            lname,
            detail: {
               ...this.state.user.detail 
            }
        }
        this.setState({user});
    };


    hendelGenderChange = (e) => {
        const gender = e.target.value;
        const user = {
            ...this.state.user,
            detail: {
               ...this.state.user.detail,
               gender 
            }
        }
        this.setState({user});
    }

    hendelAgeChange = (e) => {
        const age = e.target.value;
        const user = {
            ...this.state.user,
            detail: {
               ...this.state.user.detail,
               age
            }
        }
        this.setState({user});
    }

    isStateHobbie = (value) => {
        var _isHobbie = true;
        const _fields = this.state.user.detail.hobbies;
        for(var i=0;i<_fields.length;i++)
            if(_fields[i] === value){
                _isHobbie = false;
                break;
            } 
        return _isHobbie;    
    }

    onHobbieEntered = (e) => {
        const hobbie = e.target.value;
        if(e.key === 'Enter'){
            if(isHobbie(hobbie) && this.isStateHobbie(hobbie)){
                const autocompleat = '';
                const hobbies = this.state.user.detail.hobbies;
                hobbies.push(hobbie);    
                const user = {
                    ...this.state.user,
                    detail: {
                       ...this.state.user.detail,
                       hobbies
                    }
                }        
                this.setState({user});
                this.setState({autocompleat})    
            }
        }
    }

    onHobbieRemoved = (hobbie) => {
        var hobbies = this.state.user.detail.hobbies.filter((h) => {return h !== hobbie;});
        const user = {
            ...this.state.user,
            detail: {
               ...this.state.user.detail,
               hobbies
            }
        }        
        this.setState({user});
    }

    onHobbieChanged = (e) => {
        const autocompleat = e.target.value;
        if(isPartOfHobbie(autocompleat))
            this.setState({autocompleat});
    }

    suggestHobbie = (value) => {
        return fields.filter((v) => {return v.startsWith(value) && this.isStateHobbie(v)});
    }

    onHobbieChangedFromSuggest = (value) => {
        const hobbie = value;
        const hobbies = this.state.user.detail.hobbies;
        hobbies.push(hobbie);
        const autocompleat = '';
        const user = {
            ...this.state.user,
            detail: {
               ...this.state.user.detail,
               hobbies
            }
        }        
        this.setState({user});
        this.setState({autocompleat});
    }


    onContinueButton = () => {
        this.setState({flow: this.state.flow+1});
    }

    render(){
        return this.state.user &&
        (
            <div className="content-container">
                <div className="let_me_know_you_more">
                    {this.state.user.fname && <h1>היי  {this.state.user.fname}, אני רוצה להכיר אותך יותר!</h1>}
                    <ReactCSSTransitionGroup
                        transitionName="exm"
                        transitionAppear={false}
                        transitionEnterTimeout={500}
                        transitionEnter={true}
                        transitionLeave={false}>
                        {
                            this.state.flow === 1 && 
                            <div>
                                <CheckDetail 
                                    fname={this.state.user.fname} 
                                    lname={this.state.user.lname}
                                    onChangeFname={this.onChangeFname}
                                    onChangeLname={this.onChangeLname}
                                    onContinueButton={this.onContinueButton}/>
                            </div>
                        }
                        {this.state.flow === 2 && <div className="grey_border_box_display">
                            <ReactCSSTransitionGroup
                            transitionName="exm"
                            transitionAppear={false}
                            transitionEnterTimeout={500}
                            transitionEnter={true}
                            transitionLeave={false}>
                                <YourGender hendelGenderChange={this.hendelGenderChange}/>
                                {this.state.user.detail.gender && <YourAge hendelAgeChange={this.hendelAgeChange}/>}
                                {this.state.user.detail.age && <YourHobbies 
                                                        Hobbies={this.state.user.detail.hobbies} 
                                                        onHobbieEntered={this.onHobbieEntered}
                                                        onHobbieRemoved={this.onHobbieRemoved}
                                                        onHobbieChanged={this.onHobbieChanged}
                                                        currHobbie={this.state.autocompleat}
                                                        onHobbieChangedFromSuggest={this.onHobbieChangedFromSuggest}
                                                        suggestHobbie={this.suggestHobbie}/>}
                                {this.state.user.detail.hobbies.length > 0 &&
                                <button>זהו סיימתי</button>}
                            </ReactCSSTransitionGroup>
                        </div>}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user
});

export default connect(mapStateToProps,undefined)(LetMeKnowYouMorePage);
