import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTools,
} from "react-icons/fa";

import API from "../../services/api";
import logo from "../../assets/logoo.png";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name =
        "Full Name is required";
    }

    if (!form.email) {
      newErrors.email =
        "Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(form.email)
    ) {
      newErrors.email =
        "Invalid email format";
    }

    if (!form.password) {
      newErrors.password =
        "Password is required";
    } else if (
      form.password.length < 6
    ) {
      newErrors.password =
        "Minimum 6 characters required";
    }

    if (
      form.confirmPassword !==
      form.password
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    return newErrors;
  };

  const passwordStrength =
    !form.password
      ? ""
      : form.password.length < 6
        ? "Weak"
        : form.password.length < 10
          ? "Medium"
          : "Strong";

  const handleRegister =
    async () => {
      const validationErrors =
        validate();

      setErrors(validationErrors);

      if (
        Object.keys(
          validationErrors
        ).length > 0
      )
        return;

      try {
        setLoading(true);

        const res = await API.post(
          "/auth/register",
          {
            name: form.name,
            email: form.email,
            password: form.password,
          }
        );

        // Save JWT
        localStorage.setItem(
          "token",
          res.data.token
        );

        // Save User
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        // Go to profile completion
        navigate("/profile");

      } catch (err) {
        setErrors({
          api:
            err.response?.data
              ?.msg ||
            "Registration failed",
        });
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
      {/* LEFT SIDE */}
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
          Join thousands of
          professionals using
          industrial-grade tools.
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
            Built For Performance
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
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

          <h2
            className="
              text-3xl
              font-bold
              text-gray-900
              text-center
            "
          >
            Create Account
          </h2>

          <p
            className="
              text-gray-500
              text-center
              mt-2
              mb-8
            "
          >
            Register to continue
          </p>

          {errors.api && (
            <div
              className="
                bg-red-100
                border
                border-red-300
                text-red-600
                p-3
                rounded-xl
                mb-4
              "
            >
              {errors.api}
            </div>
          )}

          {/* NAME */}
          <div className="mb-4">
            <div className="relative">
              <FaUser
                className="
                  absolute
                  left-4
                  top-4
                  text-gray-500
                "
              />

              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
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

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-4">
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

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-2">
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

          {/* PASSWORD STRENGTH */}
          {passwordStrength && (
            <p
              className={`
                text-sm
                mb-4
                font-medium
                ${passwordStrength ===
                  "Strong"
                  ? "text-green-600"
                  : passwordStrength ===
                    "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              `}
            >
              Password Strength:
              {" "}
              {passwordStrength}
            </p>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="mb-5">
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
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={
                  form.confirmPassword
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword:
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
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-4
                  text-gray-500
                "
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {
                  errors.confirmPassword
                }
              </p>
            )}
          </div>

          {/* REGISTER BUTTON */}
          <button
            onClick={handleRegister}
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
              shadow-lg
              shadow-red-500/30
            "
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          {/* LOGIN LINK */}
          <p
            className="
              text-center
              text-gray-600
              mt-6
            "
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="
                text-red-600
                font-semibold
                hover:underline
              "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}