import React from 'react';
import { Link } from 'react-router-dom';
import { BsSunFill } from 'react-icons/bs';

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5">
      <Link to={'/'} className="text-xl text-primary-content uppercase tracking-widest">
        Notes App
      </Link>
      <div className="form-control">
        <label className="label cursor-pointer flex gap-2">
          <span className="label-text text-xl text-primary-content uppercase tracking-widest">
            <BsSunFill />
          </span>
          <input type="checkbox" className="toggle toggle-secondary" />
        </label>
      </div>
    </nav>
  );
}

export default Navbar;
