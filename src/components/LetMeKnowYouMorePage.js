//Test
import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {isPartOfHobbie,isHobbie,fields} from '../selectors/HobbiesSuggestion'; 


class EditabelInput extends React.Component{
    constructor(props){
        super();
        this.state = {
            disable: true
        }
    }

    onEditClick = () => {
        const disable = !this.state.disable;
        this.setState({disable});
    }

    render(){
        return(
            <div>
                <label>{this.props.label}
                    <input type="text" value={this.props.val} onChange={this.props.onChangeValue} disabled={this.state.disable}/>
                    {this.state.disable? (
                        <span onClick={this.onEditClick}>ערוך/י</span>
                    ):(
                        <span onClick={this.onEditClick}>סיימ/י עריכה</span>           
                    )}
                </label>
            </div>
        )        
    }
}


const CheckDetail = ({fname,lname,onChangeFname,onChangeLname}) => (
    <div>
        <h2>האם הפרטים נכונים?</h2>
        <EditabelInput val={fname} onChangeValue={onChangeFname} label={"שם פרטי"}/>
        <EditabelInput val={lname} onChangeValue={onChangeLname} label={"שם משפחה"}/>
    </div>
)

const YourSex = ({hendelSexChange}) => {
    const genders = ['זכר','נקבה','לא מעוניין למסור']
    return(
        <div>
        <h2>מהו מינך?</h2>
        {genders.map((gender,i) => (
            <label key={i}> {gender}
            <input 
                key={i}
                onChange={hendelSexChange}
                type='radio'
                name='sex'
                value={gender}/>
            </label>
        ))}
    </div>
    )
}

const YourAge = ({hendelAgeChange}) => (
    <div>
        <h2>גיל</h2>
        <input type="number" placeholder="18" min="16" max="99" onChange={hendelAgeChange}/>
    </div>
);

const YourHobbies = ({currHobbie,Hobbies,onHobbieEntered,onHobbieRemoved,onHobbieChanged,onHobbieChangedFromSuggest,suggestHobbie}) => (
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
                    sex: '',
                    age:'',
                    hobbies: []    
                }
            },
            autocompleat:'',
            flow: 1
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


    hendelSexChange = (e) => {
        const sex = e.target.value;
        const user = {
            ...this.state.user,
            detail: {
               ...this.state.user.detail,
               sex 
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
                <div>
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
                                    onChangeLname={this.onChangeLname}/>
                                <button onClick={this.onContinueButton}>אישור</button>
                            </div>
                        }
                        {this.state.flow === 2 && <YourSex hendelSexChange={this.hendelSexChange}/>}
                        {this.state.user.detail.sex && <YourAge hendelAgeChange={this.hendelAgeChange}/>}
                        {this.state.user.detail.age && <YourHobbies 
                                                Hobbies={this.state.user.detail.hobbies} 
                                                onHobbieEntered={this.onHobbieEntered}
                                                onHobbieRemoved={this.onHobbieRemoved}
                                                onHobbieChanged={this.onHobbieChanged}
                                                currHobbie={this.state.autocompleat}
                                                onHobbieChangedFromSuggest={this.onHobbieChangedFromSuggest}
                                                suggestHobbie={this.suggestHobbie}/>}
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
