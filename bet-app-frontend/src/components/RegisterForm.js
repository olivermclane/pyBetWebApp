import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from "../services/authService";
import { Button, Input } from "reactstrap";
import { AuthContext } from "../services/protectRoutes";

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await register(username, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user);

      setIsLoggedIn(true);
      navigate('/sports');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display error message for invalid credentials
        setRegistrationError('Invalid credentials. Please check your username and password.');
      } else {
        // Handle other registration errors
        setRegistrationError('An error occurred during registration.');
      }
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-black bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Register</h1>
        <form onSubmit={handleSubmit}>
          <Input
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
            type="username" id="username" name="username" label="Username" placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="mt-4">
            <Input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
              type="password" id="password" name="password" label="Password" placeholder="••••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-4">
              <div className="mt-4">
                <Button
                  className="rounded-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:focus:text-white"
                  value="Submit" label="Login in"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </form>
        {registrationError && (
          <div className="text-red-500 mt-4">
            {registrationError}
          </div>
        )}
      </div>
    </div>
  );
}
