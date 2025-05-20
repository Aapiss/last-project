import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Header from "../components/Header";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_8i7unt4",
        "template_cd7nh7d",
        formData,
        "VawtJuMq-Ar6TLzQM"
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message sent!",
            text: "Thank you for contacting us. We will get back to you soon.",
            confirmButtonColor: "#7e22ce", // ungu
          });

          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Failed to send",
            text: "There is an error: " + error.text,
            confirmButtonColor: "#dc2626", // merah
          });
        }
      );
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - NextEdu</title>
        <meta
          name="description"
          content="Hubungi tim NextEdu untuk pertanyaan, saran, atau kerja sama. Kami siap membantu Anda."
        />
        <meta property="og:title" content="Hubungi Kami - NextEdu" />
        <meta
          property="og:description"
          content="Silakan hubungi NextEdu jika Anda memiliki pertanyaan tentang platform, kursus, atau kerja sama."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextedu.example.com/contact" />
        <meta property="og:site_name" content="NextEdu" />
        <meta
          property="og:image"
          content="https://nextedu.example.com/cover.jpg"
        />
        <meta
          name="keywords"
          content="kontak nextedu, hubungi nextedu, bantuan nextedu, kerja sama nextedu, customer service nextedu"
        />
      </Helmet>
      <Header />
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-8">
        <motion.h2
          className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
          If you have any questions or want to collaborate, don't hesitate to
          contact us via the form below or via our contact information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
          {/* Formulir Kontak */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-md w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Send message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Write your message..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Info Kontak */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-md w-full flex flex-col justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Contact Info
            </h3>
            <div className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-3">
                <FaPhone className="text-purple-600" /> +62 896 0840 0215
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-purple-600" />{" "}
                mhafidzmushtofa@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-purple-600" /> Jakarta,
                Indonesia
              </p>
            </div>

            {/* Media Sosial */}
            <div className="flex gap-6 mt-6 text-purple-700 dark:text-purple-400 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-900 dark:hover:text-purple-300 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-900 dark:hover:text-purple-300 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-900 dark:hover:text-purple-300 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
