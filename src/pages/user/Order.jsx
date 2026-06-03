import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my").then(res => setOrders(res.data));
  }, []);

  const cancelOrder = async (id) => {
    await API.put(`/orders/cancel/${id}`);
    alert("Order cancelled");
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {orders.map(order => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p>Status: {order.status}</p>

          {order.items.map(item => (
            <p key={item.productId}>
              {item.name} x {item.quantity}
            </p>
          ))}

          {order.status === "placed" && (
            <button
              onClick={() => cancelOrder(order._id)}
              className="bg-red-500 text-white px-3 py-1 mt-2"
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}