import React, { useEffect, useRef, useState } from "react";
import {
  Flame,
  UserRound,
  BookOpen,
  BadgeCheck,
  Star,
  Target,
  Globe2,
  UsersRound,
  BarChart3,
  Award,
} from "lucide-react";

/* =====================================================
    STATISTICS DATA
===================================================== */

const stats = [
  {
    value: 10000,
    suffix: "+",
    format: "compact",
    label: "Active Learners",
    icon: Flame,
  },
  {
    value: 500,
    suffix: "+",
    format: "normal",
    label: "Expert Tutors",
    icon: UserRound,
  },
  {
    value: 50,
    suffix: "+",
    format: "normal",
    label: "Interactive Courses",
    icon: BookOpen,
  },
  {
    value: 98,
    suffix: "%",
    format: "normal",
    label: "Parent Satisfaction",
    icon: BadgeCheck,
  },
];

/* =====================================================
    WHY CHOOSE US FEATURES
===================================================== */

const features = [
  {
    title: "Engaging Learning Experiences",
    description:
      "Interactive lessons that spark curiosity, encourage participation, and make learning enjoyable.",
    icon: BookOpen,
    iconColor: "#8B20FF",
    iconBg: "#F0DDFF",
    lineColor: "#8B20FF",
  },
  {
    title: "Goal-Oriented Education",
    description:
      "Every lesson is designed with measurable outcomes to help students achieve their goals.",
    icon: Target,
    iconColor: "#20B8EA",
    iconBg: "#DDF5FF",
    lineColor: "#20B8EA",
  },
  {
    title: "Learn Without Limits",
    description:
      "Access quality education anytime, anywhere, with the flexibility to learn your way.",
    icon: Globe2,
    iconColor: "#12C85B",
    iconBg: "#D7F7E2",
    lineColor: "#12C85B",
  },
  {
    title: "Meaningful Collaboration",
    description:
      "Students, parents, and tutors stay connected and work together for success.",
    icon: UsersRound,
    iconColor: "#FF8128",
    iconBg: "#FFE7D5",
    lineColor: "#FF8128",
  },
  {
    title: "Growth You Can See",
    description:
      "Celebrate every milestone with clear insights and continuous feedback that motivates.",
    icon: BarChart3,
    iconColor: "#08B99D",
    iconBg: "#D3F2EC",
    lineColor: "#08B99D",
  },
  {
    title: "Future-Ready Skills",
    description:
      "Build confidence, critical thinking, and real-world skills that prepare learners for tomorrow.",
    icon: Award,
    iconColor: "#E8C900",
    iconBg: "#FFF6C9",
    lineColor: "#E8C900",
  },
];

/* =====================================================
    ANIMATED COUNTER
===================================================== */

const AnimatedCounter = ({
  target,
  suffix = "",
  format = "normal",
  duration = 1800,
  startAnimation,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easedProgress * target);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [target, duration, startAnimation]);

  /* =====================================================
     FORMAT NUMBER
  ====================================================== */

  const formatNumber = (number) => {
    if (format === "compact") {
      if (number >= 1000) {
        return `${Math.floor(number / 1000)}K`;
      }

      return number.toLocaleString();
    }

    return number.toLocaleString();
  };

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

/* =====================================================
    FEATURE CARD
===================================================== */

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBg,
  lineColor,
}) => {
  return (
    <article
      className="
        group
        flex
        min-h-[235px]
        w-full
        flex-col
        items-center
        rounded-[14px]
        bg-white
        px-6
        pb-5
        pt-5
        text-center
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]
      "
    >
      {/* =====================================================
          ICON
      ====================================================== */}

      <div
        className="
          flex
          h-[68px]
          w-[68px]
          shrink-0
          items-center
          justify-center
          rounded-full
          md:h-[76px]
          md:w-[76px]
        "
        style={{
          backgroundColor: iconBg,
        }}
      >
        <Icon
          size={32}
          strokeWidth={1.8}
          style={{
            color: iconColor,
          }}
          className="md:scale-110"
        />
      </div>

      {/* =====================================================
          TITLE
      ====================================================== */}

      <h3 className="mt-4 text-[13px] font-semibold leading-[1.3] tracking-[-0.1px] text-[#111111] md:text-[25px]">
        {title}
      </h3>

      {/* =====================================================
          DESCRIPTION
      ====================================================== */}

      <p className="mt-2 max-w-[210px] text-[11px] font-normal leading-[1.55] text-[#9299A2] md:max-w-[280px] md:text-[20px] md:leading-[1.6]">
        {description}
      </p>

      {/* =====================================================
          BOTTOM ACCENT LINE
      ====================================================== */}

      <div
        className="mt-auto h-[2px] w-[53px] rounded-full md:w-[68px]"
        style={{
          backgroundColor: lineColor,
        }}
      />
    </article>
  );
};

