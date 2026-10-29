import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I get started?",
    answer:
      "Getting started is simple. Create your account, provide your child's learning details, and we'll help you set up a personalized learning journey.",
  },
  {
    question: "How are tutors assigned?",
    answer:
      "Tutors are carefully matched based on your child's subjects, learning needs, goals, and preferred learning style.",
  },
  {
    question: "Can my child study more than one subject?",
    answer:
      "Yes. Your child can study multiple subjects and have a personalized learning plan for each subject.",
  },
  {
    question: "How can I monitor my child's progress?",
    answer:
      "You can monitor your child's progress through their learning dashboard, where you can view completed lessons, performance, and overall development.",
  },
  {
    question: "Can I change my child's tutor?",
    answer:
      "Yes. If you feel another tutor would be a better fit, you can request a tutor change and we'll help you find a suitable match.",
  },
  {
    question: "Are lessons live or pre-recorded?",
    answer:
      "Lessons are conducted live with tutors, giving your child the opportunity to interact, ask questions, and receive personalized support.",
  },
];

const FrequentlyAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#303d7c] py-10 sm:py-12 lg:py-14">
      {/* Top decorative shape */}
      <div className="absolute -top-9 left-0 h-14 w-full">
        <div className="absolute left-0 top-0 h-14 w-[19%] bg-[#f5f7fb] [clip-path:polygon(0_42%,100%_0,100%_100%,0_100%)]" />

        <div className="absolute right-0 top-0 h-14 w-[19%] bg-[#f5f7fb] [clip-path:polygon(0_0,100%_42%,100%_100%,0_100%)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-[850px] px-5 sm:px-8">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#8eafff] sm:text-3xl lg:text-[34px]">
            Frequently asked questions
          </h2>

          <p className="mt-2 text-[9px] font-normal leading-relaxed text-[#9ca9d4] sm:text-[10px]">
            Everything you need to know before starting your child's
            personalized learning journey.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-1.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-md border border-[#4b5994] bg-[#303d7c]/60 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-3.5 py-2.5 text-left transition-colors duration-200 hover:bg-[#384686] sm:px-4 sm:py-3"
                >
                  <span className="pr-4 text-[10px] font-medium text-white sm:text-[11px]">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={13}
                    strokeWidth={1.5}
                    className={`shrink-0 text-white transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#46548f] px-3.5 pb-3 pt-2.5 text-[10px] leading-relaxed text-[#c3cbe4] sm:px-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;