import React, { useState } from "react";
import {
  ChevronRight,
  CalendarDays,
  Send,
} from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Solve for x:",
    equation: "3x + 2 = 14",
    marks: 2,
  },
  {
    id: 2,
    question: "Solve for x:",
    equation: "3x + 2 = 14",
    marks: 2,
  },
];

export default function AssignmentDetails() {
  const [answers, setAnswers] = useState({});
  const [working, setWorking] = useState({});
  const [note, setNote] = useState("");

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleWorkingChange = (id, value) => {
    setWorking((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      answers,
      working,
      note,
    });
  };

  return (
    <div className="min-h-screen w-full  px-3 py-4 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1100px]">

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)]">

          {/* Top Header */}
          <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-5 md:px-7 lg:px-8">

            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-1.5 text-[10px] font-medium text-[#2E6DFF] sm:text-xs">
              <span className="cursor-pointer hover:text-blue-700">
                Assignments & Quiz
              </span>

              <ChevronRight className="h-3 w-3 text-[#8B98AA]" />

              <span className="text-[#64748B]">
                Assignment Details
              </span>
            </div>

            {/* Header */}
            <div className="flex items-start">
              <div className="min-w-0">

                <h1 className="text-base font-bold tracking-[-0.01em] text-[#111827] sm:text-lg md:text-xl">
                  Algebra Practice
                </h1>

                <p className="mt-0.5 text-[10px] font-medium text-[#374151] sm:text-xs">
                  Mathematics • Linear Equations
                </p>

                {/* Metadata */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">

                  <div className="flex items-center gap-1.5 text-[9px] text-[#64748B] sm:text-[10px]">
                    <CalendarDays className="h-3 w-3" />
                    <span>
                      Due May 16, 2025 • 11:59 PM
                    </span>
                  </div>

                  <span className="rounded-full bg-[#FFF0E1] px-2.5 py-1 text-[8px] font-semibold text-[#F28C28] sm:text-[9px]">
                    High Difficulty
                  </span>

                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 px-3 pb-4 sm:space-y-4 sm:px-5 sm:pb-6 md:px-6 lg:px-7">

            {/* Instructions */}
            <section className="rounded-lg bg-[#EAF0FF] px-4 py-3 sm:px-5 sm:py-4">

              <h2 className="text-[10px] font-bold text-[#1E293B] sm:text-xs">
                Instructions
              </h2>

              <p className="mt-1 max-w-4xl text-[9px] leading-[1.55] text-[#64748B] sm:text-[10px] md:text-xs">
                Solve each question and show your working. Complete all 10
                questions before submitting.
              </p>

            </section>

            {/* Questions */}
            <section className="rounded-lg bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">

              {/* Section Header */}
              <div className="px-4 pb-2.5 pt-4 sm:px-5 sm:pt-5">

                <h2 className="text-[10px] font-bold text-[#111827] sm:text-xs md:text-sm">
                  Assignment Questions
                </h2>

              </div>

              {/* Questions List */}
              <div className="space-y-5 px-4 pb-5 sm:px-5 sm:pb-6 md:space-y-6">

                {questions.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-0"
                  >

                    {/* Question Heading */}
                    <div className="flex items-start gap-2.5 sm:gap-3">

                      {/* Number */}
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#30288C] text-[9px] font-bold text-white sm:h-6 sm:w-6 sm:text-[10px]">
                        {item.id}
                      </div>

                      {/* Question */}
                      <div className="min-w-0 flex-1 pt-0.5">

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <p className="text-[9px] font-semibold text-[#111827] sm:text-[10px] md:text-xs">
                              {item.question}
                            </p>

                            <p className="mt-0.5 text-[9px] text-[#374151] sm:text-[10px] md:text-xs">
                              {item.equation}
                            </p>

                          </div>

                          {/* Marks */}
                          <span className="shrink-0 rounded-sm bg-[#EAF1FF] px-1.5 py-1 text-[7px] font-semibold text-[#2E6DFF] sm:px-2 sm:text-[8px]">
                            {item.marks} marks
                          </span>

                        </div>
                      </div>
                    </div>

                    {/* Answer */}
                    <div className="ml-[30px] mt-3 sm:ml-9 sm:mt-4">

                      <label className="mb-1.5 block text-[8px] font-semibold text-[#1F2937] sm:text-[9px]">
                        Your Answer
                      </label>

                      <input
                        type="text"
                        value={answers[item.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            item.id,
                            e.target.value
                          )
                        }
                        className="h-8 w-full rounded-md bg-white px-2.5 text-[9px] text-[#111827] outline-none ring-1 ring-inset ring-[#E5E7EB] transition placeholder:text-[#B6BFCC] focus:ring-[#2E6DFF] sm:h-9 sm:px-3 sm:text-[10px]"
                      />

                      {/* Working */}
                      <label className="mb-1.5 mt-3 block text-[8px] font-semibold text-[#1F2937] sm:mt-4 sm:text-[9px]">
                        Show your working
                      </label>

                      <textarea
                        rows={4}
                        value={working[item.id] || ""}
                        onChange={(e) =>
                          handleWorkingChange(
                            item.id,
                            e.target.value
                          )
                        }
                        className="min-h-[82px] w-full resize-none rounded-md bg-white px-2.5 py-2 text-[9px] text-[#111827] outline-none ring-1 ring-inset ring-[#E5E7EB] transition placeholder:text-[#B6BFCC] focus:ring-[#2E6DFF] sm:min-h-[95px] sm:px-3 sm:text-[10px]"
                      />

                    </div>
                  </div>
                ))}

              </div>
            </section>

            {/* Submission */}
            <section className="rounded-lg bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">

              <div className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">

                <h2 className="text-[10px] font-bold text-[#111827] sm:text-xs">
                  Your Submission
                </h2>

                <div className="mt-3">

                  <label className="mb-1.5 block text-[8px] font-semibold text-[#1F2937] sm:text-[9px]">
                    Add a note (optional)
                  </label>

                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Write a message to your tutor..."
                    className="w-full resize-none rounded-md bg-white px-2.5 py-2 text-[9px] text-[#111827] outline-none ring-1 ring-inset ring-[#E5E7EB] transition placeholder:text-[#B6BFCC] focus:ring-[#2E6DFF] sm:px-3 sm:text-[10px]"
                  />

                </div>

                {/* Submit */}
                <form onSubmit={handleSubmit}>

                  <button
                    type="submit"
                    className="mt-3 inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-[#2E6DFF] px-3 text-[8px] font-semibold text-white shadow-sm transition hover:bg-[#245DDB] active:scale-[0.98] sm:h-9 sm:px-4 sm:text-[9px]"
                  >
                    <Send className="h-3 w-3" />
                    Submit Assignment
                  </button>

                </form>

              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}