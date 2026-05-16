import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

function ItemDetailsPage() {
  const { id } = useParams();
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading user details...</p>
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

  const user = users?.find(u => u.id === parseInt(id));

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">User not found</p>
        <Link to="/" className="text-blue-600 ml-2">Go back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to users
      </Link>

      <div className="border rounded-lg p-8 shadow bg-white mt-4">
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-500 text-lg mb-6">@{user.username}</p>
        
        <div className="space-y-3">
          <p><span className="font-bold">Email:</span> {user.email}</p>
          <p><span className="font-bold">Phone:</span> {user.phone}</p>
          <p><span className="font-bold">Website:</span> <a href={`https://${user.website}`} className="text-blue-600">{user.website}</a></p>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-bold text-lg mb-2">Company</h3>
            <p>{user.company.name}</p>
            <p className="text-gray-600 text-sm italic">"{user.company.catchPhrase}"</p>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h3 className="font-bold text-lg mb-2">Address</h3>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;