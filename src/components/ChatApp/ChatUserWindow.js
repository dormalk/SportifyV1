import React from 'react';
import { socketConnect } from 'socket.io-react';

export class ChatUserWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            massage: '',
        }
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    onChangeMassage = (e) => {
        const massage = e.target.value;
        this.setState({massage});
    }

    onSendMassage = (e) => {
        e.preventDefault();
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
            <div className="chatwin">
                <div className="align_bottom">
                    <div className="chat_header">
                        <button onClick={this.props.onRequestClose.bind(this)}>X</button>
                        <h3>חלון שיחה</h3>
                    </div>
                    <div className="chat_massage">
                        {this.props.massages && this.props.massages.map((massage,key) => {
                            if(key > this.props.massages.length - 50)
                                return (
                                    <div ref={el => { this.el = el }}>
                                        {massage.from === this.props.myuid?
                                            <div className="me">{ massage.body }</div> :
                                            <div className="other">{ massage.body }</div>
                                        }
                                    </div>
                                )
                        })}
                    </div>
                    <div className="chat_footer">
                        <form onSubmit={this.onSendMassage}>
                            <input type="text" value={this.state.massage} onChange={this.onChangeMassage} autoFocus/>
                            <input type="submit" value="<"/>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

export default socketConnect(ChatUserWindow);