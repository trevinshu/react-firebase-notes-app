import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import PageHeading from '../components/PageHeading';
import SignInUsingGoogle from '../components/SignInUsingGoogle';

function Login() {
  const { loginWithEmailAndPassword, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email Is Required'),
    password: yup.string().required('Password is required').min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeading>Sign In</PageHeading>
      <form className="flex flex-col items-center justify-center gap-2 p-5" onSubmit={handleSubmit(loginWithEmailAndPassword)}>
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder="Email"
          className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          {...register('email')}
        />

        <p className="text-error uppercase tracking-widest">{errors.email?.message}</p>
        <input
          type="password"
          name="password"
          id="passwordInput"
          placeholder="Password"
          className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          {...register('password')}
        />
        <p className="text-error uppercase tracking-widest">{errors.password?.message}</p>
        <button type="submit" className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase hover:bg-primary-focus w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          Login
        </button>
      </form>
      <h3 className="text-center text-xl uppercase tracking-widest pb-5">Or</h3>
      <SignInUsingGoogle />
    </m.div>
  );
}

export default Login;
