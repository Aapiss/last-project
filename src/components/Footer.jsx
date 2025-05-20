// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-purple-600 text-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1: About */}
        <div>
          <h4 className="text-lg font-bold mb-4">About EduLearn</h4>
          <p className="text-sm leading-relaxed">
            EduLearn is an online learning platform providing top-notch courses
            for students, professionals, and lifelong learners worldwide.
          </p>
        </div>

        {/* Section 2: Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="text-white hover:text-purple-300 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/courses"
                className="text-white hover:text-purple-300 transition"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-white hover:text-purple-300 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-white hover:text-purple-300 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Social Media */}
        <div>
          <h4 className="text-lg font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.tiktok.com/@muhammapid_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-white text-purple-600 rounded-full hover:bg-purple-300 hover:text-white transition"
            >
              <i className="fab fa-tiktok"></i>
            </a>
            <a
              href="https://www.instagram.com/muhammapid_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-white text-purple-600 rounded-full hover:bg-purple-300 hover:text-white transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-hafidz-742996277/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-white text-purple-600 rounded-full hover:bg-purple-300 hover:text-white transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-purple-800 text-center py-4 dark:bg-gray-900">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} EduLearn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
