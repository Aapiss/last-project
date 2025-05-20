import React, { useState } from "react";
import { useAuth } from "../utils/store/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    try {
      await register(
        formData.full_name,
        formData.username,
        formData.telephone,
        formData.email,
        formData.password
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/login";
      });
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Please try again.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | NextEdu</title>
        <meta
          name="description"
          content="Bergabunglah dengan NextEdu, platform pembelajaran online terbaik untuk meningkatkan pengetahuan dan keterampilan Anda. Daftar sekarang dan mulai belajar dari para ahli!"
        />
        <meta
          name="keywords"
          content="NextEdu, daftar NextEdu, platform belajar online, pendidikan, kursus online, e-learning Indonesia"
        />
        <meta name="author" content="NextEdu Team" />
        <meta property="og:title" content="Daftar Sekarang di NextEdu" />
        <meta
          property="og:description"
          content="Akses ratusan kursus dan pelajaran dengan bergabung di NextEdu. Platform belajar online yang fleksibel dan berkualitas."
        />
        <meta property="og:image" content="URL_GAMBAR_SHARE" />
        <meta property="og:url" content="https://nextedu.com/register" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Create an Account
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Join us today! It's free and easy.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:ring-purple-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:ring-purple-500"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Telephone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telephone
              </label>
              <input
                type="tel"
                value={formData.telephone}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:ring-purple-500"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:ring-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:ring-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:ring-purple-500"
                placeholder="Re-enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-purple-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
