import React from 'react';

function Register() {
  return (
    <>
      <h2 className="text-2xl text-primary-content text-center uppercase tracking-widest">Sign Up:</h2>
      <form className="flex justify-center flex-col gap-4 p-5 m-auto">
        <input type="email" name="email" id="emailInput" placeholder="Email" className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest" />
        <input type="password" name="password" id="passwordInput" placeholder="Password" className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest " />
        <input
          type="password"
          name="password"
          id="confirmPasswordInput"
          placeholder="Confirm Password"
          className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest "
        />
        <button type="submit" className="bg-primary text-primary-content text-center border-none p-2 rounded-sm tracking-widest uppercase">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default Register;
