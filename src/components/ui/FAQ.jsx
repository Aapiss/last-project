import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is NextEdu?",
      answer:
        "NextEdu is an online learning platform that offers a wide range of courses to help you grow your skills and career.",
    },
    {
      question: "How can I enroll in a course?",
      answer:
        "You can enroll in a course by signing up, browsing our course catalog, and selecting a course that interests you.",
    },
    {
      question: "Are the courses free?",
      answer:
        "NextEdu offers both free and paid courses. You can check the course details for pricing information.",
    },
    {
      question: "Can I get a certificate after completing a course?",
      answer:
        "Yes! After successfully completing a course, you will receive a certificate of completion.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact our support team through the 'Contact' page, and we will assist you as soon as possible.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-purple-700 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-700 dark:text-white"
            >
              <button
                className="w-full text-left font-semibold text-black flex justify-between items-center dark:text-white"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    className="mt-2 text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
