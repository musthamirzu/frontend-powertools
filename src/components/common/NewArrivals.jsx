import React, {
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function NewArrivals() {
  const [products, setProducts] =
    useState([]);
  const navigate = useNavigate();

  const [showAll, setShowAll] =
    useState(false);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals =
    async () => {
      try {

        const res =
          await API.get(
            "/products/new-arrivals"
          );

        setProducts(
          res.data
        );

      } catch (err) {

        console.log(err);

      }
    };

  const visibleProducts =
    showAll
      ? products
      : products.slice(0, 6);

  return (
    <div className="bg-gray-100 py-16 px-4 md:px-20">

      {/* TITLE */}
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">
        New Arrivals
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {visibleProducts.map(
          (item) => (
            <div
              key={item._id}
              className="
                bg-white
                p-6
                rounded-lg
                shadow-sm
                hover:shadow-md
                transition
                duration-300
                relative
              "
            >

              {/* TAG */}
              <span
                className="
                  absolute
                  top-4
                  right-4
                  bg-yellow-400
                  text-black
                  text-xs
                  px-2
                  py-1
                  font-medium
                "
              >
                NEW
              </span>

              {/* IMAGE */}
              <div className="flex justify-center mb-6">

                <img
                  src={
                    item.image
                      ? item.image.startsWith(
                          "http"
                        )
                        ? item.image
                        : `http://localhost:5004/${item.image}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={item.name}
                  className="
                    h-40
                    object-contain
                  "
                />

              </div>

              {/* NAME */}
              <h3
                className="
                  text-lg
                  font-semibold
                  text-gray-800
                  text-center
                "
              >
                {item.name}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  text-sm
                  text-gray-500
                  text-center
                  mt-2
                "
              >
                {item.description ||
                  item.brand}
              </p>

              {/* PRICE */}
              <div className="text-center mt-4">

                <span
                  className="
                    text-xl
                    font-bold
                    text-gray-800
                  "
                >
                  ₹{item.price}
                </span>

              </div>

              {/* BUTTON */}
              <div className="flex justify-center mt-5">

                <button
  onClick={() => navigate(`/product/${item._id}`)}
  className="
    bg-teal-600
    hover:bg-teal-700
    text-white
    px-6
    py-2
    rounded-md
    text-sm
  "
>
  Buy Now
</button>

              </div>

            </div>
          )
        )}

      </div>

      {/* SHOW MORE */}
      {products.length > 6 && (
        <div className="flex justify-center mt-10">

          <button
            onClick={() =>
              setShowAll(!showAll)
            }
            className="
              bg-black
              text-white
              px-6
              py-2
              rounded-md
              hover:bg-gray-800
              transition
            "
          >
            {showAll
              ? "Show Less ↑"
              : "Show More ↓"}
          </button>

        </div>
      )}

    </div>
  );
}