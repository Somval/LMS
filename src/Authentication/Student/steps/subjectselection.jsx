
import React, { useState, useRef, useEffect, useId } from "react";
import {
  Calculator,
  Atom,
  BookOpen,
  Code2,
  Trash2,
  ChevronDown,
  Check,
  ArrowRight,
} from "lucide-react";

const schoolYears = [
  "Reception",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
];

const subjectsData = [
  {
    id: "math",
    name: "Mathematics",
    icon: Calculator,
    bgColor: "bg-[#2E3192]",
  },
  {
    id: "science",
    name: "Science",
    icon: Atom,
    bgColor: "bg-[#00D061]",
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    bgColor: "bg-[#FFD100]",
  },
  {
    id: "coding",
    name: "Coding",
    icon: Code2,
    bgColor: "bg-[#8F3985]",
  },
];

const assessmentNote =
  "Your assessment will help us identify the areas where you need the most support.";

/* ---------------------------------------------
   SCHOOL YEAR DROPDOWN
--------------------------------------------- */

function SchoolYearDropdown({ subject, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const listboxId = useId();
  const labelId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const openDropdown = () => {
    setIsOpen((previous) => !previous);
  };

  const handleOptionKeyDown = (event, index) => {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        nextIndex = (index + 1) % schoolYears.length;
        optionRefs.current[nextIndex]?.focus();
        break;

      case "ArrowUp":
        event.preventDefault();
        nextIndex =
          (index - 1 + schoolYears.length) % schoolYears.length;
        optionRefs.current[nextIndex]?.focus();
        break;

      case "Home":
        event.preventDefault();
        optionRefs.current[0]?.focus();
        break;

      case "End":
        event.preventDefault();
        optionRefs.current[schoolYears.length - 1]?.focus();
        break;

      default:
        break;
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full min-w-0 sm:w-[200px] sm:shrink-0">
      <label
        id={labelId}
        className="mb-1.5 block text-xs font-medium text-[#777CA5]"
      >
        Select School Year
      </label>

      <button
        ref={triggerRef}
        type="button"
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={openDropdown}
        className="flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-left text-sm text-[#111111] transition-colors hover:border-[#C5C9D8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C2EFF] focus-visible:ring-offset-1"
      >
        <span
          className={`min-w-0 truncate ${
            value ? "text-[#111111]" : "text-[#777CA5]"
          }`}
        >
          {value || "Select school year"}
        </span>

        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-[#8B94AD] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 w-full min-w-0 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-lg sm:right-auto sm:w-[270px] sm:max-w-[calc(100vw-32px)]">
          <div
            id={listboxId}
            role="listbox"
            aria-label={`${subject.name} school year`}
            className="max-h-60 overflow-y-auto overscroll-contain p-1"
          >
            {schoolYears.map((year, index) => {
              const isSelected = value === year;

              return (
                <button
                  key={year}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(year);
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                  onKeyDown={(event) =>
                    handleOptionKeyDown(event, index)
                  }
                  className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3C2EFF] ${
                    isSelected
                      ? "bg-[#EEF2FF] font-medium text-[#30336B]"
                      : "text-[#222222] hover:bg-[#F3F4F8]"
                  }`}
                >
                  <span>{year}</span>

                  {isSelected && (
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[#30336B]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#F0F0F0] px-3 py-3">
            <p className="text-xs italic leading-relaxed text-[#9295A5]">
              {assessmentNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------
   SUBJECT SELECTION
--------------------------------------------- */

export default function SubjectSelection({ onNext, onBack }) {
  const [selectedLevels, setSelectedLevels] = useState({});
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [error, setError] = useState("");

  // Add a subject automatically when its school year is selected.
  const handleLevelChange = (subject, newLevel) => {
    setSelectedLevels((previous) => ({
      ...previous,
      [subject.id]: newLevel,
    }));

    setSelectedCourses((previous) => {
      const existingCourse = previous.find(
        (course) => course.id === subject.id
      );

      if (existingCourse) {
        return previous.map((course) =>
          course.id === subject.id
            ? { ...course, level: newLevel }
            : course
        );
      }

      return [
        ...previous,
        {
          id: subject.id,
          name: subject.name,
          level: newLevel,
          iconBg: subject.bgColor,
          Icon: subject.icon,
        },
      ];
    });

    setError("");
  };

  // Remove a subject and clear its selected school year.
  const removeCourse = (subjectId) => {
    setSelectedCourses((previous) =>
      previous.filter((course) => course.id !== subjectId)
    );

    setSelectedLevels((previous) => {
      const updatedLevels = { ...previous };
      delete updatedLevels[subjectId];
      return updatedLevels;
    });

    setError("");
  };

  // Validate the selection before moving to the next step.
  const handleContinue = () => {
    if (selectedCourses.length === 0) {
      setError("Please select at least one subject before proceeding.");
      return;
    }

    setError("");
    onNext?.(selectedCourses);
  };

  return (
    <div className="flex w-full min-w-0 flex-col bg-white">
      <div className="w-full min-w-0 space-y-6">
        {/* Header */}
        <header className="space-y-1.5">
          <h2 className="text-xl font-bold leading-tight text-[#111111] sm:text-2xl">
            Select Your Subjects
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-[#8B94AD]">
            Choose the subjects you want to learn and the appropriate
            school year.
          </p>
        </header>

        {/* Subject Cards */}
        <section
          aria-label="Available subjects"
          className="space-y-3"
        >
          {subjectsData.map((subject) => {
            const Icon = subject.icon;
            const selectedYear = selectedLevels[subject.id] || "";

            return (
              <article
                key={subject.id}
                className="flex w-full min-w-0 flex-col gap-4 rounded-xl border border-[#E2E8F0] bg-white p-3.5 transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-4"
              >
                {/* Subject Icon and Name */}
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${subject.bgColor}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-white"
                      strokeWidth={2}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-semibold text-[#111111] sm:text-base">
                      {subject.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-[#8B94AD]">
                      {selectedYear
                        ? "School year selected"
                        : "Choose your school year"}
                    </p>
                  </div>
                </div>

                {/* School Year Dropdown */}
                <div className="w-full min-w-0 sm:w-auto">
                  <SchoolYearDropdown
                    subject={subject}
                    value={selectedYear}
                    onChange={(year) =>
                      handleLevelChange(subject, year)
                    }
                  />
                </div>
              </article>
            );
          })}
        </section>

        {/* Selected Subjects */}
        <section
          aria-labelledby="selected-subjects-heading"
          className="w-full min-w-0 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#E2E8F0] bg-[#EEF2F6] px-4 py-3 sm:px-5">
            <h3
              id="selected-subjects-heading"
              className="text-sm font-bold text-[#111111]"
            >
              Your Selected Subjects
            </h3>

            <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-[#30336B]">
              {selectedCourses.length} selected
            </span>
          </div>

          {selectedCourses.length > 0 ? (
            <ul className="divide-y divide-[#E2E8F0]">
              {selectedCourses.map((course) => {
                const Icon = course.Icon;

                return (
                  <li
                    key={course.id}
                    className="flex min-w-0 items-center justify-between gap-3 px-4 py-3.5 sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${course.iconBg}`}
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5 text-white"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="break-words text-sm font-semibold text-[#111111]">
                          {course.name}
                        </h4>

                        <p className="mt-0.5 text-xs text-[#8B94AD]">
                          {course.level}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeCourse(course.id)}
                      aria-label={`Remove ${course.name}`}
                      title={`Remove ${course.name}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#8B94AD] transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      <Trash2
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-5 py-8 text-center sm:py-10">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#F1F3F7]">
                <BookOpen
                  aria-hidden="true"
                  className="h-5 w-5 text-[#777CA5]"
                />
              </div>

              <p className="text-sm font-medium text-[#30336B]">
                No subjects selected yet
              </p>

              <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-[#8B94AD]">
                Choose a school year above to add a subject to your
                selection.
              </p>
            </div>
          )}
        </section>

        {/* Validation Error */}
        {error && (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm leading-relaxed text-red-600"
          >
            {error}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <footer className="mt-6 flex w-full items-center justify-between gap-3 border-t border-[#F1F3F7] pt-5 sm:mt-8 sm:pt-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-xl bg-[#F1F3F7] px-5 py-2.5 text-sm font-bold text-[#30336B] transition-colors hover:bg-[#E8EBF1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30336B] focus-visible:ring-offset-2 sm:min-w-28 sm:px-6"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl bg-[#30336B] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#252854] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30336B] focus-visible:ring-offset-2 sm:min-w-32 sm:px-6"
        >
          <span>Continue</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
          />
        </button>
      </footer>
    </div>
  );
}
