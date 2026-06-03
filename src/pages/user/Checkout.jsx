import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/common/Navbar";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] =
    useState("COD");
  const [loading, setLoading] =
    useState(false);
   const [showAddressModal, setShowAddressModal] =
  useState(false);

const [addressForm, setAddressForm] =
  useState({
    name: "",
    mobile: "",
    address: "",
    district: "",
    state: "",
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cartRes = await API.get("/cart");
      const userRes = await API.get("/user/me");
      setUser(userRes.data);

setAddressForm({
  name: userRes.data.name || "",
  mobile: userRes.data.mobile || "",
  address: userRes.data.address || "",
  district: userRes.data.district || "",
  state: userRes.data.state || "",
});
      setCart(cartRes.data.items || []);
      setUser(userRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      item.productId.price * item.quantity,
    0
  );

  const delivery =
    subtotal > 5000 ? 0 : 150;

  const gst = subtotal * 0.18;

  const total =
    subtotal + delivery + gst;

const saveDeliveryAddress = () => {
  setShowAddressModal(false);

  console.log(
    "Updated Delivery Address",
    addressForm
  );
};

  const placeOrder = async () => {
    try {
      setLoading(true);

      await API.post("/orders/place", {

  paymentMethod,

  deliveryAddress: {
    name: addressForm.name,
    mobile: addressForm.mobile,
    address: addressForm.address,
    district: addressForm.district,
    state: addressForm.state,
  },

});

      alert(
        "Order Placed Successfully ✅"
      );

      navigate("/profile");
    } catch (err) {
      alert(
        err.response?.data?.msg ||
          "Order Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">

        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="
              mb-6
              flex
              items-center
              gap-2
              font-semibold
              text-gray-700
            "
          >
            ← Back
          </button>

          {/* Hero */}
          <div
            className="
              bg-gradient-to-r
              from-black
              via-gray-900
              to-black
              rounded-3xl
              p-8
              text-white
              shadow-2xl
              mb-8
            "
          >
            <h1 className="text-5xl font-black">
              Secure Checkout
            </h1>

            <p className="mt-3 text-gray-400">
              Complete your purchase
              securely
            </p>


          </div>

          {/* Steps */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

            <div className="flex justify-between items-center">

              <div className="text-center">
                <div
                  className="
                    h-12 w-12
                    rounded-full
                    bg-green-500
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  ✓
                </div>

                <p className="mt-2 font-semibold">
                  Address
                </p>
              </div>

              <div className="flex-1 h-1 bg-green-500 mx-4"></div>

              <div className="text-center">
                <div
                  className="
                    h-12 w-12
                    rounded-full
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  2
                </div>

                <p className="mt-2 font-semibold">
                  Payment
                </p>
              </div>

              <div className="flex-1 h-1 bg-gray-300 mx-4"></div>

              <div className="text-center">
                <div
                  className="
                    h-12 w-12
                    rounded-full
                    bg-gray-300
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  3
                </div>

                <p className="mt-2 font-semibold">
                  Review
                </p>
              </div>

            </div>

          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left Side */}
            <div className="lg:col-span-2 space-y-6">

              {/* Address */}
              <div className="bg-white rounded-3xl shadow-xl p-6">

                <div className="flex justify-between items-center mb-5">

  <h2 className="text-2xl font-bold">
    📍 Delivery Address
  </h2>

  <button
    onClick={() => setShowAddressModal(true)}
    className="
      bg-black
      text-white
      px-4
      py-2
      rounded-xl
      hover:bg-gray-800
      transition
    "
  >
    ✏️ Edit
  </button>

</div>

                {user && (
                <div className="bg-slate-50 rounded-2xl p-5 border">

  <h3 className="font-bold text-xl mb-2">
    {addressForm.name}
  </h3>

  <p className="text-gray-600">
    📞 {addressForm.mobile}
  </p>

  <p className="text-gray-700 mt-2 break-words">
    📍 {addressForm.address},
    {" "}
    {addressForm.district},
    {" "}
    {addressForm.state}
  </p>

</div>
                )}

              </div>

              {/* Payment */}
              <div className="bg-white rounded-3xl shadow-xl p-6">

                <h2 className="text-2xl font-bold mb-5">
                  Payment Method
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                  {/* UPI */}
                  <div
                    onClick={() =>
                      setPaymentMethod(
                        "UPI"
                      )
                    }
                    className={`
                      cursor-pointer
                      rounded-3xl
                      p-6
                      border-2
                      transition
                      ${
                        paymentMethod ===
                        "UPI"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <div className="text-5xl mb-3">
                      💸
                    </div>

                    <h3 className="font-bold">
                      UPI
                    </h3>

                    <p className="text-gray-500">
                      GPay, PhonePe,
                      Paytm
                    </p>
                  </div>

                  {/* COD */}
                  <div
                    onClick={() =>
                      setPaymentMethod(
                        "COD"
                      )
                    }
                    className={`
                      cursor-pointer
                      rounded-3xl
                      p-6
                      border-2
                      transition
                      ${
                        paymentMethod ===
                        "COD"
                          ? "border-black bg-gray-100"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <div className="text-5xl mb-3">
                      🚚
                    </div>

                    <h3 className="font-bold">
                      Cash On Delivery
                    </h3>

                    <p className="text-gray-500">
                      Pay after delivery
                    </p>
                  </div>

                  {/* Card */}
                  <div
                    onClick={() =>
                      setPaymentMethod(
                        "CARD"
                      )
                    }
                    className={`
                      cursor-pointer
                      rounded-3xl
                      p-6
                      border-2
                      transition
                      ${
                        paymentMethod ===
                        "CARD"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <div className="text-5xl mb-3">
                      💳
                    </div>

                    <h3 className="font-bold">
                      Card
                    </h3>

                    <p className="text-gray-500">
                      Visa • Mastercard
                    </p>
                  </div>

                </div>

              </div>

              {/* Products */}
              <div className="bg-white rounded-3xl shadow-xl p-6">

                <h2 className="text-2xl font-bold mb-5">
                  📦 Order Items
                </h2>

                <div className="space-y-4">

                  {cart.map((item) => (

                    <div
                      key={
                        item.productId._id
                      }
                     className="
                       
    bg-gray-50
    rounded-3xl
    p-4
    flex
    flex-col
    sm:flex-row
    gap-4
    items-start
    sm:items-center
  "
                    >

                      <img
                        src={
                          item.productId
                            .image
                            ? `${import.meta.env.VITE_API_URL}/${item.productId.image}`
                            : "https://via.placeholder.com/150"
                        }
                        alt=""
                        className="
  h-24
  w-24
  min-w-[96px]
  rounded-2xl
  object-cover
  mx-auto
  sm:mx-0
"
                      />

                      <div className="flex-1 w-full min-w-0">

                        <h3 className="font-bold text-lg">
                          {
                            item.productId
                              .name
                          }
                        </h3>

                        <p className="text-gray-500">
                          Quantity:
                          {" "}
                          {
                            item.quantity
                          }
                        </p>

                        <p className="text-green-600 font-bold mt-2">
                          ₹
                          {item.productId
                            .price *
                            item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* Right Side */}
            <div>

              <div
                className="
                  sticky
                  top-5
                  bg-white
                  rounded-3xl
                  shadow-2xl
                  p-6
                "
              >

                <h2 className="text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span>
                      Subtotal
                    </span>

                    <span>
                      ₹
                      {subtotal.toFixed(
                        2
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Delivery
                    </span>

                    <span>
                      {delivery === 0
                        ? "FREE"
                        : `₹${delivery}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      GST (18%)
                    </span>

                    <span>
                      ₹
                      {gst.toFixed(2)}
                    </span>
                  </div>

                </div>

                <div
                  className="
                    bg-gradient-to-r
                    from-green-500
                    to-green-600
                    text-white
                    rounded-3xl
                    p-6
                    mt-6
                  "
                >

                  <p>
                    Total Payable
                  </p>

                  <h1 className="text-5xl font-black">
                    ₹
                    {total.toFixed(
                      2
                    )}
                  </h1>

                  <p className="mt-3 text-green-100">
                    Estimated Delivery:
                    3-5 Business Days
                  </p>

                </div>

                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="
                    w-full
                    mt-6
                    bg-black
                    text-white
                    py-5
                    rounded-3xl
                    text-xl
                    font-black
                    hover:bg-gray-900
                    transition
                  "
                >
                  {loading
                    ? "Processing..."
                    : "🔒 Secure Place Order"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {showAddressModal && (

  <div
    className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      p-4
    "
  >

    <div
      className="
        bg-white
        rounded-3xl
        shadow-2xl
        w-full
        max-w-xl
        p-6
      "
    >

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Edit Delivery Address
        </h2>

        <button
          onClick={() =>
            setShowAddressModal(false)
          }
          className="
            text-gray-500
            text-xl
          "
        >
          ✕
        </button>

      </div>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Mobile Number"
          value={addressForm.mobile}
          onChange={(e) =>
            setAddressForm({
              ...addressForm,
              mobile: e.target.value,
            })
          }
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        />

        <textarea
          rows="3"
          placeholder="Address"
          value={addressForm.address}
          onChange={(e) =>
            setAddressForm({
              ...addressForm,
              address: e.target.value,
            })
          }
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        />

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="District"
            value={addressForm.district}
            onChange={(e) =>
              setAddressForm({
                ...addressForm,
                district: e.target.value,
              })
            }
            className="
              border
              rounded-xl
              p-3
            "
          />

          <input
            type="text"
            placeholder="State"
            value={addressForm.state}
            onChange={(e) =>
              setAddressForm({
                ...addressForm,
                state: e.target.value,
              })
            }
            className="
              border
              rounded-xl
              p-3
            "
          />

        </div>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() =>
            setShowAddressModal(false)
          }
          className="
            flex-1
            border
            py-3
            rounded-xl
          "
        >
          Cancel
        </button>

        <button
          onClick={saveDeliveryAddress}
          className="
            flex-1
            bg-black
            text-white
            py-3
            rounded-xl
          "
        >
          Save Address
        </button>

      </div>

    </div>

  </div>

)}
    </>
  );
}