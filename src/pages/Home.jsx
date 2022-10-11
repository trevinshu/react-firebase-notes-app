import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsGoogle } from 'react-icons/bs';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Home() {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col gap-4 p-5 m-auto">
      {user ? (
        <div className="flex justify-center items-center gap-3">
          <img src={user?.photoURL} alt="Profile Picture of The Signed In User" className="rounded-full h-10" />
          <h2 className="text-2xl text-primary-content text-center tracking-widest">Welcome {user?.displayName}!</h2>
        </div>
      ) : (
        <>
          <h2 className="text-2xl text-primary-content text-center uppercase tracking-widest">Login:</h2>
          <input type="email" name="email" id="emailInput" placeholder="Email" className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest" />
          <input type="password" name="password" id="passwordInput" placeholder="Password" className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest " />
          <button type="submit" className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase">
            Login
          </button>
          <button
            type="submit"
            className="bg-secondary text-primary-content text-center flex items-center justify-center gap-3 border-none p-2 rounded-sm tracking-widest uppercase"
            onClick={signInWithGoogle}
          >
            <BsGoogle className="text-xl" />
            Login With Google
          </button>
          <h2 className="text-center text-neutral-content text-xl uppercase tracking-widest py-1">Or</h2>
          <Link className="bg-accent text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase" to="/register">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
