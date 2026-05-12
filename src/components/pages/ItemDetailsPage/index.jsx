import { useLocation, useNavigate } from 'react-router-dom';

  function ItemDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state ?? {};

  return (
    <div className="flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 w-fit px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
      >
        Back
      </button>
      {!item ? (
        <div className="text-red-500">Item not found</div>
      ) : (
        <>
          <img
            src={item.icon}
            alt=''
            className="w-[100px] h-[100px]"
          />
          <h1 className="text-2xl font-bold mt-2">{item.title}</h1>
          <p className="font-semibold - mt-1">{item.desc}</p>
          <p className="mt-2">
            <strong className="font-bold">Price:</strong> {item.price}
          </p>
        </>
      )}
    </div>
  );
}

export default ItemDetailsPage;


