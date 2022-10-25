import { MdClose } from 'react-icons/md';
import PageHeading from './PageHeading';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function EditModal() {
  const { showModal, closeModal, updateNote, formValues } = useContext(AppContext);

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

  useEffect(() => {
    let defaultValues = {};
    defaultValues.noteContent = formValues?.noteContent;
    defaultValues.id = formValues?.id;
    reset({ ...defaultValues });
  }, [formValues]);

  return (
    <>
      {showModal ? (
        <div className="flex fixed inset-0 bg-neutral-focus bg-opacity-70 h-full w-full">
          <div className="m-auto bg-base-200 h-[100%] w-[100%] p-5 md:rounded-md md:shadow-md md:h-[75%] md:w-[75%] lg:h-[50%] lg:w-[50%]">
            <div className="flex justify-between items-center">
              <PageHeading>Edit Note</PageHeading>
              <button onClick={closeModal}>
                <MdClose className="text-4xl text-primary-content hover:text-error" />
              </button>
            </div>
            <form className="flex flex-col justify-center items-center h-full flex-1 py-10 gap-5" onSubmit={handleSubmit(updateNote)}>
              <input type="text" {...register('id')} className="hidden" />
              <textarea
                className=" bg-base-300 border-none resize-none rounded-sm  placeholder:uppercase placeholder:tracking-widest p-5 h-full w-full"
                placeholder="Note Content"
                {...register('noteContent')}
              ></textarea>
              <button className="bg-primary text-primary-content text-center font-bold border-none px-10 py-5 rounded-sm tracking-widest uppercase hover:bg-primary-focus" type="submit">
                Update Note
              </button>
            </form>
            <p className="text-error text-center uppercase tracking-widest">{errors.noteContent?.message}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EditModal;
