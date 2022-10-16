import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import AppContext, { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import { useContext, useEffect, useState } from 'react';
import Spinner from './components/Spinner';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AppProvider>
      {loading ? (
        <Spinner />
      ) : (
        <div className="App">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname} initial={true}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AnimatePresence>
          <ToastContainer />
        </div>
      )}
    </AppProvider>
  );
}

export default App;
