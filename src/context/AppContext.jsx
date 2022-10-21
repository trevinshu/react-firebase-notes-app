import { createContext, useEffect, useState } from 'react';
import { auth, googleProvider, db } from '../config/firebase';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where, limit } from 'firebase/firestore';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //Register User
  const registerUserWithEmailAndPassword = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, { displayName: data.name });
      toast.success('Successfully registered new user.');
      navigate('/');
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
      navigate('/');
    } catch (error) {
      console.log(error);
      return toast.error('Login with Google failed. Please try again.');
    }
  };

  //Update User's Name
  const updateUserName = async (data) => {
    try {
      await updateProfile(auth.currentUser, { displayName: data.name });
      toast.success('Successfully updated your name.');
    } catch (error) {
      console.log(error);
      return toast.error('Update name failed. Please try again.');
    }
  };

  //Update User's Password
  const updateUserPassword = async (data) => {
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, data.currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, data.newPassword);
      toast.success('Successfully updated your password.');
    } catch (error) {
      console.log(error);
      return toast.error('Update password failed. Please try again.');
    }
  };

  //Update User's Email Address
  const updateUserEmail = async (data) => {
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, data.password);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updateEmail(auth.currentUser, data.email);
      toast.success('Successfully updated your email.');
    } catch (error) {
      console.log(error);
      return toast.error('Update email failed. Please try again.');
    }
  };

  //Logout user
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  //Login with email and password
  const loginWithEmailAndPassword = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Login Successful');
      navigate('/');
    } catch (error) {
      console.log(error);
      return toast.error('Invalid Email or Password. Please try again.');
    }
  };

  //Add Post
  const collectionRef = collection(db, 'notes');
  const addNote = async (data) => {
    try {
      await addDoc(collectionRef, {
        noteContent: data.noteContent,
        time: serverTimestamp(),
        user: user.uid,
      });
      toast.success('Successfully added a note');
    } catch (error) {
      console.log(error);
    }
  };

  const [notes, setAllNotes] = useState([]);
  //Get Posts
  const getPosts = async (userId) => {
    try {
      if (user) {
        const q = query(collectionRef, where('user', '==', userId), orderBy('time', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setAllNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts(user?.uid);
  }, [user?.uid]);

  return (
    <AppContext.Provider
      value={{ loginWithGoogle, registerUserWithEmailAndPassword, loginWithEmailAndPassword, user, signOutUser, updateUserName, updateUserEmail, updateUserPassword, addNote, notes }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
