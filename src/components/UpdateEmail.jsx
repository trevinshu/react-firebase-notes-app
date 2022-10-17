import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function UpdateEmail() {
  const { user, updateUserEmail } = useContext(AppContext);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email Is Required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form className="flex flex-col justify-center items-center gap-4 mb-5 w-full" onSubmit={handleSubmit(updateUserEmail)}>
      <h2 className="text-xl text-primary-content">Current Email: {user?.email}</h2>
      <p className="text-error uppercase tracking-widest">{errors.email?.message}</p>
      <input
        type="email"
        name="email"
        id="emailInput"
        placeholder="New Email"
        className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
        {...register('email')}
      />
      <button type="submit" className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2">
        Update Email
      </button>
    </form>
  );
}

export default UpdateEmail;
