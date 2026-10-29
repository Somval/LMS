
import React from "react";
import { BookOpen } from "lucide-react";

import TutorImage from "../../assets/images/c65d481d3bdbfb71cf17f2395bd902515e06ac4d (1).png";

const features = [
  {
    title: "Flexible Teaching",
    description:
      "Teach from anywhere, with classes scheduled around your learners.",
    Icon: (
      <svg
        width="30"
        height="29"
        viewBox="0 0 30 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M18.75 0.9375C18.75 0.419733 19.1697 0 19.6875 0C20.2053 0 20.625 0.419733 20.625 0.9375V1.875H25.7812C28.1112 1.875 30 3.7638 30 6.09375V23.9062C30 26.2362 28.1112 28.125 25.7812 28.125H4.21875C1.8888 28.125 0 26.2362 0 23.9062V6.09375C0 3.7638 1.8888 1.875 4.21875 1.875H9.375V0.9375C9.375 0.419733 9.79473 0 10.3125 0C10.8303 0 11.25 0.419733 11.25 0.9375V1.875H18.75V0.9375ZM27.8906 10.3125C27.8906 9.92418 27.5758 9.60938 27.1875 9.60938H2.8125C2.42418 9.60938 2.10938 9.92418 2.10938 10.3125C2.10938 10.7008 2.42418 11.0156 2.8125 11.0156H27.1875C27.5758 11.0156 27.8906 10.7008 27.8906 10.3125Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#6D4CFB"
        />
      </svg>
    ),
    bg: "bg-[#E9D9FF]",
  },
  {
    title: "Supportive Community",
    description: "Be part of a trusted learning platform.",
    Icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M11.2498 17.8125C14.8741 17.8125 17.8123 14.8744 17.8123 11.25C17.8123 7.62563 14.8741 4.6875 11.2498 4.6875C7.6254 4.6875 4.68727 7.62563 4.68727 11.25C4.68727 14.8744 7.6254 17.8125 11.2498 17.8125Z"
          fill="#0ED753"
        />
        <path
          d="M0.423971 22.8561L0.131836 25.1932C2.87154 28.1496 6.7879 30 11.1364 30C15.5915 30 19.5929 28.0578 22.3402 24.974L22.0755 22.8561C21.7823 20.5103 19.7882 18.75 17.4242 18.75H15.9372L12.9906 19.9286C11.8731 20.3757 10.6264 20.3757 9.50884 19.9286L6.56223 18.75H5.07527C2.71126 18.75 0.717191 20.5103 0.423971 22.8561Z"
          fill="#0ED753"
        />
        <path
          d="M13.7146 2.20013C17.7008 3.27954 20.6331 6.92233 20.6331 11.25C20.6331 11.7961 20.5864 12.3313 20.4967 12.852C23.2052 12.0438 25.1799 9.53376 25.1799 6.5625C25.1799 2.93813 22.2417 0 18.6174 0C16.6677 0 14.9166 0.850223 13.7146 2.20013Z"
          fill="#0ED753"
        />
        <path
          d="M25.0385 23.8182C26.8201 22.9546 28.405 21.7489 29.7078 20.2865L29.4431 18.1686C29.1499 15.8228 27.1558 14.0625 24.7918 14.0625H23.3048L20.3582 15.2411C20.1219 15.3357 19.8797 15.4102 19.6343 15.4648C19.5146 15.7022 19.3852 15.9337 19.2465 16.159C22.1936 16.8923 24.4828 19.3731 24.8746 22.5072L25.0385 23.8182Z"
          fill="#0ED753"
        />
      </svg>
    ),
    bg: "bg-[#D8F6DC]",
  },
  {
    title: "Real Impact",
    description:
      "Help students build confidence and achieve success.",
    Icon: (
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M18.75 10.3125V24.375C18.75 25.4105 19.5895 26.25 20.625 26.25H24.375C25.4105 26.25 26.25 25.4105 26.25 24.375V10.3125C26.25 9.27695 25.4105 8.43749 24.375 8.43749H20.625C19.5895 8.43749 18.75 9.27695 18.75 10.3125Z"
          fill="#FB7D22"
        />
        <path
          d="M9.375 1.875V24.375C9.375 25.4105 10.2145 26.25 11.25 26.25H15C16.0355 26.25 16.875 25.4105 16.875 24.375V1.875C16.875 0.839466 16.0355 0 15 0H11.25C10.2145 0 9.375 0.839466 9.375 1.875Z"
          fill="#FB7D22"
        />
        <path
          d="M0 15V24.375C0 25.4105 0.839466 26.25 1.875 26.25H5.625C6.66053 26.25 7.5 25.4105 7.5 24.375V15C7.5 13.9645 6.66053 13.125 5.625 13.125H1.875C0.839466 13.125 0 13.9645 0 15Z"
          fill="#FB7D22"
        />
      </svg>
    ),
    bg: "bg-[#FFE4D0]",
  },
];

export default function LMSLanding() {
  return (
    <aside className="font-outfit flex h-full min-h-0 w-full flex-col justify-between overflow-y-auto bg-[#FFF7EB] text-left">
      {/* Top content */}
      <div className="px-6 pt-8 sm:px-10 sm:pt-10 lg:px-14 lg:pt-14 xl:px-16 xl:pt-16">
        {/* Brand */}
        <header className="mb-10 sm:mb-12 lg:mb-14">
          <div className="flex items-center gap-2.5">
            <BookOpen
              size={26}
              strokeWidth={2.5}
              className="shrink-0 text-[#244C99] sm:h-8 sm:w-8"
            />

            <h1 className="text-[28px] font-extrabold tracking-tight text-[#244C99] sm:text-2xl">
              LMS <span className="font-medium">SYSTEM</span>
            </h1>
          </div>

          <p className="ml-[38px] mt-1 text-[10px] font-semibold tracking-wider text-[#8A847A] sm:ml-[42px] sm:text-xs">
            Become a Tutor
          </p>
        </header>

        {/* Hero */}
        <section >
          <h2 className="text-[20px]  font-[600px] font-extrabold leading-[1.1] tracking-[-1px] text-[#176B20]">
            Teach. Inspire.
            <br />
            Make an Impact.
          </h2>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#8C8982] sm:text-lg lg:text-[19px]">
            Join our community of passionate tutors and help
            students achieve their learning goals.
          </p>
        </section>

        {/* Features */}
        <section
          aria-label="Platform benefits"
          className="mt-8 space-y-5 sm:mt-10 sm:space-y-6 lg:mt-12 lg:space-y-7"
        >
          {features.map(({ title, description, Icon, bg }) => (
            <article
              key={title}
              className="flex items-start gap-4 sm:gap-5"
            >
              {/* Feature icon */}
              <div
                className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${bg}`}
              >
                {Icon}
              </div>

              {/* Feature description */}
              <div className="min-w-0 pt-0.5">
                <h3 className="text-base font-bold leading-snug text-[#292923] sm:text-lg">
                  {title}
                </h3>

                <p className="mt-1 max-w-md text-xs leading-relaxed text-[#8C8982] sm:text-sm lg:text-[15px]">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* Tutor image */}
      <div className="mt-auto flex items-end justify-center px-4 pt-6 sm:px-8">
        <img
          src={TutorImage}
          alt="Tutor working on a laptop at her desk"
          className="block h-auto w-full max-w-[480px] object-contain object-bottom sm:max-h-[420px] lg:max-h-[480px] xl:max-h-[540px]"
        />
      </div>
    </aside>
  );
}
