import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/common/Navbar";

export default function Cart() {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // ✅ FETCH CART
  const fetchCart = async () => {

    try {

      setLoading(true);

      const res = await API.get("/cart");

      setCart(res.data?.items || []);

    } catch (err) {

      console.log("Cart fetch error:", err);

      setCart([]);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchCart();

  }, []);

  // ✅ UPDATE QUANTITY
  const updateQuantity = async (
    productId,
    quantity
  ) => {

    if (quantity < 1) return;

    // ✅ Optimistic UI update
    setCart((prev) =>
      prev.map((item) =>
        item.productId._id === productId
          ? {
            ...item,
            quantity
          }
          : item
      )
    );

    try {

      await API.put("/cart/update", {
        productId,
        quantity
      });

    } catch (err) {

      console.log(err);

      setCart([]);
    }
  };

  // ✅ REMOVE ITEM
  const removeItem = async (id) => {

    // ✅ instant UI update
    setCart((prev) =>
      prev.filter(
        (item) =>
          item.productId._id !== id
      )
    );

    try {

      await API.delete(
        `/cart/remove/${id}`
      );

    } catch (err) {

      console.log(err);

      setCart([]);
    }
  };

  // ✅ PLACE ORDER
  const placeOrder = async () => {

    try {

      await API.post("/orders/place");

      alert("Order placed successfully ✅");

      fetchCart();

    } catch (err) {

      alert(
        err.response?.data?.msg ||
        "Order failed"
      );
    }
  };

  // ✅ CALCULATIONS
  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      item.productId?.price *
      item.quantity,
    0
  );

  const delivery =
    subtotal > 5000 ? 0 : 150;

  const gst = subtotal * 0.18;

  const total =
    subtotal + delivery + gst;

  // ✅ LOADING
  if (loading) {
    return (
      <div className="
        min-h-screen
        flex items-center
        justify-center
        text-2xl font-bold
      ">
        Loading Cart...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="
  max-w-7xl mx-auto
  px-4 pt-5
">

        <button
          onClick={() => navigate(-1)}
          className="
      flex items-center gap-2
      text-gray-700
      hover:text-black
      font-semibold
      transition
      mb-3
    "
        >
          ← Back
        </button>
      </div>
      <div className="
        min-h-screen
        bg-gradient-to-br
        from-gray-100
        via-white
        to-gray-200
        py-6 md:py-10
      ">

        <div className="
          max-w-7xl mx-auto
          px-4
          grid grid-cols-1
          lg:grid-cols-3
          gap-8
        ">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <h1 className="
              text-3xl md:text-4xl
              font-extrabold
              mb-8
              text-gray-900
            ">
              🛒 Shopping Cart
            </h1>

            {/* EMPTY CART */}
            {cart.length === 0 ? (

              <div className="
                bg-white
                rounded-3xl
                shadow-lg
                p-12
                text-center
              ">

                <h2 className="
                  text-3xl font-bold
                  text-gray-700
                ">
                  Your cart is empty
                </h2>

                <p className="
                  text-gray-500
                  mt-3
                ">
                  Add some products to continue shopping
                </p>
              </div>

            ) : (

              cart.map((item) => (

                <div
                  key={item.productId?._id}
                  className="
                    bg-white
                    rounded-3xl
                    shadow-md
                    hover:shadow-2xl
                    transition-all duration-300
                    p-5
                    mb-6
                  "
                >

                  <div className="
                    flex flex-col
                    sm:flex-row
                    gap-6
                  ">

                    {/* IMAGE */}
                    <div className="
                      w-full sm:w-40
                      h-56 sm:h-40
                      rounded-2xl
                      overflow-hidden
                      bg-gray-100
                      shrink-0
                    ">

                      <img
                        src={
                          item.productId?.image
                            ? item.productId.image.startsWith("http")
                              ? item.productId.image
                              : `http://localhost:5004/${item.productId.image}`
                            : "https://via.placeholder.com/300"
                        }
                        alt={item.productId?.name}
                        className="
                          w-full h-full
                          object-cover
                          hover:scale-105
                          transition duration-300
                        "
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">

                      {/* TOP */}
                      <div className="
                        flex flex-col
                        sm:flex-row
                        justify-between
                        gap-4
                      ">

                        <div>

                          <h2 className="
                            text-2xl
                            font-bold
                            text-gray-900
                          ">
                            {item.productId?.name}
                          </h2>

                          <p className="
                            text-gray-500
                            mt-1
                          ">
                            Premium Industrial Tool
                          </p>

                          {/* BADGES */}
                          <div className="
                            mt-3
                            flex flex-wrap
                            gap-3
                          ">

                            <span className="
                              bg-green-100
                              text-green-700
                              px-3 py-1
                              rounded-full
                              text-sm font-medium
                            ">
                              Free Delivery
                            </span>

                            <span className="
                              bg-red-100
                              text-red-600
                              px-3 py-1
                              rounded-full
                              text-sm font-medium
                            ">
                              12% OFF
                            </span>
                          </div>
                        </div>

                        {/* PRICE */}
                        <div className="
                          text-left
                          sm:text-right
                        ">

                          <div className="
  mt-3
  flex items-center
  gap-3
">

                            {/* MAIN PRICE */}
                            <h2 className="
    text-3xl md:text-2xl
    font-bold
    text-black
    tracking-tight
  ">
                              ₹{item.productId?.price}
                            </h2>

                            {/* MULTIPLIER BADGE */}
                            <div className="
    bg-gray-100
    px-4 py-1.5
    rounded-full
    flex items-center
    gap-2
  ">

                              <span className="
      text-lg
      text-gray-500
      font-medium
    ">
                                ×
                              </span>

                              <span className="
      text-xl
      font-bold
      text-black
    ">
                                {item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM */}
                      <div className="
                        mt-6
                        flex flex-col
                        sm:flex-row
                        justify-between
                        items-start
                        sm:items-center
                        gap-5
                      ">

                        {/* QUANTITY */}
                        <div className="
                          flex items-center
                          bg-gray-100
                          rounded-2xl
                          overflow-hidden
                          shadow-sm
                        ">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId._id,
                                item.quantity - 1
                              )
                            }
                            className="
                              px-5 py-3
                              hover:bg-gray-200
                              text-xl font-bold
                              transition
                            "
                          >
                            -
                          </button>

                          <div className="
                            px-6
                            font-bold
                            text-lg
                          ">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId._id,
                                item.quantity + 1
                              )
                            }
                            className="
                              px-5 py-3
                              hover:bg-gray-200
                              text-xl font-bold
                              transition
                            "
                          >
                            +
                          </button>
                        </div>

                        {/* REMOVE */}
                        <button
                          onClick={() =>
                            removeItem(
                              item.productId._id
                            )
                          }
                          className="
                            text-red-500
                            hover:text-red-600
                            font-semibold
                            transition
                          "
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT */}
          {cart.length > 0 && (

            <div>

              <div className="
                bg-white
                rounded-3xl
                shadow-xl
                p-6 md:p-8
                lg:sticky lg:top-10
              ">

                <h2 className="
                  text-3xl
                  font-bold
                  mb-8
                  text-gray-900
                ">
                  Order Summary
                </h2>

                <div className="
                  space-y-5
                  text-lg
                ">

                  <div className="
                    flex justify-between
                  ">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="
                    flex justify-between
                  ">
                    <span className="text-gray-500">
                      Delivery
                    </span>

                    <span className="
                      font-semibold
                      text-green-600
                    ">
                      {delivery === 0
                        ? "FREE"
                        : `₹${delivery}`}
                    </span>
                  </div>

                  <div className="
                    flex justify-between
                  ">
                    <span className="text-gray-500">
                      GST (18%)
                    </span>

                    <span className="font-semibold">
                      ₹{gst.toFixed(2)}
                    </span>
                  </div>

                  <div className="
                    border-t
                    pt-5
                    flex justify-between
                    text-3xl
                    font-extrabold
                  ">

                    <span>Total</span>

                    <span>
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                  {/* CHECKOUT */}
                  <button
                    onClick={() =>
                      navigate("/checkout")
                    }
                    className="
                      w-full mt-8
                      bg-black
                      hover:bg-gray-900
                      text-white
                      py-4
                      rounded-2xl
                      text-xl
                      font-bold
                      transition
                      active:scale-95
                    "
                  >
                    Proceed Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}