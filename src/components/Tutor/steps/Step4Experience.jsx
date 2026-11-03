
import React, { useEffect, useState } from "react";
import { Trash2, ChevronDown, Calendar, Plus } from "lucide-react";

const createExperience = (id) => ({
  id,
  institution: "",
  role: "",
  subjects: "",
  yearLevels: "",
  startDate: "",
  endDate: "",
  description: "",
});

const inputClass =
  "block w-full min-w-0 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass =
  "mb-2 block text-sm font-semibold text-gray-800";

export default function TeachingExperienceForm({ onExtra }) {
  const [experiences, setExperiences] = useState([
    createExperience(1),
  ]);
  useEffect(() => { onExtra?.('experiences', experiences); }, [experiences, onExtra]);

  const handleAddExperience = () => {
    setExperiences((prev) => [
      ...prev,
      createExperience(Date.now()),
    ]);
  };

  const handleRemoveExperience = (id) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleChange = (id, field, value) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="min-h-screen w-full  p-4 font-sans text-gray-800 sm:p-6 lg:p-8">
      <div className="w-full">
        {/* Header */}
        <header className="mb-8 text-left">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Teaching Experience
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Tell us about your previous teaching experience.
          </p>
        </header>

        {/* Experience Cards */}
        <div className="w-full space-y-6">
          {experiences.map((exp, index) => (
            <section
              key={exp.id}
              className="w-full  p-4 sm:p-6 lg:p-7"
              aria-label={`Teaching experience ${index + 1}`}
            >
              {/* Card Header */}
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <h3 className="text-base font-bold text-gray-900">
                  Experience {index + 1}
                </h3>

                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                    aria-label={`Delete experience ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              {/* Institution / Organization */}
              <div className="mb-5 w-full">
                <label
                  htmlFor={`institution-${exp.id}`}
                  className={labelClass}
                >
                  Institution / Organization
                </label>

                <input
                  id={`institution-${exp.id}`}
                  type="text"
                  value={exp.institution}
                  onChange={(e) =>
                    handleChange(exp.id, "institution", e.target.value)
                  }
                  placeholder="Enter institution or organization name"
                  className={inputClass}
                />
              </div>

              {/* Role / Position */}
              <div className="mb-5 w-full">
                <label
                  htmlFor={`role-${exp.id}`}
                  className={labelClass}
                >
                  Role / Position
                </label>

                <input
                  id={`role-${exp.id}`}
                  type="text"
                  value={exp.role}
                  onChange={(e) =>
                    handleChange(exp.id, "role", e.target.value)
                  }
                  placeholder="e.g. Mathematics Teacher"
                  className={inputClass}
                />
              </div>

              {/* Subjects Taught */}
              <div className="mb-5 w-full">
                <label
                  htmlFor={`subjects-${exp.id}`}
                  className={labelClass}
                >
                  Subjects Taught
                </label>

                <div className="relative">
                  <select
                    id={`subjects-${exp.id}`}
                    value={exp.subjects}
                    onChange={(e) =>
                      handleChange(exp.id, "subjects", e.target.value)
                    }
                    className={`${inputClass} appearance-none pr-11 ${
                      exp.subjects ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    <option value="" disabled>
                      Select subjects
                    </option>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="social-studies">Social Studies</option>
                    <option value="other">Other</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Year Levels / Grades */}
              <div className="mb-5 w-full">
                <label
                  htmlFor={`year-levels-${exp.id}`}
                  className={labelClass}
                >
                  Year Levels / Grades
                </label>

                <div className="relative">
                  <select
                    id={`year-levels-${exp.id}`}
                    value={exp.yearLevels}
                    onChange={(e) =>
                      handleChange(exp.id, "yearLevels", e.target.value)
                    }
                    className={`${inputClass} appearance-none pr-11 ${
                      exp.yearLevels ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    <option value="" disabled>
                      Select year levels taught
                    </option>
                    <option value="early-childhood">Early Childhood</option>
                    <option value="primary">Primary / Elementary</option>
                    <option value="junior-secondary">
                      Junior Secondary
                    </option>
                    <option value="senior-secondary">
                      Senior Secondary / High School
                    </option>
                    <option value="tertiary">Tertiary / University</option>
                    <option value="adult-education">Adult Education</option>
                    <option value="other">Other</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Dates */}
              <div className="mb-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Start Date */}
                <div className="min-w-0">
                  <label
                    htmlFor={`start-date-${exp.id}`}
                    className={labelClass}
                  >
                    Start Date
                  </label>

                  <div className="relative">
                    <input
                      id={`start-date-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleChange(exp.id, "startDate", e.target.value)
                      }
                      className={`${inputClass} pr-10`}
                    />

                    <Calendar className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* End Date */}
                <div className="min-w-0">
                  <label
                    htmlFor={`end-date-${exp.id}`}
                    className={labelClass}
                  >
                    End Date
                  </label>

                  <div className="relative">
                    <input
                      id={`end-date-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      min={exp.startDate || undefined}
                      onChange={(e) =>
                        handleChange(exp.id, "endDate", e.target.value)
                      }
                      className={`${inputClass} pr-10`}
                    />

                    <Calendar className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Brief Description */}
              <div className="w-full">
                <label
                  htmlFor={`description-${exp.id}`}
                  className={labelClass}
                >
                  Brief Description{" "}
                  <span className="font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id={`description-${exp.id}`}
                  rows={4}
                  value={exp.description}
                  onChange={(e) =>
                    handleChange(exp.id, "description", e.target.value)
                  }
                  placeholder="Briefly describe your responsibilities, teaching methods, and achievements."
                  className={`${inputClass} min-h-[120px] resize-y leading-relaxed`}
                />
              </div>
            </section>
          ))}
        </div>

        {/* Add Experience */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-auto"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Add Another Experience
          </button>
        </div>
      </div>
    </div>
  );
}
