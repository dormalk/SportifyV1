import React from 'react';
import ProfileView from './ProfileView'
import Footer from './Footer'
import ChatAppWindow from './ChatApp/ChatAppWindow';

export default () => (
    <div className="main_screen">
        <div className="middle">
            <ProfileView/>
            <ChatAppWindow/>
        </div>
        <Footer/>
    </div>
);

