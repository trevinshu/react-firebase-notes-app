import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import PageHeading from '../components/PageHeading';

function Home() {
  const { user } = useContext(AppContext);

  return (
    <>
      <m.div className="flex justify-center items-center flex-col gap-4 p-5 m-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {!user ? (
          <>
            <PageHeading>Login or Sign Up:</PageHeading>
            <Link
              className="bg-primary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase mt-2 hover:bg-primary-focus w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              to="/login"
            >
              Login
            </Link>
            <h3 className="text-center text-neutral-content text-xl uppercase tracking-widest">Or</h3>
            <Link
              className="bg-secondary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase hover:bg-secondary-focus w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              to="/register"
            >
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
