import React from 'react';
import  { NavLink } from 'react-router-dom';
export default (props) => {
    return props.users.length>0?
    (
        <div className="account_searcher___user-list">
            {props.users.map((user,i) => {
                return(<NavLink to={`users/${user.uid}`} key={i}>{user.fname} {user.lname}</NavLink>)
            })}
        </div>
    )
    :
    (
        <div></div>
    )
}