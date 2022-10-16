import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';

function Home() {
  const { user } = useContext(AppContext);

  return (
    <>
      <m.div className="flex justify-center items-center flex-col gap-4 p-5 m-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {!user ? (
          <>
            <h2 className="text-2xl text-primary-content text-center uppercase tracking-widest mb-2">Login or Sign Up:</h2>
            <Link className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2 lg:w-1/4" to="/login">
              Login
            </Link>
            <h3 className="text-center text-neutral-content text-xl uppercase tracking-widest">Or</h3>
            <Link className="bg-secondary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2 lg:w-1/4" to="/register">
              Sign Up
            </Link>
          </>
        ) : (
          <></>
        )}
      </m.div>
    </>
  );
}

export default Home;
