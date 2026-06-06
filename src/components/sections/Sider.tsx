import { Link, useLocation } from 'react-router-dom';

<<<<<<< HEAD:src/components/sections/Sider.tsx
interface MenuItem {
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
=======
const menuItems = [
>>>>>>> f14c986badda3c1ae9e12e759a15230048fe6f9b:src/components/sections/Sider.jsx
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/product' },
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
