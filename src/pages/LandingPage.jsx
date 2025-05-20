import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/ui/WhyChooseUs";
import CourseCategories from "../components/ui/CoursesCategories";
import Promotion from "../components/ui/Promotion";
import Statistics from "../components/ui/Statistics";
import FAQ from "../components/ui/FAQ";
import PopularCourses from "../components/ui/PopularCourses";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../utils/store/useAuth";
import Swal from "sweetalert2";
import LoadingScreen from "../components/LoadingScreen";
import { Helmet } from "react-helmet-async";
const LandingPage = () => {
  const { user, role, username, auth } = useAuth();
  const [shownWelcome, setShownWelcome] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasShown = localStorage.getItem("shownWelcome");

    if (auth && !hasShown) {
      Swal.fire({
        title: `Welcome, ${username || "User"}!`,
        text: `You are logged in as ${role.toUpperCase()}`,
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      localStorage.setItem("shownWelcome", "true");
    }
  }, [auth, role, username]);

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 detik

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>NextEdu | Best Online Learning Platform</title>
        <meta
          name="description"
          content="NextEdu adalah platform pembelajaran online terpercaya yang menyediakan berbagai kursus untuk meningkatkan keterampilan dan pengetahuan Anda. Mulai belajar dari mana saja dan kapan saja."
        />
        <meta
          name="keywords"
          content="NextEdu, belajar online, kursus online, platform edukasi, e-learning, pendidikan digital, belajar dari rumah"
        />
        <meta name="author" content="NextEdu Team" />

        {/* Open Graph untuk media sosial */}
        <meta
          property="og:title"
          content="NextEdu - Belajar Online Lebih Mudah dan Fleksibel"
        />
        <meta
          property="og:description"
          content="Gabung dengan ribuan pelajar yang sudah belajar di NextEdu. Temukan kursus yang sesuai dengan minat dan tujuan karier Anda."
        />
        <meta property="og:image" content="https://nextedu.com/og-image.png" />
        <meta property="og:url" content="https://nextedu.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="NextEdu - Platform Belajar Online"
        />
        <meta
          name="twitter:description"
          content="NextEdu menyediakan ratusan kursus online untuk membantu Anda berkembang. Belajar kapan saja dan di mana saja."
        />
        <meta name="twitter:image" content="https://nextedu.com/og-image.png" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Hero Section Carousel */}
        <Slider
          dots={true}
          infinite={true}
          speed={1000}
          autoplay={true}
          autoplaySpeed={5000}
          fade={true}
          arrows={false}
          className="relative"
        >
          {[
            "/images/bg-hero.jpg",
            "/images/bg-hero2.jpg",
            "/images/bg-hero3.jpg",
          ].map((image, index) => (
            <div key={index}>
              <section
                className="relative text-white py-32 min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="container mx-auto px-4 text-center">
                  <h1 className="text-5xl sm:text-6xl font-bold mb-6 drop-shadow-lg">
                    Welcome to <span className="text-yellow-300">NextEdu</span>
                  </h1>
                  <p className="text-xl sm:text-2xl mb-10 text-white dark:text-gray-200">
                    Learn new skills and grow your career with our online
                    courses.
                  </p>
                  <a
                    href="#about"
                    className="px-8 py-4 bg-white text-purple-700 rounded-lg font-bold text-lg hover:bg-gray-200 transition border-none dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                  >
                    Get Started
                  </a>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-white rounded-tl-full rounded-tr-full h-12 dark:bg-gray-900"></div>
              </section>
            </div>
          ))}
        </Slider>

        {/* About Us Section */}
        <section className="bg-white py-16 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            {/* Heading and Description */}
            <div id="about" className="text-center mb-12">
              <h2 className="text-4xl font-bold text-purple-700 dark:text-white mb-4">
                About Us
              </h2>
              <p className="text-lg text-black dark:text-gray-200 leading-relaxed">
                At{" "}
                <span className="font-bold text-purple-700 dark:text-yellow-400">
                  EduLearn
                </span>
                , we believe that education is the key to unlocking potential.
                Our platform offers a wide range of courses designed to help you
                achieve your personal and professional goals. Join our community
                and start learning today.
              </p>
            </div>

            {/* Content in Horizontal Row */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center max-w-xs text-center">
                <span className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-white p-4 rounded-full mb-4">
                  <i className="fas fa-graduation-cap text-3xl"></i>
                </span>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Expert Instructors
                </h3>
                <p className="text-black dark:text-white">
                  Learn from industry experts with years of experience.
                </p>
              </div>
              <div className="flex flex-col items-center max-w-xs text-center">
                <span className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-white p-4 rounded-full mb-4">
                  <i className="fas fa-lightbulb text-3xl"></i>
                </span>
                <h3 className="text-xl font-semibold text-black dark:text-white ">
                  Innovative Learning
                </h3>
                <p className="text-black dark:text-gray-300">
                  Explore interactive and engaging course content.
                </p>
              </div>
              <div className="flex flex-col items-center max-w-xs text-center">
                <span className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-white p-4 rounded-full mb-4">
                  <i className="fas fa-users text-3xl"></i>
                </span>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Global Community
                </h3>
                <p className="text-black dark:text-gray-300">
                  Connect with learners and instructors worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Statistics Section */}
        <Statistics />

        {/* Course Categories Section */}
        <PopularCourses />

        {/* Promotion Section */}
        <Promotion />

        {/* Courses Categories */}
        <CourseCategories />

        {/* FAQ */}
        <FAQ />

        {/* Call to Action Section */}
        <section className="bg-purple-700 text-white py-16 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Learn?</h2>
            <p className="text-lg mb-6">
              Join thousands of students who have upgraded their skills with us.
            </p>
            <Link
              to="/register"
              className="btn px-6 py-3 bg-white text-purple-700 rounded-lg font-semibold hover:bg-gray-200 transition border-none dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700"
            >
              Sign Up Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
