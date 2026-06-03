import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    state: "",
    district: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // success / error message
  const [loading, setLoading] = useState(false);

  // 🔍 Validation
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(form.mobile)) {
      newErrors.mobile = "Enter valid 10-digit mobile number";
    }

    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.district.trim()) newErrors.district = "District is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
    setStatus("");
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setStatus("");

      await API.post("/user/profile", form);

      setStatus("success");
      setTimeout(() => {
        nav("/");
      }, 1200);
    } catch (err) {
      setStatus("error");
console.log(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Complete Your Profile
        </h2>

        {/* 🔔 Status Messages */}
        {status === "success" && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm text-center">
            ✅ Profile updated successfully!
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
            ❌ Something went wrong. Please try again.
          </div>
        )}

        {/* Inputs */}
        {[
          { name: "name", label: "Full Name" },
          { name: "mobile", label: "Mobile Number" },
          { name: "address", label: "Address" },
          { name: "state", label: "State" },
          { name: "district", label: "District" },
        ].map((field) => (
          <div key={field.name} className="mb-4">

            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={form[field.name]}
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              placeholder={`Enter ${field.label}`}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition
                ${
                  errors[field.name]
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-green-400"
                }`}
            />

            {/* Inline Error */}
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        {/* Button */}
        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition shadow-md
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
          {loading ? "Saving..." : "Submit Profile"}
        </button>
      </div>
    </div>
  );
}