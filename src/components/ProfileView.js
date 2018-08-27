//Test
import React from 'react';
import { connect } from 'react-redux';
import { YourHobbies,YourAge,YourMoto } from './LetMeKnowYouMorePage';
import {isHobbie,fields} from '../selectors/HobbiesSuggestion'; 
import { startEditUser, } from '../actions/user';
import { startUploadImage } from '../actions/storage';

export class ProfileView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user || '',
            editMode: false,
            margeFullName: '',
            autocompleat: '',
            error: ''
        }
    }

    componentDidMount = () => {
        const margeFullName = this.props.user.fname + " " + this.props.user.lname; 
        this.setState(() => ({margeFullName}));
    }

    onRequestEditModePress = () => {
        if(this.state.editMode) 
            this.props.startEditUser(this.state.user);

        const editMode = !this.state.editMode;
        this.setState(() => ( { editMode } ));
    }

    onNameChange = (e) => {
        const margeFullName = e.target.value;
        const splitFullName = margeFullName.split(' ');
        const fname = splitFullName[0] || '';
        const lname = splitFullName[1] || '';
        this.setState(() => ( { user: { ...this.state.user,fname,lname  }, margeFullName } ));
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


    onProfileChange = (e) => {
        const picture = e.target.files[0];
        if(picture.type !== 'image/jpeg' && picture.type !== 'image/jpg' && picture.type !== 'image/png'){
            this.setState({error:'נא בחר קובץ תמונה (jpg,jpeg,png)'});
        }
        else if(picture.size > 585750){
            this.setState({error:'נא בחר קובץ תמונה פחות מ 585,750 בית'});
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
            this.state.editMode? (
                <div className="profile_view___edit">
                    {this.state.error && <div className="error"></div>}
                    <button className="deshboard__button_edit" onClick={this.onRequestEditModePress}>סיום עריכה</button>
                    <h1>
                        <input type="text" value={this.state.margeFullName} onChange={this.onNameChange}/>
                    </h1>
                    
                    <div className="img_wrapper">
                        <div className="costume___input_file">החלף</div>
                        <img src={this.state.user.profile}/>    
                        <input type="file" onChange={this.onProfileChange}/>
                    </div>
                    <div className="profile_view__your-age">
                        <span className="profile_view__label">גיל</span>
                        <YourAge 
                            hendelAgeChange={this.hendelAgeChange}
                            innerValue={this.state.user.detail.age} 
                        />
                    </div>
                    <div className="profile_view__your-hobbies">
                        <span className="profile_view__label">עיסוקי ספורט</span>
                        <YourHobbies 
                            Hobbies={this.state.user.detail.hobbies} 
                            onHobbieEntered={this.onHobbieEntered}
                            onHobbieRemoved={this.onHobbieRemoved}
                            onHobbieChanged={this.onHobbieChanged}
                            currHobbie={this.state.autocompleat}
                            onHobbieChangedFromSuggest={this.onHobbieChangedFromSuggest}
                            suggestHobbie={this.suggestHobbie}
                            mainClassName="your__hobbies__dash"/>                    
                    </div>
                    <div className="profile_view__your-moto">
                        <span className="profile_view__label___block">טיפ לחיים</span>
                        <YourMoto 
                            val={this.state.user.detail.moto}
                            onChangeMoto={this.onChangeMoto}/>
                    </div>
                </div>
            ):(
                <div className="profile_view___non-edit">
                    <button className="deshboard__button_edit" onClick={this.onRequestEditModePress}>עריכת פרופיל</button>
                    <h1>{this.state.margeFullName}</h1>
                    <div className="img_wrapper"><img src={this.state.user.profile}/></div>
                    <div className="profile_view__your-age">
                        <span className="profile_view__label">גיל</span>
                        <span>{this.state.user.detail.age}</span>
                    </div>
                    <div className="profile_view__your-hobbies">
                        <span className="profile_view__label___block">עיסוקי ספורט</span>
                        {this.state.user.detail.hobbies.map((hobbie,i) => { 
                            return i < this.state.user.detail.hobbies.length-1? (<div className="hobbie" key={i}>{hobbie},</div>):(<div className="hobbie" key={i}>{hobbie}</div>)
                        })}
                    </div>
                    <div className="profile_view__your-moto">
                        <span className="profile_view__label___block">טיפ לחיים</span>                   
                        <span>{this.state.user.detail.moto}</span>
                    </div>
                </div>
            )
        )
    }
}


const mapPropsToDispatch = (dispatch) => ({
    startUploadImage: (picture) => dispatch(startUploadImage(picture)),
    startEditUser: (update) => dispatch(startEditUser(update))
});


const mapStateToProps = (state, props) => ({
    user: state.user,
});


export default connect(mapStateToProps,mapPropsToDispatch)(ProfileView);