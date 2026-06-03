import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import {
  FaUsers,
  FaUserShield,
  FaCheckCircle,
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          flex items-center gap-2
          mb-6
          px-4 py-2
          bg-black
          text-white
          rounded-lg
          hover:bg-gray-800
          transition
        "
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Users Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all registered users
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-2xl shadow p-5">
          <div className="flex items-center gap-4">
            <FaUsers className="text-3xl text-blue-500" />

            <div>
              <p className="text-gray-500">
                Total Users
              </p>

              <h2 className="text-2xl font-bold">
                {users.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <div className="flex items-center gap-4">
            <FaUserShield className="text-3xl text-purple-500" />

            <div>
              <p className="text-gray-500">
                Admin Users
              </p>

              <h2 className="text-2xl font-bold">
                {
                  users.filter(
                    (u) => u.role === "admin"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-3xl text-green-500" />

            <div>
              <p className="text-gray-500">
                Profile Completed
              </p>

              <h2 className="text-2xl font-bold">
                {
                  users.filter(
                    (u) => u.profileCompleted
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Search Box */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <div className="flex items-center gap-3 border rounded-lg px-4">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full p-3 outline-none"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-black text-white">
              <tr>
                <th className="p-4 text-left">
                  User
                </th>

                <th className="p-4 text-left">
                  Mobile
                </th>

                <th className="p-4 text-left">
                  Address
                </th>

                <th className="p-4 text-left">
                  Location
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Profile Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr
                    key={u._id}
                    className="
                      border-b
                      hover:bg-gray-50
                      transition
                    "
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-semibold">
                          {u.name || "No Name"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {u.email}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      {u.mobile || "-"}
                    </td>

                    <td className="p-4">
                      {u.address || "-"}
                    </td>

                    <td className="p-4">
                      {u.district || "-"},{" "}
                      {u.state || "-"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`
                          px-3 py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        `}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`
                          px-3 py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${
                            u.profileCompleted
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {u.profileCompleted
                          ? "Completed"
                          : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="
                      text-center
                      py-10
                      text-gray-500
                    "
                  >
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}