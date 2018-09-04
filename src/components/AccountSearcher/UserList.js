import React from 'react';
import  { Link } from 'react-router-dom';
export default (props) => {
    return props.users.length>0?
    (
        <div className="account_searcher___user-list">
            {props.users.map((user,i) => 
                (<Link to={`/users/${user.uid}`} key={i}>{user.fname} {user.lname}</Link>)
            )}
        </div>
    )
    :
    (
        <div></div>
    )
}