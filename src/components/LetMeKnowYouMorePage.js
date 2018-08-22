//Test
import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {isPartOfHobbie,isHobbie,fields} from '../selectors/HobbiesSuggestion'; 
import EditabelInput from './EditabelInput';
import { startEditUser, } from '../actions/user';


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
            <h2>מינך</h2>
            <div className="your_gender___option">
                {genders.map((gender,i) => (
                    <label key={i}>
                        <input 
                            key={i}
                            onChange={hendelGenderChange}
                            type='radio'
                            name='gender'
                            value={gender}/>
                            <span className="radiomark"><span className="radiomark_checked"></span></span>
                            <span className="your_gender___label">{gender}</span>
                    </label>
                ))}
            </div>
    </div>
    )
}

export const YourAge = ({hendelAgeChange}) => (
    <div className="your_age">
        <h2>גילך</h2>
        <input type="number" placeholder="18" min="16" max="99" onChange={hendelAgeChange}/>
    </div>
);

export const YourHobbies = ({currHobbie,Hobbies,onHobbieEntered,onHobbieRemoved,onHobbieChanged,onHobbieChangedFromSuggest,suggestHobbie}) => (
    <div className="your__hobbies">
        <h2>תאר/י את עיסוקי הספורט שלך</h2>
        <input type="text" value={currHobbie} onChange={onHobbieChanged.bind(this)} onKeyPress={onHobbieEntered.bind(this)}/>
        <div className="curr_hobbie__list">
            {Hobbies.map((hobbie,i) => (<div className="curr_hobbie" key={i}>{hobbie}<button onClick={onHobbieRemoved.bind(this,hobbie)}>x</button></div>))}
        </div>
        <div className="suggestion__list">
            {currHobbie!='' && suggestHobbie(currHobbie).map((val,i) => (<div className="suggestion" key={i} onClick={onHobbieChangedFromSuggest.bind(this,val)}>{val}</div>))}
        </div>
    </div>
)

export const YourMoto = ({val,onChangeMoto}) => (
    <div className="your__moto">
        <h2>תאר/י את עצמך במשפט אחד</h2>
        <input type="text" value={val} onChange={onChangeMoto}/>
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
                    moto: '',
                    hobbies: []    
                }
            },
            autocompleat:'',
            flow: 1,
        }
        
        this.isStateHobbie = this.isStateHobbie.bind(this);
    }
    
    onChangeFname = (val) => {
        const fname = val;
        const user = {
            ...this.state.user,
            fname,
            detail: {
               ...this.state.user.detail 
            }
        }
        this.setState({user});
    };


    onChangeLname = (val) => {
        const lname = val;
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

    isStatePartOfHobbie = (value) => {
        const curr_hobbie__list = this.state.user.detail.hobbies;
        const filtered_fields =fields.filter((field,i) => {
            for(var i = 0; i < curr_hobbie__list.length; i++)
                if(curr_hobbie__list[i] === field) return false;
            return true;
        });

        for(var i = 0; i < filtered_fields.length;i++){
            if(filtered_fields[i].startsWith(value)) return true;
        }
        return false;
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
        if(this.isStatePartOfHobbie(autocompleat))
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

    onSubbmitButton = () => {
        this.props.startEditUser(this.state.user);
    }
    onChangeMoto = (e) => {
        const moto = e.target.value;
        if(moto.length < 80){
            const user = {
                ...this.state.user,
                detail: {
                   ...this.state.user.detail,
                   moto
                }
            }
            this.setState({user});        
        }
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
                                {this.state.user.detail.hobbies.length > 0 && <YourMoto 
                                                                                    val={this.state.user.detail.moto}
                                                                                    onChangeMoto={this.onChangeMoto}/>}
                                {this.state.user.detail.moto && <button className="let_me_know_you_more___finish_button" onClick={this.onSubbmitButton}>זהו סיימתי</button>}
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

const mapPropsToDispatch = (dispatch) => ({
    startEditUser: (update) => dispatch(startEditUser(update))
});

export default connect(mapStateToProps,mapPropsToDispatch)(LetMeKnowYouMorePage);
