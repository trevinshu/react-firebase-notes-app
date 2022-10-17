import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function UpdatePassword() {
  const { updateUserPassword } = useContext(AppContext);

  const schema = yup.object().shape({
    currentPassword: yup.string().required('Password is required').min(6),
    newPassword: yup.string().required('Password is required').min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form className="flex flex-col items-center justify-center gap-4 mb-5 w-full" onSubmit={handleSubmit(updateUserPassword)}>
      <h2 className="text-xl text-primary-content">Update Password:</h2>
      <p className="text-error uppercase tracking-widest">{errors.currentPassword?.message}</p>
      <input
        type="password"
        name="currentPassword"
        id="currentPasswordInput"
        placeholder="Current Password"
        className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
        {...register('currentPassword')}
      />
      <p className="text-error uppercase tracking-widest">{errors.newPassword?.message}</p>
      <input
        type="password"
        name="newPassword"
        id="newPasswordInput"
        placeholder="Confirm New Password"
        className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
        {...register('newPassword')}
      />
      <button type="submit" className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2">
        Update Password
      </button>
    </form>
  );
}

export default UpdatePassword;
