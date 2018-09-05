import React from 'react';
import ProfileView from './ProfileView'
import Footer from './Footer'
import ChatAppWindow from './ChatApp/ChatAppWindow';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(process.env.SOCKET_URL);

export default () => (
    <div className="main_screen">
        <div className="middle">
            <ProfileView/>
            <SocketProvider socket={socket}>
                <ChatAppWindow/>
            </SocketProvider>
        </div>
        <Footer/>
    </div>
);

