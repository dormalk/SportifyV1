import React from 'react';
import { NavLink } from 'react-router-dom';


export const MobileMenu = () => (
    <div className="mobile_menu">
        <NavLink to={"/user/${}"}>פרופיל משתמש</NavLink>
        <button>התנתק</button>
    </div>
)


