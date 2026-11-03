
import React, { useState } from "react";
import { Plus, Award } from "lucide-react";

import BadgeIcon from "../../assets/images/c2582da116168ead7191b53b24caa4b4015bf713.png";
import CreateRewardModal from "./CreateRewardModal";

// Initial rewards data
const INITIAL_REWARDS = [
  {
    id: 1,
    title: "Mathematics Star",
    date: "Earned Aug 8, 2026",
    icon: BadgeIcon,
  },
  {
    id: 2,
    title: "Mathematics Star",
    date: "Earned Aug 8, 2026",
    icon: BadgeIcon,
  },
  {
    id: 3,
    title: "Mathematics Star",
    date: "Earned Aug 8, 2026",
    icon: BadgeIcon,
  },
  {
    id: 4,
    title: "Mathematics Star",
    date: "Earned Aug 8, 2026",
    icon: BadgeIcon,
  },
];

export default function RewardsAndBadges({ titleImage }) {
  const [rewards, setRewards] = useState(INITIAL_REWARDS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add a newly created reward
  const handleCreateReward = (newReward) => {
    const newEntry = {
      ...newReward,
      id: rewards.length
        ? Math.max(...rewards.map((reward) => Number(reward.id) || 0)) + 1
        : 1,
    };

    setRewards((previous) => [...previous, newEntry]);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Main Container */}
      <section className="relative flex min-h-[500px] w-full min-w-0 flex-col rounded-[11px] border border-slate-200/90 bg-white p-4 font-sans text-slate-800 shadow-sm sm:p-6 lg:min-h-[625px] lg:p-8">
        {/* Header */}
        <div className="mb-6 flex shrink-0 flex-col justify-between gap-4 sm:mb-7 sm:flex-row sm:items-start">
          <div className="min-w-0">
            {titleImage ? (
              <img
                src={titleImage}
                alt="Rewards & Badges"
                className="mb-1 h-8 max-w-full object-contain object-left"
              />
            ) : (
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-[26px]">
                Rewards & Badges
              </h1>
            )}

            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-slate-500 sm:text-sm">
              Recognition for effort, progress, and positive learning habits.
            </p>
          </div>

          {/* Create Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-[#3b82f6] px-4 py-2.5 text-sm font-medium text-[#3b82f6] transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 shrink-0 stroke-[2.5]" />
            <span>Create Reward & Badge</span>
          </button>
        </div>

        {/* Inner Card Container */}
        <div className="flex min-h-0 flex-1 flex-col rounded-[11px] border border-slate-100/90 bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="mb-5 text-base font-bold tracking-tight text-[#3730a3] sm:mb-6 sm:text-[17px]">
            Earned Rewards & Badges
          </h2>

          {/* Rewards Grid */}
          {rewards.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {rewards.map((item) => (
                <article
                  key={item.id}
                  className="group flex min-w-0 flex-col items-center rounded-xl border border-slate-100 bg-[#f8fafc]/80 p-3 text-center transition-all duration-200 hover:bg-white hover:shadow-md sm:rounded-2xl sm:p-4 lg:p-5"
                >
                  {/* Badge Image */}
                  <div className="mb-3 flex aspect-square w-full max-w-[112px] items-center justify-center transition-transform duration-200 group-hover:scale-105 sm:max-w-[128px] lg:max-w-[140px]">
                    <img
                      src={item.icon || BadgeIcon}
                      alt={item.title}
                      className="h-full w-full object-contain drop-shadow-sm"
                    />
                  </div>

                  {/* Badge Title */}
                  <h3 className="mb-2 break-words text-xs font-bold leading-snug text-slate-900 sm:text-sm lg:text-[15px]">
                    {item.title}
                  </h3>

                  {/* Earned Date */}
                  <span className="max-w-full break-words rounded-full border border-blue-100/60 bg-[#e0e7ff]/80 px-2.5 py-1 text-[10px] font-semibold leading-relaxed text-[#3b82f6] sm:px-3 sm:text-[11px]">
                    {item.date}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Award className="h-7 w-7" />
              </div>

              <h3 className="text-sm font-bold text-slate-800">
                No rewards or badges yet
              </h3>

              <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
                Create your first reward or badge to celebrate learning
                achievements.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Separate Create Reward Modal */}
      <CreateRewardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateReward}
      />
    </>
  );
}
