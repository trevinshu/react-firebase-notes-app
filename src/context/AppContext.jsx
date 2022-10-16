import { createContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Register User
  const registerUserWithEmailAndPassword = async (data) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, { displayName: data.name });
      toast.success('Successfully registered new user.');
      navigate('/');
    } catch (error) {
      console.log(error);
      return toast.error('User already exists.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //Login with Google Account
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success('Login Successful');
      navigate('/');
    } catch (error) {
      console.log(error);
      return toast.error('Login with Google failed. Please try again.');
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  //Login with email and password
  const loginWithEmailAndPassword = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Login Successful');
      navigate('/');
    } catch (error) {
      console.log(error);
      return toast.error('Invalid Email or Password. Please try again.');
    }
  };

  return <AppContext.Provider value={{ loginWithGoogle, registerUserWithEmailAndPassword, loginWithEmailAndPassword, loading, setLoading, user, signOutUser }}>{children}</AppContext.Provider>;
};

export default AppContext;
