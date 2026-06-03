import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import logo from "../../assets/logoo.png";
export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // 🔥 VALIDATION FUNCTION
  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      await API.post("/auth/register", {
        email: form.email,
        password: form.password
      });

      nav("/profile"); // redirect to login

    } catch (err) {
      setErrors({
        api: err.response?.data?.msg || "Registration failed"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-500 to-red-900 px-4">

    {/* CENTER COLUMN */}
    <div className="flex flex-col items-center w-full max-w-sm">

      {/* LOGO */}
      <img
  src={logo}
  alt="NPT PowerTools"
  className="w-56 h-auto object-contain mb-3 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] hover:scale-105 transition"
/>

      {/* SUBTEXT */}
      <p className="text-gray-400 mb-6 text-sm text-center">
        Create your account
      </p>

      {/* CARD */}
      <div className="w-full bg-white/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">

        

        {/* API ERROR */}
        {errors.api && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {errors.api}
          </p>
        )}

        {/* EMAIL */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 rounded-lg bg-gray-900 text-white border ${
              errors.email ? "border-red-500" : "border-gray-700"
            } focus:outline-none focus:border-red-500`}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 rounded-lg bg-gray-900 text-white border ${
              errors.password ? "border-red-500" : "border-gray-700"
            } focus:outline-none focus:border-red-500`}
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full p-3 rounded-lg bg-gray-900 text-white border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-700"
            } focus:outline-none focus:border-red-500`}
            onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 shadow-lg shadow-red-500/30"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-400 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </div>

      {/* FOOTER */}
      <p className="text-gray-500 text-xs mt-6 text-center">
        Secure & Reliable ⚙️
      </p>

    </div>
  </div>
);
}