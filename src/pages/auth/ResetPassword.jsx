import { useState } from "react";
import {
  useParams,
  useNavigate
} from "react-router-dom";

import API from "../../services/api";

export default function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password,
    setPassword] =
    useState("");

  const handleSubmit =
    async () => {

      await API.put(
        `/auth/reset-password/${token}`,
        { password }
      );

      alert(
        "Password Updated"
      );

      navigate("/login");
    };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold mb-4">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
        />

        <button
          onClick={
            handleSubmit
          }
          className="
            w-full
            bg-green-600
            text-white
            p-3
            rounded
            mt-4
          "
        >
          Update Password
        </button>

      </div>
    </div>
  );
}