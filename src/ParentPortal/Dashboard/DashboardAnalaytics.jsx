
import React from "react";

const defaultSubjects = [
  { name: "Mathematics", value: 70 },
  { name: "English", value: 70 },
  { name: "Science", value: 70 },
  { name: "Art", value: 70 },
  { name: "Coding", value: 70 },
];

function LearningProgressCircle({ value = 75 }) {
  const size = 130;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - value / 100);

  return (
    <div className="flex min-w-0 flex-col items-center">
      <div className="relative h-[100px] w-[100px] min-[360px]:h-[112px] min-[360px]:w-[112px] sm:h-[130px] sm:w-[130px] shrink-0">
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          className="block h-full w-full"
          role="img"
          aria-label={`Learning progress ${value}%`}
        >
          <circle
            cx="65"
            cy="65"
            r={radius}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />

          <circle
            cx="65"
            cy="65"
            r={radius}
            fill="none"
            stroke="#2F327D"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            transform="rotate(-90 65 65)"
            className="transition-[stroke-dashoffset] duration-500"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[19px] min-[360px]:text-[21px] sm:text-[23px] font-semibold leading-none text-[#2F327D]">
            {value}%
          </span>
        </div>
      </div>

      <p className="mt-2 whitespace-nowrap text-[10px] min-[360px]:text-[11px] sm:text-[12px] font-medium leading-tight text-slate-800">
        Learning Progress
      </p>
    </div>
  );
}

function AcademicIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-6 w-6 sm:h-[27px] sm:w-[27px] shrink-0"
    >
      <path
        d="M21.1377 4.07525L14.071 0.708628C12.5154 -0.220536 10.5793 -0.237023 9.0081 0.665503L1.86184 4.07525C1.83502 4.08868 1.80721 4.10306 1.78134 4.11838C0.0854462 5.08806 -0.5033 7.24894 0.466384 8.94483C0.795077 9.51974 1.27857 9.99079 1.86184 10.3044L3.83314 11.2436V15.9394C3.83431 18.0392 5.20061 19.8943 7.20552 20.5184C8.60075 20.922 10.0475 21.1196 11.4998 21.1049C12.952 21.1211 14.3987 20.9252 15.7941 20.5232C17.799 19.8992 19.1653 18.044 19.1665 15.9442V11.2417L21.0832 10.3255V18.2298C21.0832 18.7591 21.5122 19.1881 22.0415 19.1881C22.5708 19.1881 22.9998 18.7591 22.9998 18.2298V6.72982C23.0062 5.60448 22.1176 4.5649 21.1377 4.07525ZM17.2498 15.9442C17.2503 17.2002 16.4354 18.3112 15.2373 18.6879C14.0223 19.0351 12.7633 19.2036 11.4998 19.1882C10.2363 19.2036 8.97724 19.0351 7.76228 18.6879C6.56417 18.3111 5.74929 17.2002 5.74978 15.9442V12.1569L8.92859 13.6711C9.71292 14.1369 10.6087 14.3816 11.5209 14.3793C12.3891 14.3855 13.2428 14.1556 13.9905 13.7142L17.2498 12.1569V15.9442ZM20.3165 8.57463L13.0887 12.0246C12.0809 12.6114 10.8318 12.5948 9.83996 11.9815L2.76841 8.61775C1.98016 8.1927 1.68574 7.20914 2.11079 6.42094C2.25454 6.15437 2.47008 5.9334 2.73296 5.783L9.91565 2.35218C10.9237 1.76667 12.1722 1.78325 13.1644 2.39531L20.2312 5.76193C20.7509 6.05051 21.076 6.59546 21.0831 7.18987C21.084 7.75292 20.7941 8.27653 20.3165 8.57463Z"
        fill="#2E6DFF"
      />
    </svg>
  );
}

export default function AcademicPerformance({ student }) {
  const learningProgress = student?.learningProgress ?? 75;
  const subjectsEnrolled = student?.subjectsEnrolled ?? 4;
  const homeworkCompletion = student?.homeworkCompletion ?? 94;

  const subjects = student?.subjects ?? defaultSubjects;

  return (
    <section className="box-border w-full max-w-[364px] min-w-0 overflow-hidden mb-5 lg:mb-1 rounded-[10px] border border-slate-100 bg-white shadow-[0_2px_7px_rgba(15,23,42,0.12)]">
      {/* HEADER */}
      <header className="flex min-h-[48px] sm:h-[54px] items-center gap-2 sm:gap-3 px-3 sm:px-3.5">
        <AcademicIcon />

        <h2 className="min-w-0 text-[12px] min-[360px]:text-[13px] sm:text-[14px] font-semibold leading-tight text-black [font-family:Inter,sans-serif]">
          Academic Performance
        </h2>
      </header>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:grid-cols-[130px_minmax(0,1fr)] items-center gap-2 sm:gap-4 px-2.5 sm:px-3.5 pb-3 sm:pb-4">
        {/* LEARNING PROGRESS */}
        <LearningProgressCircle value={learningProgress} />

        {/* SUBJECT PROGRESS */}
        <div className="flex min-w-0 flex-col justify-center gap-[15px] sm:gap-[17px]">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="flex min-w-0 items-center gap-1 sm:gap-2"
            >
              <span className="w-[58px] min-[360px]:w-[64px] sm:w-[71px] shrink-0 whitespace-nowrap text-[9px] min-[360px]:text-[10px] sm:text-[10px] font-medium leading-none text-black">
                {subject.name}
              </span>

              <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
                <div
                  className="relative h-[8px] w-full max-w-[112px] min-w-0 flex-1 sm:flex-none sm:w-[112px] overflow-hidden rounded-full bg-[#D9D9D9]"
                  role="progressbar"
                  aria-label={subject.name}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={subject.value}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#343582] transition-[width] duration-300"
                    style={{ width: `${subject.value}%` }}
                  />
                </div>

                <span className="w-[23px] sm:w-[25px] shrink-0 text-right text-[9px] sm:text-[10px] font-medium leading-none text-black">
                  {subject.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER DIVIDER */}
      <div className="mx-2.5 border-t border-slate-100" />

      {/* FOOTER STATISTICS */}
      <footer className="grid min-h-[46px] grid-cols-2 items-center px-2.5 sm:px-3.5 py-2 sm:py-0">
        <div className="flex min-w-0 items-center justify-between gap-1 pr-2 sm:pr-3">
          <span className="min-w-0 text-[9px] min-[360px]:text-[10px] sm:text-[11px] font-medium leading-tight text-[#8588B1]">
            Subjects Enrolled
          </span>

          <span className="shrink-0 text-[10px] sm:text-[11px] font-medium text-black">
            {subjectsEnrolled}
          </span>
        </div>

        <div className="flex min-w-0 items-center justify-between gap-1 border-l border-slate-100 pl-2 sm:pl-3">
          <span className="min-w-0 text-[9px] min-[360px]:text-[10px] sm:text-[11px] font-medium leading-tight text-[#8588B1]">
            Homework Completion
          </span>

          <span className="shrink-0 text-[10px] sm:text-[11px] font-medium text-black">
            {homeworkCompletion}%
          </span>
        </div>
      </footer>
    </section>
  );
}
