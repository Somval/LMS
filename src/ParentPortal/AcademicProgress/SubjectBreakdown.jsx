import React, { useState } from 'react';
import { 
  BookOpen, 
  Atom, 
  CheckCircle2, 
  FileText, 
  Clock, 
  TrendingUp, 
  ThumbsUp, 
  AlertCircle 
} from 'lucide-react';

const getSubjectsData = (childName) => ({
  mathematics: {
    name: 'Mathematics',
    icon: (
      <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.4167 27H5.41667C3.98061 26.9982 2.60385 26.405 1.5884 25.3505C0.572955 24.296 0.00172018 22.8663 0 21.375V5.625C0.00172018 4.13371 0.572955 2.704 1.5884 1.6495C2.60385 0.594992 3.98061 0.00178634 5.41667 0L18.4167 0C19.8527 0.00178634 21.2295 0.594992 22.2449 1.6495C23.2604 2.704 23.8316 4.13371 23.8333 5.625V21.375C23.8316 22.8663 23.2604 24.296 22.2449 25.3505C21.2295 26.405 19.8527 26.9982 18.4167 27V27ZM5.41667 2.25C4.55471 2.25 3.72806 2.60558 3.11857 3.23851C2.50908 3.87145 2.16667 4.72989 2.16667 5.625V21.375C2.16667 22.2701 2.50908 23.1286 3.11857 23.7615C3.72806 24.3944 4.55471 24.75 5.41667 24.75H18.4167C19.2786 24.75 20.1053 24.3944 20.7148 23.7615C21.3243 23.1286 21.6667 22.2701 21.6667 21.375V5.625C21.6667 4.72989 21.3243 3.87145 20.7148 3.23851C20.1053 2.60558 19.2786 2.25 18.4167 2.25H5.41667ZM16.25 11.25H7.58333C6.72138 11.25 5.89473 10.8944 5.28524 10.2615C4.67574 9.62855 4.33333 8.77011 4.33333 7.875C4.33333 6.97989 4.67574 6.12145 5.28524 5.48851C5.89473 4.85558 6.72138 4.5 7.58333 4.5H16.25C17.112 4.5 17.9386 4.85558 18.5481 5.48851C19.1576 6.12145 19.5 6.97989 19.5 7.875C19.5 8.77011 19.1576 9.62855 18.5481 10.2615C17.9386 10.8944 17.112 11.25 16.25 11.25V11.25ZM7.58333 6.75C7.29602 6.75 7.02047 6.86853 6.8173 7.07951C6.61414 7.29048 6.5 7.57663 6.5 7.875C6.5 8.17337 6.61414 8.45952 6.8173 8.67049C7.02047 8.88147 7.29602 9 7.58333 9H16.25C16.5373 9 16.8129 8.88147 17.016 8.67049C17.2192 8.45952 17.3333 8.17337 17.3333 7.875C17.3333 7.57663 17.2192 7.29048 17.016 7.07951C16.8129 6.86853 16.5373 6.75 16.25 6.75H7.58333ZM5.41667 14.625C5.2024 14.625 4.99295 14.691 4.8148 14.8146C4.63665 14.9382 4.49779 15.1139 4.4158 15.3195C4.3338 15.525 4.31235 15.7512 4.35415 15.9695C4.39595 16.1877 4.49913 16.3882 4.65063 16.5455C4.80214 16.7028 4.99517 16.81 5.20532 16.8534C5.41547 16.8968 5.63329 16.8745 5.83124 16.7894C6.02919 16.7042 6.19839 16.56 6.31743 16.375C6.43646 16.19 6.5 15.9725 6.5 15.75C6.5 15.4516 6.38586 15.1655 6.1827 14.9545C5.97953 14.7435 5.70398 14.625 5.41667 14.625ZM9.75 14.625C9.53574 14.625 9.32629 14.691 9.14813 14.8146C8.96998 14.9382 8.83113 15.1139 8.74913 15.3195C8.66714 15.525 8.64568 15.7512 8.68748 15.9695C8.72928 16.1877 8.83246 16.3882 8.98397 16.5455C9.13548 16.7028 9.32851 16.81 9.53865 16.8534C9.7488 16.8968 9.96662 16.8745 10.1646 16.7894C10.3625 16.7042 10.5317 16.56 10.6508 16.375C10.7698 16.19 10.8333 15.9725 10.8333 15.75C10.8333 15.4516 10.7192 15.1655 10.516 14.9545C10.3129 14.7435 10.0373 14.625 9.75 14.625ZM14.0833 14.625C13.8691 14.625 13.6596 14.691 13.4815 14.8146C13.3033 14.9382 13.1645 15.1139 13.0825 15.3195C13.0005 15.525 12.979 15.7512 13.0208 15.9695C13.0626 16.1877 13.1658 16.3882 13.3173 16.5455C13.4688 16.7028 13.6618 16.81 13.872 16.8534C14.0821 16.8968 14.3 16.8745 14.4979 16.7894C14.6959 16.7042 14.8651 16.56 14.9841 16.375C15.1031 16.19 15.1667 15.9725 15.1667 15.75C15.1667 15.4516 15.0525 15.1655 14.8494 14.9545C14.6462 14.7435 14.3707 14.625 14.0833 14.625ZM5.41667 19.125C5.2024 19.125 4.99295 19.191 4.8148 19.3146C4.63665 19.4382 4.49779 19.6139 4.4158 19.8195C4.3338 20.025 4.31235 20.2512 4.35415 20.4695C4.39595 20.6877 4.49913 20.8882 4.65063 21.0455C4.80214 21.2028 4.99517 21.31 5.20532 21.3534C5.41547 21.3968 5.63329 21.3745 5.83124 21.2894C6.02919 21.2042 6.19839 21.06 6.31743 20.875C6.43646 20.69 6.5 20.4725 6.5 20.25C6.5 19.9516 6.38586 19.6655 6.1827 19.4545C5.97953 19.2435 5.70398 19.125 5.41667 19.125ZM9.75 19.125C9.53574 19.125 9.32629 19.191 9.14813 19.3146C8.96998 19.4382 8.83113 19.6139 8.74913 19.8195C8.66714 20.025 8.64568 20.2512 8.68748 20.4695C8.72928 20.6877 8.83246 20.8882 8.98397 21.0455C9.13548 21.2028 9.32851 21.31 9.53865 21.3534C9.7488 21.3968 9.96662 21.3745 10.1646 21.2894C10.3625 21.2042 10.5317 21.06 10.6508 20.875C10.7698 20.69 10.8333 20.4725 10.8333 20.25C10.8333 19.9516 10.7192 19.6655 10.516 19.4545C10.3129 19.2435 10.0373 19.125 9.75 19.125ZM18.4167 14.625C18.2024 14.625 17.993 14.691 17.8148 14.8146C17.6366 14.9382 17.4978 15.1139 17.4158 15.3195C17.3338 15.525 17.3123 15.7512 17.3541 15.9695C17.396 16.1877 17.4991 16.3882 17.6506 16.5455C17.8021 16.7028 17.9952 16.81 18.2053 16.8534C18.4155 16.8968 18.6333 16.8745 18.8312 16.7894C19.0292 16.7042 19.1984 16.56 19.3174 16.375C19.4365 16.19 19.5 15.9725 19.5 15.75C19.5 15.4516 19.3859 15.1655 19.1827 14.9545C18.9795 14.7435 18.704 14.625 18.4167 14.625ZM19.5 20.25C19.5 19.9516 19.3859 19.6655 19.1827 19.4545C18.9795 19.2435 18.704 19.125 18.4167 19.125H14.0833C13.796 19.125 13.5205 19.2435 13.3173 19.4545C13.1141 19.6655 13 19.9516 13 20.25C13 20.5484 13.1141 20.8345 13.3173 21.0455C13.5205 21.2565 13.796 21.375 14.0833 21.375H18.4167C18.704 21.375 18.9795 21.2565 19.1827 21.0455C19.3859 20.8345 19.5 20.5484 19.5 20.25Z" fill="white"/>
      </svg>
    ),
    bgColor: 'bg-[#3730A3]',
    selectedBgColor: 'bg-purple-50/70 border border-purple-200/80',
    progress: 78,
    status: 'On Track',
    improvement: '12%',
    previousMonth: '66%',
    description: `${childName} is on track in Mathematics.`,
    lessonsCompleted: 18,
    assessmentsTaken: 5,
    timeSpent: '9h 45m',
    goingWell: [
      { topic: 'Fractions & Decimals', score: 90 },
      { topic: 'Basic Algebra', score: 85 },
      { topic: 'Word Problems', score: 80 },
      { topic: 'Data Interpretation', score: 75 },
    ],
    needsPractice: [
      { topic: 'Linear Equations', score: 50 },
      { topic: 'Geometry Basics', score: 40 },
      { topic: 'Percentages', score: 30 },
      { topic: 'Ratio & Proportion', score: 25 },
    ]
  },
  english: {
    name: 'English Language',
    icon: <BookOpen className="w-5 h-5 text-amber-700" />,
    bgColor: 'bg-amber-400',
    selectedBgColor: 'bg-amber-50/60 border border-amber-200/80',
    progress: 84,
    status: 'Ahead',
    improvement: '8%',
    previousMonth: '76%',
    description: `${childName} is excelling in English Language reading comprehension.`,
    lessonsCompleted: 22,
    assessmentsTaken: 6,
    timeSpent: '11h 15m',
    goingWell: [
      { topic: 'Reading Comprehension', score: 92 },
      { topic: 'Vocabulary', score: 88 },
      { topic: 'Grammar & Syntax', score: 85 },
    ],
    needsPractice: [
      { topic: 'Creative Writing', score: 60 },
      { topic: 'Poetry Analysis', score: 55 },
    ]
  },
  science: {
    name: 'Science',
    icon: <Atom className="w-5 h-5 text-white" />,
    bgColor: 'bg-emerald-500',
    selectedBgColor: 'bg-emerald-50/60 border border-emerald-200/80',
    progress: 70,
    status: 'On Track',
    improvement: '5%',
    previousMonth: '65%',
    description: `${childName} is showing steady progress in Science.`,
    lessonsCompleted: 15,
    assessmentsTaken: 4,
    timeSpent: '8h 30m',
    goingWell: [
      { topic: 'Basic Biology', score: 85 },
      { topic: 'States of Matter', score: 78 },
    ],
    needsPractice: [
      { topic: 'Chemical Reactions', score: 45 },
      { topic: 'Physics Motion', score: 50 },
    ]
  }
});

