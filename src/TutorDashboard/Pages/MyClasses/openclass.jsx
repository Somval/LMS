
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Trash2,
  Plus,
} from "lucide-react";
import StudentClassHeader from "../../../components/Tutor/studentclassheader";

export default function OpenClassDetail() {
  const { id } = useParams();

  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(
    "Week 1: Algebra and Expressions"
  );
  const [selectedSubtopic, setSelectedSubtopic] = useState(
    "Lesson 1: Introduction to Algebra"
  );

  const [objectives, setObjectives] = useState([
    "Understand what algebra equations are",
    "Solve simple linear equations with one variable",
    "Apply algebraic thinking to word problems",
  ]);

  const [sessionNotes, setSessionNotes] = useState("");
  const maxLength = 500;

  const handleObjectiveChange = (index, value) => {
    setObjectives((prev) =>
      prev.map((objective, i) =>
        i === index ? value : objective
      )
    );
  };

  const handleAddObjective = () => {
    setObjectives((prev) => [...prev, ""]);
  };

  const handleDeleteObjective = (index) => {
    setObjectives((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      classId: id,
      week: selectedWeek,
      subtopic: selectedSubtopic,
      objectives,
      notes: sessionNotes,
    };

    console.log(`Saved Details for Class ID ${id}:`, formData);
    alert(`Class ${id} details saved successfully!`);
  };

  const selectClass =
    "w-full min-w-0 appearance-none rounded-lg border border-[#D9DDE5] bg-white px-3 py-3 pr-9 text-sm text-[#344054] focus:border-[#2E6DFF] focus:outline-none focus:ring-2 focus:ring-[#2E6DFF]/20";

  const labelClass =
    "mb-2 block text-xs font-medium text-[#64748B] sm:text-sm";

  const stepNumberClass =
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2E6DFF] text-xs font-semibold text-white";

  return (
    <div className="min-h-screen w-full max-w-none space-y-6 p-3 font-sans sm:p-5 lg:p-8">
      {/* Student Class Header */}
      <div className="w-full min-w-0">
        <StudentClassHeader />
      </div>

      {/* Full-Width Class Details Card */}
      <section className="w-full min-w-0 rounded-xl border border-[#E1E4EB] bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-[#101828] sm:text-xl">
              Class Details
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#64748B] sm:text-sm">
              Add the details for this class session. The student
              will see this before joining.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={
              isExpanded
                ? "Collapse class details"
                : "Expand class details"
            }
            className="shrink-0 rounded-lg p-2 text-[#98A2B3] transition-colors hover:bg-gray-100 hover:text-[#344054]"
          >
            {isExpanded ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </div>

        {isExpanded && (
          <form onSubmit={handleSubmit} className="w-full space-y-8">
            {/* STEP 1: Select Lesson */}
            <div className="w-full space-y-4">
              <div className="flex items-center gap-3">
                <span className={stepNumberClass}>1</span>

                <h3 className="text-sm font-bold text-[#101828] sm:text-base">
                  Select Lesson <span className="text-red-500">*</span>
                </h3>
              </div>

              {/* Both Select Inputs on One Line */}
              <div className="grid w-full  items-start gap-3 sm:gap-5 sm:pl-10">
                <div className="min-w-0">
                  <label className={labelClass}>Select Week</label>

                  <div className="relative">
                    <select
                      value={selectedWeek}
                      onChange={(e) => setSelectedWeek(e.target.value)}
                      className={selectClass}
                    >
                      <option>Week 1: Algebra and Expressions</option>
                      <option>
                        Week 2: Linear Equations &amp; Inequalities
                      </option>
                      <option>Week 3: Quadratic Functions</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#98A2B3] sm:right-3"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <label className={labelClass}>Select Subtopic</label>

                  <div className="relative">
                    <select
                      value={selectedSubtopic}
                      onChange={(e) => setSelectedSubtopic(e.target.value)}
                      className={selectClass}
                    >
                      <option>
                        Lesson 1: Introduction to Algebra
                      </option>
                      <option>
                        Lesson 2: Simplifying Expressions
                      </option>
                      <option>Lesson 3: Solving for X</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#98A2B3] sm:right-3"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: Learning Objectives */}
            <div className="w-full space-y-4">
              <div className="flex items-center gap-3">
                <span className={stepNumberClass}>2</span>

                <h3 className="text-sm font-bold text-[#101828] sm:text-base">
                  What the Student Will Learn
                </h3>
              </div>

              <div className="w-full space-y-3 sm:pl-10">
                {objectives.map((objective, index) => (
                  <div
                    key={index}
                    className="flex w-full min-w-0 items-center gap-2 sm:gap-3"
                  >
                    <button
                      type="button"
                      aria-label={`Reorder objective ${index + 1}`}
                      className="shrink-0 cursor-grab text-[#98A2B3] hover:text-[#64748B]"
                    >
                      <GripVertical size={18} />
                    </button>

                    <input
                      type="text"
                      value={objective}
                      onChange={(e) =>
                        handleObjectiveChange(index, e.target.value)
                      }
                      placeholder="Enter objective..."
                      className="h-11 min-w-0 flex-1 rounded-lg border border-[#D9DDE5] bg-white px-3 text-sm text-[#344054] focus:border-[#2E6DFF] focus:outline-none focus:ring-2 focus:ring-[#2E6DFF]/20"
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteObjective(index)}
                      aria-label={`Delete objective ${index + 1}`}
                      className="shrink-0 rounded-lg p-2 text-[#98A2B3] transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddObjective}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#EDE4FF] px-4 py-2.5 text-sm font-medium text-[#7000E8] transition-colors hover:bg-[#E5D7FF]"
                >
                  <Plus size={17} />
                  Add another objective
                </button>
              </div>
            </div>

            {/* STEP 3: Session Notes */}
            <div className="w-full space-y-4">
              <div className="flex items-center gap-3">
                <span className={stepNumberClass}>3</span>

                <h3 className="text-sm font-bold text-[#101828] sm:text-base">
                  Add Session Notes
                </h3>
              </div>

              <div className="w-full space-y-2 sm:pl-10">
                <textarea
                  rows={5}
                  maxLength={maxLength}
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Add any additional notes or instructions for this session..."
                  className="w-full resize-y rounded-lg border border-[#D9DDE5] bg-white p-4 text-sm leading-6 text-[#344054] focus:border-[#2E6DFF] focus:outline-none focus:ring-2 focus:ring-[#2E6DFF]/20"
                />

                <div className="text-right text-xs text-[#98A2B3]">
                  {sessionNotes.length}/{maxLength}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex w-full justify-end border-t border-[#E1E4EB] pt-6">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#2E6DFF] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2459D9] active:scale-[0.99] sm:w-auto sm:min-w-[220px]"
              >
                Save Class Details
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
