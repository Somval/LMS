import React from "react";
import {
  Check,
  BookOpen,
  FileText,
  NotebookText,
  BrainCircuit,
  ClipboardCheck,
  Video,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Custom SVG Icon Components
const PowerPointIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_1251_7197)">
      <path
        d="M4 1.39683V14.6032C4 15.3746 4.61561 16 5.375 16H14.625C15.3844 16 16 15.3746 16 14.6032V3.67563C16 3.30251 15.8531 2.9449 15.5919 2.68251L13.3239 0.403706C13.0665 0.145065 12.7191 0 12.357 0H5.375C4.61561 0 4 0.62538 4 1.39683ZM4.875 14.6032V1.39683C4.875 1.1163 5.09886 0.888889 5.375 0.888889H12.1875V3.93651C12.1875 4.46249 12.6072 4.88889 13.125 4.88889H15.125V14.6032C15.125 14.8837 14.9011 15.1111 14.625 15.1111H5.375C5.09886 15.1111 4.875 14.8837 4.875 14.6032ZM15.125 4V3.67563C15.125 3.53995 15.0716 3.40991 14.9766 3.3145L13.0625 1.39127V3.93651C13.0625 3.97157 13.0905 4 13.125 4H15.125Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#C25B33"
      />
      <path d="M10 12C12 12 13 11 13 9H11V7H10V9V12Z" fill="#E48762" />
      <path d="M12 8V6C12.75 6 14 7.25 14 8H12Z" fill="#F9D4C4" />
      <path
        d="M0 4.625C0 4.21079 0.335786 3.875 0.75 3.875H8.25C8.66421 3.875 9 4.21079 9 4.625V12.125C9 12.5392 8.66421 12.875 8.25 12.875H0.75C0.335786 12.875 0 12.5392 0 12.125V4.625Z"
        fill="#C25B33"
      />
      <path
        d="M3 10.7607V5.75H4.33301C4.82975 5.75 5.15446 5.77393 5.30713 5.82178C5.55094 5.89925 5.75146 6.06445 5.90869 6.31738C6.0682 6.57031 6.14795 6.89616 6.14795 7.29492C6.14795 7.65723 6.07959 7.96143 5.94287 8.20752C5.80615 8.45133 5.63525 8.62337 5.43018 8.72363C5.2251 8.82161 4.87191 8.87061 4.37061 8.87061H3.82715V10.7607H3ZM3.82715 6.59766V8.01953H4.28516C4.59277 8.01953 4.80127 7.99788 4.91064 7.95459C5.0223 7.9113 5.11344 7.83382 5.18408 7.72217C5.25472 7.60824 5.29004 7.46924 5.29004 7.30518C5.29004 7.13883 5.25358 6.9987 5.18066 6.88477C5.10775 6.77083 5.01774 6.6945 4.91064 6.65576C4.80355 6.61702 4.57682 6.59766 4.23047 6.59766H3.82715Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1251_7197">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WorksheetIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4.5 6.125C4.29289 6.125 4.125 6.29289 4.125 6.5C4.125 6.70711 4.29289 6.875 4.5 6.875H7.5C7.70711 6.875 7.875 6.70711 7.875 6.5C7.875 6.29289 7.70711 6.125 7.5 6.125H4.5Z"
      fill="#2E6DFF"
    />
    <path
      d="M4.5 8.125C4.29289 8.125 4.125 8.29289 4.125 8.5C4.125 8.70711 4.29289 8.875 4.5 8.875H11.5C11.7071 8.875 11.875 8.70711 11.875 8.5C11.875 8.29289 11.7071 8.125 11.5 8.125H4.5Z"
      fill="#2E6DFF"
    />
    <path
      d="M4.5 10.125C4.29289 10.125 4.125 10.2929 4.125 10.5C4.125 10.7071 4.29289 10.875 4.5 10.875H11.5C11.7071 10.875 11.875 10.7071 11.875 10.5C11.875 10.2929 11.7071 10.125 11.5 10.125H4.5Z"
      fill="#2E6DFF"
    />
    <path
      d="M4.5 12.125C4.29289 12.125 4.125 12.2929 4.125 12.5C4.125 12.7071 4.29289 12.875 4.5 12.875H9.5C9.70711 12.875 9.875 12.7071 9.875 12.5C9.875 12.2929 9.70711 12.125 9.5 12.125H4.5Z"
      fill="#2E6DFF"
    />
    <path
      d="M9.75 0H4C2.89543 0 2 0.895431 2 2V14C2 15.1046 2.89543 16 4 16H12C13.1046 16 14 15.1046 14 14V4.25L9.75 0ZM4 15H12C12.5523 15 13 14.5523 13 14V5H10.5C9.67157 5 9 4.32843 9 3.5V1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15ZM10 1.66421L12.3358 4H10.5C10.2239 4 10 3.77614 10 3.5V1.66421Z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#2E6DFF"
    />
  </svg>
);

const setupSteps = [
  {
    id: 1,
    title: "Step 1: Set Up Curriculum",
    description: "Add topics and lessons for each year level.",
    Icon: BookOpen,
    iconColor: "text-[#168A16]",
    iconBg: "bg-[#D0F4DC]",
  },
  {
    id: 2,
    title: "Step 2: Add Teaching Resources",
    description:
      "Upload lesson notes, presentations, worksheets, activities, assessments and videos to each lesson.",
    Icon: FileText,
    iconColor: "text-[#85451C]",
    iconBg: "bg-[#F1E5D2]",
  },
];