export default function SubjectBreakdown({ currentChild }) {
  const [activeSubject, setActiveSubject] = useState('mathematics');
  const childName = currentChild?.name || 'Olivia Johnson';
  const subjectsData = getSubjectsData(childName);
  const data = subjectsData[activeSubject];

  return (
    <div className="w-full bg-slate-50 px-2 sm:px-4 lg:px-8 py-4 sm:py-6 font-sans text-slate-800">
      {/* Main Container Card - Expanded full width up to max-w-[92rem] */}
      <div className="w-full max-w-[92rem] mx-auto bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight">Subject Breakdown</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Select a subject to see detailed progress and areas of focus for <span className="font-semibold text-slate-700">{childName}</span>.</p>
          
          {/* Subject Switcher Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-5">
            {Object.keys(subjectsData).map((key) => {
              const subj = subjectsData[key];
              const isSelected = activeSubject === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSubject(key)}
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl transition-all text-left shadow-2xs ${
                    isSelected 
                      ? `${subj.selectedBgColor} ring-2 ring-slate-900/5` 
                      : 'bg-slate-50/85 hover:bg-slate-100/80 border border-slate-200/60'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 ${subj.bgColor}`}>
                    {subj.icon}
                  </div>
                  <span className="font-bold text-slate-900 text-sm md:text-base">{subj.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Selected Subject Detailed View */}
        <div className="space-y-6 sm:space-y-8">
          {/* Subject Title Bar */}
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg flex items-center justify-center ${data.bgColor}`}>
              {data.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{data.name}</h3>
          </div>

          {/* Top Analytics Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Left Card: Progress Ring & Overall Status */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-around gap-6 shadow-2xs">
              {/* Circular Progress Representation using SVG */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-slate-100"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeDasharray={326.7}
                    strokeDashoffset={326.7 - (326.7 * data.progress) / 100}
                    strokeLinecap="round"
                    className="text-indigo-900 transition-all duration-700 ease-out"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-slate-900">{data.progress}%</span>
                </div>
              </div>

              {/* Status Details */}
              <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-slate-900">Good progress</h4>
                <p className="text-xs text-slate-500">{data.description}</p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-600 font-bold text-xs sm:text-sm pt-1 flex-wrap">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>{data.improvement}</span>
                  <span className="text-slate-400 font-normal text-[11px]">Improvement from last month ({data.previousMonth})</span>
                </div>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-medium text-emerald-700">{data.status}</span>
                </div>
              </div>
            </div>

            {/* Right Card: Subject Summary Metrics */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-4">Subject Summary</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600">Lessons Completed</span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900">{data.lessonsCompleted}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600">Assessments Taken</span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900">{data.assessmentsTaken}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600">Time Spent Learning</span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900">{data.timeSpent}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Grid: What's Going Well vs Needs More Practice */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            
            {/* What's Going Well Box */}
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5 sm:p-6 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <ThumbsUp className="w-5 h-5" />
                <h4 className="font-bold text-sm sm:text-base">What's Going Well</h4>
              </div>
              <p className="text-xs text-slate-500">{childName} is doing great in these areas.</p>

              <div className="space-y-3.5">
                {data.goingWell.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 min-w-[140px] sm:min-w-[180px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{item.topic}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-700 w-10 text-right">{item.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Needs More Practice Box */}
            <div className="bg-amber-50/40 border border-amber-100/80 rounded-2xl p-5 sm:p-6 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2.5 text-amber-700">
                <AlertCircle className="w-5 h-5" />
                <h4 className="font-bold text-sm sm:text-base">Needs More Practice</h4>
              </div>
              <p className="text-xs text-slate-500">These areas need more focus.</p>

              <div className="space-y-3.5">
                {data.needsPractice.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 min-w-[140px] sm:min-w-[180px]">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{item.topic}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-700 w-10 text-right">{item.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}