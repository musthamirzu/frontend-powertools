import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/common/Navbar";
import {
  FaBox,
  FaMapMarkerAlt,
  FaCreditCard,
  FaRupeeSign,
  FaCalendarAlt,
  FaTimesCircle,
  FaTruck
} from "react-icons/fa";
import OrderTracker from "./OrderTracker";


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [tracker, setTracker] = useState({});
  const fetchTracker = async (orderId) => {
    const res = await API.get(`/orders/${orderId}/tracker`);

    setTracker((prev) => ({
      ...prev,
      [orderId]: res.data.status,
    }));
  };
  useEffect(() => {
    if (orders.length) {
      orders.forEach((order) => {
        fetchTracker(order._id);
      });
    }
  }, [orders]);
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setOrders(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    await API.put(`/orders/cancel/${id}`);
    alert("Order cancelled");
    window.location.reload();
  };

  const getExpectedDeliveryDate = (order) => {
    if (order.status === "delivered") {
      return "Delivered";
    }

    const date = new Date(order.createdAt);

    // Estimated delivery in 5 days
    date.setDate(date.getDate() + 3);

    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 py-12">
          <div className="max-w-7xl mx-auto px-5">

            {/* Heading */}
            <div className="mb-10 flex justify-between items-center flex-wrap gap-4">

              <div>
                <h1 className="text-5xl font-extrabold text-slate-800">
                  My Orders
                </h1>


                <p className="text-slate-500 mt-2 text-lg">
                  Track your purchases, payments and delivery status.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg px-6 py-4 border">
                <p className="text-gray-500 text-sm">
                  Total Orders
                </p>

                <h2 className="text-3xl font-bold text-teal-600">
                  {orders.length}
                </h2>
              </div>

            </div>

            {orders.length === 0 && (

              <div className="bg-white rounded-2xl shadow p-16 text-center">
                <FaBox className="mx-auto text-6xl text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700">
                  No Orders Yet
                </h2>

                <p className="text-gray-500 mt-2">
                  Start shopping to see your orders here.
                </p>
              </div>
            )}

            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-[28px]
border
border-slate-200
shadow-lg
hover:shadow-2xl
transition-all
duration-300
overflow-hidden"
                >

                  {/* Header */}
                  <div className="border-b px-8 py-5 flex flex-wrap justify-between items-center bg-gradient-to-r
from-teal-600
via-cyan-600
to-sky-700
text-white">

                    <div>
                      <h2 className="text-xl font-bold">
                        ORD-#{order._id.slice(-8)}
                      </h2>

                      <div className="flex items-center gap-2 text-white/80 text-sm mt-2">
                        <FaCalendarAlt />
                        Ordered:
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </div>

                      <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                        <FaCalendarAlt />

                        <span className="font-medium">
                          Expected Delivery:
                        </span>

                        <span className="font-semibold">
                          {getExpectedDeliveryDate(order)}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg

${order.status === "placed"
                          ? "bg-blue-100 text-blue-700"

                          : order.status === "shipped"
                            ? "bg-yellow-100 text-yellow-700"

                            : order.status === "delivered"
                              ? "bg-green-100 text-green-700"

                              : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Products */}
                  <div className="p-8 space-y-6">
                    <OrderTracker
                      status={order.status}
                    />
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between items-center rounded-3xl
border
border-slate-200
shadow-sm
hover:shadow-xl
bg-gradient-to-r
from-white
to-slate-50
transition-all p-5 hover:bg-gray-50 "
                      >

                        <div className="flex items-center gap-5">

                         <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-md">

  {item.image ? (
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <div
      className="
      w-full
      h-full
      bg-gradient-to-br
      from-cyan-100
      to-teal-100
      flex
      items-center
      justify-center
      "
    >
      <FaBox className="text-5xl text-emerald-600" />
    </div>
  )}

</div>

                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>

                            <p className="text-gray-500">
                              Quantity : {item.quantity}
                            </p>
                          </div>

                        </div>

                        <div className="text-xl font-bold text-teal-600 flex items-center">
                          <FaRupeeSign />
                          {item.price}
                        </div>

                      </div>
                    ))}

                    {/* Summary */}
                    <div className="grid lg:grid-cols-3 gap-6 pt-6 border-t">

                      <div className="bg-gradient-to-br
from-sky-50
to-cyan-100
shadow-md
border
border-cyan-100 rounded-2xl p-5">

                        <div className="flex items-center gap-2 font-semibold mb-3">
                          <FaMapMarkerAlt />
                          Delivery Address
                        </div>

                        <p className="text-gray-700">
                          {order.deliveryAddress?.name}
                        </p>

                        <p className="text-gray-500">
                          {order.deliveryAddress?.mobile}
                        </p>

                        <p className="text-gray-500">
                          {order.deliveryAddress?.address}
                        </p>

                        <p className="text-gray-500">
                          {order.deliveryAddress?.district},{" "}
                          {order.deliveryAddress?.state}
                        </p>

                      </div>

                      <div className="bg-gradient-to-br
from-orange-50
to-yellow-100
shadow-md
border
border-yellow-200 rounded-2xl p-5">

                        <div className="flex items-center gap-2 font-semibold mb-3">
                          <FaCreditCard />
                          Payment
                        </div>

                        <p>
                          Method :
                          <span className="font-semibold ml-2">
                            {order.paymentMethod}
                          </span>
                        </p>

                        <p className="mt-2">
                          Status :
                          <span
                            className={`ml-2 font-semibold ${order.paymentStatus === "Paid"
                                ? "text-green-600"
                                : "text-orange-500"
                              }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </p>

                      </div>

                      <div className="bg-gradient-to-br
from-emerald-500
to-teal-700
text-white
shadow-xl rounded-2xl p-5 flex flex-col justify-between">

                        <div>
                          <p className="text-white/80">
                            Total Amount
                          </p>

                          <h2 className="text-4xl font-bold text-white mt-2 flex items-center">
                            <FaRupeeSign />
                            {order.totalAmount}
                          </h2>
                        </div>

                        {order.status === "placed" && (
                          <button
                            onClick={() =>
                              cancelOrder(order._id)
                            }
                            className="mt-6 bg-gradient-to-r
from-red-500
to-red-700
hover:from-red-600
hover:to-red-800
shadow-lg
hover:scale-105
duration-300 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                          >
                            <FaTimesCircle />
                            Cancel Order
                          </button>
                        )}

                      </div>

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