import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Home from './Home';
import AppContext from '../context/AppContext';

function Register() {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').min(6),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user, error, loading, registerUser } = useContext(AppContext);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="text-2xl text-primary-content text-center uppercase tracking-widest">Sign Up:</h2>
      {!user ? (
        <form className="flex justify-center items-center flex-col gap-2 p-5 m-auto" onSubmit={handleSubmit(registerUser)}>
          <input
            type="text"
            name="name"
            id="nameInput"
            placeholder="Name"
            className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
            {...register('name')}
          />
          <p className="text-error uppercase tracking-widest">{errors.name?.message}</p>
          <input
            type="email"
            name="email"
            id="emailInput"
            placeholder="Email"
            className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
            {...register('email')}
          />
          <p className="text-error uppercase tracking-widest">{errors.email?.message}</p>
          <input
            type="password"
            name="password"
            id="passwordInput"
            placeholder="Password"
            className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
            {...register('password')}
          />
          <p className="text-error uppercase tracking-widest">{errors.password?.message}</p>
          <input
            type="password"
            name="password"
            id="confirmPasswordInput"
            placeholder="Confirm Password"
            className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
            {...register('confirmPassword')}
          />
          <p className="text-error uppercase tracking-widest">{errors.confirmPassword?.message}</p>
          <button type="submit" className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2">
            Sign Up
          </button>
        </form>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default Register;
