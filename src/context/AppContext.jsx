import { createContext } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { updateProfile } from 'firebase/auth';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  //Register User
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const registerUser = async (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;

    try {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile(auth.currentUser, { displayName: name });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AppContext.Provider
      value={{
        user,
        error,
        loading,
        registerUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
