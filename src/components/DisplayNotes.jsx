import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function DisplayNotes() {
  const { notes } = useContext(AppContext);
  return (
    <div className=" grid m-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:lg:grid-cols-5 gap-4">
      {notes.map((note) => {
        return (
          <div key={note?.id} className="max-h-full bg-base-300 p-5 shadow-md rounded-sm">
            <p className="break-words">{note?.noteContent}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayNotes;
