import React from "react";
import {
  Calculator,
  BookOpen,
  Atom,
  ArrowRight,
} from "lucide-react";

const subjects = [
  {
    name: "Mathematics",
    tutor: "William Johnson",
    progress: 70,
    color: "#30358A",
    icon: Calculator,
  },
  {
    name: "English",
    tutor: "William Johnson",
    progress: 70,
    color: "#E8D000",
    icon: BookOpen,
  },
  {
    name: "Science",
    tutor: "William Johnson",
    progress: 70,
    color: "#05C957",
    icon: Atom,
  },
];

function SubjectCard({ subject }) {
  const Icon = subject.icon;

  return (
    <div
      className="
        h-[254px]
        w-full
        rounded-[7px]
        border
        border-[#E4E9F3]
        bg-white
        px-[15px]
        pt-[11px]
        shadow-[0_2px_8px_rgba(15,23,42,0.025)]

        /* Mobile */
        max-[639px]:h-[235px]
        max-[639px]:px-[14px]
        max-[639px]:pt-[12px]
      "
    >
      {/* =====================================================
          ICON
      ====================================================== */}
      <div
        className="
          flex
          h-[47px]
          w-[47px]
          items-center
          justify-center
          rounded-[5px]

          max-[639px]:h-[45px]
          max-[639px]:w-[45px]
        "
        style={{
          backgroundColor: subject.color,
        }}
      >
        <Icon
          className="
            h-[27px]
            w-[27px]
            text-white

            max-[639px]:h-[25px]
            max-[639px]:w-[25px]
          "
          strokeWidth={1.7}
        />
      </div>

      {/* =====================================================
          SUBJECT INFORMATION
      ====================================================== */}
      <div
        className="
          mt-[17px]

          max-[639px]:mt-[15px]
        "
      >
        <h2
          className="
            text-[16px]
            font-semibold
            leading-[19px]
            text-[#111111]

            max-[639px]:text-[15px]
            max-[639px]:leading-[18px]
          "
        >
          {subject.name}
        </h2>

        <p
          className="
            mt-[6px]
            text-[12px]
            leading-[15px]
            text-[#8589A8]

            max-[639px]:mt-[5px]
            max-[639px]:text-[11px]
            max-[639px]:leading-[14px]
          "
        >
          Tutor: {subject.tutor}
        </p>
      </div>

      {/* =====================================================
          PROGRESS
      ====================================================== */}
      <div
        className="
          mt-[32px]
          flex
          items-center
          gap-[13px]

          max-[639px]:mt-[27px]
          max-[639px]:gap-[10px]
        "
      >
        <div
          className="
            h-[11px]
            flex-1
            overflow-hidden
            rounded-full
            bg-[#D9D9D9]

            max-[639px]:h-[9px]
          "
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${subject.progress}%`,
              backgroundColor: subject.color,
            }}
          />
        </div>

        <span
          className="
            text-[12px]
            font-medium
            leading-none
            text-[#111111]

            max-[639px]:text-[11px]
          "
        >
          {subject.progress}%
        </span>
      </div>

      {/* =====================================================
          DIVIDER
      ====================================================== */}
      <div
        className="
          mt-[30px]
          border-t
          border-[#E8EBF2]

          max-[639px]:mt-[25px]
        "
      />

      {/* =====================================================
          CONTINUE LEARNING
      ====================================================== */}
      <button
        type="button"
        className="
          group
          mt-[13px]
          flex
          w-full
          items-center
          justify-between
          text-left

          max-[639px]:mt-[12px]
        "
      >
        <span
          className="
            text-[12px]
            font-medium
            text-[#30358A]

            max-[639px]:text-[11px]
          "
        >
          Continue Learning
        </span>

        <ArrowRight
          className="
            h-[17px]
            w-[17px]
            text-[#30358A]
            transition-transform
            duration-200
            group-hover:translate-x-1

            max-[639px]:h-[16px]
            max-[639px]:w-[16px]
          "
          strokeWidth={1.6}
        />
      </button>
    </div>
  );
}

export default function Mylearning() {
  return (
    <section
      className="
        w-full
        bg-transparent
        px-[9px]
        py-[27px]

        max-[639px]:px-[14px]
        max-[639px]:py-[20px]
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div
        className="
          mb-[29px]
          flex
          items-center
          justify-between

          max-[639px]:mb-[20px]
        "
      >
        <h1
          className="
            text-[24px]
            font-semibold
            leading-[29px]
            tracking-[-0.5px]
            text-[#000000]

            max-[639px]:text-[20px]
            max-[639px]:leading-[24px]
          "
        >
          My Learning Journey
        </h1>

        <button
          type="button"
          className="
            group
            flex
            shrink-0
            items-center
            gap-[15px]
            text-[18px]
            font-medium
            leading-none
            text-[#2E6DFF]

            max-[639px]:gap-[7px]
            max-[639px]:text-[13px]
          "
        >
          <span>View All</span>

          <ArrowRight
            className="
              h-[18px]
              w-[18px]
              transition-transform
              duration-200
              group-hover:translate-x-1

              max-[639px]:h-[15px]
              max-[639px]:w-[15px]
            "
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* =====================================================
          SUBJECT CARDS

          DESKTOP:
          3 cards in one row.

          MOBILE:
          1 card per row so nothing gets squeezed or hidden.
      ====================================================== */}
      <div
        className="
          grid
          w-full
          grid-cols-3
          gap-[10px]

          max-[767px]:grid-cols-2
          max-[639px]:grid-cols-1
          max-[639px]:gap-[12px]
        "
      >
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.name}
            subject={subject}
          />
        ))}
      </div>
    </section>
    
  );
}