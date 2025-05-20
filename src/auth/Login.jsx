import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/store/useAuth";
import { resolveEmailFromIdentifier } from "../utils/helpers/resolveEmailFromIdentifier";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email / Username / Phone or Password is missing!",
      });
      return;
    }

    try {
      const email = await resolveEmailFromIdentifier(formData.identifier);
      await login(email, formData.password);

      // Login berhasil, tampilkan swal & redirect
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      // Login gagal
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Please check your credentials.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | NextEdu</title>
        <meta
          name="description"
          content="Login to access your NextEdu account."
        />
        <meta
          name="keywords"
          content="login, next edu, account, authentication"
        />
        <meta property="og:title" content="Login | NextEdu" />
        <meta
          property="og:description"
          content="Login to access your NextEdu account."
        />
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Please login to your account
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Email / Username / Phone
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={(e) =>
                  setFormData({ ...formData, identifier: e.target.value })
                }
                className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email, username, or phone"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-purple-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
