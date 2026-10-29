import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CurriculumHeader({
  subjects = ["Mathematics", "English", "Science", "History"],
  yearLevels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"],
  onSubjectChange,
  onYearLevelChange,
}) {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || "Mathematics");
  const [selectedYearLevel, setSelectedYearLevel] = useState(yearLevels[0] || "Year 1");

  const handleSubjectChange = (e) => {
    const val = e.target.value;
    setSelectedSubject(val);
    if (onSubjectChange) onSubjectChange(val);
  };

  const handleYearLevelChange = (e) => {
    const val = e.target.value;
    setSelectedYearLevel(val);
    if (onYearLevelChange) onYearLevelChange(val);
  };

  return (
    <div className="w-full bg-[#f4f7fb] p-4 sm:p-6 md:p-8 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Title and Description */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f172a]">
            Curriculum &amp; Content
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
            Manage the curriculum structure and add teaching resources for each lesson.
          </p>
        </div>

        {/* Filter Selection Card */}
        <div className="w-full rounded-2xl bg-[#edf7f3] p-4 sm:p-5 md:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-2xl lg:max-w-3xl">
            {/* Subject Selector */}
            <div className="flex flex-col gap-1.5">
              <label 
                htmlFor="subject-select" 
                className="text-xs sm:text-sm font-semibold text-[#1e293b]"
              >
                Subject
              </label>
              <div className="relative w-full">
                <select
                  id="subject-select"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="w-full appearance-none rounded-lg border border-transparent bg-white py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-medium text-[#475569] shadow-sm outline-none transition-all duration-150 hover:border-slate-200 focus:border-[#08b927] focus:ring-2 focus:ring-[#08b927]/20 cursor-pointer"
                >
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#64748b]">
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Year Level Selector */}
            <div className="flex flex-col gap-1.5">
              <label 
                htmlFor="year-level-select" 
                className="text-xs sm:text-sm font-semibold text-[#1e293b]"
              >
                Year Level
              </label>
              <div className="relative w-full">
                <select
                  id="year-level-select"
                  value={selectedYearLevel}
                  onChange={handleYearLevelChange}
                  className="w-full appearance-none rounded-lg border border-transparent bg-white py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-medium text-[#475569] shadow-sm outline-none transition-all duration-150 hover:border-slate-200 focus:border-[#08b927] focus:ring-2 focus:ring-[#08b927]/20 cursor-pointer"
                >
                  {yearLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#64748b]">
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}