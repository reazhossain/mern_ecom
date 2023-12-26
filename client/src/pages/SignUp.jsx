import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function SignUp() {


  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.id]: e.target.value });

  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });


    const data = await res.json();
    if (data.success == false) {
      setLoading(false);
      setError(data.message)
    } else {
      setError(null);
      navigate("/sign-in");
    }

    ///  console.log(data);
  };

  /// console.log(formData);
  return (

    <div>


      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" action="#">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input onChange={handleChange} id="username" name="username" type="text" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </input>
              </div>
            </div>


            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" onChange={handleChange} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </input>
              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" onChange={handleChange} className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" onChange={handleChange} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </input></div>
            </div>

            <div>
              <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? "loading" : "Sign in"}</button>
            </div>
          </form>

          <h5>{error ? error : ""}</h5>


          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
          </p>
        </div>
      </div>



    </div >
  )
}