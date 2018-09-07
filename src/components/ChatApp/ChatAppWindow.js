import React from 'react';
import { connect } from 'react-redux';
import UsersOnlineList from './UsersOnlineList';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import ChatUserWindow from './ChatUserWindow';
const socket = io.connect(process.env.SOCKET_URL);



export class ChatAppWindow extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            otruid: '',
            filterdMsg: [],
            massages: []
        }
    }
    componentWillMount = () => {
        socket.emit('online',{uid:this.props.uid,name:this.props.user.fname + " " + this.props.user.lname},(err) => {
            if(err){
                console.log('Error: ',err);
            }
        });
    }

    onUserClick = (otruid) => {
        this.filteringMassages(otruid);
        this.setState({otruid});
    }
    
    filteringMassages = (otruid) => {
        const filterdMsg = this.state.massages.filter((massage) => { return  massage.from === otruid || massage.to === otruid});
        this.setState({filterdMsg});
        this.forceUpdate();
    }

    render(){
        socket.on('getMassage',(massage) => {
            var massages = this.state.massages;
            if(massages.length === 0){
                massages.push(massage);
                this.setState({massages});
            }
            else if(massages[massages.length-1].msgId !== massage.msgId){
                massages.push(massage);
                this.setState({massages});
            }
            this.filteringMassages(massage.from);
        });
        return(
            <div className="chat_app">
                {this.state.otruid &&
                    <SocketProvider socket={socket}>
                        <ChatUserWindow
                            otruid={this.state.otruid}
                            myuid={this.props.uid}
                            massages={this.state.filterdMsg}
                        />
                    </SocketProvider>
                }
                <SocketProvider socket={socket}>
                    <UsersOnlineList 
                        uid={this.props.uid}
                        onUserClick={this.onUserClick}
                    />
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