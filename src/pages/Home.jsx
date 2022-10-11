import React from 'react';
import { Link } from 'react-router-dom';
import { BsGoogle } from 'react-icons/bs';

function Home() {
  return (
    <div className="flex justify-center flex-col gap-4 p-5 m-auto">
      <input type="email" name="email" id="emailInput" placeholder="Email" className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest" />
      <input type="password" name="password" id="passwordInput" placeholder="Password" className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest " />
      <button type="submit" className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase">
        Login
      </button>
      <button type="submit" className="bg-accent text-primary-content text-center flex items-center justify-center gap-3 border-none p-2 rounded-sm tracking-widest uppercase">
        <BsGoogle className="text-xl" />
        Login With Google
      </button>
      <h2 className="text-center text-neutral-content text-xl uppercase tracking-widest py-1">Or</h2>
      <Link className="bg-secondary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase" to="/register">
        Sign Up
      </Link>
    </div>
  );
}

export default Home;
