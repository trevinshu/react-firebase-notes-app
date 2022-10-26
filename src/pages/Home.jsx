import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import PageHeading from '../components/PageHeading';
import AddNote from '../components/AddNote';
const LoginOrSignUp = React.lazy(() => import('../components/LoginOrSignUp'));
const DisplayNotes = React.lazy(() => import('../components/DisplayNotes'));
import Spinner from '../components/Spinner';

function Home() {
  const { user, fetchMore, fetchLess } = useContext(AppContext);

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
          <React.Suspense fallback={<Spinner />}>
            <DisplayNotes />
          </React.Suspense>
          <div className="flex justify-center items-center gap-5 p-5">
            <button onClick={fetchLess} className="text-2xl bg-base-200 px-5 py-2 rounded-sm">
              Previous
            </button>
            <button onClick={fetchMore} className="text-2xl bg-base-200 px-5 py-2 rounded-sm">
              Next
            </button>
          </div>
        </div>
      )}
    </m.div>
  );
}

export default Home;
