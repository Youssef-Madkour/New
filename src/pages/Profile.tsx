import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../Zustand/store';

const Profile = () => {
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);
  const deleteUser = useStore((state) => state.deleteUser);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError('');
    setUpdateSuccess(false);

    if (!name || !email) {
      setUpdateError('Please fill all fields');
      return;
    }

    const err = await updateUser(name, email);
    if (err) {
      setUpdateError(err);
      return;
    }

    setUpdateSuccess(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = async () => {
    setDeleteError('');
    const err = await deleteUser();
    if (err) {
      setDeleteError(err);
      return;
    }
    navigate('/login');
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
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px', gap: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <Link to='/product' style={{ color: '#60a5fa', fontSize: '13px', textDecoration: 'none' }}>← Back to Shop</Link>
      </div>

      {/* Update card */}
      <div style={{ background: '#111827', borderRadius: '20px', padding: '36px 32px', width: '100%', maxWidth: '420px', animation: 'fadeUp 0.4s ease both' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '26px', fontWeight: 800, textAlign: 'center', marginBottom: '24px', color: '#f1f5f9', letterSpacing: '-0.02em' }}>
          My Profile
        </h1>

        {updateSuccess && (
          <p style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399', padding: '10px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '13px', textAlign: 'center' }}>
            Profile updated successfully.
          </p>
        )}

        {updateError && (
          <p style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', padding: '10px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '13px', textAlign: 'center' }}>
            {updateError}
          </p>
        )}

        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#60a5fa'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Save Changes
          </button>
        </form>
      </div>

      {/* Logout + Delete card */}
      <div style={{ background: '#111827', borderRadius: '20px', padding: '28px 32px', width: '100%', maxWidth: '420px', animation: 'fadeUp 0.4s ease both', animationDelay: '0.05s' }}>

        {!confirmLogout ? (
          <button
            onClick={() => setConfirmLogout(true)}
            style={{ width: '100%', background: 'transparent', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', borderRadius: '10px', padding: '11px', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px', cursor: 'pointer', marginBottom: '24px', transition: 'background 0.15s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(248,113,113,0.08)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            Logout
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <button
              onClick={handleLogout}
              style={{ flex: 1, background: '#f87171', color: '#0a0f1e', border: 'none', borderRadius: '10px', padding: '11px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
            >
              Yes, Logout
            </button>
            <button
              onClick={() => setConfirmLogout(false)}
              style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: '10px', padding: '11px', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        )}

        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '16px', fontWeight: 700, color: '#f87171', marginBottom: '6px' }}>Delete Account</h2>
        <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>This action cannot be undone.</p>

        {deleteError && (
          <p style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', padding: '10px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '13px', textAlign: 'center' }}>
            {deleteError}
          </p>
        )}

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            style={{ width: '100%', background: 'transparent', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', borderRadius: '10px', padding: '11px', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(248,113,113,0.08)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            Delete My Account
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleDelete}
              style={{ flex: 1, background: '#f87171', color: '#0a0f1e', border: 'none', borderRadius: '10px', padding: '11px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: '10px', padding: '11px', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;
