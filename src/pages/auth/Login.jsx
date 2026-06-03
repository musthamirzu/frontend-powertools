import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import logo from "../../assets/logoo.png";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

const handleLogin = async () => {
  setError("");

  if (!form.email || !form.password) {
    return setError("All fields are required");
  }

  try {
    setLoading(true);

    const res = await API.post("/auth/login", form);

    const user = res.data.user;

    // ✅ Save token & user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(user));

    // 🔥 IMPORTANT LOGIC
    if (!user.profileCompleted) {
      nav("/profile"); // go to profile page
    } else {
      nav("/"); // normal flow
    }

  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data);
    setError(err.response?.data?.msg || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4">

      <img src={logo} alt="logo" className="w-32 mb-4" />

      <div className="w-full max-w-sm bg-white/10 p-6 rounded-xl">

        <h2 className="text-white text-center mb-4">Login</h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-2">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Logging..." : "Login"}
        </button>

        <p className="text-sm text-gray-400 mt-3 text-center">
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}