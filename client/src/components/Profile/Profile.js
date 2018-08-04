import React from 'react';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';

const Profile = ({ session }) => {

    const {getCurrentUser: {username}} = session;

    return (
        <div className="App">
            <UserInfo session={session}/>
            <UserRecipes username={username}/>
        </div>
    )
};

export default Profile;