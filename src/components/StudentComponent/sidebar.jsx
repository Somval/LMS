
import React from "react";
import {
  BookOpen,
  UsersRound,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import TutorImage from "../assets/images/c65d481d3bdbfb71cf17f2395bd902515e06ac4d (1).png";

const features = [
  {
    title: "Flexible Teaching",
    description:
      "Teach from anywhere, with classes scheduled around your learners.",
    Icon: BookOpen,
    bg: "bg-[#E9D9FF]",
    color: "text-[#8952F6]",
  },
  {
    title: "Supportive Community",
    description:
      "Be part of a trusted learning platform.",
    Icon: UsersRound,
    bg: "bg-[#D8F6DC]",
    color: "text-[#26B85A]",
  },
  {
    title: "Real Impact",
    description:
      "Help students build confidence and achieve success.",
    Icon: ChartNoAxesColumnIncreasing,
    bg: "bg-[#FFE4D0]",
    color: "text-[#F39A56]",
  },
];

export default function LMSLanding() {
  return (
    <main className="min-h-screen bg-[#607989] p-[3px] sm:flex sm:items-center sm:justify-center sm:p-6">
      <section className="relative mx-auto flex min-h-[calc(100svh-6px)] w-full max-w-[430px] flex-col overflow-hidden rounded-[3px] bg-[#FFF7EB] px-5 pt-7 sm:min-h-[780px] sm:rounded-2xl sm:shadow-xl">

        {/* Logo */}
        <header className="mb-6">
          <div className="flex items-center gap-1">
            <BookOpen
              size={16}
              strokeWidth={2.5}
              className="text-[#244C99]"
            />

            <h1 className="text-[11px] font-extrabold tracking-tight text-[#244C99]">
              LMS <span className="font-medium">SYSTEM</span>
            </h1>
          </div>

          <p className="ml-5 text-[5px] tracking-wide text-[#8A847A]">
            Become a Tutor
          </p>
        </header>

        {/* Hero */}
        <section className="relative z-10">
          <h2 className="max-w-[250px] font-[Outfit] text-[21px] font-extrabold leading-[1.16] tracking-[-0.7px] text-[#176B20]">
            Teach. Inspire.
            <br />
            Make an Impact.
          </h2>

          <p className="mt-3 max-w-[255px] text-[10px] leading-[1.5] text-[#8C8982]">
            Join our community of passionate tutors and help
            students achieve their learning goals.
          </p>
        </section>

        {/* Benefits */}
        <section
          aria-label="Platform benefits"
          className="relative z-10 mt-5 space-y-4"
        >
          {features.map(({ title, description, Icon, bg, color }) => (
            <article
              key={title}
              className="flex items-start gap-3"
            >
              <div
                className={`flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-[10px] ${bg}`}
              >
                <Icon
                  size={16}
                  strokeWidth={2.3}
                  className={color}
                />
              </div>

              <div className="pt-0.5">
                <h3 className="text-[10px] font-bold leading-tight text-[#292923]">
                  {title}
                </h3>

                <p className="mt-1 max-w-[220px] text-[8px] leading-[1.5] text-[#8C8982]">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Imported tutor image */}
        <div className="relative mt-auto flex min-h-[185px] items-end justify-center pt-5">
          <img
            src={TutorImage}
            alt="Tutor working on a laptop at her desk"
            className="block h-auto max-h-[250px] w-full max-w-[350px] object-contain object-bottom"
          />
        </div>
      </section>
    </main>
  );
}
