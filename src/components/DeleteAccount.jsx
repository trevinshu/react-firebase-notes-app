import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function DeleteAccount() {
  return (
    <form className="flex flex-col justify-center items-center w-full">
      <button className="bg-neutral text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase w-full hover:bg-neutral-focus  sm:w-1/2 lg:w-1/3 xl:w-1/4">
        Delete Account
      </button>
    </form>
  );
}

export default DeleteAccount;
