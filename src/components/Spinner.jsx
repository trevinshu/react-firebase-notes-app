import React from 'react';
import PropagateLoader from 'react-spinners/ClipLoader';

function Spinner() {
  return (
    <div className="flex justify-center items-center m-auto">
      <PropagateLoader color="#641AE6" size={50} />
    </div>
  );
}

export default Spinner;
