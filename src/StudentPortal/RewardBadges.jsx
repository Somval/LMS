import React from "react";
import RewardsEarned from "./RewardsEarned";
import AlreadyEarnedReward from "./EarnedBadges";
import BadgesToUnlock from "./BadgestoUnlock";
import useRewards from "./useRewards";

export default function StatsCard() {
  const { earned, locked, error } = useRewards({ withLocked: true });
  const badgesEarned = earned.filter((a) => a.kind !== "REWARD");
  const rewardsEarned = earned.filter((a) => a.kind === "REWARD");

  return (
    <section className="w-full bg-slate-50 font-sans">
      <div className="w-full px-4 pb-10 pt-5 sm:px-5 sm:pt-6 lg:px-6">

        {/* 1000px wide and aligned directly with the sidebar content */}
        <div className="flex w-[1000px] max-w-full flex-col gap-6">

          {/* MAIN STATS CARD */}
          <div
            className="
              flex
              w-full
              flex-col
              overflow-hidden
              rounded-xl
              border
              border-[#edf0f4]
              bg-white
              shadow-[0_3px_12px_rgba(0,0,0,0.03)]
              sm:flex-row
            "
          >
            {/* BADGES */}
            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
                gap-4
                p-5
                sm:px-6
                sm:py-5
              "
            >
              {/* Badge Icon */}
              <div
                className="
                  flex
                  h-[50px]
                  w-[50px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f0e5ff]
                "
              >
                <svg
                  width="28"
                  height="44"
                  viewBox="0 0 28 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.75 27.5C21.3439 27.5 27.5 21.3439 27.5 13.75C27.5 6.15608 21.3439 0 13.75 0C6.15608 0 0 6.15608 0 13.75C0 21.3439 6.15608 27.5 13.75 27.5Z"
                    fill="#7C0CE4"
                  />

                  <path
                    d="M2.76603 42.4159L5.02157 27.7549C7.5534 29.3362 10.545 30.25 13.75 30.25C16.955 30.25 19.9467 29.3362 22.4785 27.7549L24.734 42.4159C24.8143 42.9376 24.5889 43.4592 24.1539 43.7582C23.7189 44.0571 23.1511 44.0807 22.6928 43.8188L13.75 38.7087L4.80723 43.8188C4.34895 44.0807 3.78121 44.0571 3.34622 43.7582C2.91123 43.4592 2.68577 42.9376 2.76603 42.4159Z"
                    fill="#7C0CE4"
                  />
                </svg>
              </div>

              {/* Badge Content */}
              <div className="flex min-w-0 flex-col">
                <span className="mb-[5px] text-[21px] font-bold leading-none text-[#111827]">
                  {badgesEarned.length}
                </span>

                <span className="mb-[6px] truncate text-[11px] font-semibold leading-none text-[#111827]">
                  Badges Earned
                </span>

                <span className="truncate text-[9px] leading-none text-[#6b7280]">
                  Keep up the great work!
                </span>
              </div>
            </div>

            {/* DIVIDER */}
            <div
              className="
                h-px
                w-full
                shrink-0
                bg-[#edf0f4]
                sm:h-auto
                sm:w-px
              "
            />

            {/* REWARDS */}
            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
                gap-4
                p-5
                sm:px-8
                sm:py-5
              "
            >
              {/* Reward Icon */}
              <div
                className="
                  flex
                  h-[50px]
                  w-[50px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#dcf8e8]
                "
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10H20V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V10Z"
                    fill="#10B981"
                  />

                  <path
                    d="M2 7C2 6.44772 2.44772 6 3 6H21C21.5523 6 22 6.44772 22 7V10C22 10.5523 21.5523 11 21 11H3C2.44772 11 2 10.5523 2 10V7Z"
                    fill="#10B981"
                  />

                  <path
                    d="M12 6V21"
                    stroke="white"
                    strokeWidth="2"
                  />

                  <path
                    d="M12 6C12 4.34315 10.6569 3 9 3C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9H12V6Z"
                    fill="#10B981"
                  />

                  <path
                    d="M12 6C12 4.34315 13.3431 3 15 3C16.6569 3 18 4.34315 18 6C18 7.65685 16.6569 9 15 9H12V6Z"
                    fill="#10B981"
                  />
                </svg>
              </div>

              {/* Reward Content */}
              <div className="flex min-w-0 flex-col">
                <span className="mb-[5px] text-[21px] font-bold leading-none text-[#111827]">
                  {rewardsEarned.length}
                </span>

                <span className="mb-[6px] truncate text-[11px] font-semibold leading-none text-[#111827]">
                  Rewards Earned
                </span>

                <span className="truncate text-[9px] leading-none text-[#10B981]">
                  Amazing progress!
                </span>
              </div>
            </div>
          </div>

          {/* OTHER SECTIONS */}
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <RewardsEarned rewards={rewardsEarned} />
          <AlreadyEarnedReward badges={badgesEarned} />
          <BadgesToUnlock badges={locked} />

        </div>
      </div>
    </section>
  );
}