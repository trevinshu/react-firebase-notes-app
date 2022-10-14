import { createContext, useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  //Register User
  const registerUserWithEmailAndPassword = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, { displayName: data.name });
      toast.success('Successfully registered new user.');
    } catch (error) {
      console.log(error);
      return toast.error('User already exists.');
    }
  };

  //Login with Google Account
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Login Successful');
    } catch (error) {
      console.log(error);
      return toast.error('Login with Google failed. Please try again.');
    }
  };

  //Login with email and password
  const loginWithEmailAndPassword = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Login Successful');
    } catch (error) {
      console.log(error);
      return toast.error('Invalid Email or Password. Please try again.');
    }
  };

  return <AppContext.Provider value={{ loginWithGoogle, registerUserWithEmailAndPassword, setEmail, setPassword, setName, loginWithEmailAndPassword }}>{children}</AppContext.Provider>;
};

export default AppContext;
