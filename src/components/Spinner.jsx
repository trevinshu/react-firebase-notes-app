import React from 'react';
import PropagateLoader from 'react-spinners/ClipLoader';

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <PropagateLoader color="#641AE6" size={100} />
    </div>
  );
}

export default Spinner;
