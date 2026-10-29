import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    type: "Parent Story",
    text: `"Since joining the platform, my daughter's confidence in Mathematics has improved tremendously. The lessons and regular progress updates have helped us stay involved every step of the way."`,
    name: "Sarah M.",
    role: "Parent",
    avatar: "SM",
  },
  {
    type: "Student Story",
    text: `"My tutor made learning enjoyable and easy to understand. I now look forward to every lesson and feel much more confident tackling difficult topics."`,
    name: "Daniel A.",
    role: "Student",
    avatar: "DA",
  },
  {
    type: "Parent Story",
    text: `"The progress reports make it so much easier to understand how my child is developing and where extra support is needed. It brings true peace of mind."`,
    name: "Michael O.",
    role: "Parent",
    avatar: "MO",
  },
  {
    type: "Student Story",
    text: `"The interactive lessons helped me catch up quickly and ace my final exams without feeling stressed. My grades have never been better!"`,
    name: "Chloe W.",
    role: "Student",
    avatar: "CW",
  },
  {
    type: "Parent Story",
    text: `"Finding a tutor who actually adapts to my son's unique learning pace used to be impossible. This platform nailed the match on the very first try."`,
    name: "Elena R.",
    role: "Parent",
    avatar: "ER",
  },
  {
    type: "Student Story",
    text: `"Physics used to be my absolute weakest subject. Thanks to my amazing tutor, things finally clicked and I actually love the subject now."`,
    name: "Liam K.",
    role: "Student",
    avatar: "LK",
  },
  {
    type: "Parent Story",
    text: `"The flexibility of scheduling around our busy family life has been a game changer. The quality of instruction is consistently top-notch."`,
    name: "David H.",
    role: "Parent",
    avatar: "DH",
  },
];

const faqs = [
  {
    question: "How do I get started?",
    answer:
      "Getting started is simple. Create your account, tell us about your child's learning needs, and we'll guide you through the next steps.",
  },
  {
    question: "How are tutors assigned?",
    answer:
      "Tutors are carefully matched according to your child's subject, learning level, goals, and preferred learning style.",
  },
  {
    question: "Can my child study more than one subject?",
    answer:
      "Yes. Your child can study multiple subjects and receive personalized support for each subject.",
  },
  {
    question: "How can I monitor my child's progress?",
    answer:
      "Parents receive regular progress updates that make it easy to follow your child's development and learning journey.",
  },
  {
    question: "Can I change my child's tutor?",
    answer:
      "Yes. If the tutor is not the right fit, you can request a change and we'll help you find a better match.",
  },
  {
    question: "Are lessons live or pre-recorded?",
    answer:
      "Lessons are live and interactive, allowing students to communicate directly with their tutor and receive immediate feedback.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function TestimonialCard({ item }) {
  return (
    <div
      className="
        group
        w-[280px]
        min-w-[280px]
        h-[165px]
        rounded-xl
        border
        border-white/[0.08]
        bg-[#35445c]
        p-4
        shadow-[0_8px_18px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-[#394a63]
        flex
        flex-col
        justify-between
      "
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-[#aeb8ca]">
          {item.type}
        </p>
        <p className="mt-2 text-xs leading-relaxed font-normal text-white line-clamp-3">
          {item.text}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#6f7e99]
            text-xs
            font-semibold
            text-white
          "
        >
          {item.avatar}
        </div>
        <div>
          <p className="text-xs font-medium leading-tight text-white">
            {item.name}
          </p>
          <p className="text-[10px] leading-tight text-[#9ba7ba]">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ item, index, openFAQ, setOpenFAQ }) {
  const isOpen = openFAQ === index;

  return (
    <div
      className={`
        overflow-hidden
        rounded-xl
        border
        transition-all
        duration-300
        ${
          isOpen
            ? "border-[#7186dc]/60 bg-white/[0.04]"
            : "border-white/[0.13]"
        }
      `}
    >
      <button
        type="button"
        onClick={() => setOpenFAQ(isOpen ? null : index)}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-4
          p-4
          text-left
          outline-none
        "
      >
        <span className="text-sm font-medium text-white sm:text-base">
          {item.question}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`
            shrink-0
            text-white/80
            transition-transform
            duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          grid
          transition-[grid-template-rows]
          duration-300
          ease-in-out
          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-xs leading-relaxed text-white/60 sm:text-sm">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessHome() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  const [openFAQ, setOpenFAQ] = useState(null);

  const scrollTestimonials = (direction) => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#2f3d7d]
        py-16
      "
    >
      {/* ================= TESTIMONIAL SECTION ================= */}
      <div className="relative bg-[#2f3d7d]">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="relative z-10 mx-auto max-w-3xl px-4 text-center"
        >
          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
              text-white
              sm:text-3xl
              md:text-4xl
            "
          >
            Every Success Tells a Story
          </h2>
          <p className="mt-2 text-sm text-white/60 sm:text-base">
            Hear how learners and parents are achieving more through personalized learning.
          </p>
        </motion.div>

        {/* Slider arrows */}
        <div
          className="
            absolute
            right-6
            top-4
            z-20
            hidden
            sm:flex
            items-center
            gap-2
          "
        >
          <button
            type="button"
            onClick={() => scrollTestimonials("left")}
            aria-label="Previous testimonials"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white/80
              transition
              hover:bg-white/20
              hover:text-white
            "
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollTestimonials("right")}
            aria-label="Next testimonials"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white/80
              transition
              hover:bg-white/20
              hover:text-white
            "
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Testimonial track */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 w-full overflow-hidden"
        >
          <div
            ref={trackRef}
            className="
              flex
              w-full
              overflow-x-auto
              gap-5
              px-6
              pb-6
              scrollbar-none
              scroll-smooth
            "
          >
            {testimonials.map((item, index) => (
              <TestimonialCard key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= CURVED TRANSITION ================= */}
      <div className="relative h-12 w-full bg-[#2f3d7d] my-6">
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-12 w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0 0 C28 14, 57 19, 86 27 C57 35, 28 40, 0 52 Z"
            fill="#F7F8FC"
          />
          <path
            d="M1440 0 C1412 14, 1383 19, 1354 27 C1383 35, 1412 40, 1440 52 Z"
            fill="#F7F8FC"
          />
        </svg>
      </div>

      {/* ================= FAQ SECTION ================= */}
      <div className="relative bg-[#2f3d7d] px-6 pb-6 sm:px-8 md:px-10">
        <div className="mx-auto w-full max-w-[700px]">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="text-center"
          >
            <h3
              className="
                bg-gradient-to-r
                from-[#287cff]
                via-[#6295ff]
                to-[#9eafff]
                bg-clip-text
                text-2xl
                font-bold
                tracking-tight
                text-transparent
                sm:text-3xl
              "
            >
              Frequently Asked Questions
            </h3>
            <p className="mt-2 text-sm text-white/50 sm:text-base">
              Everything you need to know before starting your child's personalized learning journey.
            </p>
          </motion.div>

          {/* FAQ items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 space-y-4"
          >
            {faqs.map((item, index) => (
              <FAQItem
                key={item.question}
                item={item}
                index={index}
                openFAQ={openFAQ}
                setOpenFAQ={setOpenFAQ}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}