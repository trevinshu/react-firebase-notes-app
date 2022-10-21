import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function AddNote() {
  const { addNote } = useContext(AppContext);

  const schema = yup.object().shape({
    noteContent: yup
      .string()
      .required('Note content is required')
      .min(5, 'The note must be at least 5 characters in length')
      .max(280, 'The note must be at less than or equal to 280 characters in length'),
  });

  const {
    register,
    reset,
    formState,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ noteContent: '' });
    }
  }, [formState, reset]);
  return (
    <>
      <form className="flex justify-center items-center flex-wrap p-5 gap-4" onSubmit={handleSubmit(addNote)}>
        <textarea
          className="bg-base-300 border-none resize-none rounded-sm  placeholder:uppercase placeholder:tracking-widest h-fit w-full p-5 md:w-1/2 lg:w-1/3"
          placeholder="Note Content"
          {...register('noteContent')}
        ></textarea>

        <button className="bg-primary text-primary-content text-center font-bold border-none px-10 py-5 rounded-sm tracking-widest uppercase hover:bg-primary-focus" type="submit">
          Add Note
        </button>
      </form>
      <p className="text-error text-center uppercase tracking-widest">{errors.noteContent?.message}</p>
    </>
  );
}

export default AddNote;
