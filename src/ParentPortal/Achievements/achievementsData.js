// Helpers shared by the parent's Achievements and Rewards & Badges pages.
// Data comes from GET /rewards/earned?studentId= ({ totalPoints, earned }) and GET /rewards/locked?studentId=.

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const formatLongDate = (value) =>
  new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export const monthLabel = (value) =>
  new Date(value).toLocaleDateString("en-US", { month: "long", year: "numeric" });

const sameMonth = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

// How many were earned in the current calendar month.
export const earnedThisMonth = (earned, now = new Date()) =>
  earned.filter((item) => sameMonth(new Date(item.awardedAt), now)).length;

// Newest first, grouped by month: [{ month: "August 2026", achievements: [...] }]
export const groupByMonth = (earned) => {
  const groups = [];
  [...earned]
    .sort((a, b) => new Date(b.awardedAt) - new Date(a.awardedAt))
    .forEach((item) => {
      const month = monthLabel(item.awardedAt);
      const last = groups[groups.length - 1];
      if (last && last.month === month) last.achievements.push(item);
      else groups.push({ month, achievements: [item] });
    });
  return groups;
};

// A badge/reward is a REWARD only when marked so; anything else counts as a badge.
export const isReward = (item) => item.kind === "REWARD";

export const splitKinds = (earned) => ({
  badges: earned.filter((item) => !isReward(item)),
  rewards: earned.filter(isReward),
});

// Colours for the reward cards, repeated if there are more rewards than colours.
export const REWARD_STYLES = [
  { cardBg: "bg-[#FEFCE8]", badgeBg: "bg-[#FEF08A]/70 text-yellow-800 border border-yellow-200/60", iconColor: "text-yellow-600" },
  { cardBg: "bg-[#F0FDF4]", badgeBg: "bg-[#DCFCE7] text-emerald-800 border border-emerald-200/60", iconColor: "text-emerald-600" },
  { cardBg: "bg-[#FAF5FF]", badgeBg: "bg-[#F3E8FF] text-purple-800 border border-purple-200/60", iconColor: "text-purple-600" },
];

// The lines in the timeline's detail panel, all taken from the achievement itself.
export const detailLines = (item) =>
  [
    `Awarded on ${formatLongDate(item.awardedAt)}`,
    item.points > 0 ? `Worth ${item.points} point${item.points === 1 ? "" : "s"}` : null,
    item.note ? `Tutor's note: ${item.note}` : null,
  ].filter(Boolean);
