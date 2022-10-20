import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function DisplayNotes() {
  const { notes } = useContext(AppContext);
  return (
    <div className="grid p-5 sm:grid-cols-4 gap-4">
      {notes.map((note) => {
        return (
          <div key={note?.id} className="bg-base-300 p-5 shadow-md rounded-sm">
            <p>{note?.noteContent}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayNotes;
