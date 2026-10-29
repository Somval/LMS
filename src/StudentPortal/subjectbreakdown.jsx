import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  TrendingUp,
  AlertCircle,
  Calculator,
  Languages,
  Atom,
  ThumbsUp,
  Activity,
  Quote,
} from "lucide-react";

const subjectsData = {
  Mathematics: {
    title: "Mathematics",
    icon: Calculator,
    iconColor: "text-indigo-700",
    iconBg: "bg-indigo-900",
    tabActive: "bg-purple-100 border-purple-100",
    progress: 78,
    statusText: "On Track",
    summaryText: "You are on track in Mathematics.",
    improvement: "+12%",
    lastMonth: "66%",
    stats: [
      {
        label: "Lessons Completed",
        value: "18",
        icon: BookOpen,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      },
      {
        label: "Assessments Taken",
        value: "5",
        icon: FileText,
        color: "text-blue-500",
        bg: "bg-blue-50",
      },
      {
        label: "Time Spent Learning",
        value: "9h 45m",
        icon: Clock3,
        color: "text-purple-500",
        bg: "bg-purple-50",
      },
    ],
    doingWell: [
      { name: "Fractions & Decimals", score: 90 },
      { name: "Basic Algebra", score: 85 },
      { name: "Word Problems", score: 80 },
      { name: "Data Interpretation", score: 75 },
    ],
    needsPractice: [
      { name: "Linear Equations", score: 50 },
      { name: "Geometry Basics", score: 40 },
      { name: "Percentages", score: 35 },
      { name: "Ratio & Proportion", score: 25 },
    ],
    recentActivity: [
      {
        title: "Completed: Fractions Quiz",
        date: "May 15, 2026",
        completed: true,
      },
      {
        title: "Completed: Algebra Basics",
        date: "May 10, 2026",
        completed: true,
      },
      {
        title: "Practice: Percentages Worksheet",
        date: "May 8, 2026",
        completed: false,
      },
    ],
    tutorInsight: {
      quote:
        "Olivia is showing consistent improvement in her problem-solving skills. With more practice on linear equations and geometry concepts, she will continue to progress even faster.",
      tutorName: "Ms. Sarah Johnson",
      tutorRole: "Mathematics Tutor",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    },
  },

  "English Language": {
    title: "English Language",
    icon: Languages,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-500",
    tabActive: "bg-yellow-50 border-yellow-100",
    progress: 85,
    statusText: "Excelling",
    summaryText: "You are exceeding expectations in English.",
    improvement: "+8%",
    lastMonth: "77%",
    stats: [
      {
        label: "Lessons Completed",
        value: "22",
        icon: BookOpen,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      },
      {
        label: "Assessments Taken",
        value: "7",
        icon: FileText,
        color: "text-blue-500",
        bg: "bg-blue-50",
      },
      {
        label: "Time Spent Learning",
        value: "3h 15m",
        icon: Clock3,
        color: "text-purple-500",
        bg: "bg-purple-50",
      },
    ],
    doingWell: [
      { name: "Reading Comprehension", score: 92 },
      { name: "Vocabulary & Context", score: 88 },
      { name: "Creative Writing", score: 84 },
      { name: "Grammar", score: 80 },
    ],
    needsPractice: [
      { name: "Advanced Grammar", score: 60 },
      { name: "Passive Voice Structure", score: 52 },
      { name: "Sentence Analysis", score: 48 },
      { name: "Punctuation", score: 44 },
    ],
    recentActivity: [
      {
        title: "Completed: Essay Drafting",
        date: "May 16, 2026",
        completed: true,
      },
      {
        title: "Practice: Vocabulary Builder",
        date: "May 12, 2026",
        completed: true,
      },
      {
        title: "Completed: Grammar Quiz",
        date: "May 9, 2026",
        completed: true,
      },
    ],
    tutorInsight: {
      quote:
        "Fantastic vocabulary range in recent essays. Focus slightly more on complex grammar mechanics to elevate your writing to the next level.",
      tutorName: "Mr. David Smith",
      tutorRole: "English Literature Tutor",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    },
  },

  Science: {
    title: "Science",
    icon: Atom,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500",
    tabActive: "bg-emerald-50 border-emerald-100",
    progress: 70,
    statusText: "On Track",
    summaryText: "You are making steady progress in Science.",
    improvement: "+15%",
    lastMonth: "55%",
    stats: [
      {
        label: "Lessons Completed",
        value: "14",
        icon: BookOpen,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      },
      {
        label: "Assessments Taken",
        value: "4",
        icon: FileText,
        color: "text-blue-500",
        bg: "bg-blue-50",
      },
      {
        label: "Time Spent Learning",
        value: "2h 10m",
        icon: Clock3,
        color: "text-purple-500",
        bg: "bg-purple-50",
      },
    ],
    doingWell: [
      { name: "Cell Biology", score: 88 },
      { name: "States of Matter", score: 82 },
      { name: "Human Biology", score: 78 },
      { name: "Ecology", score: 74 },
    ],
    needsPractice: [
      { name: "Chemical Reactions", score: 55 },
      { name: "Physics Kinematics", score: 48 },
      { name: "Atomic Structure", score: 43 },
      { name: "Energy Transfer", score: 38 },
    ],
    recentActivity: [
      {
        title: "Completed: Biology Lab Quiz",
        date: "May 14, 2026",
        completed: true,
      },
      {
        title: "Practice: Periodic Table",
        date: "May 9, 2026",
        completed: true,
      },
      {
        title: "Completed: Science Assessment",
        date: "May 5, 2026",
        completed: true,
      },
    ],
    tutorInsight: {
      quote:
        "Great curiosity shown during biology units. Let's spend more time balancing chemical equations next week to bridge the remaining gaps.",
      tutorName: "Dr. Elena Rostova",
      tutorRole: "Science Lead Instructor",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
    },
  },
};

