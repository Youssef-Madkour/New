import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

function HomePage() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Users List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map(user => (
          <Link 
            to={`/item/${user.id}`} 
            key={user.id}
            className="border rounded-lg p-6 shadow hover:shadow-xl transition cursor-pointer bg-white"
          >
            <h3 className="font-bold text-xl text-blue-600">{user.name}</h3>
            <p className="text-gray-600 mt-2">@{user.username}</p>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
            <p className="text-gray-500 text-sm">{user.company.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;