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
            massages: [],
            notReadArray: []
        }
    }
    componentWillMount = () => {
        const userOnline = {
            uid:this.props.uid,
            name:this.props.user.fname + " " + this.props.user.lname
        }

        socket.emit('online',userOnline,(err) => {
            if(err){
                console.log('Error: ',err);
            }
        });

        try{            
            const massages = JSON.parse(localStorage.getItem('massages'));
            if(massages){
                this.setState({massages});
            }
            
            const notReadArray = JSON.parse(localStorage.getItem('notread'));
            if(notReadArray){
                this.setState({notReadArray});
            }    

        }
        catch(err){
            console.log(err);
        }
    }

    onUserClick = (otruid) => {
        this.removeFromNotReadArray(otruid);
        this.onRequestClose();
        this.filteringMassages(otruid);
        this.setState({otruid});
        this.forceUpdate();
    }
    
    onRequestClose = () => {
        this.setState({otruid: ''});
    }

    filteringMassages = (otruid) => {
        //filtering massages array to view only chat eith spesific ID
        const filterdMsg = this.state.massages.filter((massage) => { return  massage.from === otruid || massage.to === otruid});
        this.setState({filterdMsg});
        this.forceUpdate();
    }
    
    addMassageToArray = (massage,filterParam) => {
        var massages = this.state.massages;
        
        if(massages.length === 0){      //check if it's first massage in array
            massages.push(massage);
            this.setState({massages});
        }
        else if(!massages[massages.length-1].msgId){        //check if the massage belong to me
            massages.push(massage);
            this.setState({massages});
        }
        else if(massages[massages.length-1].msgId !== massage.msgId){       //check if the massage already recived
            massages.push(massage);
            this.setState({massages});
        }
        //parse massage to JSON and push it to localStorage
        const json = JSON.stringify(massages);
        localStorage.setItem('massages',json);

        this.filteringMassages(filterParam);
    }
    
    hasFoundOnNotReadArray = (otruid) => {
        const notReadArray = this.state.notReadArray;
        for(var i = 0; i < notReadArray.length; i++){
            if(notReadArray[i] === otruid){
                return true;
            }
        }
        return false;
    }

    pushToNotReadArray = (otruid) => {
        const notReadArray = this.state.notReadArray;
        if(!this.hasFoundOnNotReadArray(otruid)){
            notReadArray.push(otruid);
            this.setState({notReadArray});

            const json = JSON.stringify(notReadArray);
            localStorage.setItem('notread',json);
    
        }
    }

    removeFromNotReadArray = (otruid) => {
        const notReadArray = this.state.notReadArray.filter((id) => {return id !== otruid});
        this.setState({notReadArray});  
        
        const json = JSON.stringify(notReadArray);
        localStorage.setItem('notread',json);

    }

    render(){
        socket.on('getMassage',(massage) => {
            this.addMassageToArray(massage,massage.from);
            if(massage.from !== this.state.otruid){
                this.pushToNotReadArray(massage.from);
            }
        });

        return(
            <div className="chat_app show-for-mobile">
                {this.state.otruid &&
                    <SocketProvider socket={socket}>
                        <ChatUserWindow
                            otruid={this.state.otruid}
                            myuid={this.props.uid}
                            massages={this.state.filterdMsg}
                            onRequestClose={this.onRequestClose}
                            addMassageToArray={this.addMassageToArray}
                        />
                    </SocketProvider>
                }
                <SocketProvider socket={socket}>
                    <UsersOnlineList 
                        uid={this.props.uid}
                        onUserClick={this.onUserClick}
                        otruid={this.state.otruid}
                        notReadArray={this.state.notReadArray}
                        follows={this.props.user.follows}
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