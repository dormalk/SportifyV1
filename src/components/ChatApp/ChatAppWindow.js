import React from 'react';
import { connect } from 'react-redux';
import UsersOnlineList from './UsersOnlineList';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(process.env.SOCKET_URL);



export class ChatAppWindow extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        socket.emit('online',{uid:this.props.uid,name:this.props.user.fname + " " + this.props.user.lname},(err) => {

        });
        return(
            <SocketProvider socket={socket}>
                <UsersOnlineList/>
            </SocketProvider>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    uid: state.auth.uid
});


export default connect(mapStateToProps,undefined)(ChatAppWindow);