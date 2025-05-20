import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/SupaClient";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .limit(6); // Ambil hanya 6 data pertama

      if (error) {
        console.error("Error fetching courses:", error.message);
      } else {
        setCourses(data);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 dark:text-white">
          Popular Courses
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-700"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover p-4 transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
                    {course.courses_name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {course.description}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition dark:bg-purple-500 dark:hover:bg-purple-600">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
