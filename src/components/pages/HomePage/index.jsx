import { Link } from 'react-router-dom';
import { MockItems } from '../../../utils';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Electronics</h1>
      {MockItems.map((item) => (
        <div key={item.id} className="border border-white p-4 mb-2.5 rounded">
          <img
            src={item.icon}
            alt=''
            className="w-[100px] h-[100px]"
          />
          <h3 className="text-xl font-semibold mt-2 ">{item.title}</h3>
          <p className="font-medium">{item.desc}</p>
          <Link 
            to={`/${item.id}`} 
            state={{ item }}
            className="text-blue-500 hover:text-blue-700 underline mt-2 inline-block"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

//     <div>
//       <h1>Electronics</h1>
//       {MockItems.map((item) => (
//         <div
//           key={item.id}
//           style={{
//             border: '1px solid #ffffff',
//             padding: 15,
//             marginBottom: 10,
//             borderRadius: 4,
//           }}
//>
//           <img
//             src={item.icon}
//             alt=''
//             style={{
//               width: 100,
//               height: 100,
//             }}
//           />
//           <h3>{item.title}</h3>
//           <p>{item.desc}</p>
//           <Link to={`/${item.id}`} state={{ item }}>
//             View Details
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };
