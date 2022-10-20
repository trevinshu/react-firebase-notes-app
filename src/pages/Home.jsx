import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import PageHeading from '../components/PageHeading';
import AddNote from '../components/AddNote';
const LoginOrSignUp = React.lazy(() => import('../components/LoginOrSignUp'));
import DisplayNotes from '../components/DisplayNotes';
import Spinner from '../components/Spinner';

function Home() {
  const { user } = useContext(AppContext);

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {!user ? (
        <div className="flex justify-center items-center flex-col gap-4 p-5 m-auto">
          <PageHeading>Login or Sign Up</PageHeading>
          <React.Suspense fallback={<Spinner />}>
            <LoginOrSignUp />
          </React.Suspense>
        </div>
      ) : (
        <div>
          <AddNote />
          <DisplayNotes />
        </div>
      )}
    </m.div>
  );
}

export default Home;
