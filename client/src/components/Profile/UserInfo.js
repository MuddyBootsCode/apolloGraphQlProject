import React from 'react';
import { Link } from "react-router-dom";

const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-US');
    const newTime = new Date(date).toLocaleTimeString('en-US');
    return `${newDate} at ${newTime}`;
}

const UserInfo = ({ session }) => {

    const { getCurrentUser: { email, username, joinDate, favorites }  } = session;

    return (
        <div className="App">
            <h3>User Info</h3>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Join Date: {formatDate(joinDate)}</p>
            <ul>
                <h3>{username}'s Favorites</h3>
                {favorites.map(favorite => (
                    <li key={favorite._id}>
                        <Link to={`/recipes/${favorite._id}`}><p>{favorite.name}</p></Link>
                    </li>
                ))}
                {!favorites.length && <p>You don't have any favorite recipes <u>yet</u>. <strong>Add Some!</strong></p>}
            </ul>
        </div>
    );
};

export default UserInfo;
