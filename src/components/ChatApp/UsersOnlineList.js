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
                                    className={user.status}
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