import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/common/Navbar";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // 🧩 Categories (you can make dynamic later)
  const categories = ["All", "Tools", "Electrical", "Hardware"];

  // 🔄 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");

        const data = res.data?.products || res.data || [];
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    let temp = [...products];

    if (category !== "All") {
      temp = temp.filter((p) => p.category === category);
    }

    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(temp);
  }, [search, category, products]);

  // 🛒 Add to cart
  const addToCart = async (id) => {
    try {
      await API.post("/cart/add", { productId: id, quantity: 1 });
      setStatus("added");

      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6">

        {/* 🔥 Hero Section */}
       <div className="relative overflow-hidden rounded-2xl mb-8">
  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
    
    <h1 className="text-3xl font-bold mb-1 tracking-tight">
      Welcome back 👋
    </h1>

    <p className="text-sm opacity-90">
      Discover powerful tools for your work
    </p>
  </div>

  {/* Glow effect */}
  <div className="absolute inset-0 blur-2xl opacity-20 bg-blue-500"></div>
</div>
        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* 🧩 Categories */}
        <div className="flex gap-3 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
  ${
    category === cat
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
      : "bg-white/70 backdrop-blur border hover:bg-blue-50 text-gray-700"
  }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🔔 Status */}
        {status === "added" && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
            ✅ Added to cart
          </div>
        )}

        {status === "error" && (
          <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow">
            ❌ Something went wrong
          </div>
        )}

        {/* 🛍 Products */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No products found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition p-4 group"
              >
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 group border border-gray-100">
  
  {/* Image */}
  <div className="overflow-hidden rounded-xl">
    <img
  src={
    p.image
      ? p.image.startsWith("http")
        ? p.image
        : `http://localhost:5000/${p.image}`
      : "https://via.placeholder.com/300"
  }
  alt={p.name}
  className="h-40 w-full object-cover group-hover:scale-110 transition duration-300"
/>
  </div>

  {/* Content */}
  <div className="mt-3">
    <h2 className="font-semibold text-gray-800 line-clamp-1">
      {p.name}
    </h2>

    <p className="text-green-600 font-bold text-lg mt-1">
      ₹{p.price}
    </p>
  </div>

  {/* Button */}
  <button
    onClick={() => addToCart(p._id)}
    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 rounded-xl transition shadow-md"
  >
    Add to Cart
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}