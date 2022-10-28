import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { CgProfile } from 'react-icons/cg';

function Navbar() {
  const { user } = useContext(AppContext);

  return (
    <nav className="flex justify-between items-center p-5">
      <Link to={'/'} className="text-2xl uppercase tracking-widest">
        Notes App
      </Link>
      {user ? (
        <Link to={'/profile'} className="text-3xl ">
          <CgProfile />
        </Link>
      ) : (
        ''
      )}
    </nav>
  );
}

export default Navbar;
