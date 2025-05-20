import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProfilePage from "./pages/ProfilePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AuthProvider from "./auth/AuthProvider";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./auth/AdminRoute";
import AuthRoute from "./auth/AuthRoute";
import UserRoute from "./auth/UserRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/contact" element={<Contact />} />

          <Route element={<UserRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AuthRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
