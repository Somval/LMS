import React from "react";
import RecentAchievements from "./RecentAchievements";
import AchievementTimelineDetails from "./AchievementTimeline";

export default function AchievementCards() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-6 lg:px-6">
        {/* =====================================================
            ACHIEVEMENT SUMMARY
        ====================================================== */}
        <div
          className="
            grid
            w-full
            grid-cols-1
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-md
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {/* =================================================
              ACHIEVEMENTS EARNED
          ================================================== */}
          <div
            className="
              flex
              min-w-0
              items-center
              gap-4
              px-5
              py-5
              sm:px-5
              sm:py-6
              lg:gap-5
              lg:px-7
              lg:py-7
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-purple-100
                sm:h-16
                sm:w-16
                lg:h-20
                lg:w-20
              "
            >
              <svg
                className="
                  h-7
                  w-7
                  sm:h-8
                  sm:w-8
                  lg:h-[42px]
                  lg:w-[42px]
                "
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.6332 33.2105H9.26303V42.2566H35.6332V33.2105ZM35.6332 2.74344H9.26303C9.26303 7.15791 10.288 11.5724 12.338 15.1908C13.8289 17.8684 16.1584 20.6908 19.4197 21.9934H25.4765C27.0605 21.3421 28.5514 20.329 29.7628 18.954C33.7696 14.3224 35.8195 8.67765 35.6332 2.74344Z"
                  fill="#7C0CE4"
                />
                <path
                  d="M9.26305 2.8158L9.26303 2.74344C7.0267 2.74344 7.30629 0.5 9.54262 0.5H36.2855C38.0559 0.5 37.7764 2.67107 36.2855 2.74344H35.6332M15.0402 18.954C11.4062 18.5921 8.33124 17.5789 5.81536 15.8421C1.90177 13.3092 0.410909 4.26315 0.50409 4.33552H9.35627M35.6332 42.2566H37.8695V44.5H7.11993V42.2566H9.26303M35.6332 4.33552H44.4854C44.6717 4.33552 43.0876 13.3092 39.1741 15.8421C36.6582 17.5066 33.3969 18.6645 29.6696 19.0263"
                  fill="#7C0CE4"
                />
                <path
                  d="M29.2969 30.8947H15.9721H29.2969ZM19.4197 21.9934V24.3816V21.9934Z"
                  fill="#7C0CE4"
                />
                <path
                  d="M25.4765 21.9934V24.3816V21.9934ZM9.26303 33.2105H11.4994V30.8947H15.9721C15.9721 28.3618 16.997 25.9737 19.4197 24.3816H25.4765C27.8992 25.829 29.2969 28.3618 29.2969 30.8947H33.49V33.2105H35.6332"
                  fill="#7C0CE4"
                />
                <path
                  d="M9.26303 42.2566V33.2105H35.6332M29.2969 30.8947H33.49V33.2105H35.6332V42.2566M9.26303 33.2105H11.4994V30.8947H15.9721M9.26303 42.2566H35.6332M9.26303 42.2566H7.11993V44.5H37.8695V42.2566H35.6332M35.6332 2.74344H9.26303M35.6332 2.74344C35.8195 8.67765 33.7696 14.3224 29.7628 18.954C28.5514 20.329 27.0605 21.3421 25.4765 21.9934M35.6332 2.74344H36.2855C37.7764 2.67107 38.0559 0.5 36.2855 0.5H9.54262C7.30629 0.5 7.0267 2.74344 9.26303 2.74344M9.26303 2.74344C9.26303 7.15791 10.288 11.5724 12.338 15.1908C13.8289 17.8684 16.1584 20.6908 19.4197 21.9934M9.26303 2.74344L9.26305 2.8158M19.4197 21.9934H25.4765M19.4197 21.9934V24.3816M25.4765 21.9934V24.3816M15.0402 18.954C11.4062 18.5921 8.33124 17.5789 5.81536 15.8421C1.90177 13.3092 0.410909 4.26315 0.50409 4.33552H9.35627M35.6332 4.33552H44.4854C44.6717 4.33552 43.0876 13.3092 39.1741 15.8421C36.6582 17.5066 33.3969 18.6645 29.6696 19.0263M29.2969 30.8947H15.9721M29.2969 30.8947C29.2969 28.3618 27.8992 25.829 25.4765 24.3816M15.9721 30.8947C15.9721 28.3618 16.997 25.9737 19.4197 24.3816M19.4197 24.3816H25.4765"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-gray-900 sm:text-sm lg:text-base">
                Achievements Earned
              </p>

              <h3 className="mt-0.5 text-3xl font-extrabold leading-none text-gray-900 sm:text-3xl lg:text-4xl">
                12
              </h3>

              <p className="mt-1 text-[11px] text-gray-500 sm:text-xs lg:text-sm">
                All time
              </p>
            </div>
          </div>

          {/* =================================================
              THIS MONTH
          ================================================== */}
          <div
            className="
              flex
              min-w-0
              items-center
              gap-4
              border-t
              border-gray-100
              px-5
              py-5
              sm:border-l
              sm:border-t-0
              sm:px-5
              sm:py-6
              lg:gap-5
              lg:px-7
              lg:py-7
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-emerald-50
                sm:h-16
                sm:w-16
                lg:h-20
                lg:w-20
              "
            >
              <svg
                className="
                  h-7
                  w-7
                  sm:h-8
                  sm:w-8
                  lg:h-[40px]
                  lg:w-[40px]
                "
                viewBox="0 0 44 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.5 1.375C27.5 0.615608 28.1156 0 28.875 0C29.6344 0 30.25 0.615608 30.25 1.375V6.875C30.25 7.63439 29.6344 8.25 28.875 8.25C28.1156 8.25 27.5 7.63439 27.5 6.875V1.375Z"
                  fill="#0ED753"
                />
                <path
                  d="M13.75 1.375C13.75 0.615608 14.3656 0 15.125 0C15.8844 0 16.5 0.615608 16.5 1.375V6.875C16.5 7.63439 15.8844 8.25 15.125 8.25C14.3656 8.25 13.75 7.63439 13.75 6.875V1.375Z"
                  fill="#0ED753"
                />
                <path
                  d="M41.25 8.9375C41.25 7.03902 39.711 5.5 37.8125 5.5H34.375C33.6156 5.5 33 4.88439 33 4.125C33 3.36561 33.6156 2.75 34.375 2.75H37.8125C41.2298 2.75 44 5.52024 44 8.9375V35.0625C44 38.4798 41.2298 41.25 37.8125 41.25H6.1875C2.77024 41.25 0 38.4798 0 35.0625V8.9375C0 5.52024 2.77024 2.75 6.1875 2.75H9.625C10.3844 2.75 11 3.36561 11 4.125C11 4.88439 10.3844 5.5 9.625 5.5H6.1875C4.28902 5.5 2.75 7.03902 2.75 8.9375V35.0625C2.75 36.961 4.28902 38.5 6.1875 38.5H37.8125C39.711 38.5 41.25 36.961 41.25 35.0625V8.9375Z"
                  fill="#0ED753"
                />
                <path
                  d="M24.75 5.5H19.25V2.75H24.75V5.5Z"
                  fill="#0ED753"
                />
                <path
                  d="M37.125 14.0938C37.6945 14.0938 38.1562 14.5555 38.1562 15.125C38.1562 15.6945 37.6945 16.1562 37.125 16.1562H6.875C6.30546 16.1562 5.84375 15.6945 5.84375 15.125C5.84375 14.5555 6.30546 14.0938 6.875 14.0938H37.125Z"
                  fill="#0ED753"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-gray-900 sm:text-sm lg:text-base">
                This Month
              </p>

              <h3 className="mt-0.5 text-3xl font-extrabold leading-none text-gray-900 sm:text-3xl lg:text-4xl">
                3
              </h3>

              <p className="mt-1 truncate text-[11px] text-gray-500 sm:text-xs lg:text-sm">
                August 2026
              </p>
            </div>
          </div>

          {/* =================================================
              LATEST ACHIEVEMENT
          ================================================== */}
          <div
            className="
              flex
              min-w-0
              items-center
              gap-4
              border-t
              border-gray-100
              px-5
              py-5
              sm:col-span-2
              lg:col-span-1
              lg:border-l
              lg:border-t-0
              lg:px-7
              lg:py-7
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-amber-50
                sm:h-16
                sm:w-16
                lg:h-20
                lg:w-20
              "
            >
              <svg
                className="
                  h-7
                  w-7
                  text-amber-400
                  sm:h-8
                  sm:w-8
                  lg:h-9
                  lg:w-9
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-gray-900 sm:text-sm lg:text-base">
                Latest Achievement
              </p>

              <h3
                className="
                  mt-0.5
                  truncate
                  text-2xl
                  font-extrabold
                  leading-tight
                  tracking-tight
                  text-gray-900
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                Aug 8, 2026
              </h3>

              <p className="mt-1 truncate text-[11px] text-gray-500 sm:text-xs lg:text-sm">
                Mathematics Milestone
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RECENT ACHIEVEMENTS
      ====================================================== */}
      <RecentAchievements />

      {/* =====================================================
          ACHIEVEMENT TIMELINE
      ====================================================== */}
      <AchievementTimelineDetails />
    </>
  );
}