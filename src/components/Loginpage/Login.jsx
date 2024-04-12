import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "kminchelle",
        password: '0lelplR',
      })
    });
    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem("userData", JSON.stringify(data));
      setTimeout(function () {
        toast.success("Log in Successfully !")
      }, 5000);

      navigate(-1)
    } else {
      console.error('Login failed');
      toast.warning(" Invalid Credential !")
    }
  };

  return (
    <>
      <ToastContainer limit={3}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <div className=' w-full h-full flex justify-center items-center py-3 '>
        <div className=' flex flex-col justify-center items-center bg-slate-500 w-2/5 '>
          <h1 className='text-[#ffff] text-3xl pt-3 font-bold'>Welcome To GlaMart</h1>
          <img className='w-24 h-18' src='../favicon/favicon.png' alt='Error' />
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='block my-4 p-2 border border-gray-300 rounded-md'
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block my-4 p-2 border border-gray-300 rounded-md'
            />
            <div className='flex justify-center pb-3'>
              <button type='submit' className='block  bg-[#0B7A74] text-white px-4 py-2 rounded-md'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login


