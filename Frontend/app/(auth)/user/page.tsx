'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function User() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Login submit handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid credentials. Please try again.');
        return;
      }

      // Store token in localStorage
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('username', data.username);

      // Redirect to dashboard or home page after successful login
      router.push('/tests');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    }
  };

  // Register submit handler
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      // Store token in localStorage
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('username', data.username);

      // Redirect to dashboard or home page
      router.push('/tests');
    } catch (err) {
      setError('An unexpected error occurred during registration');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {!isRegistering ? (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-800">User Login</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleLoginSubmit} className="mt-6">
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                New user?{' '}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Register here
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-800">Register User</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleRegisterSubmit} className="mt-6">
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Choose a username"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="registerPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Choose a password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Register
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login here
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default User;