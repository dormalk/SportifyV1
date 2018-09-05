import React from 'react';
import { socketConnect } from 'socket.io-react';

export class UsersOnlineList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }
    
    render(){
        this.props.socket.on('updateOnlineList', (users) =>{
            console.log(users);
        })
        return(
            <div>
                {this.state.users.map((user) => {
                    <div>{user.fname} {user.lname}</div>
                })}
            </div>
        )
    }
}



export default socketConnect(UsersOnlineList);