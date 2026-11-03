
import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Check,
} from "lucide-react";

const courses = [
  {
    title: "Mathematics",
    category: "Core Subject",
    description:
      "Build confidence in numbers, calculations and logical problem-solving through engaging lessons.",
    topics: ["Algebra", "Geometry", "Statistics", "Arithmetic"],
    levels: "Primary 1 – Year 12",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "English Language",
    category: "Core Subject",
    description:
      "Develop strong reading, writing, grammar and communication skills.",
    topics: ["Grammar", "Comprehension", "Vocabulary", "Writing"],
    levels: "Primary 1 – Year 12",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Physics",
    category: "Science",
    description:
      "Understand the principles that explain motion, energy and the physical world.",
    topics: ["Mechanics", "Electricity", "Waves", "Energy"],
    levels: "Secondary School",
    image:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Chemistry",
    category: "Science",
    description:
      "Explore matter, chemical reactions and the fascinating world of elements.",
    topics: ["Atoms", "Elements", "Reactions", "Acids & Bases"],
    levels: "Secondary School",
    image:
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Coding",
    category: "Technology",
    description:
      "Learn computational thinking and develop the foundations of programming.",
    topics: ["Programming", "Web Development", "Logic", "Algorithms"],
    levels: "Primary – Secondary",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Further Mathematics",
    category: "Advanced Learning",
    description:
      "Explore advanced mathematical concepts and strengthen analytical thinking.",
    topics: ["Calculus", "Vectors", "Matrices", "Advanced Algebra"],
    levels: "Senior Secondary",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Creative Arts",
    category: "Creative Learning",
    description:
      "Discover artistic expression through drawing, design and creative projects.",
    topics: ["Drawing", "Painting", "Design", "Visual Arts"],
    levels: "Primary – Secondary",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Quantitative Reasoning",
    category: "Reasoning",
    description:
      "Improve numerical ability, recognise patterns and solve mathematical problems.",
    topics: ["Number Patterns", "Data", "Calculations", "Logic"],
    levels: "Primary – Secondary",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Verbal Reasoning",
    category: "Reasoning",
    description:
      "Strengthen language-based reasoning, comprehension and critical thinking.",
    topics: ["Word Relationships", "Analogies", "Vocabulary", "Comprehension"],
    levels: "Primary – Secondary",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Languages",
    category: "Communication",
    description:
      "Develop language skills through vocabulary, pronunciation and conversation.",
    topics: ["Speaking", "Listening", "Grammar", "Vocabulary"],
    levels: "Primary – Secondary",
    image:
      "https://images.unsplash.com/photo-1543109740-4bdb38fda756?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Vocational Aptitude",
    category: "Practical Learning",
    description:
      "Explore practical thinking, technical awareness and real-world problem-solving.",
    topics: ["Technical Skills", "Practical Tasks", "Career Awareness", "Aptitude"],
    levels: "Secondary School",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=85",
  },
];

function CourseCard({ course, index }) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();

  const toggleCard = () => {
    setFlipped((previous) => !previous);
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : (index % 4) * 0.07,
      }}
      className="h-[350px] w-full"
      style={{ perspective: 1200 }}
    >
      <button
        type="button"
        onClick={toggleCard}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setFlipped(false);
          }
        }}
        aria-label={`${course.title}: ${flipped ? "Show course image" : "View course details"}`}
        aria-pressed={flipped}
        className="group relative h-full w-full cursor-pointer rounded-[20px] text-left outline-none focus-visible:ring-4 focus-visible:ring-[#30317f]/30"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[20px] bg-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src={course.image}
              alt={`${course.title} learning`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/75" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
              <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[1.2px] text-white backdrop-blur-md">
                {course.category}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={17} />
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-[25px] font-bold leading-tight tracking-tight text-white">
                {course.title}
              </h3>

              <div className="mt-5 flex items-center justify-between border-t border-white/30 pt-4">
                <span className="text-xs font-medium text-white/90">
                  Explore course
                </span>

                <ArrowUpRight
                  size={18}
                  className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-[20px] bg-[#30317f] p-6 text-white shadow-[0_12px_35px_rgba(48,49,127,0.2)]"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/90">
                {course.category}
              </span>

              <BookOpen size={20} className="text-[#f5d900]" />
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-bold tracking-tight">
                {course.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/75">
                {course.description}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#f5d900]">
                What you'll learn
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {course.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1.5 text-[11px] text-white/90"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-white/20 pt-4">
              <div className="flex items-center gap-2">
                <GraduationCap
                  size={17}
                  className="shrink-0 text-[#f5d900]"
                />
                <span className="text-[11px] text-white/80">
                  {course.levels}
                </span>
              </div>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Check size={16} className="text-[#f5d900]" />
              </span>
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function CourseFlipCards() {
  return (
    <section className="bg-[#fff8f6] px-5 py-20 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1250px]">

        {/* SECTION INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-[680px] text-center"
        >
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#30317f]">
            Discover your potential
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
            Explore Our Learning Programs
          </h2>

          <p className="mx-auto mt-5 max-w-[560px] text-sm leading-7 text-gray-500 sm:text-base">
            From core academic subjects to creative and practical skills,
            discover courses that make learning meaningful and engaging.
          </p>
        </motion.div>

        {/* COURSE GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course, index) => (
            <CourseCard
              key={course.title}
              course={course}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
