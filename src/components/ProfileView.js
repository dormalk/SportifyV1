import React from 'react';
import { connect } from 'react-redux';
import { YourHobbies,YourAge,YourMoto } from './LetMeKnowYouMorePage';
import {isPartOfHobbie,isHobbie,fields} from '../selectors/HobbiesSuggestion'; 
import { startEditUser, } from '../actions/user';


export class ProfileView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user || '',
            editMode: false,
            autocompleat: ''
        }
    }

    onRequestEditModePress = () => {
        if(this.state.editMode) 
            this.props.startEditUser(this.state.user);

        const editMode = !this.state.editMode
        this.setState({editMode})
    }

    onFnameChange = (e) => {
        const fname = e.target.value;
        this.setState(() => ( { user: { ...this.state.user, fname } } ));
    }

    onLnameChange = (e) => {
        const lname = e.target.value;
        this.setState(() => ( { user: { ...this.state.user, lname } } ));
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
        return (
            this.state.editMode? (
                <div>
                    <h1>
                        <input type="text" value={this.state.user.fname} onChange={this.onFnameChange}/>
                        <input type="text" value={this.state.user.lname} onChange={this.onLnameChange}/>
                    </h1>
                    <button onClick={this.onRequestEditModePress}>סיום עריכה</button>
                    <img src={this.state.user.profile}/>
                    <YourAge hendelAgeChange={this.hendelAgeChange}/>
                    <div>עיסוקי ספורט</div>
                    <YourHobbies 
                        Hobbies={this.state.user.detail.hobbies} 
                        onHobbieEntered={this.onHobbieEntered}
                        onHobbieRemoved={this.onHobbieRemoved}
                        onHobbieChanged={this.onHobbieChanged}
                        currHobbie={this.state.autocompleat}
                        onHobbieChangedFromSuggest={this.onHobbieChangedFromSuggest}
                        suggestHobbie={this.suggestHobbie}/>
                        <YourMoto 
                            val={this.state.user.detail.moto}
                            onChangeMoto={this.onChangeMoto}/>
                </div>
            ):(
                <div>
                    <h1>{this.state.user.fname}  {this.state.user.lname}</h1>
                    <button onClick={this.onRequestEditModePress}>עריכת פרופיל</button>
                    <img src={this.state.user.profile}/>
                    <div>גיל: {this.state.user.detail.age}</div>
                    <div>עיסוקי ספורט</div>
                    {this.state.user.detail.hobbies.map((hobbie,i) => (
                        <div key={i}>{hobbie}</div>
                    ))}
                    <span>מוטו: {this.state.user.detail.moto}</span>
                </div>
            )
        )
    }
}


const mapPropsToDispatch = (dispatch) => ({
    startEditUser: (update) => dispatch(startEditUser(update))
});


const mapStateToProps = (state, props) => ({
    user: state.user,
});


export default connect(mapStateToProps,mapPropsToDispatch)(ProfileView);