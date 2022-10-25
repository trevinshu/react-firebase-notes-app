import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import { MdContentCopy, MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import EditModal from './EditModal';

function DisplayNotes() {
  const { notes, editForm, copyNote } = useContext(AppContext);

  return (
    <m.div className="grid m-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:lg:grid-cols-5 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {notes.map((note) => {
        return (
          <div key={note?.id} className="h-fit flex flex-col flex-1 bg-base-300 p-5 shadow-md rounded-sm">
            <div>
              <p className="break-words text-xl">{note?.noteContent}</p>
            </div>
            <div className="flex place-content-end items-center gap-5 pt-5 mt-auto">
              <MdContentCopy className="text-xl cursor-pointer hover:text-primary" onClick={() => copyNote(note)} />
              <FaTrash className="text-xl cursor-pointer hover:text-error" />
              <MdEdit className="text-xl cursor-pointer hover:text-accent" onClick={() => editForm(note)} />
            </div>
          </div>
        );
      })}
      <EditModal />
    </m.div>
  );
}

export default DisplayNotes;
