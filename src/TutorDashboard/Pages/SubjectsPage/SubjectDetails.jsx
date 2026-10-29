import React from "react";
import {
  ChevronRight,
  Calculator,
  Users,
  CalendarDays,
  BookOpen,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubjectHeader() {
  const navigate = useNavigate();

  const metrics = [
    {
      icon: Users,
      label: "24 Students",
    },
    {
      icon: CalendarDays,
      label: "36 Total Classes",
    },
    {
      icon: BookOpen,
      label: "18 Lesson Notes",
    },
    {
      icon: FileText,
      label: "12 Active Assignments",
    },
    {
      icon: HelpCircle,
      label: "1 Active Quiz",
    },
  ];

  return (
    <header className="w-full bg-[#F5F7FC]">
      <div className="w-full px-7 pb-5 pt-6 sm:px-8 lg:px-10">
        {/* BREADCRUMB */}
        <div className="flex w-full items-center gap-[8px]">
          <button
            type="button"
            onClick={() => navigate("/subjects")}
            className="
              shrink-0
              text-[15px]
              font-semibold
              leading-none
              text-[#246BFF]
              hover:text-[#1558D6]
            "
          >
            Subjects
          </button>

          <ChevronRight
            className="h-[16px] w-[16px] shrink-0 text-[#246BFF]"
            strokeWidth={1.7}
          />

          <span
            className="
              truncate
              text-[15px]
              font-semibold
              leading-none
              text-[#246BFF]
            "
          >
            Mathematics (Year 1)
          </span>
        </div>

        {/* SUBJECT AREA */}
        <section
          className="
            mt-[23px]
            flex
            w-full
            items-start
            gap-[17px]
          "
        >
          {/* ICON */}
          <div
            className="
              flex
              h-[62px]
              w-[62px]
              shrink-0
              items-center
              justify-center
              rounded-[6px]
              bg-[#303487]
            "
          >
            <Calculator
              className="h-[35px] w-[35px] text-white"
              strokeWidth={1.9}
            />
          </div>

          {/* CONTENT */}
          <div className="min-w-0 flex-1">
            {/* TITLE + YEAR */}
            <div className="flex items-center gap-[15px]">
              <h1
                className="
                  m-0
                  text-[27px]
                  font-bold
                  leading-none
                  tracking-[-0.45px]
                  text-[#0B0B0D]
                "
              >
                Mathematics
              </h1>

              <span
                className="
                  inline-flex
                  h-[28px]
                  items-center
                  rounded-full
                  bg-[#E4E7FB]
                  px-[15px]
                  text-[14px]
                  font-semibold
                  leading-none
                  text-[#303487]
                "
              >
                Year 1
              </span>
            </div>

            {/* DESCRIPTION */}
            <p
              className="
                m-0
                mt-[7px]
                text-[14px]
                font-medium
                leading-[1.2]
                text-[#697384]
              "
            >
              Numbers, algebra, geometry and more.
            </p>

            {/* FULL-WIDTH METRICS */}
            <div
              className="
                mt-[11px]
                flex
                w-full
                items-center
                justify-between
              "
            >
              {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                  <React.Fragment key={metric.label}>
                    <div
                      className="
                        flex
                        items-center
                        gap-[7px]
                        whitespace-nowrap
                      "
                    >
                      <Icon
                        className="h-[17px] w-[17px] shrink-0 text-[#697384]"
                        strokeWidth={1.6}
                      />

                      <span
                        className="
                          text-[12px]
                          font-medium
                          leading-none
                          text-[#697384]
                        "
                      >
                        {metric.label}
                      </span>
                    </div>

                    {index < metrics.length - 1 && (
                      <span
                        className="
                          select-none
                          text-[13px]
                          font-normal
                          leading-none
                          text-[#8B929E]
                        "
                      >
                        |
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}