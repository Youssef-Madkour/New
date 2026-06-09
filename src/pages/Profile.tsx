import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className='min-h-screen bg-gy1 flex flex-col items-center py-12 gap-6'>
      <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-6 text-navy'>My Profile</h1>

        {updateSuccess && (
          <p className='bg-green-50 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center'>
            Profile updated successfully.
          </p>
        )}

        {updateError && (
          <p className='bg-r1 text-r6 px-4 py-2 rounded mb-4 text-sm text-center'>
            {updateError}
          </p>
        )}

        <form onSubmit={handleUpdate} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gy6 mb-1'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border border-gy3 rounded-lg focus:outline-none focus:ring-2 focus:ring-b6 focus:border-transparent'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gy6 mb-1'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gy3 rounded-lg focus:outline-none focus:ring-2 focus:ring-b6 focus:border-transparent'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-b6 text-white py-2 rounded-lg hover:bg-b7 transition font-medium'
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-md'>
        {!confirmLogout ? (
          <button
            onClick={() => setConfirmLogout(true)}
            className='w-full border border-r5 text-r5 py-2 rounded-lg hover:bg-r1 transition font-medium mb-6'
          >
            Logout
          </button>
        ) : (
          <div className='flex gap-3 mb-6'>
            <button
              onClick={handleLogout}
              className='flex-1 bg-r5 text-white py-2 rounded-lg hover:bg-r6 transition font-medium'
            >
              Yes, Logout
            </button>
            <button
              onClick={() => setConfirmLogout(false)}
              className='flex-1 border border-gy3 text-gy6 py-2 rounded-lg hover:bg-gy1 transition font-medium'
            >
              Cancel
            </button>
          </div>
        )}

        <h2 className='text-lg font-bold text-r6 mb-2'>Delete Account</h2>
        <p className='text-sm text-gy5 mb-4'>This action cannot be undone.</p>

        {deleteError && (
          <p className='bg-r1 text-r6 px-4 py-2 rounded mb-4 text-sm text-center'>
            {deleteError}
          </p>
        )}

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className='w-full border border-r5 text-r5 py-2 rounded-lg hover:bg-r1 transition font-medium'
          >
            Delete My Account
          </button>
        ) : (
          <div className='flex gap-3'>
            <button
              onClick={handleDelete}
              className='flex-1 bg-r5 text-white py-2 rounded-lg hover:bg-r6 transition font-medium'
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className='flex-1 border border-gy3 text-gy6 py-2 rounded-lg hover:bg-gy1 transition font-medium'
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
