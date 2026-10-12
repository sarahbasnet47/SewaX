import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Qna=()=> {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      question: "What is SEWAX?",
      answer:
        "SEWAX is a service marketplace that connects customers with trusted service providers. You can find and choose services based on your needs.",
    },
    {
      question: "How can I find a service provider?",
      answer:
        "You can browse the Services section, select the service you need, and view available service providers and their details.",
    },
    {
      question: "How can I become a service provider?",
      answer:
        "You can create an account by clicking the Become a Provider or Get Started button and registering your account.",
    },
    {
      question: "Can I book a service through SEWAX?",
      answer:
        "Yes. You can find a suitable service provider and request or book the service through the platform.",
    },
    {
      question: "Are the service providers verified?",
      answer:
        "SEWAX aims to provide customers with reliable service providers. Provider information can be reviewed before choosing a service.",
    },
    {
      question: "Is SEWAX available for different types of services?",
      answer:
        "Yes. SEWAX can support different services such as plumbing, electrical work, cleaning, home repair, beauty services, and many others.",
    },
  ];

  const handleClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center px-6">
        <p className="text-blue-600 font-semibold text-sm uppercase">
          Frequently Asked Questions
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Have questions?
          <span className="text-blue-600"> We have answers.</span>
        </h2>

        <p className="text-gray-600 mt-4">
          Find answers to some of the most common questions about SEWAX.
        </p>
      </div>

      {/* Questions */}
      <div className="max-w-4xl mx-auto px-6 mt-10">
        <div className="space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Question */}
              <button
                type="button"
                onClick={() => handleClick(index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {item.question}
                </span>

                <span className="text-blue-600 shrink-0">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-7">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Qna;
