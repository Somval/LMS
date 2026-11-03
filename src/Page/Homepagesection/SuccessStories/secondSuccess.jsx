
import React from "react";
import { motion } from "motion/react";

const categories = ["Tutor", "Student", "Parent"];

const repeatedCategories = [
  ...categories,
  ...categories,
  ...categories,
  ...categories,
];

const separatorColors = [
  "bg-[#f4d500]",
  "bg-[#ff9948]",
];

export default function SuccessStoriesTicker() {
  return (
    <section className="w-full overflow-hidden py-12 md:py-16">

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ willChange: "transform" }}
        >
          {repeatedCategories.map((item, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center gap-8 px-6 font-[Outfit] md:gap-12 md:px-10"
            >
              <span className="text-5xl font-bold leading-none tracking-[-0.065em] text-[#111111] sm:text-6xl md:text-7xl lg:text-[88px]">
                {item}
              </span>

              {index !== repeatedCategories.length - 1 && (
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full md:h-3 md:w-3 ${
                    separatorColors[index % separatorColors.length]
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
