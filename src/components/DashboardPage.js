import React from 'react';
import ProfileView from './ProfileView'
import Footer from './Footer'

export default () => (
    <div className="main_screen">
        <div className="middle">
            <ProfileView/>
        </div>
        <Footer/>
    </div>
);

