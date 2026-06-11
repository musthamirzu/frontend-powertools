
import { useEffect, useState } from "react";
import API from "../../services/api";

const BestSellers = () => {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers =
    async () => {
      try {

        const res =
          await API.get(
            "/products/best-sellers"
          );

        setProducts(
          res.data
        );

      } catch (err) {

        console.log(err);

      }
    };
const BestSellers = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 md:px-20">
   
      <h2 className="text-4xl font-semibold text-center mb-10">
        Best Sellers
      </h2>

      <div className="space-y-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border"
          >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
             <img
  src={
    product.image
      ? product.image.startsWith("http")
        ? product.image
        : `http://localhost:5004/${product.image}`
      : "https://via.placeholder.com/150"
  }
  alt={product.name}
  className="w-16 h-16 object-contain"
/>

              <div>
                {/* TAG */}
                <span
                  className={`text-xs px-2 py-1 rounded text-white ${
                    product.tag === "BEST SELLER"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                >
                  {product.tag}
                </span>

                {/* NAME */}
                <p className="text-gray-700 mt-2 text-sm md:text-base">
                  {product.name}
                </p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="text-right">
              {/* OLD PRICE */}
              <p className="text-gray-400 text-sm">
  Brand: {product.brand}
</p>

              {/* NEW PRICE */}
              <p className="text-lg font-semibold text-gray-800">
  ₹{Number(product.price).toFixed(2)}
</p>

              {/* BUTTON */}
              <button className="mt-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
}
export default BestSellers;