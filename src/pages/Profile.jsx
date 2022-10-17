import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import UpdateName from '../components/UpdateName';
import UpdatePassword from '../components/UpdatePassword';
import UpdateEmail from '../components/UpdateEmail';

function Profile() {
  const { signOutUser, user } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  console.log(user);
  return (
    <m.div className="p-5 md:flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <UpdateName />
      <UpdateEmail />
      <UpdatePassword />
      <h2 className="text-xl text-primary-content pb-5">Logout?</h2>
      <button className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase" onClick={signOutUser}>
        Logout
      </button>
      {user?.providerData[0]?.providerId === 'password' ? <h2>Hello</h2> : <></>}
    </m.div>
  );
}

export default Profile;
