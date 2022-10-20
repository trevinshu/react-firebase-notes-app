import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Profile = React.lazy(() => import('./pages/Profile'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));
import Navbar from './components/Navbar';
import { AppProvider } from './context/AppContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import Spinner from './components/Spinner';
import { LazyMotion, domAnimation } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <AppProvider>
      <LazyMotion features={domAnimation}>
        <div className="App">
          <header>
            <Navbar />
          </header>
          <main>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname} initial={true}>
                <Route
                  path="*"
                  element={
                    <React.Suspense fallback={<Spinner />}>
                      <ErrorPage />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/"
                  element={
                    <React.Suspense fallback={<Spinner />}>
                      <Home />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <React.Suspense fallback={<Spinner />}>
                      <Login />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <React.Suspense fallback={<Spinner />}>
                      <Register />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <React.Suspense fallback={<Spinner />}>
                      <Profile />
                    </React.Suspense>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>

          <ToastContainer />
        </div>
      </LazyMotion>
    </AppProvider>
  );
}

export default App;
