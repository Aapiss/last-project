import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "../utils/SupaClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const scrollRef = useRef(null);

  // Fetch courses and categories
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data);
        const uniqueCategories = [
          "All",
          ...new Set(data.map((course) => course.category)),
        ];
        setCategories(uniqueCategories);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  // Handle horizontal scroll using wheel
  useEffect(() => {
    const handleWheel = (event) => {
      if (scrollRef.current) {
        event.preventDefault();
        scrollRef.current.scrollBy({
          left: event.deltaY, // Use deltaY for horizontal scroll
          behavior: "smooth",
        });
      }
    };

    const container = scrollRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Online Course - NextEdu</title>
        <meta
          name="description"
          content="Temukan berbagai kursus online berkualitas di NextEdu. Tingkatkan skill kamu dari pemula hingga mahir bersama mentor berpengalaman."
        />
        <meta property="og:title" content="Kursus Online - NextEdu" />
        <meta
          property="og:description"
          content="Belajar jadi lebih mudah dengan kursus dari NextEdu. Akses materi kapan saja, di mana saja."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextedu.example.com/courses" />
        <meta property="og:site_name" content="NextEdu" />
        <meta
          property="og:image"
          content="https://nextedu.example.com/cover.jpg"
        />
        <meta
          name="keywords"
          content="kursus online, belajar online, nextedu, belajar web, belajar coding, kelas online"
        />
      </Helmet>
      <Header className="sticky" />
      <section className="bg-gray-100 min-h-screen p-8 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-4xl font-bold text-center text-purple-700 dark:text-white mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Our Courses
          </motion.h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Learn new skills and boost your career with our high-quality
            courses.
          </p>

          {/* Filter Kategori dengan Scroll Horizontal */}
          <div className="relative mb-8 max-w-3xl mx-auto">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto whitespace-nowrap scroll-smooth snap-x scrollbar-hide px-2"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-center font-semibold transition duration-300 ${
                    selectedCategory === category
                      ? "bg-purple-700 text-white shadow-lg"
                      : "bg-white text-gray-700 dark:bg-gray-700 dark:text-white shadow hover:bg-purple-200 dark:hover:bg-purple-600"
                  } snap-start`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Grid Kursus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition dark:bg-gray-700 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={course.image}
                  alt={course.courses_name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {course.courses_name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {course.category}
                  </p>

                  {/* Deskripsi Kursus */}
                  <p className="text-gray-600 mt-2 text-sm dark:text-gray-300">
                    {course.description.length > 100
                      ? `${course.description.substring(0, 100)}...`
                      : course.description}
                  </p>

                  <Link to={`/courses/${course.id}`}>
                    <motion.button
                      className="mt-4 w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition dark:bg-purple-600 dark:hover:bg-purple-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Courses;
