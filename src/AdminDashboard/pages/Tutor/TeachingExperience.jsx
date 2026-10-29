import React from "react";
import { Plus } from "lucide-react";

const teachingExperiences = [
  {
    id: 1,
    title: "Primary School Tutor",
    institution: "Bright Learners Academy",
    role: "Primary School Tutor",
    levels: "Year 3, Year 4, Year 5",
    startEndDate: "Jan 2021 - Dec 2023",
    subjects: "Mathematics, Science",
    description:
      "Delivered engaging lessons and supported students with different learning needs.",
  },
];

export default function TeachingExperience() {
  const handleAddExperience = () => {
    // Connect your add-experience page or form here.
  };

  return (
    <section className="w-full min-w-0 bg-[#F5F7FF] p-3 sm:p-4">
      <div className="mx-auto w-full max-w-[1200px] rounded-[6px] bg-white p-3 sm:p-[14px]">
        {/* Section header */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[17px] font-semibold leading-6 text-[#171717]">
            Teaching Experience
          </h2>

          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-flex h-[30px] shrink-0 items-center justify-center gap-1 rounded-[4px] border border-[#86EFAC] bg-white px-2.5 text-[12px] font-medium text-[#22C55E] transition-colors hover:bg-[#F0FDF4] focus:outline-none focus:ring-2 focus:ring-green-100 sm:px-3"
          >
            <Plus size={14} strokeWidth={1.7} />
            Add Experience
          </button>
        </div>

        {/* Experience cards */}
        <div className="space-y-3">
          {teachingExperiences.map((experience) => (
            <article
              key={experience.id}
              className="w-full min-w-0 rounded-[6px] border border-[#E5E7EB] bg-white px-3 py-3 sm:px-[15px] sm:py-[13px]"
            >
              {/* Experience title */}
              <div className="mb-3 flex min-w-0 items-center gap-[10px]">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#3267FF] text-[11px] font-medium leading-none text-white">
                  {experience.id}
                </span>

                <h3 className="truncate text-[14px] font-medium leading-5 text-[#171717]">
                  {experience.title}
                </h3>
              </div>

              {/* Details grid */}
              <div className="grid min-w-0 grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-0">
                {/* Left column */}
                <div className="min-w-0 space-y-3 sm:pr-2">
                  <DetailRow
                    label="Institution / Organization"
                    value={experience.institution}
                  />

                  <DetailRow
                    label="Role / Position"
                    value={experience.role}
                  />

                  <DetailRow
                    label="Year Levels / Grades"
                    value={experience.levels}
                  />
                </div>

                {/* Right column */}
                <div className="min-w-0 space-y-3 border-t border-[#E5E7EB] pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                  <DetailRow
                    label="Start Date - End Date"
                    value={experience.startEndDate}
                  />

                  <DetailRow
                    label="Subjects Taught"
                    value={experience.subjects}
                  />

                  <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                    <span className="text-[13px] font-normal leading-[19px] text-[#647084]">
                      Description
                    </span>

                    <p className="min-w-0 break-words text-[12px] font-normal italic leading-[17px] text-[#737985]">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <span className="text-[13px] font-normal leading-[19px] text-[#647084]">
        {label}
      </span>

      <span className="min-w-0 break-words text-[13px] font-medium leading-[19px] text-[#171717]">
        {value}
      </span>
    </div>
  );
}