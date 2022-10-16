import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Navbar = React.lazy(() => import('./components/Navbar'));
import { AppProvider } from './context/AppContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import Spinner from './components/Spinner';

function App() {
  const location = useLocation();
  return (
    <AppProvider>
      <div className="App">
        <React.Suspense fallback={<Spinner />}>
          <Navbar />
        </React.Suspense>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname} initial={true}>
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
        <ToastContainer />
      </div>
    </AppProvider>
  );
}

export default App;
