import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex justify-center items-center flex-col gap-4 p-5 m-auto">
      {/* <h2 className="text-2xl text-primary-content text-center tracking-widest">Welcome {user?.displayName}!</h2> */}
      <h2 className="text-2xl text-primary-content text-center uppercase tracking-widest mb-2">Login or Sign Up:</h2>
      <Link className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2" to="/login">
        Login
      </Link>
      <h3 className="text-center text-neutral-content text-xl uppercase tracking-widest">Or</h3>
      <Link className="bg-secondary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2" to="/register">
        Sign Up
      </Link>
    </div>
  );
}

export default Home;
