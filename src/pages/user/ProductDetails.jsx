import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/common/Navbar";

import {
  FaShoppingCart,
  FaBolt,
  FaPlus,
  FaMinus,
  FaStar,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaBoxOpen,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchProduct();
}, [id]);

useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/products/${id}`);

      setProduct(res.data);

      fetchRelatedProducts(
        res.data.category?.slug ||
          res.data.category?._id
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (
    category
  ) => {
    try {
      const res = await API.get(
        `/products?category=${category}`
      );

      setRelatedProducts(
        res.data.filter(
          (p) => p._id !== id
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

const addToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    await API.post(
      "/cart/add",
      {
        productId: product._id,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAdded(true);

    toast.success("Product added to cart");

    setTimeout(() => {
      setAdded(false);
    }, 2500);

  } catch (err) {
    console.log(err);

    toast.error("Unable to add product");
  }
};

  const buyNow = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      await API.post(
        "/cart/add",
        {
          productId: product._id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/cart");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center">
          <div className="text-xl font-semibold">
            Loading Product...
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center">
          Product Not Found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-12">

        <div className="max-w-7xl mx-auto px-5">
            {/* Product Section */}

<div className="grid lg:grid-cols-2 gap-14">

  {/* LEFT */}

  <div>

    <div className="bg-white rounded-3xl shadow-xl p-8">

      <img
        src={product.image}
        alt={product.name}
        className="
          w-full
          h-[500px]
          object-contain
          hover:scale-105
          duration-300
        "
      />

    </div>

  </div>

  {/* RIGHT */}

  <div>

    <div className="flex items-center gap-2 text-yellow-500">

      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />

      <span className="text-gray-500 ml-2">
        (4.9)
      </span>

    </div>

    <h1 className="text-5xl font-bold mt-5 text-gray-900">
      {product.name}
    </h1>

    <div className="mt-5 flex gap-4 flex-wrap">

      <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-semibold">

        {product.brand}

      </span>

      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

        {product.category?.name}

      </span>

    </div>

    <div className="mt-8">

      <h2 className="text-5xl font-bold text-emerald-600">

        ₹{product.price}

      </h2>

    </div>

    <div className="mt-5">

      {product.stock > 0 ? (

        <div className="flex items-center gap-2 text-green-600 font-semibold">

          <FaCheckCircle />

          In Stock ({product.stock})

        </div>

      ) : (

        <div className="text-red-600 font-semibold">

          Out of Stock

        </div>

      )}

    </div>

    {/* Quantity */}

    <div className="mt-8">

      <p className="font-semibold mb-3">

        Quantity

      </p>

      <div className="flex items-center w-fit rounded-xl overflow-hidden border">

        <button
          onClick={() =>
            quantity > 1 &&
            setQuantity(quantity - 1)
          }
          className="px-5 py-3 bg-gray-100 hover:bg-gray-200"
        >
          <FaMinus />
        </button>

        <div className="px-8 text-xl font-bold">

          {quantity}

        </div>

        <button
          onClick={() =>
            setQuantity(quantity + 1)
          }
          className="px-5 py-3 bg-gray-100 hover:bg-gray-200"
        >
          <FaPlus />
        </button>

      </div>


{/* Buttons */}

<div className="mt-10 flex justify-center">

  <button
    onClick={addToCart}
    disabled={added}
    className={`
      w-full
      md:w-80
      py-4
      rounded-2xl
      font-semibold
      flex
      items-center
      justify-center
      gap-3
      text-lg
      shadow-lg
      transition-all
      duration-300

      ${
        added
          ? "bg-green-600 text-white cursor-default"
          : "bg-black hover:bg-gray-900 hover:scale-105 text-white"
      }
    `}
  >
    <FaShoppingCart className="text-xl" />

    {added ? "Added" : "Add To Cart"}

  </button>

</div>

    </div>

    {/* Buttons */}


    {/* Features */}

    <div className="grid grid-cols-3 gap-4 mt-12">

      <div className="bg-white rounded-2xl shadow p-5 text-center">

        <FaTruck className="mx-auto text-3xl text-teal-600" />

        <p className="font-semibold mt-3">

          Fast Delivery

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow p-5 text-center">

        <FaShieldAlt className="mx-auto text-3xl text-blue-600" />

        <p className="font-semibold mt-3">

          Genuine Product

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow p-5 text-center">

        <FaUndo className="mx-auto text-3xl text-orange-500" />

        <p className="font-semibold mt-3">

          Easy Returns

        </p>

      </div>

    </div>

    {/* Description */}

    <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-5">

        Product Description

      </h2>

      <p className="leading-8 text-gray-600">

        {product.description}

      </p>

    </div>

  </div>

</div>

{/* Related Products */}

<div className="mt-24">

  <h2 className="text-4xl font-bold mb-10">

    Related Products

  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">



    {relatedProducts.map((item) => (

  <div
    key={item._id}
    className="
      bg-white
      rounded-3xl
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-300
      overflow-hidden
      group
    "
  >

    {/* Image */}

    <div
      onClick={() => navigate(`/product/${item._id}`)}
      className="cursor-pointer overflow-hidden"
    >

      <img
        src={item.image}
        alt={item.name}
        className="
          w-full
          h-64
          object-contain
          p-6
          group-hover:scale-110
          transition-transform
          duration-500
        "
      />

    </div>

    {/* Body */}

    <div className="px-6 pb-6">

      <h3 className="font-bold text-xl">

        {item.name}

      </h3>

      <p className="text-gray-500 mt-2">

        {item.brand}

      </p>

      <div className="flex items-center gap-1 text-yellow-500 mt-4">

        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />

      </div>

      <div className="mt-5 flex justify-between items-center">

        <h2 className="text-3xl font-bold text-emerald-600">

          ₹{item.price}

        </h2>

        <button
          onClick={() =>
            navigate(`/product/${item._id}`)
          }
          className="
            bg-teal-600
            hover:bg-teal-700
            text-white
            px-5
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >

          View

        </button>

      </div>

    </div>

  </div>

))}

  </div>

</div>

</div>

</div>

</>
);
}
