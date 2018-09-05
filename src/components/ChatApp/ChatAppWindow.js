import React from 'react';
import { socketConnect } from 'socket.io-react';
import UsersOnlineList from './UsersOnlineList';

export class ChatAppWindow extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <UsersOnlineList socket={this.props.socket}/>
            </div>
        )
    }
}

export default socketConnect(ChatAppWindow);