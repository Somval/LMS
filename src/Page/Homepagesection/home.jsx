import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Users,
} from "lucide-react";

import ImageRight from "../../assets/images/f39039b24fdd88ecd36aa558d55d6522eb4eecf6 (1).jpg";
import TutorImage from "../../assets/images/14b550f0094c8ceadbef661cde51453cc63a745d (1).jpg";
import StudentLoginImage from "../../assets/images/d91a20d83ddd74e459d165be54c207373b373824.jpg";
import ParentalLogin from "../../assets/images/a0f0ee1efedfc51f0430e49a53990df830b0c190.jpg";
import TutorLoginImage from "../../assets/images/a91aa928c569b30aaea81469aa8ddb1fe46ed665 (2).jpg";

import WhyChooseUs from "./WhyChooseUs";
import HowItWorks from "./howitworks";
import Whoweare from "./whoweempower";
import Student from "./Subjects"
import TrackProgress from "./Trackprogress"
import Confidence from "./Confidence"
import Footer from "../../components/footer";
// =====================================================
// LOGIN CARD
// =====================================================

const LoginCard = ({ image, title, to }) => {
  return (
    <Link
      to={to}
      className="
        group
        relative
        h-[105px]
        w-[145px]
        shrink-0
        overflow-hidden
        rounded-xl
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
        "
      />

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/40
          transition
          duration-300
          group-hover:bg-black/55
        "
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white sm:text-xs">
          {title}

          <ArrowRight
            size={12}
            strokeWidth={2.5}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </p>
      </div>
    </Link>
  );
};

// =====================================================
// LIVE CLASS CARD
// =====================================================

