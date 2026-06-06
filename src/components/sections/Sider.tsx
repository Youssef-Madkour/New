import { Link, useLocation } from 'react-router-dom';

interface IMenuItem {
  label: string;
  path: string;
}

const menuItems: IMenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/product' },
];

const Sider = () => {
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
};

export default Sider;
