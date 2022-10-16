import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <AppProvider>
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
    </AppProvider>
  );
}

export default App;
