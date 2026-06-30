import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

import {
  FaArrowLeft,
  FaShoppingCart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await API.get(`/admin/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrderStatus = async (status) => {
    try {
      await API.put(`/admin/orders/${id}/status`, {
        status,
      });

      fetchOrder();
    } catch (err) {
      console.log(err);
    }
  };

  if (!order) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl mb-6"
      >
        <FaArrowLeft />
        Back
      </button>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">

          <h1 className="text-3xl font-bold">
            Order #{order._id.slice(-8)}
          </h1>

          <p className="mt-2 opacity-90">
            {new Date(order.createdAt).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="p-8">

          {/* Customer */}

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">

            <h2 className="font-bold text-xl mb-5">
              Customer Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <p className="text-gray-500">
                  Customer
                </p>

                <h3 className="font-semibold">
                  {order.userId?.name}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Email
                </p>

                <h3 className="font-semibold">
                  {order.userId?.email}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Mobile
                </p>

                <h3 className="font-semibold">
                  {order.deliveryAddress?.mobile}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">
                  Payment
                </p>

                <h3 className="font-semibold">
                  {order.paymentMethod}
                </h3>

              </div>

            </div>

          </div>

          {/* Address */}

          <div className="bg-white border rounded-2xl p-6 mb-6">

            <div className="flex items-center gap-2 mb-3">

              <FaMapMarkerAlt />

              <h2 className="font-bold">
                Delivery Address
              </h2>

            </div>

            <p>{order.deliveryAddress?.name}</p>

            <p>{order.deliveryAddress?.address}</p>

            <p>
              {order.deliveryAddress?.district},{" "}
              {order.deliveryAddress?.state}
            </p>

          </div>

          {/* Products */}

          <div className="mb-6">

            <h2 className="font-bold text-xl mb-4">
              Products
            </h2>

            {order.items.map((item) => (

              <div
                key={item.productId}
                className="bg-white border rounded-2xl p-5 flex justify-between items-center mb-3"
              >

                <div className="flex items-center gap-4">

                  <FaShoppingCart className="text-blue-600 text-2xl" />

                  <div>

                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      Qty : {item.quantity}
                    </p>

                  </div>

                </div>

                <div className="font-bold text-green-600">
                  ₹{item.price}
                </div>

              </div>

            ))}

          </div>

          {/* Summary */}

          <div className="grid md:grid-cols-3 gap-6 mb-6">

            <div className="bg-blue-50 rounded-2xl p-6">

              <div className="flex items-center gap-2 mb-3">

                <FaCalendarAlt />

                Order Date

              </div>

              <h2 className="font-bold">
                {new Date(order.createdAt).toLocaleDateString("en-IN")}
              </h2>

            </div>

            <div className="bg-yellow-50 rounded-2xl p-6">

              <div className="flex items-center gap-2 mb-3">

                <FaCreditCard />

                Payment Status

              </div>

              <h2 className="font-bold">
                {order.paymentStatus}
              </h2>

            </div>

            <div className="bg-green-100 rounded-2xl p-6">

              <p>Total Amount</p>

              <h2 className="text-4xl font-bold mt-2">
                ₹{order.totalAmount}
              </h2>

            </div>

          </div>

          {/* Status */}

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="font-bold text-xl mb-5">
              Order Status
            </h2>

            <div className="flex gap-4 flex-wrap">

              {order.status === "placed" && (

                <button
                  onClick={() => updateOrderStatus("shipped")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                  Ship Order
                </button>

              )}

              {order.status === "shipped" && (

                <button
                  onClick={() => updateOrderStatus("delivered")}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl"
                >
                  Mark Delivered
                </button>

              )}

              {order.status === "delivered" && (

                <div className="bg-green-100 text-green-700 px-6 py-3 rounded-xl font-semibold">
                  Delivered
                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}