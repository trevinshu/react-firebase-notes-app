import React, { useContext, useEffect } from 'react';
import { BsGoogle } from 'react-icons/bs';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const { loginWithGoogle, loginWithEmailAndPassword, loading, user } = useContext(AppContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {loading ? (
        <Spinner />
      ) : (
        <form className="flex justify-center items-center flex-col gap-4 p-5 " onSubmit={handleSubmit(loginWithEmailAndPassword)}>
          <h2 className="text-2xl text-primary-content text-center uppercase tracking-widest">Login:</h2>
          <p className="text-error uppercase tracking-widest">{errors.email?.message}</p>
          <input
            type="email"
            name="email"
            id="emailInput"
            placeholder="Email"
            className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
            {...register('email')}
          />
          <p className="text-error uppercase tracking-widest">{errors.password?.message}</p>
          <input
            type="password"
            name="password"
            id="passwordInput"
            placeholder="Password"
            className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
            {...register('password')}
          />
          <button type="submit" className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2">
            Login
          </button>
          <h3 className="text-center text-neutral-content text-xl uppercase tracking-widest py-1">Or</h3>
          <button
            type="submit"
            className="bg-secondary text-primary-content text-center flex items-center justify-center gap-3 border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2"
            onClick={loginWithGoogle}
          >
            <BsGoogle className="text-xl" />
            Login With Google
          </button>
        </form>
      )}
    </motion.div>
  );
}

export default Login;