const resources = [
  {
    label: "Lesson Note",
    Icon: NotebookText,
    color: "text-[#F04444]",
    background: "bg-[#FFF0F0]",
  },
  {
    label: "PowerPoint",
    Icon: PowerPointIcon,
    color: "text-[#E76A32]",
    background: "bg-[#FFF1E8]",
  },
  {
    label: "Worksheet",
    Icon: WorksheetIcon,
    color: "text-[#4775F5]",
    background: "bg-[#EEF2FF]",
  },
  {
    label: "Practice Activity",
    Icon: BrainCircuit,
    color: "text-[#16B9C9]",
    background: "bg-[#E6FAFC]",
  },
  {
    label: "Assessment",
    Icon: ClipboardCheck,
    color: "text-[#D4A900]",
    background: "bg-[#FFF9D9]",
  },
  {
    label: "Video",
    Icon: Video,
    color: "text-[#B64AD9]",
    background: "bg-[#F8EAFE]",
  },
];

export default function SubjectCreatedSuccess({
  subjectName = "Mathematics",
  yearLevels = [1, 2, 3, 4, 5, 6],
  onSetupCurriculum,
  onBackToSubjects,
}) {
  const navigate = useNavigate();

  const handleSetupCurriculum = () => {
    if (onSetupCurriculum) {
      onSetupCurriculum();
      return;
    }

    navigate("/admin/curriculum");
  };

  const handleBackToSubjects = () => {
    if (onBackToSubjects) {
      onBackToSubjects();
      return;
    }

    navigate("/admin/subjects");
  };

  const formatYearLevels = () => {
    if (!yearLevels.length) return "No year levels selected";

    const sortedLevels = [...yearLevels].sort((a, b) => a - b);

    if (sortedLevels.length === 1) {
      return `Year ${sortedLevels[0]}`;
    }

    const isContinuous = sortedLevels.every(
      (year, index) =>
        index === 0 || year === sortedLevels[index - 1] + 1
    );

    if (isContinuous) {
      return `Year ${sortedLevels[0]}–${sortedLevels[sortedLevels.length - 1]}`;
    }

    return sortedLevels.map((year) => `Year ${year}`).join(", ");
  };

  return (
    <main className="min-h-screen w-full bg-[#F3F6FC] px-3 py-3 sm:px-5 sm:py-5">
      <section className="mx-auto w-full max-w-[900px] rounded-[9px] bg-white px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
        {/* Success Header */}
        <header className="flex flex-col items-center text-center">
          <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#E2F8EA] sm:h-[66px] sm:w-[66px]">
            <div className="flex h-[39px] w-[39px] items-center justify-center rounded-full bg-[#08B927] text-white sm:h-[46px] sm:w-[46px]">
              <Check
                size={29}
                strokeWidth={3.5}
                aria-hidden="true"
              />
            </div>
          </div>

          <h1 className="mt-3 text-xl font-bold leading-7 tracking-[-0.5px] text-[#111111] sm:text-[25px] sm:leading-8">
            Subject Created Successfully!
          </h1>

          <p className="mt-0.5 text-sm font-semibold leading-5 text-[#171717] sm:text-base">
            {subjectName} has been added for {formatYearLevels()}.
          </p>

          <p className="mt-1 max-w-[600px] text-xs leading-5 text-[#64748B] sm:text-sm">
            Next, set up the curriculum and add teaching resources for each
            year level.
          </p>
        </header>

        {/* Setup Steps */}
        <section
          aria-label="Next steps"
          className="mt-4 overflow-hidden rounded-[7px] bg-[#F1FBF4] px-3 sm:px-4"
        >
          {setupSteps.map((step, index) => {
            const Icon = step.Icon;

            return (
              <article
                key={step.id}
                className={`flex items-start gap-3 py-3 sm:gap-4 sm:py-3.5 ${
                  index !== setupSteps.length - 1
                    ? "border-b border-[#DCEFE1]"
                    : ""
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] sm:h-[50px] sm:w-[50px] ${step.iconBg} ${step.iconColor}`}
                >
                  <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <h2 className="text-sm font-bold leading-5 text-[#111827] sm:text-base">
                    {step.title}
                  </h2>

                  <p className="mt-1 text-xs leading-[18px] text-[#748092] sm:text-sm sm:leading-5">
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        {/* Available Resources */}
        <section className="mt-3 rounded-[7px] border border-[#F0EEEB] bg-[#FAF9F7] px-3 py-3 sm:px-4 sm:py-3.5">
          <h2 className="text-xs font-semibold leading-5 text-[#222222] sm:text-sm">
            You Can Add:
          </h2>

          <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
            {resources.map((resource) => {
              const Icon = resource.Icon;

              return (
                <div
                  key={resource.label}
                  className="inline-flex min-h-[30px] items-center gap-1.5 rounded-[4px] border border-[#E9E9E9] bg-white px-2 py-1 sm:gap-2 sm:px-2.5"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] ${resource.background} ${resource.color}`}
                  >
                    <Icon size={12} strokeWidth={1.8} aria-hidden="true" />
                  </span>

                  <span className="text-[10px] font-medium leading-4 text-[#252525] sm:text-xs">
                    {resource.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Actions */}
        <footer className="mx-auto mt-4 flex w-full max-w-[560px] flex-col gap-2 sm:mt-5">
          <button
            type="button"
            onClick={handleSetupCurriculum}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[5px] bg-[#064E0B] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#086313] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2"
          >
            <span>Set Up Curriculum &amp; Content</span>
            <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleBackToSubjects}
            className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[5px] border border-[#8DB596] bg-white px-4 py-2.5 text-sm font-medium text-[#064E0B] transition-colors hover:bg-[#F1FBF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.8}
              className="sm:hidden"
              aria-hidden="true"
            />
            Back to Subjects
          </button>
        </footer>
      </section>
    </main>
  );
}