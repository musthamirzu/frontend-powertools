import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import {
  FaArrowLeft,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <div className="p-10">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="
          flex items-center gap-2
          bg-black
          text-white
          px-4 py-2
          rounded-lg
          mb-6
        "
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome to Power Tools Admin Panel
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-2xl shadow p-5">
          <FaUsers className="text-3xl text-blue-500 mb-3" />
          <p className="text-gray-500">
            Users
          </p>
          <h2 className="text-3xl font-bold">
            {stats.totalUsers}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <FaBox className="text-3xl text-purple-500 mb-3" />
          <p className="text-gray-500">
            Products
          </p>
          <h2 className="text-3xl font-bold">
            {stats.totalProducts}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <FaShoppingCart className="text-3xl text-green-500 mb-3" />
          <p className="text-gray-500">
            Orders
          </p>
          <h2 className="text-3xl font-bold">
            {stats.totalOrders}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <FaRupeeSign className="text-3xl text-red-500 mb-3" />
          <p className="text-gray-500">
            Revenue
          </p>
          <h2 className="text-3xl font-bold">
            ₹{stats.revenue}
          </h2>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">
          Recent Orders
        </h2>

        {stats.recentOrders.map((o) => (
          <div
            key={o._id}
            className="
              flex justify-between
              py-3 border-b
            "
          >
            <span>
              {o.userId?.name}
            </span>

            <span>
              ₹{o.totalAmount}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Recent Users
        </h2>

        {stats.recentUsers.map((u) => (
          <div
            key={u._id}
            className="
              flex justify-between
              py-3 border-b
            "
          >
            <span>
              {u.name}
            </span>

            <span>
              {u.email}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}