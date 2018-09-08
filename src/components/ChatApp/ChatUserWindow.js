import React from 'react';
import { socketConnect } from 'socket.io-react';

export class ChatUserWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            massage: '',
        }
    }

    onChangeMassage = (e) => {
        const massage = e.target.value;
        this.setState({massage});
    }

    onSendMassage = () => {
        if(this.state.massage){
            const massage = {
                from: this.props.myuid,
                to: this.props.otruid,
                body: this.state.massage
            }

            this.props.socket.emit('sendMassage',massage,(err) => {
                if(err){
                    console.log('Error: ',err);
                }
            });
            this.setState({massage:''});
            this.props.addMassageToArray(massage,massage.to);
        }
    }

    
    render(){
        return(
            <div>
                <div>
                    <h3></h3>
                    <button onClick={this.props.onRequestClose.bind(this)}>X</button>
                </div>
                <div>
                    {this.props.massages && this.props.massages.map((massage) => {
                        return (
                            <div className="chatwin">
                                {massage.from === this.props.myuid?
                                    <div className="me">{ massage.body }</div> :
                                    <div className="other">{ massage.body }</div>
                                }
                            </div>
                        )
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