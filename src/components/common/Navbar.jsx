import { useState, useRef, useEffect } from "react";
import logo from "../../assets/logoo.png";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import ProfilePopup from "./ProfilePopup";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] =
  useState(false);
  const popupRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
  console.log("Stored User:", user);
}, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 SCROLL FUNCTION (WITH OFFSET FIX)
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80; // navbar height adjust
    const y =
      el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setMenuOpen(false); // close mobile menu
  };

  return (
    <div className="bg-white border-b shadow-sm">

      {/* 🔥 TOP ROW */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="NPT" className="h-12 w-15" />
          <span className="font-bold text-gray-800 text-sm md:text-lg">
            NPT POWERTOOLS
          </span>
        </div>

        {/* SEARCH */}
        <div className="hidden md:block w-1/2 px-6">
          <input
            placeholder="Search"
            className="w-full px-5 py-2 rounded-full bg-gray-100 border focus:outline-none"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative" ref={popupRef}>
          {user ? (
            <div
             
              className="hidden md:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
            >
              <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">
                {(user.name || user.email)?.charAt(0).toUpperCase()}
              </span>
              {user.name || user.email}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              Join with us
            </button>
          )}

          <FaUser
            className="cursor-pointer text-gray-700 text-lg hover:text-teal-600"
            onClick={() => {
              if (user) {
                setProfileOpen(!profileOpen);
              } else {
                navigate("/login");
              }
            }}
          />

          <FaShoppingCart className="cursor-pointer text-gray-700 text-lg" />

          {profileOpen && <ProfilePopup />}

          {/* MOBILE MENU BTN */}
          <div className="md:hidden">
            {menuOpen ? (
              <FaTimes onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 py-2 justify-between text-sm text-gray-700">
        <div className="flex gap-6">
          <span
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:text-teal-600"
          >
            ABOUT US
          </span>

          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <span className="cursor-pointer hover:text-teal-600">
              SHOP
            </span>

            {shopOpen && (
              <div className="absolute top-6 left-0 bg-white shadow-lg rounded-lg w-56 py-2 z-50 border">

                <div
                  onClick={() => navigate("/products")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  View All
                </div>

                <div
                  onClick={() => navigate("/products/power-tools")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Power Tools
                </div>

                <div
                  onClick={() => navigate("/products/power-tools-accessories")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Power Tools Accessories
                </div>

                <div
                  onClick={() => navigate("/products/hand-tools")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Hand Tools
                </div>

              </div>
            )}
          </div>

          {/* ✅ FIXED */}
          <span
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer hover:text-teal-600"
          >
            CONTACT US
          </span>
        </div>

        <div className="text-gray-600">
          +91 7402471678 &nbsp; info@nptpowertools.in
        </div>
      </div>

      {/* MOBILE MENU */}
     {menuOpen && (
  <div
    className="
      md:hidden
      bg-white
      border-t
      shadow-lg
      px-5
      py-4
    "
  >
    {/* Search */}
    <input
      placeholder="Search Products..."
      className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-gray-100
        border
        mb-5
      "
    />

    {/* Menu Items */}
    <div className="flex flex-col gap-4">

      <button
        onClick={() => scrollToSection("about")}
        className="
          text-left
          font-medium
          py-2
          border-b
        "
      >
        ABOUT US
      </button>

      {/* Mobile Shop */}
      <div>

        <button
          onClick={() =>
            setMobileShopOpen(
              !mobileShopOpen
            )
          }
          className="
            w-full
            flex
            justify-between
            items-center
            font-medium
            py-2
            border-b
          "
        >
          <span>SHOP</span>

          <span>
            {mobileShopOpen
              ? "−"
              : "+"}
          </span>
        </button>

        {mobileShopOpen && (
          <div
            className="
              mt-2
              ml-3
              bg-gray-50
              rounded-xl
              overflow-hidden
            "
          >

            <div
              onClick={() => {
                navigate("/products");
                setMenuOpen(false);
              }}
              className="
                px-4
                py-3
                border-b
                cursor-pointer
              "
            >
              View All
            </div>

            <div
              onClick={() => {
                navigate(
                  "/products/power-tools"
                );
                setMenuOpen(false);
              }}
              className="
                px-4
                py-3
                border-b
                cursor-pointer
              "
            >
              Power Tools
            </div>

            <div
              onClick={() => {
                navigate(
                  "/products/power-tools-accessories"
                );
                setMenuOpen(false);
              }}
              className="
                px-4
                py-3
                border-b
                cursor-pointer
              "
            >
              Power Tools Accessories
            </div>

            <div
              onClick={() => {
                navigate(
                  "/products/hand-tools"
                );
                setMenuOpen(false);
              }}
              className="
                px-4
                py-3
                cursor-pointer
              "
            >
              Hand Tools
            </div>

          </div>
        )}

      </div>

      <button
        onClick={() =>
          scrollToSection("contact")
        }
        className="
          text-left
          font-medium
          py-2
          border-b
        "
      >
        CONTACT US
      </button>

    </div>

    {/* Contact Info */}
    <div
      className="
        mt-5
        text-sm
        text-gray-500
        border-t
        pt-4
      "
    >
      <p>📞 +91 7402471678</p>
      <p>✉️ info@nptpowertools.in</p>
    </div>

  </div>
)}
    </div>
  );
}