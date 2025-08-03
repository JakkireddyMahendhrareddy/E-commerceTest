import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { eachProduct } from "./prodctDummyData";

const SimilarProducts = () => {
  const id = useParams();

  const location = useLocation();
  const [product, setProduct] = React.useState(location.state?.product || null);

  const [similar, setSimilar] = React.useState([]);

  React.useEffect(() => {
    if (!product) {
      const found = eachProduct.find((p) => p.id === id);
      setProduct(found);
    }
  }, [id, product]);

  React.useEffect(() => {
    if (product && product.category) {
      const related = eachProduct.filter(
        (p) => p.category === product.category && p.id !== product.id
      );
      setSimilar(related);
    }
  }, [product]);

  return (
    <div className="flex flex-col justify-center mb-5 items-start px-10 mt-5 w-full gap-10">
      <h5 className="text-3xl font-bold">Similar Products</h5>
      <div className="flex flex-row">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {similar.map((item) => (
            <li
              key={item.id}
              className="list-none max-w-xs rounded-2xl mb-3 overflow-hidden shadow-lg bg-white"
            >
              <Link
                to={`/smiliar-products/${item.id}`}
                state={{ product: item }}
              >
                <img
                  className="w-full h-48 object-cover"
                  src={item.image}
                  alt={item.name}
                />
                <div className="p-4">
                  <h5 className="text-xl font-semibold mb-2">{item.name}</h5>
                  <p className="text-gray-700 text-sm mb-1 leading-6">
                    {item.description}
                  </p>
                  <h6 className="text-sm text-red-500 mb-3 font-semibold ">
                    {item.category}
                  </h6>
                  <div className="flex flex-row justify-between items-center">
                    <h5 className="text-lg font-semibold mb-2">
                      {item.price}/-
                    </h5>
                    <button className="inline-flex items-center gap-1 px-5 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition">
                      {item.rating}
                      <FaStar />
                    </button>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
