import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';

function DisplayNotes() {
  const { notes } = useContext(AppContext);
  return (
    <m.div className=" grid m-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:lg:grid-cols-5 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {notes.map((note) => {
        return (
          <div key={note?.id} className="max-h-full bg-base-300 p-5 shadow-md rounded-sm">
            <p className="break-words">{note?.noteContent}</p>
          </div>
        );
      })}
    </m.div>
  );
}

export default DisplayNotes;
