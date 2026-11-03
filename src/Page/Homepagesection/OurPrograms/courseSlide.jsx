
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";
import { Play, Pause } from "lucide-react";

const categories = [
  {
    title: "Mathematics",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "English",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "Vocational Aptitude",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "Quantitative Reasoning",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "Verbal Reasoning",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "Coding",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "Languages",
    image:
      "https://images.unsplash.com/photo-1543109740-4bdb38fda756?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "Creative Arts",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "Physics",
    image:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "Chemistry",
    image:
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    title: "Further Mathematics",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
];

const CARD_WIDTH = 280;

export default function CategoryCarousel() {
  const [isPlaying, setIsPlaying] = useState(true);

  const trackRef = useRef(null);
  const firstGroupRef = useRef(null);
  const groupWidthRef = useRef(0);

  const x = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const speed = 42;

  // Measure the width of one complete set of cards.
  useEffect(() => {
    const group = firstGroupRef.current;

    if (!group) return;

    const updateWidth = () => {
      groupWidthRef.current = group.getBoundingClientRect().width;
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(group);

    return () => observer.disconnect();
  }, []);

  // Continuous infinite Motion animation.
  useAnimationFrame((_, delta) => {
    if (!isPlaying || shouldReduceMotion) return;

    const groupWidth = groupWidthRef.current;

    if (!groupWidth) return;

    const movement = (speed * delta) / 1000;

    let nextX = x.get() - movement;

    // Seamless loop without a visible jump.
    if (nextX <= -groupWidth) {
      nextX += groupWidth;
    }

    x.set(nextX);
  });

  const renderCards = (groupIndex) =>
    categories.map((category, index) => (
      <div
        key={`${groupIndex}-${category.title}`}
        className="group relative h-[230px] shrink-0 overflow-hidden bg-gray-200 sm:h-[270px] lg:h-[310px]"
        style={{ width: `${CARD_WIDTH}px` }}
      >
        {/* Real-world subject image */}
        <img
          src={category.image}
          alt={category.title}
          draggable="false"
          loading={groupIndex === 0 && index < 5 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ objectPosition: category.position }}
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/5 to-black/20 transition-all duration-500 group-hover:from-black/35" />

        {/* Subject title */}
        <h3 className="absolute left-5 top-7 z-10 max-w-[230px] text-xl font-bold leading-tight tracking-tight text-white drop-shadow-md sm:left-6 sm:top-8 sm:text-2xl">
          {category.title}
        </h3>

        {/* Subtle bottom highlight */}
        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-white/80 transition-all duration-500 group-hover:w-full" />
      </div>
    ));

  return (
    <section
      className="relative w-full overflow-hidden bg-white py-3"
      aria-label="Explore learning subjects"
    >
      {/* Infinite scrolling track */}
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max will-change-transform"
      >
        {/* First group */}
        <div ref={firstGroupRef} className="flex shrink-0">
          {renderCards(0)}
        </div>

        {/* Duplicate group for seamless looping */}
        <div className="flex shrink-0" aria-hidden="true">
          {renderCards(1)}
        </div>
      </motion.div>

      {/* Play / Pause control */}
      <motion.button
        type="button"
        onClick={() => setIsPlaying((previous) => !previous)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        aria-pressed={!isPlaying}
        className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-black/55 text-white shadow-lg backdrop-blur-md transition-colors duration-300 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white sm:right-7 sm:h-14 sm:w-14"
      >
        <motion.span
          key={isPlaying ? "pause" : "play"}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isPlaying ? (
            <Pause size={23} fill="white" strokeWidth={2} />
          ) : (
            <Play
              size={23}
              fill="white"
              strokeWidth={2}
              className="ml-1"
            />
          )}
        </motion.span>
      </motion.button>
    </section>
  );
}
