import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../Zustand/store';

const Signup = () => {
  const register = useStore((state) => state.register);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    const err = register(name, email, password);
    if (err) {
      setError(err);
      return;
    }

    navigate('/');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gy1'>
      <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-6 text-navy'>
          Create Account
        </h1>

        {error && (
          <p className='bg-r1 text-r6 px-4 py-2 rounded mb-4 text-sm text-center'>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gy6 mb-1'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
              className='w-full px-4 py-2 border border-gy3 rounded-lg focus:outline-none focus:ring-2 focus:ring-b6 focus:border-transparent'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gy6 mb-1'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full px-4 py-2 border border-gy3 rounded-lg focus:outline-none focus:ring-2 focus:ring-b6 focus:border-transparent'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gy6 mb-1'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='w-full px-4 py-2 border border-gy3 rounded-lg focus:outline-none focus:ring-2 focus:ring-b6 focus:border-transparent'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-b6 text-white py-2 rounded-lg hover:bg-b7 transition font-medium'
          >
            Sign Up
          </button>
        </form>

        <p className='text-center text-sm text-gy5 mt-4'>
          Already have an account?{' '}
          <Link to='/login' className='text-b6 hover:underline font-medium'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
