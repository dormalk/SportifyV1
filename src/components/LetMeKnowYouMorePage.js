//Test
import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {isPartOfHobbie,isHobbie,fields} from '../selectors/HobbiesSuggestion'; 


const YourSex = ({hendelSexChange}) => (
    <div>
        <h2>מהו מינך?</h2>
        <form>
            <label>
                זכר
                <input 
                    onChange={hendelSexChange}
                    type='radio'
                    name='sex'
                    value='זכר'/>
            </label>
            <label>
                נקבה
                <input
                    onChange={hendelSexChange} 
                    type='radio' 
                    name='sex'
                    value='נקבה'/>
            </label>
            <label>
                לא מעוניין למסור
                <input 
                    onChange={hendelSexChange}
                    type='radio'
                    name='sex' 
                    value='ללא'/>
            </label>
        </form>
    </div>
);

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
            detail: {
                name: this.props.name || '',
                sex: '',
                age:'',
                hobbies: []    
            },
            autocompleat:''
        }
        this.isStateHobbie = this.isStateHobbie.bind(this);
    }

    hendelSexChange = (e) => {
        const sex = e.target.value;
        this.setState({detail:{sex}});
    }

    hendelAgeChange = (e) => {
        const age = e.target.value;
        this.setState({detail:{age}});
    }

    isStateHobbie = (value) => {
        var _isHobbie = true;
        const _fields = this.state.detail.hobbies;
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
                const hobbies = this.state.detail.hobbies;
                hobbies.push(hobbie);    
                this.setState({detail:{hobbies}});
                this.setState({autocompleat})    
            }
        }
    }

    onHobbieRemoved = (hobbie) => {
        var hobbies = this.state.detail.hobbies.filter((h) => {return h !== hobbie;});
        this.setState({detail:{hobbies}});
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
        const hobbies = this.state.detail.hobbies;
        hobbies.push(hobbie);
        const autocompleat = '';
        this.setState({detail:{hobbies}});
        this.setState({autocompleat});
    }

    render(){
        return(
            <div className="content-container">
                <div>
                    {this.props.name && <h1>היי  {this.props.name}, אני רוצה להכיר אותך יותר!</h1>}
                    <ReactCSSTransitionGroup
                        transitionName="exm"
                        transitionAppear={false}
                        transitionEnterTimeout={500}
                        transitionEnter={true}
                        transitionLeave={false}>
                    <div>{this.props.name &&
                        <YourSex
                            hendelSexChange={this.hendelSexChange}
                        />}
                    </div>
                    {this.state.sex && <YourAge hendelAgeChange={this.hendelAgeChange}/>}
                    {<YourHobbies 
                                            Hobbies={this.state.detail.hobbies} 
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
    name: state.user.fname
});

export default connect(mapStateToProps,undefined)(LetMeKnowYouMorePage);