const subjects = Object.keys(subjectsData);

function ProgressRing({ progress }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-[92px] w-[92px] shrink-0">
      <svg
        width="92"
        height="92"
        viewBox="0 0 92 92"
        className="-rotate-90"
      >
        <circle
          cx="46"
          cy="46"
          r={radius}
          fill="none"
          stroke="#e8edf5"
          strokeWidth="7"
        />

        <circle
          cx="46"
          cy="46"
          r={radius}
          fill="none"
          stroke="#202b78"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[19px] font-bold text-slate-800">
          {progress}%
        </span>
      </div>
    </div>
  );
}

function SubjectIcon({ subject, small = false }) {
  const Icon = subject.icon;

  return (
    <span
      className={`
        flex shrink-0 items-center justify-center
        ${small ? "h-7 w-7 rounded-md" : "h-9 w-9 rounded-lg"}
        ${subject.iconBg}
      `}
    >
      <Icon
        className={`
          ${small ? "h-4 w-4" : "h-[18px] w-[18px]"}
          text-white
        `}
      />
    </span>
  );
}

function SkillRow({ item, type }) {
  const isGood = type === "good";

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_92px_30px] items-center gap-2">
      <div className="flex min-w-0 items-center gap-1.5">
        {isGood ? (
          <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
        ) : (
          <AlertCircle className="h-3 w-3 shrink-0 text-orange-500" />
        )}

        <span className="truncate text-[9px] text-slate-700">
          {item.name}
        </span>
      </div>

      <div className="h-[4px] overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isGood ? "bg-emerald-500" : "bg-orange-500"
          }`}
          style={{ width: `${item.score}%` }}
        />
      </div>

      <span className="text-right text-[8px] text-slate-500">
        {item.score}%
      </span>
    </div>
  );
}

export default function SubjectDashboard() {
  const [activeSubject, setActiveSubject] = useState("Mathematics");

  const data = subjectsData[activeSubject];

  return (
    /*
      IMPORTANT:
      This component now uses w-full only.
      The parent LearningDashboard controls the max width.
    */
    <div className="w-full font-sans text-slate-800">
      {/* FULL-WIDTH SUBJECT BREAKDOWN CARD */}
      <div className="w-full overflow-hidden rounded-[8px] border border-slate-100 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.025)]">

        {/* =========================
            HEADER
        ========================== */}
        <div className="w-full px-5 pb-4 pt-5 md:px-6 md:pt-5">
          <h1 className="text-[13px] font-bold text-slate-900">
            Subject Breakdown
          </h1>

          <p className="mt-1 text-[9px] text-slate-500">
            Select a subject to see detailed progress and areas of focus.
          </p>

          {/* SUBJECT TABS */}
          <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
            {subjects.map((subjectName) => {
              const subject = subjectsData[subjectName];
              const active = activeSubject === subjectName;

              return (
                <button
                  key={subjectName}
                  type="button"
                  onClick={() => setActiveSubject(subjectName)}
                  className={`
                    flex h-[45px] w-full items-center gap-2.5
                    rounded-[5px] border px-3 text-left
                    transition-all duration-200
                    ${
                      active
                        ? `${subject.tabActive} text-slate-900`
                        : "border-transparent bg-[#f8f8fa] text-slate-700 hover:bg-slate-100"
                    }
                  `}
                >
                  <SubjectIcon subject={subject} small />

                  <span className="text-[10px] font-semibold">
                    {subject.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full border-t border-slate-100" />

        {/* =========================
            ACTIVE SUBJECT
        ========================== */}
        <div className="w-full px-5 py-4 md:px-6">

          {/* SUBJECT TITLE */}
          <div className="mb-4 flex items-center gap-3">
            <SubjectIcon subject={data} />

            <h2 className="text-[13px] font-bold text-slate-900">
              {data.title}
            </h2>
          </div>

          {/* =========================
              PROGRESS + SUMMARY
          ========================== */}
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-[1.05fr_0.95fr]">

            {/* PROGRESS */}
            <div className="flex min-w-0 items-center gap-5">
              <ProgressRing progress={data.progress} />

              <div className="min-w-0">
                <h3 className="text-[12px] font-bold text-slate-900">
                  Good progress
                </h3>

                <p className="mt-1 max-w-[180px] text-[8px] leading-[1.45] text-slate-600">
                  {data.summaryText}
                </p>

                <div className="mt-2 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />

                  <span className="text-[15px] font-bold text-emerald-500">
                    {data.improvement}
                  </span>
                </div>

                <p className="mt-0.5 text-[8px] leading-tight text-slate-500">
                  Improvement from last
                  <br />
                  month ({data.lastMonth})
                </p>

                <div className="mt-2 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-[8px] font-semibold text-emerald-500">
                    {data.statusText}
                  </span>
                </div>
              </div>
            </div>

            {/* SUBJECT SUMMARY */}
            <div className="min-w-0 border-t border-slate-100 pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
              <h3 className="text-[11px] font-bold text-slate-900">
                Subject Summary
              </h3>

              <div className="mt-3 space-y-3">
                {data.stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${stat.bg}`}
                        >
                          <Icon className={`h-3 w-3 ${stat.color}`} />
                        </span>

                        <span className="truncate text-[9px] text-slate-600">
                          {stat.label}
                        </span>
                      </div>

                      <span className="shrink-0 text-[9px] font-bold text-slate-900">
                        {stat.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================
              LOWER GRID
          ========================== */}
          <div className="mt-5 grid w-full grid-cols-1 gap-3 md:grid-cols-2">

            {/* WHAT'S GOING WELL */}
            <div className="w-full rounded-[7px] border border-emerald-100 bg-[#effcf5] px-4 py-3.5">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100">
                  <ThumbsUp className="h-3 w-3 text-emerald-500" />
                </span>

                <h3 className="text-[10px] font-bold text-emerald-600">
                  What's Going Well
                </h3>
              </div>

              <p className="mt-2 text-[7px] text-slate-500">
                You're doing well in:
              </p>

              <div className="mt-3 space-y-2.5">
                {data.doingWell.map((item) => (
                  <SkillRow
                    key={item.name}
                    item={item}
                    type="good"
                  />
                ))}
              </div>
            </div>

            {/* NEEDS PRACTICE */}
            <div className="w-full rounded-[7px] border border-orange-100 bg-[#fff6ed] px-4 py-3.5">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-orange-100">
                  <AlertCircle className="h-3 w-3 text-orange-500" />
                </span>

                <h3 className="text-[10px] font-bold text-orange-500">
                  Needs More Practice
                </h3>
              </div>

              <p className="mt-2 text-[7px] text-slate-500">
                These areas need more focus:
              </p>

              <div className="mt-3 space-y-2.5">
                {data.needsPractice.map((item) => (
                  <SkillRow
                    key={item.name}
                    item={item}
                    type="practice"
                  />
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="w-full rounded-[7px] border border-sky-100 bg-[#effaff] px-4 py-3.5">
              <div className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-sky-500" />

                <h3 className="text-[10px] font-bold text-sky-500">
                  Recent Learning Activity
                </h3>
              </div>

              <p className="mt-2 text-[7px] text-slate-500">
                Latest updates and completed activities.
              </p>

              <div className="mt-3 space-y-2.5">
                {data.recentActivity.map((activity) => (
                  <div
                    key={activity.title}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <FileText className="h-3 w-3 shrink-0 text-slate-500" />

                      <div className="min-w-0">
                        <p className="truncate text-[8px] font-medium text-slate-700">
                          {activity.title}
                        </p>

                        <p className="text-[6px] text-slate-400">
                          {activity.date}
                        </p>
                      </div>
                    </div>

                    {activity.completed ? (
                      <CheckCircle2 className="h-3 w-3 shrink-0 fill-emerald-50 text-emerald-500" />
                    ) : (
                      <span className="h-3 w-3 shrink-0 rounded-full border border-emerald-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* TUTOR INSIGHT */}
            <div className="flex w-full flex-col justify-between rounded-[7px] border border-purple-100 bg-[#f7ebff] px-4 py-3.5">
              <div>
                <div className="flex items-center gap-2">
                  <Quote className="h-4 w-4 fill-purple-600 text-purple-600" />

                  <h3 className="text-[10px] font-bold text-purple-900">
                    Tutor Insight
                  </h3>
                </div>

                <p className="mt-3 text-[8px] leading-[1.55] text-slate-600">
                  {data.tutorInsight.quote}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 border-t border-purple-100 pt-2.5">
                <img
                  src={data.tutorInsight.avatar}
                  alt={data.tutorInsight.tutorName}
                  className="h-7 w-7 rounded-full border border-white object-cover"
                />

                <div>
                  <p className="text-[8px] font-bold text-slate-900">
                    {data.tutorInsight.tutorName}
                  </p>

                  <p className="text-[6px] text-slate-500">
                    {data.tutorInsight.tutorRole}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}