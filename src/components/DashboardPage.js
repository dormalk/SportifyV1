import React from 'react';
import ProfileView from './ProfileView'
import Footer from './Footer'
import ChatAppWindow from './ChatApp/ChatAppWindow';
import MobileMenu from './MobileMenu';
import ChatAppWindowMobile from './ChatApp/ChatAppWindowMobile';
import {isMobile} from "react-device-detect";


export default class DashboardPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            MobileChat: false
        }
    }

    onOpenChat = () => {
        const MobileChat = !this.state.MobileChat;
        this.setState({MobileChat});
    }
    render(){
        return(
            <div className="main_screen">
                <div className="middle">
                    <ProfileView/>
                    {!isMobile && <ChatAppWindow/>}
                    {isMobile && this.state.MobileChat && <ChatAppWindowMobile/>}
                </div>
                <MobileMenu
                    onOpenChat={this.onOpenChat}
                />
                <Footer/>
            </div>
        )
    }
}

