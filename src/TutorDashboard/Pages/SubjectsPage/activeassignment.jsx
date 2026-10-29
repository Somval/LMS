import React from "react";
import { Clipboard } from "lucide-react";

const assignmentsData = [
  {
    id: 1,
    title: "Quadratic Equations",
    dueDate: "May 31, 2025",
    score: "18/24",
    status: "Submitted",
  },
  {
    id: 2,
    title: "Quadratic Equations",
    dueDate: "May 31, 2025",
    score: "18/24",
    status: "Submitted",
  },
  {
    id: 3,
    title: "Quadratic Equations",
    dueDate: "May 31, 2025",
    score: "18/24",
    status: "Submitted",
  },
  {
    id: 4,
    title: "Quadratic Equations",
    dueDate: "May 31, 2025",
    score: "18/24",
    status: "Submitted",
  },
];

const ActiveAssignments = () => {
  return (
    <section className="w-full bg-[#F5F7FC] p-2 sm:p-3">
      {/* =====================================================
          MAIN CARD
      ====================================================== */}
      <div
        className="
          w-full
          overflow-hidden
          rounded-[9px]
          bg-white

          sm:rounded-[10px]
        "
      >
        {/* ===================================================
            HEADER
            SAME SIZE / SPACING AS RECENT CLASSES
        ==================================================== */}
        <div
          className="
            flex
            h-[48px]
            items-center
            justify-between
            px-[17px]

            sm:h-[51px]
            sm:px-[18px]

            md:h-[54px]
            md:px-[20px]
          "
        >
          {/* TITLE */}
          <h2
            className="
              m-0
              text-[17px]
              font-bold
              leading-none
              tracking-[-0.2px]
              text-[#111111]

              sm:text-[18px]

              md:text-[19px]
            "
          >
            Active Assignments &amp; Quizzes
          </h2>

          {/* VIEW ALL */}
          <button
            type="button"
            className="
              shrink-0
              border-0
              bg-transparent
              p-0
              text-[12px]
              font-medium
              leading-none
              text-[#2868FF]
              transition-colors
              duration-200
              hover:text-[#174FD4]
              cursor-pointer

              sm:text-[13px]

              md:text-[14px]
            "
          >
            View All
          </button>
        </div>

        {/* ===================================================
            LIST CONTAINER
        ==================================================== */}
        <div
          className="
            mx-[10px]
            mb-[10px]
            w-auto
            overflow-hidden
            rounded-[7px]
            border
            border-[#E8E8ED]
            bg-white

            sm:mx-[12px]
            sm:mb-[12px]
            sm:rounded-[8px]

            md:mx-[14px]
            md:mb-[14px]
          "
        >
          {assignmentsData.map((item, index) => (
            <div
              key={item.id}
              className={`
                flex
                min-h-[52px]
                w-full
                items-center
                gap-[10px]
                px-[10px]
                py-[7px]
                transition-colors
                duration-150
                hover:bg-[#FAFBFF]

                sm:min-h-[55px]
                sm:gap-[11px]
                sm:px-[11px]

                ${
                  index !== assignmentsData.length - 1
                    ? "border-b border-[#EEEEF2]"
                    : ""
                }
              `}
            >
              {/* =================================================
                  LEFT ICON
              ================================================== */}
              <div
                className="
                  flex
                  h-[30px]
                  w-[30px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[6px]
                  bg-[#E8ECFF]

                  sm:h-[32px]
                  sm:w-[32px]
                "
              >
                <Clipboard
                  className="
                    h-[15px]
                    w-[15px]
                    text-[#476BFF]

                    sm:h-[16px]
                    sm:w-[16px]
                  "
                  strokeWidth={1.8}
                />
              </div>

              {/* =================================================
                  CENTER CONTENT
              ================================================== */}
              <div
                className="
                  min-w-0
                  flex-1
                  overflow-hidden
                "
              >
                <h3
                  className="
                    m-0
                    truncate
                    text-[11px]
                    font-semibold
                    leading-[14px]
                    text-[#151515]

                    sm:text-[12px]
                    sm:leading-[15px]

                    md:text-[13px]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    m-0
                    mt-[2px]
                    truncate
                    text-[9px]
                    font-medium
                    leading-[12px]
                    text-[#8C9098]

                    sm:text-[10px]
                    sm:leading-[13px]

                    md:text-[11px]
                  "
                >
                  Due: {item.dueDate}
                </p>
              </div>

              {/* =================================================
                  RIGHT CONTENT
              ================================================== */}
              <div
                className="
                  flex
                  w-[54px]
                  shrink-0
                  flex-col
                  items-end
                  justify-center
                  text-right

                  sm:w-[60px]

                  md:w-[68px]
                "
              >
                <span
                  className="
                    text-[10px]
                    font-medium
                    leading-[13px]
                    text-[#6F7682]

                    sm:text-[11px]
                    sm:leading-[14px]

                    md:text-[12px]
                  "
                >
                  {item.score}
                </span>

                <span
                  className="
                    mt-[1px]
                    text-[9px]
                    font-medium
                    leading-[12px]
                    text-[#999DA5]

                    sm:text-[10px]
                    sm:leading-[13px]

                    md:text-[11px]
                  "
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveAssignments;