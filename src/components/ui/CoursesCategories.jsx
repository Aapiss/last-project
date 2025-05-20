import React from "react";

const CourseCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Web Development",
      image: "/images/web-development-category.png",
    },
    {
      id: 2,
      name: "Data Science",
      image: "/images/data-science-category.png",
    },
    {
      id: 3,
      name: "Digital Marketing",
      image: "/images/digital-marketing-category.png",
    },
    {
      id: 4,
      name: "Graphic Design",
      image: "/images/graphic-design-category.png",
    },
    {
      id: 5,
      name: "Business Management",
      image: "/images/business-management-category.png",
    },
    {
      id: 6,
      name: "Photography",
      image: "/images/photography-category.png",
    },
  ];

  return (
    <section className="bg-white py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 dark:text-white">
          Explore Our Categories
        </h2>
        {/* Grid Layout */}
        <div className="flex flex-col items-center gap-8">
          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            {categories.slice(0, 3).map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-700"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-20 h-20 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-purple-700 dark:text-white">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Row 2: 2 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
            {categories.slice(3, 5).map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-700"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-20 h-20 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-purple-700 dark:text-white">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Row 3: 1 card */}
          <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
            {categories.slice(5, 6).map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-700"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-20 h-20 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-purple-700 dark:text-white">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;
