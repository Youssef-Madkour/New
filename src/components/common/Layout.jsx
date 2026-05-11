import { Outlet } from 'react-router-dom';
import Header from '../sections/Header';
import Sider from '../sections/Sider';

function Layout() {
  return (
    <div className="flex h-screen bg-[url(/asd.jpg)] bg-cover bg-center bg-no-repeat">
      <Sider />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-5 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
// function Layout() {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         height: '100vh',
//       }}
//     >
//       <Sider />
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//         <Header />
//         <main style={{ padding: 20, overflow: 'auto' }}>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
