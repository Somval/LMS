import React from "react";
import { ArrowRight } from "lucide-react";

const CIRC = 2 * Math.PI * 36; // circle radius used by the donut

export default function Performance({ performance }) {
  const stats = performance ?? { average: null, below60: 0, between60and80: 0, above80: 0 };
  const total = stats.below60 + stats.between60and80 + stats.above80;
  const seg = (n) => (total ? (n / total) * CIRC : 0);
  const lenBelow = seg(stats.below60);
  const lenMid = seg(stats.between60and80);
  const lenAbove = seg(stats.above80);
  return (
    <section className="w-full bg-[#F5F7FC] p-2 sm:p-3">
      {/* =====================================================
          PERFORMANCE CARD
      ====================================================== */}
      <div
        className="
          w-full
          min-h-[230px]
          overflow-hidden
          rounded-[8px]
          bg-white
          px-[14px]
          py-[18px]

          sm:min-h-[245px]
          sm:rounded-[9px]
          sm:px-4
          sm:py-5

          lg:min-h-[255px]
        "
      >
        {/* ===================================================
            TITLE
        ==================================================== */}
        <h2
          className="
            m-0
            text-[15px]
            font-bold
            leading-[18px]
            tracking-[-0.15px]
            text-[#111111]

            sm:text-[16px]
            sm:leading-5
          "
        >
          Performance Summary
        </h2>

        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}
        <div
          className="
            mt-[20px]
            flex
            w-full
            items-center
            gap-[18px]

            sm:mt-[22px]
            sm:gap-[20px]
          "
        >
          {/* =================================================
              DONUT CHART
          ================================================== */}
          <div
            className="
              relative
              h-[140px]
              w-[140px]
              shrink-0

              sm:h-[145px]
              sm:w-[145px]

              lg:h-[150px]
              lg:w-[150px]
            "
          >
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full -rotate-90"
              aria-label={stats.average == null ? "No scores yet" : `Average score ${stats.average} percent`}
            >
              {total === 0 && (
                <circle cx="50" cy="50" r="36" fill="none" stroke="#EEF0F6" strokeWidth="13" />
              )}
              {/* BELOW 60% */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#86F59A"
                strokeWidth="13"
                strokeDasharray={`${lenBelow} ${CIRC - lenBelow}`}
                strokeDashoffset="0"
              />

              {/* 60% – 80% */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#FFC62A"
                strokeWidth="13"
                strokeDasharray={`${lenMid} ${CIRC - lenMid}`}
                strokeDashoffset={-lenBelow}
              />

              {/* ABOVE 80% */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#D9DCE5"
                strokeWidth="13"
                strokeDasharray={`${lenAbove} ${CIRC - lenAbove}`}
                strokeDashoffset={-(lenBelow + lenMid)}
              />
            </svg>

            {/* =================================================
                CENTER CONTENT
            ================================================== */}
            <div
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <span
                className="
                  text-[25px]
                  font-extrabold
                  leading-none
                  tracking-[-0.7px]
                  text-[#050505]

                  sm:text-[26px]
                "
              >
                {stats.average == null ? "—" : `${stats.average}%`}
              </span>

              <span
                className="
                  mt-[6px]
                  text-[9px]
                  font-medium
                  leading-none
                  text-[#7C82A6]

                  sm:text-[10px]
                "
              >
                Average Score
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}
          <div
            className="
              flex
              min-w-0
              flex-1
              flex-col
              justify-center
            "
          >
            {/* =================================================
                LEGEND
            ================================================== */}
            <div
              className="
                w-full
                space-y-[15px]

                sm:space-y-[16px]
              "
            >
              {/* BELOW 60% */}
              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-2
                "
              >
                <div className="flex min-w-0 items-center gap-[10px]">
                  <span
                    className="
                      h-[13px]
                      w-[13px]
                      shrink-0
                      rounded-full
                      bg-[#86F59A]
                    "
                  />

                  <span
                    className="
                      whitespace-nowrap
                      text-[10px]
                      font-semibold
                      leading-none
                      text-[#111111]

                      sm:text-[11px]
                    "
                  >
                    Below 60%
                  </span>
                </div>

                <span
                  className="
                    shrink-0
                    whitespace-nowrap
                    text-[9px]
                    font-medium
                    leading-none
                    text-[#687080]

                    sm:text-[10px]
                  "
                >
                  <strong className="font-bold text-[#111111]">
                    {stats.below60}
                  </strong>{" "}
                  students
                </span>
              </div>

              {/* 60% – 80% */}
              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-2
                "
              >
                <div className="flex min-w-0 items-center gap-[10px]">
                  <span
                    className="
                      h-[13px]
                      w-[13px]
                      shrink-0
                      rounded-full
                      bg-[#FFC62A]
                    "
                  />

                  <span
                    className="
                      whitespace-nowrap
                      text-[10px]
                      font-semibold
                      leading-none
                      text-[#111111]

                      sm:text-[11px]
                    "
                  >
                    60% – 80%
                  </span>
                </div>

                <span
                  className="
                    shrink-0
                    whitespace-nowrap
                    text-[9px]
                    font-medium
                    leading-none
                    text-[#687080]

                    sm:text-[10px]
                  "
                >
                  <strong className="font-bold text-[#111111]">
                    {stats.between60and80}
                  </strong>{" "}
                  students
                </span>
              </div>

              {/* ABOVE 80% */}
              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-2
                "
              >
                <div className="flex min-w-0 items-center gap-[10px]">
                  <span
                    className="
                      h-[13px]
                      w-[13px]
                      shrink-0
                      rounded-full
                      bg-[#D9DCE5]
                    "
                  />

                  <span
                    className="
                      whitespace-nowrap
                      text-[10px]
                      font-semibold
                      leading-none
                      text-[#111111]

                      sm:text-[11px]
                    "
                  >
                    Above 80%
                  </span>
                </div>

                <span
                  className="
                    shrink-0
                    whitespace-nowrap
                    text-[9px]
                    font-medium
                    leading-none
                    text-[#687080]

                    sm:text-[10px]
                  "
                >
                  <strong className="font-bold text-[#111111]">
                    {stats.above80}
                  </strong>{" "}
                  students
                </span>
              </div>
            </div>

            {/* =================================================
                CTA BUTTON
            ================================================== */}
            <button
              type="button"
              className="
                group
                mt-[18px]
                flex
                h-[32px]
                w-full
                items-center
                justify-between
                rounded-[6px]
                border
                border-[#A8C1FF]
                bg-[#E7EEFF]
                px-[14px]
                text-[9px]
                font-medium
                leading-none
                text-[#2E6DFF]
                transition-all
                duration-200
                hover:border-[#8DADFF]
                hover:bg-[#DDE7FF]
                active:scale-[0.99]

                sm:mt-[19px]
                sm:h-[34px]
                sm:px-[15px]
                sm:text-[10px]
              "
            >
              <span className="truncate">
                View detailed performance
              </span>

              <ArrowRight
                className="
                  ml-2
                  h-[15px]
                  w-[15px]
                  shrink-0
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}