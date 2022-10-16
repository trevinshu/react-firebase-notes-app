import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { signOutUser, user } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <m.div className="p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase" onClick={signOutUser}>
        Logout
      </button>
    </m.div>
  );
}

export default Profile;
