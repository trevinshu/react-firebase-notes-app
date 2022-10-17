import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function UpdateName() {
  const { user, updateUserName } = useContext(AppContext);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(updateUserName)} className="flex flex-col items-center justify-center gap-4 mb-5 w-full">
      <div>
        <h2 className=" text-xl text-primary-content">Current Name: {user?.displayName}</h2>
      </div>

      <p className="text-error uppercase tracking-widest">{errors.name?.message}</p>
      <input
        type="text"
        name="name"
        id="nameInput"
        placeholder="New Name"
        className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full md:w-1/2"
        {...register('name')}
      />
      <button type="submit" className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase w-full md:w-1/2">
        Update Name
      </button>
    </form>
  );
}

export default UpdateName;
