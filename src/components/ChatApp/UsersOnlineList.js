import React from 'react';
import { socketConnect } from 'socket.io-react';

export class UsersOnlineList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }

    
    hasFoundOnNotReadArray = (otruid) => {
        const notReadArray = this.props.notReadArray;
        for(var i = 0; i < notReadArray.length; i++){
            if(notReadArray[i] === otruid){
                return 'user_new_massage';
            }
        }
        return 'user_online';
    }


    render(){
        this.props.socket.on('updateOnlineList', (users) =>{
            this.setState({users});
        });
        return(
            <div className="chat_user_online_list">
                {this.state.users && 
                    this.state.users.length !== 1?
                    (
                        this.state.users.filter((user) => {
                            return user.uid !== this.props.uid;
                        }).map((user) => {
                            return (
                                <div 
                                    className={this.props.otruid && this.props.otruid === user.uid?'user_online':this.hasFoundOnNotReadArray(user.uid)}
                                    onClick={this.props.onUserClick.bind(this,user.uid)}
                                >{user.name}</div>
                            )
                        })
                    ):(
                        <div className="msg_empty_list">אין משתמשים מחוברים</div>
                    )
                }
            </div>
        )
    }
}



export default socketConnect(UsersOnlineList);