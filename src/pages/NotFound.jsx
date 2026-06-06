import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center'>
      <p>Page not found</p>
      <Link to='/'>Go Home</Link>
    </div>
  );
};

export default NotFound;
