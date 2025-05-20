import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";
import ProfileMenu from "./mui/ProfileMenu";
import { Moon, Sun } from "lucide-react"; // Tambahkan icon dari lucide-react
import { useAuth } from "../utils/store/useAuth";
import { Button } from "@/components/ui/button";

const Header = ({ className = "fixed" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State dark mode
  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    if (storedMode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header
      className={`${className} top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-purple-600 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">
            <h2
              className={`${
                scrolled ? "text-gray-200" : "text-black dark:text-white"
              }`}
            >
              NextEdu
            </h2>
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <div
            className={`h-1 w-6 rounded transform transition-all duration-300 ${
              scrolled ? "bg-gray-200" : "bg-white"
            } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></div>
          <div
            className={`h-1 w-6 rounded my-1 transition-all duration-300 ${
              scrolled ? "bg-gray-200" : "bg-white"
            } ${menuOpen ? "opacity-0" : "opacity-100"}`}
          ></div>
          <div
            className={`h-1 w-6 rounded transform transition-all duration-300 ${
              scrolled ? "bg-gray-200" : "bg-white"
            } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></div>
        </button>

        {/* Menu */}
        <nav
          className={`${menuOpen ? "block" : "hidden"} absolute md:relative ${
            scrolled ? "bg-purple-600 md:bg-transparent" : "bg-transparent"
          } top-16 md:top-auto left-0 w-full md:w-auto md:flex items-center space-y-4 md:space-y-0 md:space-x-6 px-4 md:px-0 z-50`}
        >
          <Link
            to="/"
            className={`block font-medium transition ${
              scrolled
                ? "text-gray-200 hover:text-white"
                : "text-black hover:text-gray-400 dark:text-white"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`block font-medium transition ${
              scrolled
                ? "text-gray-200 hover:text-white"
                : "text-black hover:text-gray-400 dark:text-white"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/about"
            className={`block font-medium transition ${
              scrolled
                ? "text-gray-200 hover:text-white"
                : "text-black hover:text-gray-400 dark:text-white"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block font-medium transition ${
              scrolled
                ? "text-gray-200 hover:text-white"
                : "text-black hover:text-gray-400 dark:text-white"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {/* Tombol Dark Mode (desktop) */}
          <button
            onClick={toggleDarkMode}
            className={`hidden md:flex items-center justify-center w-9 h-9 rounded-full transition ${
              scrolled
                ? "bg-gray-100 text-purple-700"
                : "bg-white text-purple-700"
            } hover:bg-gray-200`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Login / Profile */}
          {user ? (
            <ProfileMenu setUser={setUser} setMenuOpen={setMenuOpen} />
          ) : (
            <Link
              to="/login"
              className={`block py-2 px-4 rounded-full font-medium transition duration-300 ${
                scrolled
                  ? "bg-white text-purple-700 hover:bg-gray-200 hover:text-purple-900"
                  : "bg-purple-700 text-white hover:bg-purple-500"
              } w-full md:w-auto text-center`}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
          {role === "admin" && (
            <Button onClick={() => navigate("/dashboard")} className="ml-4">
              Dashboard
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
