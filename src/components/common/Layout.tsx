import { Outlet } from 'react-router-dom';
import Header from '../sections/Header';
import Sider from '../sections/Sider';

function Layout() {
  return (
    <div className='flex h-screen'>
      <Sider />
      <div className='flex-1 flex flex-col'>
        <Header />
        <main className='overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
