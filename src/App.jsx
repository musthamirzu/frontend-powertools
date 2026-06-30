import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Home from "./components/common/Home"

import Register from "./pages/auth/Register";

import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import Cart from "./pages/user/Cart"; // 🔥 IMPORTANT

import ProtectedRoute from "./components/common/ProtectedRoute";
import Products from "./components/common/Products";
import AdminUsers from "./pages/admin/UserList";
import AdminRoute from "./pages/auth/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import Checkout from "./pages/user/Checkout";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgetPassword";
import Orders from "./pages/user/Order";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        

<Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/orders/:id"
  element={<AdminOrderDetails />}
/>
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
  path="/products/:category"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
  path="/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;