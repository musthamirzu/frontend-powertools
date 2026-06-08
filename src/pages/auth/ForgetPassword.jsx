import { useState } from "react";
import API from "../../services/api";

export default function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const [msg, setMsg] =
    useState("");

  const handleSubmit =
    async () => {

      const res =
        await API.post(
          "/auth/forgot-password",
          { email }
        );

      setMsg(res.data.msg);
    };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold mb-4">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>
            setEmail(
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
            bg-red-600
            text-white
            p-3
            rounded
            mt-4
          "
        >
          Send Reset Link
        </button>

        {msg && (
          <p className="mt-3 text-green-600">
            {msg}
          </p>
        )}

      </div>
    </div>
  );
}