import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
} from "lucide-react";

const stories = [
  {
    type: "Parent Story",
    quote:
      "Since joining the platform, my daughter's confidence in Mathematics has improved tremendously. The lessons and regular progress updates have helped us stay involved every step of the way.",
    name: "Sarah M.",
    role: "Parent",
    avatar:
      "https://i.pravatar.cc/100?img=47",
  },
  {
    type: "Student Story",
    quote:
      "My tutor made learning enjoyable and easy to understand. I now look forward to every lesson and feel much more confident tackling difficult topics.",
    name: "Daniel A.",
    role: "Student",
    avatar:
      "https://i.pravatar.cc/100?img=12",
  },
  {
    type: "Parent Story",
    quote:
      "Since joining the platform, my daughter's confidence in Mathematics has improved tremendously. The lessons and regular progress updates have helped us stay involved every step of the way.",
    name: "Sarah M.",
    role: "Parent",
    avatar:
      "https://i.pravatar.cc/100?img=47",
  },
  {
    type: "Student Story",
    quote:
      "My tutor made learning enjoyable and easy to understand. I now look forward to every lesson and feel much more confident tackling difficult topics.",
    name: "Daniel A.",
    role: "Student",
    avatar:
      "https://i.pravatar.cc/100?img=12",
  },
  {
    type: "Parent Story",
    quote:
      "The personalized learning approach has made a huge difference. We can finally see exactly where our child is improving and where extra support is needed.",
    name: "Grace T.",
    role: "Parent",
    avatar:
      "https://i.pravatar.cc/100?img=32",
  },
  {
    type: "Student Story",
    quote:
      "I used to struggle with difficult lessons, but now I understand concepts much faster. The personalized support has made learning much more enjoyable.",
    name: "Michael K.",
    role: "Student",
    avatar:
      "https://i.pravatar.cc/100?img=33",
  },
];

const CARD_WIDTH = 270;
const GAP = 14;

const ParentStudentStories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /*
   * Duplicate the cards so the carousel always has
   * content available beyond both edges.
   */
  const carouselStories = useMemo(
    () => [...stories, ...stories, ...stories],
    []
  );

  /*
   * Start from the middle copy.
   * This gives the carousel enough room to move
   * naturally in both directions.
   */
  const baseIndex = stories.length;

  const [currentIndex, setCurrentIndex] = useState(baseIndex);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  /*
   * Automatic movement
   */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  /*
   * Keep the carousel index inside the duplicated range.
   */
  useEffect(() => {
    if (currentIndex >= stories.length * 2) {
      const timer = setTimeout(() => {
        setCurrentIndex(stories.length);
      }, 550);

      return () => clearTimeout(timer);
    }

    if (currentIndex < stories.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(stories.length * 2 - 1);
      }, 550);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#303c82]
        py-16
        sm:py-20
        lg:py-[88px]
      "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 text-center">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            text-[30px]
            font-extrabold
            leading-[1.05]
            tracking-[-0.035em]
            text-white

            sm:text-[38px]

            md:text-[44px]

            lg:text-[48px]
          "
        >
          Every Success Tells a Story
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mt-3
            max-w-[480px]
            text-[9px]
            leading-[1.5]
            text-white/60

            sm:text-[10px]

            md:text-[11px]
          "
        >
          Hear how learners and parents are achieving more through
          personalized learning.
        </motion.p>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <div
        className="
          relative
          z-30
          mx-auto
          mt-5
          flex
          w-full
          max-w-[900px]
          justify-end
          gap-1
          px-6
          sm:px-8
        "
      >
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous story"
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            text-white/80
            transition-all
            duration-200
            hover:bg-white/10
            hover:text-white
            active:scale-90
          "
        >
          <ArrowLeft
            size={13}
            strokeWidth={1.8}
          />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next story"
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            text-white/80
            transition-all
            duration-200
            hover:bg-white/10
            hover:text-white
            active:scale-90
          "
        >
          <ArrowRight
            size={13}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* =====================================================
          CAROUSEL
      ====================================================== */}
      <div
        className="
          relative
          mt-3
          w-full
          overflow-hidden
        "
      >
        {/* Subtle edge fade */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-20
            h-full
            w-[45px]
            bg-gradient-to-r
            from-[#303c82]
            to-transparent
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-20
            h-full
            w-[45px]
            bg-gradient-to-l
            from-[#303c82]
            to-transparent
          "
        />

        <motion.div
          className="
            flex
            items-stretch
            gap-[14px]
          "
          animate={{
            x: `calc(50% - ${
              currentIndex * (CARD_WIDTH + GAP) +
              CARD_WIDTH / 2
            }px)`,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {carouselStories.map((story, index) => (
            <motion.article
              key={`${story.name}-${index}`}
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="
                relative
                flex
                h-[285px]
                w-[270px]
                shrink-0
                flex-col
                rounded-[9px]
                border
                border-white/[0.04]
                bg-[#35475d]
                px-5
                py-5
                shadow-[0_8px_25px_rgba(10,18,55,0.06)]

                sm:h-[300px]
                sm:px-6
                sm:py-6
              "
            >
              {/* Small quote icon */}
              <div
                className="
                  absolute
                  right-4
                  top-4
                  opacity-[0.07]
                "
              >
                <Quote
                  size={28}
                  fill="currentColor"
                />
              </div>

              {/* Category */}
              <div className="relative z-10">
                <span
                  className="
                    text-[9px]
                    font-medium
                    tracking-[0.01em]
                    text-white/55

                    sm:text-[10px]
                  "
                >
                  {story.type}
                </span>
              </div>

              {/* Quote */}
              <p
                className="
                  relative
                  z-10
                  mt-5
                  text-[11px]
                  font-normal
                  leading-[1.58]
                  tracking-[-0.005em]
                  text-white/90

                  sm:text-[12px]
                  sm:leading-[1.62]
                "
              >
                "{story.quote}"
              </p>

              {/* Author */}
              <div className="mt-auto flex items-center gap-3">
                <div
                  className="
                    h-[34px]
                    w-[34px]
                    shrink-0
                    overflow-hidden
                    rounded-full
                    border
                    border-white/10
                    bg-white/10

                    sm:h-[38px]
                    sm:w-[38px]
                  "
                >
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[10px]
                      font-medium
                      leading-[1.2]
                      text-white

                      sm:text-[11px]
                    "
                  >
                    {story.name}
                  </p>

                  <p
                    className="
                      mt-[3px]
                      text-[8px]
                      leading-none
                      text-white/45

                      sm:text-[9px]
                    "
                  >
                    {story.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* =====================================================
          MOBILE INDICATORS
      ====================================================== */}
      <div className="mt-6 flex justify-center gap-1.5 lg:hidden">
        {stories.slice(0, 4).map((_, index) => {
          const active =
            currentIndex % stories.length === index;

          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                setCurrentIndex(stories.length + index);
              }}
              aria-label={`Go to story ${index + 1}`}
              className={`
                h-[4px]
                rounded-full
                transition-all
                duration-300
                ${
                  active
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/30"
                }
              `}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ParentStudentStories;