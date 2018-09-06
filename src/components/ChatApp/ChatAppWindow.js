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
    componentWillMount = () => {
        socket.emit('online',{uid:this.props.uid,name:this.props.user.fname + " " + this.props.user.lname},(err) => {
            if(err){
                console.log('Error: ',err);
            }
        });
    }
    render(){
        return(
            <div className="chat_app">
                <SocketProvider socket={socket}>
                    <UsersOnlineList uid={this.props.uid}/>
                </SocketProvider>
            </div>    
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    uid: state.auth.uid
});


export default connect(mapStateToProps,undefined)(ChatAppWindow);