import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import ProfileMenu from "./mui/ProfileMenu";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../utils/store/useAuth";
import { Button } from "@/components/ui/button";

const Header = ({ className = "fixed" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
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

  const linkStyle = `block font-medium text-white hover:text-gray-200 transition`;

  return (
    <header
      className={`${className} top-0 left-0 w-full z-50 transition-all duration-300 bg-purple-600 shadow-md`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Kiri: Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          NextEdu
        </Link>

        {/* Kanan: Nav + DarkMode + User (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Nav */}
          <nav className="flex gap-6">
            <Link to="/" className={linkStyle}>
              Home
            </Link>
            <Link to="/courses" className={linkStyle}>
              Courses
            </Link>
            <Link to="/about" className={linkStyle}>
              About
            </Link>
            <Link to="/contact" className={linkStyle}>
              Contact
            </Link>
          </nav>

          {/* DarkMode Button */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-purple-700 hover:bg-gray-100 transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* User */}
          {user ? (
            <>
              <ProfileMenu setUser={setUser} setMenuOpen={setMenuOpen} />
              {role === "admin" && (
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="text-white hover:bg-purple-700"
                  variant="ghost"
                >
                  Dashboard
                </Button>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-purple-700 py-2 px-4 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50"
        >
          <span
            className={`h-1 w-6 bg-white rounded transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`h-1 w-6 bg-white rounded my-1 transition-all duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`h-1 w-6 bg-white rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-purple-600 px-4 pb-4 pt-2 space-y-3">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/about"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div className="flex justify-between items-center mt-4">
            {/* Darkmode */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-purple-700 hover:bg-gray-100 transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* User (Mobile) */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <ProfileMenu setUser={setUser} setMenuOpen={setMenuOpen} />
                  {role === "admin" && (
                    <Button
                      onClick={() => {
                        navigate("/dashboard");
                        setMenuOpen(false);
                      }}
                      className="bg-black text-black hover:bg-white hover:text-black"
                      size="sm"
                    >
                      Dashboard
                    </Button>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-purple-700 py-1.5 px-3 rounded-full font-medium text-sm hover:bg-gray-200 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