const LiveClassCard = () => {
  return (
    <div
      className="
        absolute
        left-[-10px]
        top-[105px]
        z-30
        w-[175px]
        rounded-2xl
        bg-white
        p-3.5
        shadow-[0_15px_40px_rgba(0,0,0,0.12)]
        sm:left-[-35px]
        sm:top-[120px]
        lg:left-[-85px]
        lg:top-[125px]
      "
    >
      {/* Top Content */}
      <div className="flex items-center gap-2.5">
        {/* Tutor */}
        <div className="relative shrink-0">
          <img
            src={TutorImage}
            alt="Tutor"
            className="h-9 w-9 rounded-full object-cover"
          />

          <span
            className="
              absolute
              bottom-0
              right-0
              h-2.5
              w-2.5
              rounded-full
              border-2
              border-white
              bg-green-500
            "
          />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-[#343343]">
            Live Class
          </p>

          <p className="mt-0.5 text-[9px] text-[#77758b]">
            Today at 4.00 PM
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        type="button"
        className="
          mt-3
          rounded-full
          bg-[#30317f]
          px-5
          py-1.5
          text-[9px]
          font-semibold
          text-white
          transition
          hover:bg-[#252665]
        "
      >
        Join Now
      </button>
    </div>
  );
};

// =====================================================
// LESSON COMPLETED CARD
// =====================================================

const LessonCompletedCard = () => {
  return (
    <div
      className="
        absolute
        right-[-8px]
        top-[15px]
        z-30
        rounded-xl
        bg-white
        px-3.5
        py-3
        shadow-[0_12px_35px_rgba(0,0,0,0.11)]
        sm:right-[-25px]
        lg:right-[-55px]
      "
    >
      <div className="flex items-center gap-2.5">
        {/* Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5b57d9]">
          <BookOpenCheck
            size={17}
            strokeWidth={2}
            className="text-white"
          />
        </div>

        {/* Text */}
        <div className="whitespace-nowrap">
          <p className="text-[10px] font-semibold text-[#41404b]">
            Lesson Completed
          </p>

          <p className="mt-0.5 text-[9px] text-[#858393]">
            Keep up the great work!
          </p>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// ACTIVE STUDENTS CARD
// =====================================================

const ActiveStudentsCard = () => {
  return (
    <div
      className="
        absolute
        bottom-[55px]
        right-[-8px]
        z-30
        rounded-xl
        bg-white
        px-3.5
        py-3
        shadow-[0_12px_35px_rgba(0,0,0,0.11)]
        sm:right-[-25px]
        lg:right-[-55px]
        lg:bottom-[75px]
      "
    >
      <div className="flex items-center gap-2.5">
        {/* Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff9948]">
          <Users
            size={18}
            strokeWidth={2}
            className="text-white"
          />
        </div>

        {/* Text */}
        <div className="whitespace-nowrap">
          <p className="text-[10px] font-semibold text-[#555360]">
            5,000+ Active Students
          </p>

          <p className="mt-0.5 text-[9px] text-[#898793]">
            Learning every day
          </p>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// DECORATIVE STAR
// =====================================================

const DecorativeStar = () => {
  return (
    <div
      className="
        absolute
        -left-5
        -top-5
        z-40
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#30317f]
        shadow-lg
        sm:-left-7
        sm:-top-6
        sm:h-16
        sm:w-16
      "
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M33 0C33.4974 18.0153 47.9847 32.5026 66 33C47.9847 33.4974 33.4974 47.9847 33 66C32.5026 47.9847 18.0153 33.4974 0 33C18.0153 32.5026 32.5026 18.0153 33 0Z"
          fill="#FFE604"
        />
      </svg>
    </div>
  );
};

// =====================================================
// HERO
// =====================================================

export default function Hero() {
  return (
    <>
      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#fff8f6] mt-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div
            className="
              grid
              min-h-[720px]
              grid-cols-1
              items-center
              gap-16
              py-16
              sm:py-20
              lg:grid-cols-[1fr_0.9fr]
              lg:gap-12
              lg:py-20
          "
          >
            {/* =================================================
                LEFT SIDE
            ================================================== */}

            <div className="relative z-10">
              {/* Heading */}
              <h1
                className="
                  max-w-[580px]
                  font-serif
                  text-[46px]
                  font-medium
                  leading-[1.04]
                  tracking-[-1.8px]
                  text-[#413c3a]
                  sm:text-[56px]
                  lg:text-[62px]
                "
              >
                Expert{" "}

                <span className="relative inline-block text-[#30317f]">
                  Tutoring.

                  {/* Decorative Lines */}
                  <span
                    className="
                      absolute
                      -right-4
                      -top-4
                      h-5
                      w-[2px]
                      rotate-[5deg]
                      bg-[#30317f]
                    "
                  />

                  <span
                    className="
                      absolute
                      -right-7
                      -top-1
                      h-3
                      w-[2px]
                      rotate-[48deg]
                      bg-[#30317f]
                    "
                  />

                  <span
                    className="
                      absolute
                      -right-5
                      top-4
                      h-3
                      w-[2px]
                      rotate-[48deg]
                      bg-[#30317f]
                    "
                  />
                </span>

                <br />

                Personalized for Every

                <br />

                Learner.
              </h1>

              {/* Description */}
              <p
                className="
                  mt-6
                  max-w-[520px]
                  text-[13px]
                  leading-6
                  text-[#676582]
                  sm:text-sm
                  sm:leading-7
                "
              >
                Empowering students with live instruction, expert tutors,
                intelligent learning tools, and personalized progress tracking
                to create a smarter, more engaging learning experience.
              </p>

              {/* =================================================
                  CTA BUTTONS
              ================================================== */}

              <div className="mt-7 flex flex-wrap gap-3">
                {/* Primary */}
                <Link
                  to="/programs"
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-[4px]
                    bg-[#f4d500]
                    px-5
                    text-[10px]
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#dec300]
                    hover:shadow-md
                  "
                >
                  Start Learning Today

                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                  />
                </Link>

                {/* Secondary */}
                <Link
                  to="/free-trial"
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-[4px]
                    border
                    border-[#e7cc00]
                    bg-transparent
                    px-5
                    text-[10px]
                    font-medium
                    text-[#c4a900]
                    transition-all
                    duration-300
                    hover:bg-[#fff4b8]
                  "
                >
                  <CalendarDays
                    size={14}
                    strokeWidth={2}
                  />

                  Book A Free Trial
                </Link>
              </div>

              {/* =================================================
                  LOGIN CARDS
              ================================================== */}

              <div className="mt-8">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#9b96a8]">
                  Quick Login
                </p>

                <div className="flex flex-wrap gap-3">
                  <LoginCard
                    image={StudentLoginImage}
                    title="Student Login"
                    to="/student/onboarding"
                  />

                  <LoginCard
                    image={ParentalLogin}
                    title="Parent Login"
                    to="/parent/onboarding"
                  />

                  <LoginCard
                    image={TutorLoginImage}
                    title="Tutor Login"
                    to="/Tutor/onboarding"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================== */}

            <div
              className="
                relative
                flex
                min-h-[500px]
                items-center
                justify-center
                lg:min-h-[560px]
                lg:justify-end
              "
            >
              {/* Image Wrapper */}
              <div
                className="
                  relative
                  h-[430px]
                  w-[350px]
                  sm:h-[480px]
                  sm:w-[390px]
                  lg:h-[535px]
                  lg:w-[430px]
                "
              >
                {/* Main Image */}
                <img
                  src={ImageRight}
                  alt="Student learning"
                  className="
                    h-full
                    w-full
                    rounded-[24px]
                    object-cover
                    shadow-[0_25px_60px_rgba(48,49,127,0.12)]
                  "
                />

                {/* Soft image border */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-[24px]
                    ring-1
                    ring-black/5
                  "
                />

                {/* Decorative Star */}
                <DecorativeStar />

                {/* Floating Cards */}
                <LiveClassCard />

                <LessonCompletedCard />

                <ActiveStudentsCard />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Shape */}
        <div
          className="
            absolute
            bottom-0
            left-0
            h-5
            w-full
            bg-[#fff8f6]
          "
        />
      </section>

      {/* =====================================================
          OTHER SECTIONS
      ====================================================== */}

      <main>
        <WhyChooseUs />

        <HowItWorks />
   
       <Whoweare/>
       <Student/>
       <TrackProgress/>
       <Confidence/>
       <Footer/>
       
      </main>
    </>
  );
}