import React from 'react';

export default class UsersOnlineList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }
    onAddUser = (user) => {
        console.log(user);
    }

    render(){
        this.props.socket.on('addUser',user => this.onAddUser(user));
        return(
            <div>
                {this.state.users.map((user) => {
                    <div>{user.fname} {user.lname}</div>
                })}
            </div>
        )
    }
}
