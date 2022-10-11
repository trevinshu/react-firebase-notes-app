import React from 'react';
import { Link } from 'react-router-dom';
import { BsSunFill } from 'react-icons/bs';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

function Navbar() {
  const [user] = useAuthState(auth);

  const signOutUser = async () => {
    await signOut(auth);
  };

  return (
    <nav className="flex justify-between items-center p-5">
      {user ? (
        <>
          <Link to={'/'} className="text-xl text-primary-content uppercase tracking-widest">
            Notes App
          </Link>
          <div className="flex items-center gap-3">
            <div className="form-control">
              <label className="label cursor-pointer flex gap-3">
                <span className="label-text text-xl text-primary-content uppercase tracking-widest">
                  <BsSunFill />
                </span>
                <input type="checkbox" className="toggle toggle-secondary" />
              </label>
            </div>
            <button className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase" onClick={signOutUser}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to={'/'} className="text-xl text-primary-content uppercase tracking-widest">
            Notes App
          </Link>
          <div className="form-control">
            <label className="label cursor-pointer flex gap-3">
              <span className="label-text text-xl text-primary-content uppercase tracking-widest">
                <BsSunFill />
              </span>
              <input type="checkbox" className="toggle toggle-secondary" />
            </label>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
