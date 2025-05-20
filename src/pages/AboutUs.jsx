import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const branches = [
    { city: "Jakarta", address: "Jl. Sudirman No. 10, Jakarta" },
    { city: "Bandung", address: "Jl. Asia Afrika No. 15, Bandung" },
    { city: "Surabaya", address: "Jl. Basuki Rahmat No. 20, Surabaya" },
    { city: "Yogyakarta", address: "Jl. Malioboro No. 5, Yogyakarta" },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - NextEdu</title>
        <meta
          name="description"
          content="NextEdu adalah platform edukasi online yang berkomitmen menyediakan pembelajaran berkualitas dan aksesibel bagi semua orang."
        />
        <meta property="og:title" content="Tentang Kami - NextEdu" />
        <meta
          property="og:description"
          content="Kenali visi, misi, dan tim di balik NextEdu, platform pembelajaran online terpercaya di Indonesia."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextedu.example.com/about" />
        <meta property="og:site_name" content="NextEdu" />
        <meta
          property="og:image"
          content="https://nextedu.example.com/cover.jpg"
        />
        <meta
          name="keywords"
          content="tentang nextedu, platform edukasi, visi misi nextedu, belajar online, edukasi digital"
        />
      </Helmet>
      <Header className="sticky" /> {/* Tambahkan Header */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Judul */}
          <motion.h2
            className="text-4xl font-bold text-center text-purple-700 dark:text-purple-400 mb-8"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Gambar */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="/team.png"
                alt="Our Team"
                className="rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Teks */}
            <motion.div
              className="md:w-1/2 text-gray-800 dark:text-gray-200"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
                Who We Are?
              </h3>
              <p className="mb-4">
                We are a passionate team dedicated to providing high-quality
                online education. Our platform offers a variety of courses that
                empower learners to develop new skills and advance in their
                careers.
              </p>
              <p>
                Our mission is to make education accessible and engaging for
                everyone. Join us and start learning today!
              </p>
            </motion.div>
          </div>

          {/* Statistik */}
          <motion.div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                50K+
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Students Enrolled
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                100+
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Courses Available
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                4.8/5
              </h4>
              <p className="text-gray-600 dark:text-gray-300">Average Rating</p>
            </div>
          </motion.div>

          {/* Lokasi & Cabang */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold text-center text-purple-700 dark:text-purple-400 mb-6">
              Our Locations
            </h3>

            {/* Google Maps (Dark Mode) */}
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Our Location"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0830380127953!2d107.61912397416134!3d-7.235037671373865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9bcd5bb5b3f%3A0x47a9a8a00eae3aeb!2sBandung!5e0!3m2!1sen!2sid&output=embed&t=dark"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Cabang */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {branches.map((branch, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 dark:bg-gray-800 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold text-purple-700 dark:text-purple-400">
                    {branch.city}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {branch.address}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
