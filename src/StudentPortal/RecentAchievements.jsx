import React from "react";
import { Calendar } from "lucide-react";
import ImagePath from "../assets/images/134a082cca973150969aa91355d8ac63a4934a6a (1).png";

export default function RecentAchievements() {
  const achievements = [
    {
      id: 1,
      title: "Mathematics Milestone",
      description:
        "Completed a major Mathematics learning milestone.",
      date: "Aug 8, 2026",
      imagePath: ImagePath,
    },
    {
      id: 2,
      title: "Mathematics Milestone",
      description:
        "Completed a major Mathematics learning milestone.",
      date: "Aug 8, 2026",
      imagePath: ImagePath,
    },
    {
      id: 3,
      title: "Mathematics Milestone",
      description:
        "Completed a major Mathematics learning milestone.",
      date: "Aug 8, 2026",
      imagePath: ImagePath,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-6 lg:px-6">
      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div
        className="
          w-full
          rounded-2xl
          bg-white
          p-5
          shadow-sm
          sm:p-6
          lg:rounded-3xl
          lg:p-8
        "
      >
        {/* =================================================
            SECTION HEADER
        ================================================== */}
        <h2
          className="
            mb-5
            text-lg
            font-bold
            text-gray-900
            sm:mb-6
            sm:text-xl
          "
        >
          Recent Achievements
        </h2>

        {/* =================================================
            ACHIEVEMENTS GRID
        ================================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {achievements.map((item) => (
            <div
              key={item.id}
              className="
                flex
                min-w-0
                flex-col
                justify-between
                rounded-2xl
                bg-[#f2f6ff]
                p-5
                sm:p-6
                lg:rounded-3xl
                lg:p-8
              "
            >
              {/* =================================================
                  CONTENT
              ================================================== */}
              <div className="min-w-0">
                {/* Achievement Image */}
                <div className="mb-5 flex justify-center sm:mb-6">
                  <div
                    className="
                      flex
                      h-[92px]
                      w-[92px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#d0e1fe]
                      p-3
                      sm:h-[105px]
                      sm:w-[105px]
                      sm:p-3.5
                      lg:h-32
                      lg:w-32
                      lg:p-4
                    "
                  >
                    <img
                      src={item.imagePath}
                      alt={item.title}
                      className="
                        h-full
                        w-full
                        object-contain
                      "
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="
                    truncate
                    text-base
                    font-bold
                    text-gray-900
                    sm:text-lg
                  "
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-1.5
                    text-xs
                    font-normal
                    leading-5
                    text-gray-500
                    sm:mt-2
                    sm:text-sm
                    sm:leading-relaxed
                  "
                >
                  {item.description}
                </p>
              </div>

              {/* =================================================
                  DATE
              ================================================== */}
              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  font-semibold
                  text-gray-600
                  sm:mt-7
                  sm:text-xs
                "
              >
                <Calendar
                  className="
                    h-3.5
                    w-3.5
                    shrink-0
                    text-gray-500
                    sm:h-4
                    sm:w-4
                  "
                  strokeWidth={2.2}
                />

                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}