import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Button, Input } from "reactstrap";
import { AuthContext } from '../services/protectRoutes';

export default function LoginForm() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await login(username, password);
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('balance', response.user.balance);
      localStorage.setItem('token', response.token);
      localStorage.setItem('isLoggedIn', true);
      setIsLoggedIn(true);
      navigate('/sports');
    } catch (error) {
      // Handle login errors
      if (error.response && error.response.status === 400) {
        setLoginError('Invalid credentials. Please check your username and password.');
      } else {
        // Handle other login errors
        setLoginError('An error occurred during login.');
      }
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-black bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
            type="username" id="username" name="username" label="Username" placeholder="username"
          />
          <div className="mt-4">
            <Input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
              type="password" id="password" name="password" label="Password" placeholder="••••••••••"
            />
            <div className="mt-4">
              <div className="mt-4">
                <Button
                  className="rounded-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-2 focus:ring-gray-800  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:focus:text-white"
                  value="Submit" label="Login in"
                >
                  Login In
                </Button>
                <a href="/register/" className="inline-block ml-4 text-sm font-medium text-black hover:text-gray-500">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </form>
        {loginError && (
          <div className="text-red-500 mt-4">
            {loginError}
          </div>
        )}
      </div>
    </div>
  );
}
