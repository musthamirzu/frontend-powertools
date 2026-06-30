import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import {
  FaArrowLeft,
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaRupeeSign,
  FaSearch,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.userId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order.userId?.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + (order.totalAmount || 0),
    0
  );

const statusColor = {
  placed: "bg-blue-100 text-blue-700",
  shipped: "bg-yellow-100 text-yellow-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};
const placedOrders = orders.filter(
  (o) => o.status === "placed"
).length;

const shippedOrders = orders.filter(
  (o) => o.status === "shipped"
).length;

const deliveredOrders = orders.filter(
  (o) => o.status === "delivered"
).length;
  const updateOrderStatus = async (id, status) => {
  try {
    await API.put(`/admin/orders/${id}/status`, {
      status,
    });

    fetchOrders();

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          flex items-center gap-2
          bg-black
          text-white
          px-4 py-2
          rounded-lg
          mb-6
          hover:bg-gray-800
        "
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Orders Management
        </h1>

        <p className="text-gray-500">
          Manage all customer orders
        </p>
      </div>

      {/* Stats Cards */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-3xl shadow-lg p-6">
    <p className="text-white/80">Total Orders</p>
    <h2 className="text-4xl font-bold mt-2">
      {orders.length}
    </h2>
  </div>

  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-3xl shadow-lg p-6">
    <p className="text-white/80">Pending</p>
    <h2 className="text-4xl font-bold mt-2">
      {placedOrders}
    </h2>
  </div>
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl shadow-lg p-6">
    <p className="text-white/80">Shipped</p>
    <h2 className="text-4xl font-bold mt-2">
      {shippedOrders}
    </h2>
  </div>

  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-3xl shadow-lg p-6">
    <p className="text-white/80">Delivered</p>
    <h2 className="text-4xl font-bold mt-2">
      {deliveredOrders}
    </h2>
  </div>

  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-3xl shadow-lg p-6">
    <p className="text-white/80">Revenue</p>
    <h2 className="text-4xl font-bold mt-2">
      ₹{totalRevenue}
    </h2>
  </div>

</div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <div className="flex items-center gap-3 border rounded-lg px-4">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search customer..."
            className="w-full p-3 outline-none"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      {/* Orders */}
     <div className="space-y-4">

  {filteredOrders.map((order) => (

    <div
      key={order._id}
      className="bg-white rounded-2xl shadow border"
    >

      {/* Compact Card */}
     <div
  className="p-5 cursor-pointer"
  onClick={() =>
    setExpandedOrder(
      expandedOrder === order._id
        ? null
        : order._id
    )
  }
>
  <div className="flex justify-between items-center">

    <div className="flex items-center gap-4">

      <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">
        <FaShoppingCart className="text-blue-600 text-xl" />
      </div>

      <div>

        <h3 className="font-bold text-xl">
          Order #{order._id.slice(-8)}
        </h3>

        <p className="text-gray-600">
          {order.userId?.name}
        </p>

        <p className="text-sm text-gray-400">
          {order.userId?.email}
        </p>

        <p className="text-xs text-gray-400">
          {new Date(order.createdAt).toLocaleDateString("en-IN")}
          {" • "}
          {new Date(order.createdAt).toLocaleTimeString("en-IN")}
        </p>

      </div>

    </div>

    <div className="text-right">

      <span
        className={`
          px-4 py-2 rounded-full text-xs font-bold
          ${statusColor[order.status]}
        `}
      >
        {order.status?.toUpperCase()}
      </span>

      <h2 className="text-2xl font-bold text-green-600 mt-3">
        ₹{order.totalAmount}
      </h2>

      <p className="text-xs text-gray-500 mt-2">
        {expandedOrder === order._id
          ? "▲ Hide Details"
          : "▼ View Details"}
      </p>

    </div>

  </div>
</div>

      {/* Expand Section */}
      {expandedOrder === order._id && (

        <div className="border-t bg-gray-50 p-6">

          {/* Customer */}
         <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">

  <h4 className="font-bold text-blue-600 mb-4">
    👤 Customer Details
  </h4>

  <div className="grid md:grid-cols-3 gap-5">

    <div>
      <p className="text-gray-400 text-sm">Name</p>
      <p className="font-semibold">{order.userId?.name}</p>
    </div>

    <div>
      <p className="text-gray-400 text-sm">Email</p>
      <p className="font-semibold">{order.userId?.email}</p>
    </div>

  <div>
  <p className="text-gray-400 text-sm">
    Receiver's Mobile
  </p>

  <p className="font-semibold">
    {order.deliveryAddress?.mobile}
  </p>
</div>

<div className="md:col-span-2">
  <p className="text-gray-400 text-sm">
    Delivery Address
  </p>

  <p className="font-semibold break-words">
    {order.deliveryAddress?.address},
    {" "}
    {order.deliveryAddress?.district},
    {" "}
    {order.deliveryAddress?.state}
  </p>
</div>
<div>
  <p className="text-gray-400 text-sm">
    Payment Method
  </p>

  <p
    className={`
      inline-block
      px-3 py-1
      rounded-full
      text-sm
      font-semibold
      ${
        order.paymentMethod === "COD"
          ? "bg-orange-100 text-orange-700"
          : order.paymentMethod === "UPI"
          ? "bg-green-100 text-green-700"
          : "bg-blue-100 text-blue-700"
      }
    `}
  >
    {order.paymentMethod}
  </p>
</div>

  </div>

</div>

          {/* Products */}
          <div className="mb-6">

            <h4 className="font-bold mb-3">
              Products
            </h4>

            <div className="space-y-3">

              {order.items?.map((item, index) => (

                <div
                  key={index}
                  className="
                    bg-white
                    border
                    rounded-xl
                    p-4
                    flex
                    justify-between
                  "
                >

                  <div>
                    <p className="font-semibold">
                      {item.productName ||
                        item.name}
                    </p>

                    <p>
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div>
                    ₹{item.price}
                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Summary */}
       <div className="grid md:grid-cols-4 gap-4">

  <div className="bg-white rounded-xl p-4 shadow-sm">
    <p className="text-gray-500 text-sm">Order Date</p>
    <h4 className="font-bold">
      {new Date(order.createdAt)
        .toLocaleDateString("en-IN")}
    </h4>
  </div>

  <div className="bg-white rounded-xl p-4 shadow-sm">
    <p className="text-gray-500 text-sm">Order Time</p>
    <h4 className="font-bold">
      {new Date(order.createdAt)
        .toLocaleTimeString("en-IN")}
    </h4>
  </div>

  <div className="bg-white rounded-xl p-4 shadow-sm">
    <p className="text-gray-500 text-sm">Items</p>
    <h4 className="font-bold">
      {order.items?.length}
    </h4>
  </div>

  <div className="bg-green-50 rounded-xl p-4 shadow-sm">
    <p className="text-green-600 text-sm">
      Total Amount
    </p>
    <h4 className="text-2xl font-bold text-green-700">
      ₹{order.totalAmount}
    </h4>
  </div>

</div>
       {/* Order Status */}
<div className="bg-white rounded-2xl shadow-sm p-6 mt-6">

  <h3 className="text-lg font-bold mb-5">
    Order Status
  </h3>

  <div className="flex items-center justify-between flex-wrap gap-4">

    <div>

      <p className="text-gray-500 text-sm">
        Current Status
      </p>

      <span
        className={`
          inline-block
          mt-2
          px-4
          py-2
          rounded-full
          font-semibold

          ${
            order.status === "placed"
              ? "bg-blue-100 text-blue-700"

            : order.status === "shipped"
              ? "bg-yellow-100 text-yellow-700"

            : "bg-green-100 text-green-700"
          }
        `}
      >
        {order.status.toUpperCase()}
      </span>

    </div>

    <div className="flex gap-3">

      {order.status === "placed" && (

        <button
          onClick={() =>
            updateOrderStatus(
              order._id,
              "shipped"
            )
          }
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Ship Order
        </button>

      )}

      {order.status === "shipped" && (

        <button
          onClick={() =>
            updateOrderStatus(
              order._id,
              "delivered"
            )
          }
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Mark as Delivered
        </button>

      )}

      {order.status === "delivered" && (

        <div
          className="
            bg-green-100
            text-green-700
            px-6
            py-3
            rounded-xl
            font-semibold
          "
        >
          Order Delivered
        </div>

      )}

    </div>

  </div>

</div>

        </div>

      )}

    </div>

  ))}

</div>

    </div>
  );
}