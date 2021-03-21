import React from 'react';
import WithRouterSample from './WithRouterSample';

const data = {
    'minseok':{
        name: 'minseok'
    },
    'velopert':{
        name: 'velopert'
    }
}

const Profile = ({match}) => {
    const {username} = match.params;

    const profile = data[username];
    
    if(!profile){
        return <div>해당 유저가 존재하지 않습니다.</div>
    }
    return (
        <div>
            <h3>{profile.name}</h3>
            <WithRouterSample />
        </div>
    );
};

export default Profile;