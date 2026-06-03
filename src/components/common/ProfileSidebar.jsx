import { useEffect, useState } from "react";
import API from "../../services/api";
import { FaTimes } from "react-icons/fa";

export default function ProfileSidebar({ isOpen, onClose }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isOpen) {
      API.get("/user/me")
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">My Profile</h2>
          <FaTimes
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {user ? (
            <>
              <div className="mb-4">
                <p className="text-gray-500 text-sm">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 text-sm">Mobile</p>
                <p className="font-medium">{user.mobile}</p>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}