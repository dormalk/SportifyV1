import React from 'react';
import {NavLink } from 'react-router-dom';
export default (props) => (
    <div>
        {props.users && props.users.map((user,i) => {
            return(<NavLink to={`users/${user.uid}`} key={i}>{user.fname} {user.lname}</NavLink >)
        })}
    </div>
)