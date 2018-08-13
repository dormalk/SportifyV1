//Test
import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

const YourHobbies = () => (
    <div>
        <h2>מה התחביבים שלך?</h2>
    </div>
)

export class LetMeKnowYouMorePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name || '',
            sex: '',
            age:''
        }

    }

    hendelSexChange = (e) => {
        const sex = e.target.value;
        this.setState({sex});
    }

    hendelAgeChange = (e) => {
        const age = e.target.value;
        this.setState({age});
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
                    {this.state.age && <YourHobbies/>}
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
