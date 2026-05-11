import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

function Sider() {
  const location = useLocation();

  return (
    
    <aside className="w-[200px] bg-[#001529] text-white py-5 px-0">
      
      {menuItems.map(item => {
        const isActive = location.pathname === item.path;
         return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              block px-5 py-3 no-underline
              ${isActive 
                ? 'text-[#1890ff] bg-[#1890ff22]' 
                : 'text-white bg-transparent hover:bg-[#1890ff22]'}
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



// <aside style={{ 
//       width: 200, 
//       background: '#001529', 
//       color: 'white',
//       padding: '20px 0'
//     }}>
//       {menuItems.map(item => (
//         <Link
//           key={item.path}
//           to={item.path}
//           style={{
//             display: 'block',
//             padding: '12px 20px',
//             color: location.pathname === item.path ? '#1890ff' : 'white',
//             textDecoration: 'none',
//             background: location.pathname === item.path ? '#1890ff22' : 'none'
//           }}
//         >
//           {item.label}
//         </Link>
//       ))}
//     </aside>
//   );
// }