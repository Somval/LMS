import React from "react";
import { Award, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { subjectQuery } from "./subjectFormat";

export default function AchievementsRecognition({ subjectId, year }) {
  const navigate = useNavigate();
  const query = subjectQuery(subjectId, year);

  const openAchievements = () => navigate(`/tutor/achievements${query}`);
  const openRewards = () => navigate(`/tutor/rewardsBadges${query}`);

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
          px-[13px]
          py-[16px]

          sm:rounded-[10px]
          sm:px-[15px]
          sm:py-[17px]

          lg:px-[16px]
          lg:py-[18px]
        "
      >
        {/* ===================================================
            TITLE
        ==================================================== */}
        <h2
          className="
            m-0
            text-[16px]
            font-bold
            leading-[20px]
            tracking-[-0.2px]
            text-[#111111]

            sm:text-[17px]
            sm:leading-[21px]
          "
        >
          Achievements &amp; Recognition
        </h2>

        {/* ===================================================
            INNER CONTENT CONTAINER
        ==================================================== */}
        <div
          className="
            mt-[10px]
            w-full
            rounded-[8px]
            border
            border-[#E8E8ED]
            bg-white
            px-[22px]
            py-[27px]

            sm:mt-[11px]
            sm:px-[25px]
            sm:py-[29px]

            md:px-[32px]
            md:py-[32px]

            lg:px-[28px]
            lg:py-[31px]
          "
        >
          {/* =================================================
              ACHIEVEMENT CARDS CONTAINER
          ================================================== */}
          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-[20px]

              sm:gap-[22px]

              md:gap-[24px]

              lg:grid-cols-2
              lg:gap-[26px]
            "
          >
            {/* =================================================
                ACHIEVEMENTS CARD
            ================================================== */}
            <button
              type="button"
              onClick={openAchievements}
              className="
                flex
                min-w-0
                min-h-[108px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-[7px]
                border
                border-[#E3E3E8]
                bg-[#FFFBFB]
                px-[10px]
                py-[14px]
                shadow-[0_2px_8px_rgba(15,23,42,0.045)]
                text-left
                cursor-pointer
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[#477DFF]
                hover:shadow-[0_4px_12px_rgba(71,125,255,0.08)]
                active:translate-y-0
                focus:outline-none
                focus:ring-2
                focus:ring-[#477DFF]
                focus:ring-offset-1

                sm:min-h-[112px]
                sm:px-[12px]
                sm:py-[15px]

                md:min-h-[118px]

                lg:min-h-[112px]
              "
            >
              {/* ICON */}
              <div
                className="
                  flex
                  h-[30px]
                  w-[36px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[5px]
                  bg-[#E9EFFF]

                  sm:h-[31px]
                  sm:w-[38px]
                "
              >
                <Award
                  className="
                    h-[17px]
                    w-[17px]
                    text-[#477DFF]

                    sm:h-[18px]
                    sm:w-[18px]
                  "
                  strokeWidth={1.8}
                />
              </div>

              {/* TITLE */}
              <h3
                className="
                  mt-[9px]
                  text-center
                  text-[11px]
                  font-bold
                  leading-[13px]
                  text-[#111111]

                  sm:text-[12px]
                  sm:leading-[14px]
                "
              >
                Achievements
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-[6px]
                  max-w-[220px]
                  text-center
                  text-[8px]
                  font-medium
                  leading-[11px]
                  text-[#929292]

                  sm:max-w-[260px]
                  sm:text-[8px]
                  sm:leading-[11px]

                  md:text-[9px]
                  md:leading-[12px]

                  lg:max-w-[155px]
                  lg:text-[8px]
                  lg:leading-[11px]
                "
              >
                Create and manage
                <br />
                achievements for this subject.
              </p>
            </button>

            {/* =================================================
                REWARDS & BADGES CARD
            ================================================== */}
            <button
              type="button"
              onClick={openRewards}
              className="
                flex
                min-w-0
                min-h-[108px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-[7px]
                border
                border-[#E3E3E8]
                bg-[#FFFBFB]
                px-[10px]
                py-[14px]
                shadow-[0_2px_8px_rgba(15,23,42,0.045)]
                text-left
                cursor-pointer
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[#20C66A]
                hover:shadow-[0_4px_12px_rgba(32,198,106,0.08)]
                active:translate-y-0
                focus:outline-none
                focus:ring-2
                focus:ring-[#20C66A]
                focus:ring-offset-1

                sm:min-h-[112px]
                sm:px-[12px]
                sm:py-[15px]

                md:min-h-[118px]

                lg:min-h-[112px]
              "
            >
              {/* ICON */}
              <div
                className="
                  flex
                  h-[30px]
                  w-[36px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[5px]
                  bg-[#E5F9EC]

                  sm:h-[31px]
                  sm:w-[38px]
                "
              >
                <BadgeCheck
                  className="
                    h-[17px]
                    w-[17px]
                    text-[#20C66A]

                    sm:h-[18px]
                    sm:w-[18px]
                  "
                  strokeWidth={1.8}
                />
              </div>

              {/* TITLE */}
              <h3
                className="
                  mt-[9px]
                  text-center
                  text-[11px]
                  font-bold
                  leading-[13px]
                  text-[#111111]

                  sm:text-[12px]
                  sm:leading-[14px]
                "
              >
                Rewards &amp; Badges
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-[6px]
                  max-w-[220px]
                  text-center
                  text-[8px]
                  font-medium
                  leading-[11px]
                  text-[#929292]

                  sm:max-w-[270px]
                  sm:text-[8px]
                  sm:leading-[11px]

                  md:text-[9px]
                  md:leading-[12px]

                  lg:max-w-[160px]
                  lg:text-[8px]
                  lg:leading-[11px]
                "
              >
                Create and manage rewards
                <br />
                and badges for this subject.
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}