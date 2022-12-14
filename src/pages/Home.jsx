import React, { Suspense, useContext } from 'react';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import PageHeading from '../components/PageHeading';
import AddNote from '../components/AddNote';
const LoginOrSignUp = React.lazy(() => import('../components/LoginOrSignUp'));
const DisplayNotes = React.lazy(() => import('../components/DisplayNotes'));
import Spinner from '../components/Spinner';
const PaginationButtons = React.lazy(() => import('../components/PaginationButtons'));

function Home() {
  const { user } = useContext(AppContext);

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {!user ? (
        <div className="flex justify-center items-center flex-col gap-4 p-5 m-auto">
          <PageHeading>Login or Sign Up</PageHeading>
          <Suspense fallback={<Spinner />}>
            <LoginOrSignUp />
          </Suspense>
        </div>
      ) : (
        <>
          <AddNote />
          <Suspense fallback={<Spinner />}>
            <DisplayNotes />
            <PaginationButtons />
          </Suspense>
        </>
      )}
    </m.div>
  );
}

export default Home;
