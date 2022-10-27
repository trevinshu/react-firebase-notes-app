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
import { addDoc, doc, collection, onSnapshot, orderBy, query, serverTimestamp, where, limit, getDocs, startAfter, limitToLast, endBefore, updateDoc, deleteDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

  const [notes, setNotes] = useState([]);
  const [lastDocs, setLastDocs] = useState(null);
  const [firstDocs, setFirstDocs] = useState(null);

  useEffect(() => {
    if (user) {
      const q = query(collectionRef, where('user', '==', user?.uid), orderBy('time', 'desc'), limit(10));

      const unsubscribe = onSnapshot(q, (documents) => {
        const tempNotes = [];
        documents.forEach((document) => {
          tempNotes.push({
            id: document.id,
            ...document.data(),
          });
        });
        setNotes(tempNotes);
        setLastDocs(documents.docs[documents.docs.length - 1]);
        setFirstDocs(documents.docs[0]);
      });
      return () => unsubscribe();
    } else {
      return;
    }
  }, [user]);

  const fetchMore = async () => {
    const q = query(collectionRef, where('user', '==', user?.uid), orderBy('time', 'desc'), startAfter(lastDocs.data().time), limit(10));

    const documents = await getDocs(q);
    updateState(documents);
  };

  const fetchLess = async () => {
    const q = query(collectionRef, where('user', '==', user?.uid), orderBy('time', 'desc'), endBefore(firstDocs.data().time), limitToLast(10));

    const documents = await getDocs(q);
    updateState(documents);
  };

  const updateState = (documents) => {
    if (!documents.empty) {
      const tempNotes = [];
      documents.forEach((document) => {
        tempNotes.push({
          id: document.id,
          ...document.data(),
        });
      });
      setNotes(tempNotes);
    }
    if (documents?.docs[0]) {
      setFirstDocs(documents.docs[0]);
    } else {
    }
    if (documents?.docs[documents.docs.length - 1]) {
      setLastDocs(documents.docs[documents.docs.length - 1]);
    }
  };

  const [formValues, setFormValues] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function editForm(note) {
    setShowEditModal(true);
    document.body.style.overflow = 'hidden';
    console.log(note);
    setFormValues(note);
  }

  function closeEditModal() {
    setShowEditModal(false);
    setFormValues(null);
    document.body.style.overflow = 'auto';
    console.log('hi');
  }

  const updateNote = async (data) => {
    try {
      await updateDoc(doc(collectionRef, data.id), {
        noteContent: data.noteContent,
        time: serverTimestamp(),
      });
      toast.success('Successfully updated a note');
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const copyNote = (note) => {
    navigator.clipboard.writeText(note?.noteContent);
    toast.success('Noted Copied!');
  };

  const [deleteSelectedNote, setDeleteSelectedNote] = useState([]);

  function initDeleteNoteModal(note) {
    setShowDeleteModal(true);
    document.body.style.overflow = 'hidden';
    setDeleteSelectedNote(note);
  }

  function closeDeleteModal() {
    setShowDeleteModal(false);
    document.body.style.overflow = 'auto';
  }

  const deleteNote = async () => {
    try {
      await deleteDoc(doc(collectionRef, deleteSelectedNote.id));
      toast.success('Note deleted successfully');
      setShowDeleteModal(false);
      document.body.style.overflow = 'auto';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loginWithGoogle,
        registerUserWithEmailAndPassword,
        loginWithEmailAndPassword,
        user,
        signOutUser,
        updateUserName,
        updateUserEmail,
        updateUserPassword,
        addNote,
        fetchMore,
        fetchLess,
        notes,
        showEditModal,
        showDeleteModal,
        editForm,
        updateNote,
        closeEditModal,
        initDeleteNoteModal,
        deleteNote,
        formValues,
        copyNote,
        closeDeleteModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
