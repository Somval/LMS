
import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  X,
  GraduationCap,
  Languages,
  Atom,
  Calculator,
  FlaskConical,
  Palette,
  Music,
  Globe,
  Code2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SubjectSuccessMessage from "./SubjectCreatedSuccess";

const YEAR_LEVELS = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
];

const SUBJECT_ICONS = [
  { name: "Book", component: BookOpen },
  { name: "Mathematics", component: Calculator },
  { name: "English", component: Languages },
  { name: "Science", component: Atom },
  { name: "Laboratory", component: FlaskConical },
  { name: "Art", component: Palette },
  { name: "Music", component: Music },
  { name: "Geography", component: Globe },
  { name: "Technology", component: Code2 },
  { name: "Education", component: GraduationCap },
];

export default function AddSubject() {
  const navigate = useNavigate();

  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState("Book");
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSubject, setCreatedSubject] = useState(null);

  const SelectedIcon =
    SUBJECT_ICONS.find((icon) => icon.name === selectedIcon)?.component ||
    BookOpen;

  const allYearsSelected = selectedYears.length === YEAR_LEVELS.length;

  const toggleYear = (year) => {
    setSelectedYears((current) =>
      current.includes(year)
        ? current.filter((item) => item !== year)
        : YEAR_LEVELS.filter(
            (item) => current.includes(item) || item === year
          )
    );

    setErrors((current) => ({
      ...current,
      years: "",
    }));
  };

  const toggleAllYears = () => {
    setSelectedYears(allYearsSelected ? [] : [...YEAR_LEVELS]);

    setErrors((current) => ({
      ...current,
      years: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const nextErrors = {};

    if (!subjectName.trim()) {
      nextErrors.subjectName = "Please enter a subject name.";
    }

    if (!description.trim()) {
      nextErrors.description = "Please enter a subject description.";
    }

    if (selectedYears.length === 0) {
      nextErrors.years = "Select at least one year level.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    const newSubject = {
      id: Date.now(),
      name: subjectName.trim(),
      description: description.trim(),
      icon: selectedIcon,
      yearLevels: [...selectedYears],
      status: "Active",
    };

    try {
      // Notify other components that a subject has been created.
      window.dispatchEvent(
        new CustomEvent("subjectCreated", {
          detail: newSubject,
        })
      );

      // Display the success component instead of a popup.
      setCreatedSubject(newSubject);
    } catch (error) {
      console.error("Unable to create subject:", error);
      setErrors((current) => ({
        ...current,
        submit: "Unable to create the subject. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show the success screen after the subject has been created.
  if (createdSubject) {
    return (
      <SubjectSuccessMessage
        subject={createdSubject}
        onSetupCurriculum={() =>
          navigate(
            `/admin/subjects/${createdSubject.id}/curriculum`
          )
        }
        onBackToSubjects={() => navigate("/admin/subjects")}
      />
    );
  }

  return (
    <main className="min-h-screen w-full min-w-0 bg-[#F4F7FD] px-3 py-4 sm:px-5 sm:py-6 lg:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Page Header */}
        <header className="mb-5 flex items-start gap-3 sm:mb-6">
          <button
            type="button"
            onClick={() => navigate("/admin/subjects")}
            aria-label="Go back"
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#242A32] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
          >
            <ArrowLeft size={20} strokeWidth={1.8} />
          </button>

          <div className="min-w-0">
            <h1 className="text-lg font-semibold leading-6 text-[#161B22] sm:text-xl">
              Add Subject Page
            </h1>

            <p className="mt-1 text-xs leading-5 text-[#738094] sm:text-sm">
              Create a new subject and select the year levels it will be
              available for.
            </p>
          </div>
        </header>

        {/* Subject Form */}
        <form onSubmit={handleSubmit} noValidate>
          <section className="w-full rounded-lg border border-[#E9EDF4] bg-white px-4 py-5 shadow-[0_1px_3px_rgba(20,35,60,0.02)] sm:px-6 sm:py-6">
            <h2 className="mb-5 text-base font-semibold text-[#20252D] sm:mb-6 sm:text-[17px]">
              Subject Details
            </h2>

            {/* Subject Name and Icon */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] sm:gap-6">
              <div className="min-w-0">
                <label
                  htmlFor="subjectName"
                  className="mb-2 block text-sm font-semibold text-[#252A32]"
                >
                  Subject Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="subjectName"
                  type="text"
                  value={subjectName}
                  onChange={(event) => {
                    setSubjectName(event.target.value);
                    setErrors((current) => ({
                      ...current,
                      subjectName: "",
                      submit: "",
                    }));
                  }}
                  placeholder="e.g. Mathematics"
                  maxLength={100}
                  aria-invalid={Boolean(errors.subjectName)}
                  className={`h-11 w-full rounded-md border bg-white px-3 text-sm text-[#252A32] outline-none transition placeholder:text-[#9A9A9A] focus:border-[#159A42] focus:ring-2 focus:ring-[#159A42]/10 ${
                    errors.subjectName
                      ? "border-red-400"
                      : "border-[#E4E7EC]"
                  }`}
                />

                {errors.subjectName && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.subjectName}
                  </p>
                )}
              </div>

              {/* Subject Icon */}
              <div className="min-w-0">
                <label className="mb-2 block text-sm font-semibold text-[#252A32]">
                  Subject Icon
                </label>

                <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
                  <div
                    aria-label={`Selected icon: ${selectedIcon}`}
                    className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-md border border-[#E5E8ED] bg-white text-[#697586]"
                  >
                    <SelectedIcon size={29} strokeWidth={1.6} />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsIconPickerOpen(true)}
                    className="inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-md border border-[#B9CCFF] bg-[#E6EDFF] px-3 text-xs font-medium text-[#1855D1] transition hover:bg-[#DCE6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1855D1] sm:h-[42px] sm:text-sm"
                  >
                    Change Icon
                  </button>
                </div>
              </div>
            </div>

            {/* Subject Description */}
            <div className="mt-6 sm:mt-8">
              <label
                htmlFor="subjectDescription"
                className="mb-2 block text-sm font-semibold text-[#252A32]"
              >
                Subject Description{" "}
                <span className="text-red-500">*</span>
              </label>

              <textarea
                id="subjectDescription"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value.slice(0, 200));
                  setErrors((current) => ({
                    ...current,
                    description: "",
                    submit: "",
                  }));
                }}
                placeholder="Briefly describe what this subject covers..."
                maxLength={200}
                rows={4}
                aria-invalid={Boolean(errors.description)}
                className={`min-h-[100px] w-full resize-y rounded-md border bg-white px-3 py-3 text-sm leading-5 text-[#252A32] outline-none transition placeholder:text-[#A0A0A0] focus:border-[#159A42] focus:ring-2 focus:ring-[#159A42]/10 sm:min-h-[115px] ${
                  errors.description
                    ? "border-red-400"
                    : "border-[#E4E7EC]"
                }`}
              />

              <div className="mt-1 flex items-start justify-between gap-3">
                {errors.description ? (
                  <p className="text-xs text-red-500">
                    {errors.description}
                  </p>
                ) : (
                  <span className="text-xs text-[#9299A4]">
                    Describe the subject and its learning objectives.
                  </span>
                )}

                <span
                  className={`shrink-0 text-xs ${
                    description.length >= 200
                      ? "text-red-500"
                      : "text-[#9299A4]"
                  }`}
                >
                  {description.length}/200
                </span>
              </div>
            </div>

            {/* Year Levels */}
            <div className="mt-6 sm:mt-8">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-sm font-semibold text-[#252A32]">
                    Year Levels <span className="text-red-500">*</span>
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#9299A4]">
                    Select the year levels (classes) this subject will be
                    available for.
                  </p>
                </div>

                <label className="inline-flex min-h-9 w-fit cursor-pointer items-center gap-2 rounded-md border border-[#E4E7EC] px-3 py-2 text-xs font-medium text-[#343A44] transition hover:bg-[#F8FAFC]">
                  <input
                    type="checkbox"
                    checked={allYearsSelected}
                    onChange={toggleAllYears}
                    className="h-4 w-4 cursor-pointer rounded border-[#D5DAE2] accent-[#159A42] focus:ring-[#159A42]"
                  />
                  Select all
                </label>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
                {YEAR_LEVELS.map((year) => {
                  const checked = selectedYears.includes(year);

                  return (
                    <label
                      key={year}
                      className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                        checked
                          ? "border-[#159A42] bg-[#F0FBF4] text-[#176D37]"
                          : "border-[#E4E7EC] bg-white text-[#343A44] hover:border-[#B8C1CC] hover:bg-[#FAFBFD]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleYear(year)}
                        className="h-4 w-4 shrink-0 cursor-pointer rounded border-[#D5DAE2] accent-[#159A42] focus:ring-[#159A42]"
                      />

                      <span className="whitespace-nowrap text-xs font-medium sm:text-sm">
                        {year}
                      </span>
                    </label>
                  );
                })}
              </div>

              {errors.years && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.years}
                </p>
              )}
            </div>

            {errors.submit && (
              <p
                role="alert"
                className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {errors.submit}
              </p>
            )}
          </section>

          {/* Form Actions */}
          <div className="mt-4 flex flex-col-reverse gap-3 pb-6 sm:flex-row sm:justify-end sm:pb-0">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#DDE3EA] bg-white px-6 text-sm font-medium text-[#505966] transition hover:bg-[#F7F9FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#064B0C] px-7 text-sm font-medium text-white transition hover:bg-[#043D09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[180px]"
            >
              {isSubmitting ? "Creating..." : "Create Subject"}
            </button>
          </div>
        </form>
      </div>

      {/* Icon Picker */}
      {isIconPickerOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsIconPickerOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="subject-icon-picker-title"
            className="my-auto w-full max-w-[460px] overflow-hidden rounded-xl border border-[#E5E9EF] bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between gap-3 border-b border-[#E9EDF2] px-5 py-4">
              <div>
                <h3
                  id="subject-icon-picker-title"
                  className="text-base font-semibold text-[#20252D]"
                >
                  Choose Subject Icon
                </h3>

                <p className="mt-1 text-xs text-[#7B8491]">
                  Select an icon for this subject.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsIconPickerOpen(false)}
                aria-label="Close icon picker"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#737D88] transition hover:bg-[#F3F5F9]"
              >
                <X size={19} />
              </button>
            </header>

            <div className="grid grid-cols-3 gap-3 p-5 sm:grid-cols-5">
              {SUBJECT_ICONS.map(({ name, component: Icon }) => {
                const selected = selectedIcon === name;

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setSelectedIcon(name);
                      setIsIconPickerOpen(false);
                    }}
                    aria-pressed={selected}
                    className={`relative flex min-h-[92px] flex-col items-center justify-center gap-2 rounded-lg border p-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] ${
                      selected
                        ? "border-[#159A42] bg-[#F0FBF4] text-[#159A42]"
                        : "border-[#E5E9EF] text-[#66717F] hover:border-[#B9C4D1] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-1.5 top-1.5 text-[#159A42]">
                        <Check size={14} />
                      </span>
                    )}

                    <Icon size={27} strokeWidth={1.6} />

                    <span className="text-center text-xs font-medium">
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>

            <footer className="flex justify-end border-t border-[#E9EDF2] bg-[#FAFBFD] px-5 py-4">
              <button
                type="button"
                onClick={() => setIsIconPickerOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#064B0C] px-5 text-sm font-medium text-white transition hover:bg-[#043D09]"
              >
                Done
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}
