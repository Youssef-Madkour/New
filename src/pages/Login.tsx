import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../Zustand/store';

const Login = () => {
  const loginUser = useStore((state) => state.loginUser);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    const err = await loginUser(email, password);
    if (err) {
      setError(err);
      return;
    }

    navigate('/');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 16px',
    background: '#1e293b',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: '#f1f5f9',
    fontSize: '14px',
    outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#94a3b8',
    marginBottom: '6px',
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: '#111827', borderRadius: '20px', padding: '36px 32px', width: '100%', maxWidth: '420px', animation: 'fadeUp 0.4s ease both' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '26px', fontWeight: 800, textAlign: 'center', marginBottom: '24px', color: '#f1f5f9', letterSpacing: '-0.02em' }}>
          Welcome Back
        </h1>

        {error && (
          <p style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', padding: '10px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '13px', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#60a5fa'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#60a5fa'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
          </div>

          <button
            type='submit'
            style={{ width: '100%', background: '#60a5fa', color: '#0a0f1e', border: 'none', borderRadius: '10px', padding: '12px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'opacity 0.15s', marginTop: '4px' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#475569', marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link to='/signup' style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
