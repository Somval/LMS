
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";


import ImageIOne from "../../../assets/images/3f7a2a03-8aee-4518-a832-3255ef16437e.jpeg";

import ImageTwo from "../../../assets/images/a0f0ee1efedfc51f0430e49a53990df830b0c190.jpg";
import CourseSlide  from "./courseSlide"
import CourseFlipCards from "./CourseFlipCards";
import { Link } from "react-router-dom";

const SnakeCurve = ({ className, color, d, alternateD, duration = 5, strokeWidth = 2 }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 400 200"
      fill="none"
      className={className}
      initial={false}
      animate={
        reduceMotion
          ? { opacity: 1 }
          : { x: [0, 5, -4, 0], y: [0, -3, 3, 0] }
      }
      transition={{
        duration: duration + 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.path
        d={d}
        animate={
          reduceMotion
            ? { d }
            : { d: [d, alternateD, d] }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

export default function LearningHero() {
  const reduceMotion = useReducedMotion();

  const floatingAnimation = (distance = 8, duration = 5) => ({
    animate: reduceMotion
      ? {}
      : { y: [0, -distance, 0], x: [0, 3, 0] },
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  });

  return (
    <section className="relative isolate mt-16 overflow-hidden bg-[#fff8f6]">

      {/* =====================================
          ANIMATED BACKGROUND DECORATIONS
      ====================================== */}

      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">

        {/* Top left yellow snake */}
        <SnakeCurve
          className="absolute -left-12 -top-5 h-[180px] w-[330px] sm:left-0 sm:h-[220px] sm:w-[400px]"
          color="#F4D92D"
          duration={5}
          d="M 25 145 C 5 85, 45 15, 115 25 C 175 35, 195 75, 250 35 C 295 5, 320 0, 355 25"
          alternateD="M 25 145 C 5 110, 45 35, 115 15 C 175 0, 195 95, 250 55 C 295 25, 320 10, 355 25"
        />

        {/* Top right yellow snake */}
        <SnakeCurve
          className="absolute -right-20 -top-5 h-[180px] w-[350px] sm:h-[220px] sm:w-[430px]"
          color="#F4D92D"
          duration={6}
          d="M 20 145 C 0 85, 45 15, 115 25 C 175 35, 195 75, 250 35 C 295 5, 320 0, 380 35"
          alternateD="M 20 145 C 0 115, 45 35, 115 10 C 175 0, 195 95, 250 55 C 295 20, 320 10, 380 35"
        />

        {/* Bottom right mint snake */}
        <SnakeCurve
          className="absolute -bottom-5 -right-24 h-[180px] w-[430px] sm:h-[240px] sm:w-[540px]"
          color="#9BE8D0"
          duration={7}
          strokeWidth={2.5}
          d="M 10 125 C 75 105, 105 30, 175 45 C 235 60, 260 125, 320 110 C 360 100, 380 65, 400 45"
          alternateD="M 10 125 C 75 85, 105 55, 175 70 C 235 85, 260 90, 320 75 C 360 65, 380 90, 400 45"
        />

        {/* Small floating circles */}
        <motion.div
          {...floatingAnimation(10, 4)}
          className="absolute left-[42%] top-[45%] h-3 w-3 rounded-full border-2 border-[#A8E7E6]"
        />

        <motion.div
          {...floatingAnimation(8, 5)}
          className="absolute right-[27%] top-[30%] h-3 w-3 rounded-full border-2 border-[#A8E7E6]"
        />

        <motion.div
          {...floatingAnimation(12, 6)}
          className="absolute right-[8%] top-[60%] h-2 w-2 rounded-full bg-[#9BE8D0]"
        />

        {/* Left dotted decoration */}
        <div className="absolute left-[8%] top-[58%] hidden grid-cols-4 gap-2 opacity-50 sm:grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-gray-400" />
          ))}
        </div>

        {/* Right dotted decoration */}
        <div className="absolute right-[7%] top-[57%] hidden grid-cols-4 gap-2 opacity-50 sm:grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-gray-400" />
          ))}
        </div>
      </div>

      {/* =====================================
          MAIN HERO CONTENT
      ====================================== */}

      <div className="relative z-10 mx-auto grid min-h-[480px] max-w-[1440px] items-center gap-12 px-6 py-16 sm:px-10 lg:min-h-[550px] lg:grid-cols-2 lg:gap-16 lg:px-20 lg:py-20">

        {/* LEFT: IMAGE COLLAGE */}

        <div className="relative mx-auto h-[350px] w-full max-w-[510px] sm:h-[420px] lg:h-[430px]">

          {/* Main learning image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-[7%] top-[3%] h-[68%] w-[69%] overflow-hidden"
            style={{
              borderRadius: "38% 34% 42% 25% / 30% 32% 38% 45%",
            }}
          >
            <img
              src={ImageTwo}
              alt="Two learners studying together"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Animated yellow outline */}
          <motion.svg
            viewBox="0 0 400 350"
            fill="none"
            className="pointer-events-none absolute left-0 top-0 h-[78%] w-[82%]"
            animate={
              reduceMotion
                ? {}
                : { rotate: [0, 1, -1, 0], y: [0, -3, 3, 0] }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.path
              d="M 25 145 C 5 85 45 15 115 25 C 175 35 195 75 250 35 C 295 5 320 0 355 25"
              animate={
                reduceMotion
                  ? {}
                  : {
                      d: [
                        "M 25 145 C 5 85 45 15 115 25 C 175 35 195 75 250 35 C 295 5 320 0 355 25",
                        "M 25 145 C 5 110 45 35 115 15 C 175 0 195 95 250 55 C 295 25 320 10 355 25",
                        "M 25 145 C 5 85 45 15 115 25 C 175 35 195 75 250 35 C 295 5 320 0 355 25",
                      ],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              stroke="#F4D92D"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M 25 145 C 5 85 45 15 115 25 C 175 35 195 75 250 35 C 295 5 320 0 355 25"
              stroke="#F4D92D"
              strokeWidth="1"
              strokeLinecap="round"
              opacity=".45"
              transform="translate(0 7)"
            />
          </motion.svg>

          {/* Secondary learning image */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-[7%] left-[11%] z-10 h-[37%] w-[43%] overflow-hidden border-[5px] border-white"
            style={{
              borderRadius: "48% 35% 45% 38% / 38% 45% 35% 48%",
            }}
          >
            <img
              src={ImageIOne}
              alt="Student learning with a laptop"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Animated mint outline */}
          <motion.svg
            viewBox="0 0 260 180"
            fill="none"
            className="pointer-events-none absolute bottom-[3%] left-[7%] z-20 h-[42%] w-[51%]"
            animate={
              reduceMotion
                ? {}
                : { rotate: [0, -2, 2, 0], x: [0, 3, -3, 0] }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.path
              d="M 10 75 C 0 25 65 0 110 20 C 155 40 180 10 220 40 C 265 70 245 140 190 145 C 130 155 85 105 50 145"
              animate={
                reduceMotion
                  ? {}
                  : {
                      d: [
                        "M 10 75 C 0 25 65 0 110 20 C 155 40 180 10 220 40 C 265 70 245 140 190 145 C 130 155 85 105 50 145",
                        "M 10 75 C 0 45 65 15 110 35 C 155 55 180 0 220 25 C 265 55 245 120 190 125 C 130 135 85 125 50 145",
                        "M 10 75 C 0 25 65 0 110 20 C 155 40 180 10 220 40 C 265 70 245 140 190 145 C 130 155 85 105 50 145",
                      ],
                    }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              stroke="#91E6D0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>

          {/* Floating statistic badge */}
          <motion.div
            {...floatingAnimation(10, 4.5)}
            className="absolute bottom-[7%] right-[12%] z-30 flex h-[105px] w-[105px] flex-col items-center justify-center rounded-full bg-[#0878b5] text-center text-white shadow-sm sm:h-[120px] sm:w-[120px]"
          >
            <span className="text-xl font-bold tracking-tight sm:text-2xl">
              87%
            </span>

            <span className="mt-1 text-[10px] leading-4 sm:text-xs">
              of people
              <br />
              love learning
            </span>
          </motion.div>

          {/* Small floating mint detail */}
          <motion.div
            {...floatingAnimation(8, 3.5)}
            className="absolute right-[3%] top-[42%] h-3 w-3 rounded-full border-2 border-[#9BE8D0]"
          />
        </div>

        {/* RIGHT: HERO TEXT */}

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[510px] lg:ml-auto lg:mr-0"
        >
          <span className="mb-5 block text-[10px] font-bold uppercase tracking-[1.5px] text-gray-700 sm:text-xs">
            Learn the latest skills
          </span>

          <h1 className="max-w-[480px] text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.12] tracking-[-1.8px] text-[#111111]">
            Build skills with
            <br className="hidden sm:block" />
            courses flexible online
            <br className="hidden sm:block" />
            learning experiences
          </h1>

          <p className="mt-5 max-w-[430px] text-sm leading-7 text-gray-500 sm:text-base">
            Discover engaging courses, learn from experienced tutors,
            and develop the skills you need to grow with confidence.
          </p>

          <Link to="/Student-auth/login">
          <motion.a
           
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-7 inline-flex h-[48px] items-center gap-4 rounded-[3px] bg-[#30317f] px-6 text-[11px] font-bold uppercase tracking-wide text-[#f5d900] transition-colors duration-300 hover:bg-[#242565]"
          >
            Join for free

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </motion.a>
          </Link>
        </motion.div>
      </div>
      
      <CourseSlide/>
      <CourseFlipCards/>
     
    </section>
  );
}
