import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function BestSellers() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

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

      } finally {

        setLoading(false);

      }
    };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading Best Sellers...
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-100 py-14 px-4 md:px-20">

      <div className="text-center mb-12">

        <span
          className="
            text-red-600
            font-semibold
            uppercase
            tracking-widest
          "
        >
          Top Picks
        </span>

        <h2
          className="
            text-4xl
            md:text-5xl
            font-black
            mt-2
          "
        >
          Best Sellers
        </h2>

        <p className="text-gray-500 mt-3">
          Most popular products chosen by our customers
        </p>

      </div>

      <div className="space-y-5">

        {products.map(
          (product) => (

            <div
              key={product._id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                border
                border-gray-100
                p-4
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
              "
            >

              {/* LEFT */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    relative
                    w-24
                    h-24
                    bg-gray-50
                    rounded-xl
                    overflow-hidden
                  "
                >

                  <img
                    src={
                      product.image
                    }
                    alt={
                      product.name
                    }
                    className="
                      w-full
                      h-full
                      object-contain
                      p-2
                    "
                  />

                  <span
                    className="
                      absolute
                      top-2
                      left-2
                      bg-green-500
                      text-white
                      text-[10px]
                      px-2
                      py-1
                      rounded-full
                      font-bold
                    "
                  >
                    BEST SELLER
                  </span>

                </div>

                <div>

                  <h3
                    className="
                      font-bold
                      text-lg
                      text-gray-800
                    "
                  >
                    {product.name}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    {product.brand}
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-400
                      mt-1
                    "
                  >
                    Stock:
                    {" "}
                    {product.stock}
                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div
                className="
                  flex
                  flex-col
                  items-start
                  md:items-end
                "
              >

                <h4
                  className="
                    text-2xl
                    font-black
                    text-green-600
                  "
                >
                  ₹{product.price}
                </h4>

                <button
                  onClick={() =>
                    navigate(
                      `/products/${product._id}`
                    )
                  }
                  className="
                    mt-3
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-5
                    py-2.5
                    rounded-xl
                    font-semibold
                    transition
                  "
                >
                  View Product
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </section>
  );
}