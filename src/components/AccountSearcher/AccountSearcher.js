import React from 'react';
import { connect } from 'react-redux';
import { fatchUserByName } from '../../selectors/UsersFiltering';
import UserList from './UserList';

export default class AccountSearcher extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            inputval: ''
        }
    }

    onFilterChange = (e) => {
        const inputval = e.target.value;
        this.setState({inputval});
        var users = [];
        if(inputval){
            users = fatchUserByName(inputval);
        }
        this.setState({users});    
    }
    render(){
        return(
            <div className="account_searcher">
                <input className="account_searcher___input" value={this.state.inputval} onChange={this.onFilterChange}/>
                <UserList users={this.state.users}/>
            </div>
        )
    }
}
