import React from "react";
import { motion } from "framer-motion";

const Promotion = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-purple-400 text-white py-16 px-4 text-center overflow-hidden dark:bg-gradient-to-r dark:from-purple-800 dark:to-purple-600">
      <div className="container mx-auto relative z-10">
        <motion.h2
          className="text-4xl font-extrabold mb-4 dark:text-white"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          🎉 Special Offers & Free Courses Now!! 🎉
        </motion.h2>
        <motion.p
          className="text-lg mb-8 max-w-2xl mx-auto dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Join now and get access to <strong>exclusive free courses</strong> and{" "}
          <strong>limited-time discounts</strong>. Don't miss out!
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Promo Card 1 */}
          <motion.div
            className="bg-white text-purple-700 shadow-lg rounded-lg p-6 w-full sm:w-80 dark:bg-gray-700 dark:text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">
              🎓 Free Web Development Course
            </h3>
            <p className="text-gray-700 mt-2 dark:text-gray-300">
              Learn the fundamentals of web development{" "}
              <strong>for free</strong>! Limited slots available.
            </p>
            <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition dark:bg-purple-600 dark:hover:bg-purple-500">
              Enroll Now
            </button>
          </motion.div>

          {/* Promo Card 2 */}
          <motion.div
            className="bg-white text-purple-700 shadow-lg rounded-lg p-6 w-full sm:w-80 dark:bg-gray-700 dark:text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">🔥 50% Off All Courses</h3>
            <p className="text-gray-700 mt-2 dark:text-gray-300">
              Get <strong>50% off</strong> on all premium courses. Offer valid
              until <strong>this weekend</strong>!
            </p>
            <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition dark:bg-purple-600 dark:hover:bg-purple-500">
              Get Discount
            </button>
          </motion.div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-10 left-10 w-24 h-24 bg-purple-300 rounded-full blur-2xl dark:bg-purple-500"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl dark:bg-purple-700"></div>
      </div>
    </section>
  );
};

export default Promotion;
