import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function PaginationButtons() {
  const { fetchMore, fetchLess } = useContext(AppContext);
  return (
    <div className="flex justify-center items-center gap-5 p-5">
      <button onClick={fetchLess} className="text-2xl bg-base-200 px-5 py-2 rounded-sm">
        Previous
      </button>
      <button onClick={fetchMore} className="text-2xl bg-base-200 px-5 py-2 rounded-sm">
        Next
      </button>
    </div>
  );
}

export default PaginationButtons;
