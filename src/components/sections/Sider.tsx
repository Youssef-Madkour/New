import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/product' },
  { label: 'Profile', path: '/profile' },
];

function Sider() {
  const location = useLocation();

  return (
    <aside className='w-50 bg-navy text-white py-5 px-0'>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              block px-5 py-3 no-underline
              ${
                isActive
                  ? 'text-b5 bg-b9'
                  : 'text-white bg-transparent hover:bg-[#1890ff22]'
              }
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}

export default Sider;
