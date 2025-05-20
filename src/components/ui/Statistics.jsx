import React from "react";
import {
  FaUsers,
  FaBookOpen,
  FaCertificate,
  FaChalkboardTeacher,
} from "react-icons/fa";

const Statistics = () => {
  const stats = [
    {
      id: 1,
      icon: <FaUsers className="text-4xl text-purple-700" />,
      value: "50,000+",
      label: "Students Enrolled",
    },
    {
      id: 2,
      icon: <FaBookOpen className="text-4xl text-purple-700" />,
      value: "300+",
      label: "Available Courses",
    },
    {
      id: 3,
      icon: <FaCertificate className="text-4xl text-purple-700" />,
      value: "20,000+",
      label: "Certificates Issued",
    },
    {
      id: 4,
      icon: <FaChalkboardTeacher className="text-4xl text-purple-700" />,
      value: "150+",
      label: "Expert Instructors",
    },
  ];

  return (
    <section className="bg-white py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 dark:text-white">
          Our Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center dark:bg-gray-700 dark:shadow-md dark:text-white"
            >
              {stat.icon}
              <h3 className="text-2xl font-bold text-gray-800 mt-2 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
