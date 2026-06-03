import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Users Management
      </h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Mobile</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b"
              >
                <td className="p-3">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">
                  {user.role}
                </td>

                <td className="p-3">
                  {user.mobile}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}