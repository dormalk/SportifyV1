import React from 'react';
import UserProfileView from './UserProfileView';
import { fatchUserById } from '../../selectors/UsersFiltering';
import Footer from '../Footer';
import ChatAppWindow from '../ChatApp/ChatAppWindow';
import ChatAppWindowMobile from '../ChatApp/ChatAppWindowMobile';
import MobileMenu from '../MobileMenu';



export default class UserView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            MobileChat: false
        }
    }

    componentDidMount = () => {
        fatchUserById(this.props.match.params.id).then((user) => {
            this.setState({user});
        })
    }

    onOpenChat = () => {
        const MobileChat = !this.state.MobileChat;
        this.setState({MobileChat});
    }
    
    render(){
        return(
            <div className="main_screen">
                <div className="middle">
                    {this.state.user && 
                    <UserProfileView user={this.state.user} uid={this.props.match.params.id}/>}
                    <ChatAppWindow/>
                    {this.state.MobileChat && <ChatAppWindowMobile/>}
                </div>
                <MobileMenu
                    onOpenChat={this.onOpenChat}
                />
                <Footer/>
            </div>
        )
    }
}
