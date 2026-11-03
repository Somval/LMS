
import React, { useMemo, useState } from "react";
import { Plus, Award, CalendarDays } from "lucide-react";
import Badge from "../../assets/images/134a082cca973150969aa91355d8ac63a4934a6a.png";
import CreateAchievement from "./CreateAchievement";

// Initial achievement data
export const INITIAL_ACHIEVEMENTS = [
  {
    id: 1,
    title: "Perfect Attendance",
    description: "Awarded for attending all scheduled classes.",
    date: "May 20, 2025",
    icon: Badge,
  },
  {
    id: 2,
    title: "Perfect Attendance",
    description: "Awarded for attending all scheduled classes.",
    date: "May 20, 2025",
    icon: Badge,
  },
  {
    id: 3,
    title: "Perfect Attendance",
    description: "Awarded for attending all scheduled classes.",
    date: "May 20, 2025",
    icon: Badge,
  },
  {
    id: 4,
    title: "Perfect Attendance",
    description: "Awarded for attending all scheduled classes.",
    date: "May 20, 2025",
    icon: Badge,
  },
];

export default function Achievements() {
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Display newest achievements first.
  const sortedAchievements = useMemo(
    () => [...achievements].reverse(),
    [achievements]
  );

  // Add a newly created achievement.
  const handleCreateAchievement = (newAchievement) => {
    setAchievements((previous) => [...previous, newAchievement]);
  };

  return (
    <>
      <section className="w-full rounded-2xl bg-white min-w-0 bg-white font-sans text-[#252A34]">
        {/* Header */}
        <header className="mb-6 p-5 rounded flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-[-0.4px] text-[#171717] sm:text-2xl">
              Achievements
            </h2>

            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-[#718096] sm:text-sm">
              A record of this student's key milestones and accomplishments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#93B4FF] focus:ring-offset-2 sm:w-auto"
          >
            <Plus size={17} strokeWidth={2.3} />
            <span>Create Achievement</span>
          </button>
        </header>

        {/* Desktop Table */}
        <div className="hidden w-full overflow-hidden  md:block">
          <div className="w-full overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[720px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[30%]" />
                <col className="w-[46%]" />
                <col className="w-[24%]" />
              </colgroup>

              <thead>
                <tr className="bg-[#F1F5F9]">
                  <th
                    scope="col"
                    className="h-[56px] rounded-tl-2xl px-5 text-left text-[13px] font-semibold text-[#667085] lg:px-6 lg:text-sm"
                  >
                    Title
                  </th>

                  <th
                    scope="col"
                    className="h-[56px] px-5 text-left text-[13px] font-semibold text-[#667085] lg:px-6 lg:text-sm"
                  >
                    Description
                  </th>

                  <th
                    scope="col"
                    className="h-[56px] rounded-tr-2xl px-5 text-left text-[13px] font-semibold text-[#667085] lg:px-6 lg:text-sm"
                  >
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedAchievements.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-[#FAFBFD] ${
                      index !== sortedAchievements.length - 1
                        ? "border-b border-[#EDF0F5]"
                        : ""
                    }`}
                  >
                    {/* Title */}
                    <td className="px-5 py-[18px] align-middle lg:px-6">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                          {item.icon ? (
                            <img
                              src={item.icon}
                              alt=""
                              className="h-7 w-7 object-contain"
                            />
                          ) : (
                            <Award
                              size={23}
                              strokeWidth={1.8}
                              className="text-[#4777E8]"
                            />
                          )}
                        </div>

                        <span className="break-words text-[13px] font-semibold leading-5 text-[#202633] lg:text-sm">
                          {item.title}
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-5 py-[18px] align-middle lg:px-6">
                      <p className="max-w-[440px] break-words text-[13px] leading-[1.7] text-[#737E8F] lg:text-sm">
                        {item.description}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-[18px] align-middle lg:px-6">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <CalendarDays
                          size={15}
                          strokeWidth={1.7}
                          className="shrink-0 text-[#929BAA]"
                        />

                        <span className="text-[13px] font-medium text-[#303846] lg:text-sm">
                          {item.date}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                {sortedAchievements.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2FF]">
                          <Award
                            size={24}
                            className="text-[#4777E8]"
                          />
                        </div>

                        <h3 className="text-sm font-semibold text-[#303846]">
                          No achievements yet
                        </h3>

                        <p className="mt-1 text-xs text-[#8993A2]">
                          Create your first achievement to get started.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Achievement Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {sortedAchievements.map((item) => (
            <article
              key={item.id}
              className="flex min-w-0 items-start gap-3 rounded-xl bg-[#F8FAFC] p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                {item.icon ? (
                  <img
                    src={item.icon}
                    alt=""
                    className="h-7 w-7 object-contain"
                  />
                ) : (
                  <Award
                    size={23}
                    strokeWidth={1.8}
                    className="text-[#4777E8]"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-sm font-semibold leading-5 text-[#202633]">
                  {item.title}
                </h3>

                <p className="mt-1.5 break-words text-xs leading-[1.7] text-[#737E8F]">
                  {item.description}
                </p>

                <div className="mt-2.5 flex items-center gap-2">
                  <CalendarDays
                    size={14}
                    className="shrink-0 text-[#929BAA]"
                  />

                  <span className="text-xs font-medium text-[#303846]">
                    {item.date}
                  </span>
                </div>
              </div>
            </article>
          ))}

          {sortedAchievements.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2FF]">
                <Award size={24} className="text-[#4777E8]" />
              </div>

              <h3 className="text-sm font-semibold text-[#303846]">
                No achievements yet
              </h3>

              <p className="mt-1 text-xs text-[#8993A2]">
                Create your first achievement to get started.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Create Achievement Modal */}
      <CreateAchievement
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateAchievement}
      />
    </>
  );
}
