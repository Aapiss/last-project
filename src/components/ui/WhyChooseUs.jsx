import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Expert Instructors",
      description:
        "Learn from industry experts who bring real-world experience.",
      image: "/images/expert-instructors.png",
    },
    {
      id: 2,
      title: "Flexible Schedule",
      description: "Access courses anytime, anywhere, at your convenience.",
      image: "/images/flexible-schedule.png",
    },
    {
      id: 3,
      title: "Certified Courses",
      description: "Receive certifications to boost your career opportunities.",
      image: "/images/certified-courses.png",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 dark:text-white">
          Why Choose Us
        </h2>
        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-700 dark:shadow-md dark:hover:shadow-lg"
            >
              <div className="relative w-full h-48">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
