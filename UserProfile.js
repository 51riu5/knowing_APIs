import React from 'react';

const UserProfile = ({ userData }) => {
  return (
    <div className="UserProfile">
      <img src={userData.avatar_url} alt={userData.login} />
      <h2>{userData.name}</h2>
      <p>{userData.bio}</p>
      <a href={userData.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
    </div>
  );
};

export default UserProfile;
