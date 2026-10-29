
import React from "react";
import {
  UserRound,
  Clock3,
  Video,
  Play,
  CircleCheck,
} from "lucide-react";
import StudentClassHeader from "../../../components/Tutor/studentclassheader";

const lessonDetails = {
  title: "Lesson Taught",
  week: "Week 1: Algebra and Expressions",
  subtopic: "Lesson 1: Introduction to Algebra",
};

const learningObjectives = [
  "Understand what algebra equations are",
  "Understand what algebra equations are",
  "Understand what algebra equations are",
];

export default function ClassDetailsSummary({
  attendance = "Present",
  joinedAt = "4:58 PM",
  duration = "58 minutes",
  recordingUrl = "",
}) {
  const handleWatchRecording = () => {
    if (recordingUrl) {
      window.open(recordingUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>      <StudentClassHeader/>
    <main className="min-h-screen w-full bg-white p-3 font-sans text-[#171923] sm:p-5">
        
      <div className="w-full space-y-4">
        {/* Class Details */}
        <section className="w-full space-y-1.5">
          <h1 className="text-sm font-bold tracking-tight text-[#111827]">
            Class Details
          </h1>

          <h2 className="text-xs font-semibold text-[#111827]">
            {lessonDetails.title}
          </h2>

          <div className="w-full rounded-md bg-[#F0F1F4] px-3 py-2.5">
            <div className="grid grid-cols-[48px_minmax(0,1fr)] items-start gap-x-2 gap-y-2 text-[11px] sm:grid-cols-[65px_minmax(0,1fr)]">
              <span className="text-[#737987]">Week</span>

              <span className="break-words font-semibold text-[#252936]">
                {lessonDetails.week}
              </span>

              <span className="text-[#737987]">Subtopic</span>

              <span className="break-words font-semibold text-[#252936]">
                {lessonDetails.subtopic}
              </span>
            </div>
          </div>
        </section>

        {/* Learning Objectives */}
        <section className="w-full space-y-2">
          <h2 className="text-xs font-bold text-[#111827]">
            What the Student Learned
          </h2>

          <ul className="space-y-1.5">
            {learningObjectives.map((objective, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-[11px] leading-4 text-[#292D38]"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#383B91]" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Session Summary */}
        <section className="w-full rounded-lg bg-[#F1F5FF] p-3 sm:p-4">
          <h2 className="mb-3 text-xs font-bold text-[#111827]">
            Session Summary
          </h2>

          {/* Session Statistics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {/* Attendance */}
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D8E4FF] text-[#4678FF]">
                <UserRound size={16} strokeWidth={1.7} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] text-[#7A849A]">
                  Attendance
                </p>
                <p className="text-[11px] font-medium text-[#16834A]">
                  {attendance}
                </p>
              </div>
            </div>

            {/* Joined At */}
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D8E4FF] text-[#4678FF]">
                <Clock3 size={16} strokeWidth={1.7} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] text-[#7A849A]">
                  Joined At
                </p>
                <p className="text-[11px] font-semibold text-[#252936]">
                  {joinedAt}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D8E4FF] text-[#4678FF]">
                <Clock3 size={16} strokeWidth={1.7} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] text-[#7A849A]">
                  Duration
                </p>
                <p className="text-[11px] font-semibold text-[#252936]">
                  {duration}
                </p>
              </div>
            </div>
          </div>

          {/* Class Recording */}
          <div className="mt-3 flex items-center gap-2.5 rounded-md bg-[#E4ECFF] p-2.5 sm:p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#3975FF] text-white">
              <Video size={19} strokeWidth={1.8} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-bold text-[#252936]">
                Class Recording
              </h3>
              <p className="mt-0.5 text-[9px] leading-4 text-[#7A849A] sm:text-[10px]">
                Watch the recording to review the session.
              </p>
            </div>

            <button
              type="button"
              onClick={handleWatchRecording}
              disabled={!recordingUrl}
              title={
                recordingUrl
                  ? "Watch class recording"
                  : "Recording is not available yet"
              }
              className="inline-flex shrink-0 items-center gap-1 rounded border border-[#A9C2FF] bg-white px-2 py-1.5 text-[9px] font-medium text-[#3975FF] transition hover:bg-[#F5F8FF] disabled:cursor-not-allowed disabled:opacity-60 sm:px-2.5"
            >
              <Play size={10} />
              <span>Watch Recording</span>
            </button>
          </div>
        </section>
      </div>
    
    </main>
    </>

  );
}
