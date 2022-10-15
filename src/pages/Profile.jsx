import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Profile() {
  const { signOutUser } = useContext(AppContext);
  return (
    <div className="p-5">
      <button className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase" onClick={signOutUser}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
