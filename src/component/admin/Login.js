
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeading from './AdminHeading';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Fake authentication process
    if (
      // "admin" === 'admin' && "password" === 'password'
      username === 'admin' && password === 'password'
    ) { // Just an example check
      localStorage.setItem('isAuthenticated', 'true'); // Set fake authentication in local storage
      onLogin(); // Notify parent component
      navigate('/admin'); // Redirect to admin page
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeading />
      <div className="flex-grow flex items-center justify-center bg-[#DCB44D] ">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md ml-5 mr-5">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#DCB44D] ">Login</h2>
          <form className="flex flex-col space-y-4 ">
            <div>
              <label className="block mb-2 text-lg">User Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(
                  e.target.value)}
                placeholder="Password"
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLogin}
                className="w-full py-2 px-4 text-white rounded bg-[#DCB44D]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
       
      </div>
    </div>
  );
};

export default Login;

