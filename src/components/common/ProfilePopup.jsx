import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import {
  FaShoppingCart,
  FaBoxOpen,
  FaUserEdit,
  FaSignOutAlt,
  FaUsers,
  FaBox,
  FaChartBar,
  FaFolderOpen,
} from "react-icons/fa";

export default function ProfilePopup() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/user/me")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div
        className="
          absolute
          right-0
          top-14
          w-80
          bg-white
          rounded-3xl
          shadow-xl
          border
          z-50
          p-6
        "
      >
        <p className="text-center text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <div
      className="
        absolute
        right-0
        top-14
        w-80
        bg-white/95
        backdrop-blur-lg
        rounded-3xl
        border
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        overflow-hidden
        z-50
      "
    >
      {/* Arrow */}
      <div className="absolute -top-2 right-5 w-4 h-4 bg-white rotate-45 border-l border-t"></div>

      {/* HEADER */}
      <div className="p-5 bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="flex items-center gap-4">
          <div
            className="
              h-14
              w-14
              rounded-full
              bg-white
              text-black
              flex
              items-center
              justify-center
              text-xl
              font-bold
            "
          >
            {(user.name || user.email)
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {user.name}
            </h3>

            <p className="text-xs text-gray-300">
              {user.email}
            </p>

            <span
              className={`
                inline-block
                mt-2
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${
                  isAdmin
                    ? "bg-yellow-400 text-black"
                    : "bg-blue-500 text-white"
                }
              `}
            >
              {isAdmin ? "ADMIN" : "USER"}
            </span>
          </div>
        </div>
      </div>

      {/* USER MENU */}
      <div className="p-3">

        <button
          onClick={() => navigate("/cart")}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            hover:bg-gray-100
            hover:translate-x-1
            transition-all
          "
        >
          <FaShoppingCart />
          Cart
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            hover:bg-gray-100
            hover:translate-x-1
            transition-all
          "
        >
          <FaBoxOpen />
          My Orders
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            hover:bg-gray-100
            hover:translate-x-1
            transition-all
          "
        >
          <FaUserEdit />
          Edit Profile
        </button>

        {/* ADMIN SECTION */}
        {isAdmin && (
          <>
            <div className="border-t my-3"></div>

            <p className="px-4 mb-2 text-xs uppercase text-gray-400 font-semibold">
              Admin Panel
            </p>

            <button
              onClick={() =>
                navigate("/admin/dashboard")
              }
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                hover:bg-blue-50
                hover:text-blue-600
                hover:translate-x-1
                transition-all
              "
            >
              <FaChartBar />
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/admin/orders")
              }
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                hover:bg-blue-50
                hover:text-blue-600
                hover:translate-x-1
                transition-all
              "
            >
              <FaBox />
              All Orders
            </button>

            <button
              onClick={() =>
                navigate("/admin/users")
              }
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                hover:bg-blue-50
                hover:text-blue-600
                hover:translate-x-1
                transition-all
              "
            >
              <FaUsers />
              Users
            </button>

            <button
              onClick={() =>
                navigate("/products")
              }
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                hover:bg-blue-50
                hover:text-blue-600
                hover:translate-x-1
                transition-all
              "
            >
              <FaFolderOpen />
              Products
            </button>
          </>
        )}

        {/* LOGOUT */}
        <div className="border-t my-3"></div>

        <button
          onClick={logout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            py-3
            rounded-xl
            bg-red-500
            hover:bg-red-600
            text-white
            font-medium
            transition-all
          "
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}