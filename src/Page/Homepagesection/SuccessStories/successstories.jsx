
import React from "react";
import { motion } from "motion/react";

import SecondSuccess from "./secondSuccess";

import SuccessImage from "../../../assets/images/TutorImage.png";
import TwoSucces from "../../../assets/images/d9688bfb-fe5a-46b2-bb46-598164566715.png";
import Third from "../../../assets/images/8cb75450-9047-4c97-975d-fd3c7b2e089f.png";
import AnimatedTestimonials from "./Testimonials";
import Footer from "../../../components/footer";
const heading = "Every Learning Journey Has a Success Story";

// Slow, smooth letter-by-letter heading animation
const headingVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.3,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Description remains fast
const paragraphVariants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Sequential image reveal
const imageContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function SuccessStoriesIntro() {
  const images = [
    {
      src: SuccessImage,
      alt: "Tutor supporting a student's learning journey",
      className: "md:mt-0",
    },
    {
      src: TwoSucces,
      alt: "Students celebrating their learning achievements",
      className: "md:mt-16",
    },
    {
      src: Third,
      alt: "A positive learning experience",
      className: "md:mt-0",
    },
  ];

  return (
    <>
      <section className="w-full overflow-hidden bg-[#fff8f6] px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">

          {/* Section Label */}
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6 inline-block text-xs font-semibold tracking-[0.22em] text-[#8FAF00] uppercase sm:text-sm"
          >
            Success Stories
          </motion.span>

          {/* Slow Animated Heading */}
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="
              mx-auto w-full max-w-5xl text-center
              text-3xl font-bold leading-[1.15]
              tracking-[-0.035em] text-gray-900
              sm:text-4xl md:text-5xl lg:text-6xl
              xl:text-[68px]
            "
          >
            {heading.split(" ").map((word, wordIndex, words) => (
              <React.Fragment key={wordIndex}>
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>

                {wordIndex !== words.length - 1 && " "}
              </React.Fragment>
            ))}
          </motion.h2>

          {/* Fast Description */}
          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
            className="
              mx-auto mt-7 w-full max-w-3xl
              text-center font-[Nunito]
              text-base leading-[1.8] text-gray-500
              sm:text-lg md:text-xl
            "
          >
            Behind every achievement is a journey of learning, dedication,
            and growth. Discover how our platform is helping students reach
            their academic goals, build confidence, and unlock their potential
            through personalised learning, dedicated tutors, and meaningful
            support.
          </motion.p>

          {/* Three Revealing Images */}
          <motion.div
            variants={imageContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="
              mt-14 grid w-full grid-cols-1
              items-center gap-5
              sm:mt-16
              md:mt-20 md:grid-cols-3 md:gap-6
            "
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                variants={imageVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className={`
                  group relative w-full overflow-hidden
                  rounded-2xl md:rounded-3xl
                  ${image.className}
                `}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="eager"
                  className="
                    block h-[280px] w-full
                    object-cover
                    sm:h-[350px]
                    md:h-[390px]
                    lg:h-[450px]
                    transition-transform duration-500
                    group-hover:scale-105y
                  "
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      <SecondSuccess />
      <AnimatedTestimonials/>
      <Footer/>
    </>
  );
}
