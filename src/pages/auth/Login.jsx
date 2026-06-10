import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTools,
  FaArrowLeft,
} from "react-icons/fa";
import {
  GoogleLogin,
} from "@react-oauth/google";
import API from "../../services/api";
import logo from "../../assets/logoo.png";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (
      !form.email ||
      !form.password
    ) {
      return setError(
        "Please fill all fields"
      );
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/login",
        form
      );

      const user = res.data.user;

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      if (
        !user.profileCompleted
      ) {
        navigate("/profile");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      bg-gradient-to-br
      from-red-50
      via-white
      to-gray-100
    "
    >
      {/* LEFT SECTION */}
      <div
        className="
        hidden
        lg:flex
        w-1/2
        flex-col
        justify-center
        items-center
        p-12
      "
      >
        <img
          src={logo}
          alt="logo"
          className="
            w-72
            mb-8
            drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]
          "
        />

        <h1
          className="
            text-5xl
            font-black
            text-gray-900
            text-center
          "
        >
          NPT POWERTOOLS
        </h1>

        <p
          className="
            text-xl
            text-gray-700
            mt-6
            text-center
            max-w-lg
          "
        >
          Industrial Grade Power Tools
          For Professionals,
          Contractors & Businesses.
        </p>

        <div
          className="
            mt-10
            flex
            items-center
            gap-3
            text-red-500
          "
        >
          <FaTools size={28} />

          <span className="text-lg font-semibold">
            Trusted Quality Since Day One
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          px-4
          py-8
        "
      >
        <div
          className="
            w-full
            max-w-md
            bg-white
            rounded-3xl
            shadow-2xl
            border
            border-gray-200
            p-8
          "
        >
          {/* MOBILE LOGO */}
          <div className="lg:hidden text-center">
            <img
              src={logo}
              alt="logo"
              className="
                w-32
                mx-auto
                mb-4
              "
            />
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() =>
              navigate("/")
            }
            className="
              flex
              items-center
              gap-2
              text-gray-600
              hover:text-red-600
              mb-6
            "
          >
            <FaArrowLeft />
            Back To Home
          </button>

          <h2
            className="
              text-3xl
              font-bold
              text-gray-900
              text-center
            "
          >
            Welcome Back
          </h2>

          <p
            className="
              text-gray-500
              text-center
              mt-2
              mb-8
            "
          >
            Login to continue
          </p>
        
          {/* ERROR */}
          {error && (
            <div
              className="
                bg-red-50
                border
                border-red-200
                text-red-600
                p-3
                rounded-xl
                mb-5
                text-sm
              "
            >
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-5">
            <div className="relative">
              <FaEnvelope
                className="
                  absolute
                  left-4
                  top-4
                  text-gray-500
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-xl
                  bg-white
                  border
                  border-gray-300
                  text-gray-900
                  placeholder:text-gray-400
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-200
                  outline-none
                "
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <div className="relative">
              <FaLock
                className="
                  absolute
                  left-4
                  top-4
                  text-gray-500
                "
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  pl-12
                  pr-12
                  py-3
                  rounded-xl
                  bg-white
                  border
                  border-gray-300
                  text-gray-900
                  placeholder:text-gray-400
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-200
                  outline-none
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-4
                  text-gray-500
                "
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* FORGOT PASSWORD */}
          <div
            className="
              flex
              justify-end
              mb-6
            "
          >
            <Link
              to="/forgot-password"
              className="
                text-red-600
                text-sm
                hover:underline
              "
            >
              Forgot Password?
            </Link>
          </div>
  <div className="relative mb-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-gray-300"></div>
  </div>

  <div className="relative flex justify-center">
    <span className="bg-white px-4 text-sm text-gray-500">
      Continue With
    </span>
  </div>
</div>

<div className="mb-6 flex justify-center">
  <GoogleLogin
    onSuccess={async (response) => {
      try {
        const res = await API.post(
          "/auth/google",
          {
            credential:
              response.credential,
          }
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }}
    onError={() =>
      alert("Google Login Failed")
    }
    theme="outline"
    size="large"
    shape="pill"
    width="350"
  />
</div>
          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              text-white
              py-3
              rounded-xl
              font-bold
              transition
              disabled:opacity-50
              shadow-lg
              shadow-red-500/30
            "
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

          {/* REGISTER */}
          <p
            className="
              text-center
              text-gray-600
              mt-6
            "
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="
                text-red-600
                font-semibold
                hover:underline
              "
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}