/* =====================================================
    MAIN COMPONENT
===================================================== */

const WhyChooseUs = () => {
  const statsRef = useRef(null);

  const [startCounter, setStartCounter] = useState(false);

  /* =====================================================
     START COUNTER WHEN STATS ENTER VIEWPORT
  ====================================================== */

  useEffect(() => {
    const element = statsRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounter(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F8F8FA]">

      {/* =====================================================
          DECORATIVE RIGHT BACKGROUND SHAPE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-42px]
          top-[390px]
          z-0
          h-[500px]
          w-[130px]
          rounded-l-[100px]
          bg-[#F0E7F8]
          opacity-80
        "
      />

      {/* =====================================================
          TOP STATISTICS
      ====================================================== */}

      <div
        ref={statsRef}
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[760px]
          grid-cols-2
          gap-y-10
          px-6
          pt-8
          sm:grid-cols-4
          sm:gap-y-0
          sm:pt-9
          md:max-w-[1100px]
          md:pt-14
        "
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Icon Circle */}

              <div className="mb-5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#E3EAF8] md:h-[46px] md:w-[46px]">
                <Icon
                  size={14}
                  strokeWidth={2.5}
                  className="text-[#28377D] md:scale-125"
                />
              </div>

              {/* Animated Number */}

              <h3 className="text-[30px] font-semibold leading-none tracking-[-0.8px] text-[#173A59] sm:text-[31px] md:text-[46px]">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  format={stat.format}
                  duration={1800}
                  startAnimation={startCounter}
                />
              </h3>

              {/* Label */}

              <p className="mt-2 text-[11px] font-normal tracking-[0.1px] text-[#708096] md:text-[15px]">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-[760px]
          flex-col
          items-center
          px-6
          pb-10
          pt-[55px]
          text-center
          md:max-w-[900px]
          md:pb-14
          md:pt-[80px]
        "
      >
        {/* =====================================================
            WHY CHOOSE US PILL
        ====================================================== */}

        <div className="mb-3 flex h-[39px] items-center gap-2 rounded-full bg-[#E5EEFF] px-[17px] md:h-[46px] md:px-[22px]">
          <Star
            size={20}
            strokeWidth={0}
            fill="#FFD400"
            className="text-[#FFD400] md:scale-110"
          />

          <span className="text-[12px] font-medium uppercase tracking-[0.2px] text-[#29367A] md:text-[15px]">
            Why Choose Us
          </span>
        </div>

        {/* =====================================================
            MAIN HEADING
        ====================================================== */}

        <h2 className="max-w-[620px] text-[32px] font-bold leading-[1.12] tracking-[-1.4px] text-black sm:text-[34px] md:max-w-[850px] md:text-[48px]">
          Education That Goes
          <br />

          <span className="text-[#303B82]">
            Beyond the Classroom
          </span>
        </h2>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <p className="mt-5 max-w-[500px] text-[14px] font-normal leading-[1.8] text-[#9AA0A9] sm:max-w-[520px] md:max-w-[680px] md:text-[18px] md:leading-[1.7]">
          We create meaningful learning experiences that empower students,
          support parents, and equip educators with the tools they need to
          inspire confidence, encourage growth, and achieve lasting success.
        </p>
      </div>

      {/* =====================================================
          LEFT DOT DECORATION
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[47px]
          top-[238px]
          z-0
          hidden
          h-[68px]
          w-[42px]
          opacity-80
          sm:block
        "
        style={{
          backgroundImage:
            "radial-gradient(circle, #BDD4F4 2px, transparent 2px)",
          backgroundSize: "13px 13px",
        }}
      />

      {/* =====================================================
          RIGHT DOT DECORATION
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[47px]
          top-[251px]
          z-0
          hidden
          h-[45px]
          w-[96px]
          opacity-80
          sm:block
        "
        style={{
          backgroundImage:
            "radial-gradient(circle, #BDD4F4 2px, transparent 2px)",
          backgroundSize: "13px 13px",
        }}
      />

      {/* =====================================================
          FEATURE CARDS
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[760px]
          grid-cols-1
          gap-6
          px-6
          pb-16
          pt-5
          sm:grid-cols-2
          sm:gap-x-8
          sm:gap-y-6
          lg:max-w-[1150px]
          lg:grid-cols-3
          lg:gap-8
          md:pb-24
        "
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            iconColor={feature.iconColor}
            iconBg={feature.iconBg}
            lineColor={feature.lineColor}
          />
        ))}
      </div>

      
    </section>
  );
};

export default WhyChooseUs;