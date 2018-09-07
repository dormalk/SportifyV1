import React from 'react';
import { socketConnect } from 'socket.io-react';

export class ChatUserWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            otruid: this.props.otruid || '',
            myuid: this.props.myuid || '',
            massage: '',
        }
    }

    onChangeMassage = (e) => {
        const massage = e.target.value;
        this.setState({massage});
    }

    onSendMassage = () => {
        if(this.state.massage){
            this.props.socket.emit('sendMassage',{from:this.state.myuid,to:this.state.otruid,body:this.state.massage},(err) => {
                if(err){
                    console.log('Error: ',err);
                }
            });
            this.setState({massage:''});    
        }
    }

    onCloseRequest = () => {

    }
    
    render(){
        return(
            <div>
                <div>
                    <h3></h3>
                    <button onClick={this.onCloseRequest}>X</button>
                </div>
                <div>
                    {this.props.massages && this.props.massages.map((massage) => {
                        return (<div>{massage.body}</div>)
                    })}
                </div>
                <div>
                    <input type="text" value={this.state.massage} onChange={this.onChangeMassage}/>
                    <button onClick={this.onSendMassage}>></button>
                </div>
            </div>
        )
    }
}

export default socketConnect(ChatUserWindow);