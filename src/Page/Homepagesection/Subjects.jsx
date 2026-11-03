import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Code2,
  FlaskConical,
  Languages,
  BookOpen,
  GraduationCap,
} from "lucide-react";

import MathematicsImage from "../../assets/images/MathematicsImage.png";
import ScienceImage from "../../assets/images/istockphoto-639407632-612x612.jpg";
import EnglishImage from "../../assets/images/english.jfif";
import CodingImage from "../../assets/images/images (2).jfif";
import LanguagesImage from "../../assets/images/images (3).jfif";

const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    iconBg: "bg-indigo-600",
    description:
      "Build strong problem-solving skills and mathematical thinking through interactive lessons and real-world applications.",
    benefits: [
      "Concept mastery",
      "Step-by-step learning",
      "Practice with confidence",
    ],
    image: MathematicsImage,
  },
  {
    id: "science",
    name: "Science",
    icon: FlaskConical,
    iconBg: "bg-emerald-500",
    description:
      "Discover how the world works through engaging experiments, scientific concepts, and practical learning experiences.",
    benefits: [
      "Explore scientific concepts",
      "Interactive experiments",
      "Learn through discovery",
    ],
    image: ScienceImage,
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    iconBg: "bg-yellow-400",
    description:
      "Develop confident communication, reading, writing, and comprehension skills through engaging language activities.",
    benefits: [
      "Improve communication",
      "Build vocabulary",
      "Stronger writing skills",
    ],
    image: EnglishImage,
  },
  {
    id: "coding",
    name: "Coding",
    icon: Code2,
    iconBg: "bg-violet-600",
    description:
      "Learn computational thinking and modern programming through creative projects, challenges, and hands-on practice.",
    benefits: [
      "Build coding skills",
      "Create real projects",
      "Develop logical thinking",
    ],
    image: CodingImage,
  },
  {
    id: "languages",
    name: "Languages",
    icon: Languages,
    iconBg: "bg-blue-500",
    description:
      "Build practical language skills with interactive lessons designed to make communication natural and enjoyable.",
    benefits: [
      "Improve fluency",
      "Learn naturally",
      "Practice communication",
    ],
    image: LanguagesImage,
  },
];

function SubjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSubject = subjects[activeIndex];
  const ActiveIcon = activeSubject.icon;

  const nextSubject = () => {
    setActiveIndex((current) =>
      current === subjects.length - 1 ? 0 : current + 1
    );
  };

  const previousSubject = () => {
    setActiveIndex((current) =>
      current === 0 ? subjects.length - 1 : current - 1
    );
  };

  const selectSubject = (index) => {
    setActiveIndex(index);
  };

  const handleLearnMore = () => {
    console.log(`Explore ${activeSubject.name}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#eef5ff] px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-[900px]">

        {/* TOP BADGE */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#dbe8fb] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#31438d] shadow-sm sm:text-xs">
            <GraduationCap size={15} strokeWidth={2.5} />
            <span>Our Learning Programs</span>
          </div>
        </div>

        {/* HEADING */}
        <div className="mx-auto max-w-[650px] text-center">
          <h2 className="text-[30px] font-bold leading-[1.12] tracking-tight text-[#303d91] sm:text-[38px] md:text-[42px]">
            Explore Subjects.
            <br />
            Excel in What Matters.
          </h2>

          <p className="mx-auto mt-4 max-w-[540px] text-[13px] leading-[1.75] text-slate-500 sm:text-[15px] md:text-base">
            From foundational skills to future-ready knowledge,
            our diverse learning programs help learners build
            confidence and achieve academic success.
          </p>
        </div>

        {/* SUBJECT NAVIGATION */}
        <div className="mt-7 flex gap-2.5 overflow-x-auto pb-3 sm:justify-center sm:overflow-visible">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            const isActive = activeIndex === index;

            return (
              <button
                key={subject.id}
                type="button"
                onClick={() => selectSubject(index)}
                aria-label={`View ${subject.name}`}
                aria-current={isActive ? "true" : undefined}
                className={`
                  group flex shrink-0 items-center gap-2.5
                  rounded-md border px-4 py-2.5
                  text-[12px] font-semibold
                  transition-all duration-300
                  sm:px-4 sm:py-3 sm:text-[13px]

                  ${
                    isActive
                      ? `
                        border-[#c8d3ea]
                        bg-white
                        text-slate-800
                        shadow-[0_4px_12px_rgba(35,55,100,0.13)]
                      `
                      : `
                        border-transparent
                        bg-white/80
                        text-slate-600
                        shadow-[0_3px_10px_rgba(35,55,100,0.08)]
                        hover:-translate-y-0.5
                        hover:shadow-md
                      `
                  }
                `}
              >
                <span
                  className={`
                    flex h-5 w-5
                    items-center justify-center
                    rounded-[4px]
                    ${subject.iconBg}
                  `}
                >
                  <Icon
                    size={13}
                    strokeWidth={2.5}
                    className="text-white"
                  />
                </span>

                <span>{subject.name}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN SUBJECT CARD */}
        <div
          className="
            relative mt-5
            min-h-[300px]
            overflow-hidden
            rounded-xl
            bg-[#cfe0fb]
            shadow-[0_8px_25px_rgba(54,77,130,0.08)]
            sm:min-h-[320px]
            md:min-h-[340px]
          "
        >
          {/* DECORATIVE BACKGROUND CIRCLE */}
          <div
            className="
              absolute
              -right-[80px]
              top-1/2
              h-[330px]
              w-[330px]
              -translate-y-1/2
              rounded-full
              bg-[#b6c8f4]
              sm:-right-[45px]
              sm:h-[390px]
              sm:w-[390px]
            "
          />

          <div
            className="
              absolute
              -right-[20px]
              top-1/2
              h-[290px]
              w-[290px]
              -translate-y-1/2
              rounded-full
              bg-[#c7d5fa]
              sm:right-[10px]
              sm:h-[340px]
              sm:w-[340px]
            "
          />

          {/* CONTENT */}
          <div className="relative z-10 flex min-h-[300px] items-center sm:min-h-[320px] md:min-h-[340px]">

            {/* LEFT CONTENT */}
            <div className="relative z-20 w-[58%] px-4 py-7 sm:w-[48%] sm:px-8 sm:py-8 lg:px-10">

              {/* SUBJECT ICON */}
              <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#30388d] sm:h-8 sm:w-8">
                <ActiveIcon
                  size={17}
                  strokeWidth={2.5}
                  className="text-white"
                />
              </div>

              {/* SUBJECT TITLE */}
              <h3 className="font-serif text-[21px] font-semibold leading-tight text-[#111c3d] sm:text-[26px] md:text-[29px]">
                {activeSubject.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-2 max-w-[310px] text-[12px] leading-[1.7] text-slate-600 sm:text-[14px] md:text-[15px]">
                {activeSubject.description}
              </p>

              {/* BENEFITS */}
              <div className="mt-4 space-y-2.5">
                {activeSubject.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="
                      flex items-center gap-2
                      text-[11px]
                      font-medium
                      leading-relaxed
                      text-slate-700
                      sm:text-[13px]
                      md:text-[14px]
                    "
                  >
                    <CheckCircle2
                      size={15}
                      strokeWidth={2.5}
                      className="shrink-0 text-[#30388d]"
                    />

                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* LEARN MORE BUTTON */}
              <button
                type="button"
                onClick={handleLearnMore}
                className="
                  group mt-5
                  inline-flex items-center gap-2
                  rounded-full
                  bg-[#30388d]
                  px-4 py-2.5
                  text-[11px]
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#252e78]
                  hover:shadow-lg
                  active:scale-95
                  sm:px-5
                  sm:py-3
                  sm:text-[13px]
                "
              >
                <span>Learn More</span>

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />
              </button>
            </div>

            {/* IMAGE AREA */}
            <div
              className="
                absolute
                right-0
                top-0
                h-full
                w-[50%]
                overflow-hidden
                sm:w-[56%]
              "
            >
              {/* MAIN IMAGE */}
              <img
                src={activeSubject.image}
                alt={activeSubject.name}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-all
                  duration-500
                "
              />

              {/* IMAGE OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-[#cfe0fb]/40
                  via-transparent
                  to-transparent
                "
              />

              {/* CURVED IMAGE MASK */}
              <div
                className="
                  absolute
                  -left-[95px]
                  top-1/2
                  h-[300px]
                  w-[300px]
                  -translate-y-1/2
                  rounded-full
                  bg-[#cfe0fb]
                  sm:-left-[125px]
                  sm:h-[380px]
                  sm:w-[380px]
                "
              />

              {/* INNER CIRCLE */}
              <div
                className="
                  absolute
                  -left-[50px]
                  top-1/2
                  h-[250px]
                  w-[250px]
                  -translate-y-1/2
                  rounded-full
                  border border-white/20
                  sm:-left-[70px]
                  sm:h-[320px]
                  sm:w-[320px]
                "
              />
            </div>
          </div>
        </div>

        {/* CAROUSEL CONTROLS */}
        <div className="mt-5 flex items-center justify-center gap-4">

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={previousSubject}
            aria-label="Previous subject"
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              bg-[#d5e2f7]
              text-[#5369a2]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#c3d4f1]
              active:scale-95
              sm:h-9 sm:w-9
            "
          >
            <ArrowLeft size={15} strokeWidth={2.5} />
          </button>

          {/* PAGINATION DOTS */}
          <div className="flex items-center gap-2">
            {subjects.map((subject, index) => (
              <button
                key={subject.id}
                type="button"
                onClick={() => selectSubject(index)}
                aria-label={`Go to ${subject.name}`}
                aria-current={
                  activeIndex === index ? "true" : undefined
                }
                className={`
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    activeIndex === index
                      ? "h-2 w-2 bg-[#30388d]"
                      : "h-2 w-2 bg-slate-300 hover:bg-slate-400"
                  }
                `}
              />
            ))}
          </div>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={nextSubject}
            aria-label="Next subject"
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              bg-[#30388d]
              text-white
              shadow-[0_4px_10px_rgba(48,56,141,0.2)]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#252e78]
              active:scale-95
              sm:h-9 sm:w-9
            "
          >
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default SubjectsSection;