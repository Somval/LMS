
import React, { useMemo, useState } from "react";
import {
  Plus,
  MoreVertical,
  BookOpen,
  UserRound,
  Clock3,
} from "lucide-react";
import AssignTutorModal from "./AssignTutorModal";
import { api } from "../../lib/api";

const buttonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-[#D9DDE5] bg-white px-3 py-2 text-sm font-medium text-[#465164] transition-colors hover:border-[#159A42] hover:text-[#159A42] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2";

function CourseIcon() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#34368C] text-white">
      <BookOpen size={20} strokeWidth={1.8} />
    </div>
  );
}

function TutorInfo({ course }) {
  if (!course.assigned) {
    return (
      <span className="text-sm font-medium text-[#D92D20]">
        Not assigned yet
      </span>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E8EBF0] text-[#687386]">
        <UserRound size={20} strokeWidth={1.6} />
      </div>

      <div className="min-w-0">
        <p className="break-words text-sm font-semibold leading-5 text-[#272A30]">
          {course.tutor}
        </p>
        <p className="break-all text-xs leading-5 text-[#737D8D]">
          {course.email}
        </p>
      </div>
    </div>
  );
}

function CourseStatus({ status }) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#DDF7E7] px-3 py-1.5 text-xs font-semibold text-[#15803D]">
      <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
      {status}
    </span>
  );
}

function CourseActions({ course, onTutorAction }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <button
        type="button"
        onClick={() => onTutorAction(course)}
        className={`${buttonClass} min-w-0 flex-1 whitespace-nowrap text-xs sm:text-sm`}
      >
        {course.assigned ? "Change Tutor" : "Assign Tutor"}
      </button>

      <button
        type="button"
        aria-label={`More options for ${course.course}, ${course.level}`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-[#737D8D] transition-colors hover:bg-[#F0F4FA] hover:text-[#20242B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
      >
        <MoreVertical size={20} />
      </button>
    </div>
  );
}

export default function CoursesTutors({ student = null, onChanged = async () => {} }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = useMemo(
    () =>
      (student?.courses ?? []).map((c) => ({
        id: c.subjectId,
        subjectId: c.subjectId,
        course: c.course,
        level: c.level || "—",
        studentName: student.name,
        tutorId: c.tutor?.id ?? null,
        tutor: c.tutor?.name ?? null,
        email: c.tutor?.email ?? null,
        // The tutor's available days/hours, not a booked slot.
        schedule: c.tutor && c.tutor.days !== "Not set" ? c.tutor.days : null,
        time: c.tutor && c.tutor.time !== "Not set" ? c.tutor.time : null,
        status: "Active",
        assigned: Boolean(c.tutor),
      })),
    [student]
  );

  const handleTutorAction = (course) => {
    setSelectedCourse(course);
  };

  // Throws on failure so the modal can show the error and stay open.
  const handleAssignTutor = async (course, tutor) => {
    await api.put(`/admin/students/${student.id}/subjects/${course.subjectId}/tutor`, { tutorId: tutor.id });
    await onChanged();
    setSelectedCourse(null);
  };

  const closeTutorModal = () => {
    setSelectedCourse(null);
  };

  return (
    <>
      <section className="box-border w-full min-w-0 overflow-hidden rounded-lg border border-[#E7E9EF] bg-white font-['Inter',sans-serif] shadow-[0_2px_12px_rgba(16,24,40,0.05)]">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-[#EDF0F3] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold leading-7 text-[#202124] sm:text-xl">
              Courses &amp; Tutors
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#667085]">
              View the student's enrolled courses and assign tutors where
              needed.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#004B0B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#063B0D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2 sm:w-auto"
          >
            <Plus size={19} strokeWidth={2} />
            Add Course
          </button>
        </div>

        {/* Mobile course cards */}
        <div className="space-y-4 p-4 md:hidden">
          {courses.map((course) => (
            <article
              key={course.id}
              className="min-w-0 rounded-lg border border-[#E3E7EE] bg-white p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <CourseIcon />

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-base font-semibold leading-6 text-[#20242B]">
                    {course.course}
                  </h3>
                  <p className="mt-0.5 text-sm text-[#667085]">
                    {course.level}
                  </p>
                </div>

                <CourseStatus status={course.status} />
              </div>

              <div className="mt-5 border-t border-[#EDF0F3] pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#737D8D]">
                  Assigned Tutor
                </p>
                <TutorInfo course={course} />
              </div>

              <div className="mt-4 border-t border-[#EDF0F3] pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#737D8D]">
                  Schedule
                </p>

                {course.schedule ? (
                  <div className="flex items-start gap-2 text-sm leading-6 text-[#454B55]">
                    <Clock3
                      size={17}
                      className="mt-1 shrink-0 text-[#737D8D]"
                    />
                    <div>
                      <p className="font-medium">{course.schedule}</p>
                      <p className="text-[#667085]">{course.time}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#98A2B3]">Not scheduled</p>
                )}
              </div>

              <div className="mt-5 border-t border-[#EDF0F3] pt-4">
                <CourseActions
                  course={course}
                  onTutorAction={handleTutorAction}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Desktop and tablet table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] table-auto border-collapse text-left">
            <thead>
              <tr className="bg-[#F0F4FA]">
                {[
                  "Course",
                  "Level",
                  "Assigned Tutor",
                  "Schedule",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-4 text-xs font-semibold text-[#42526A] lg:text-sm"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-[#EDF0F3] last:border-b-0 hover:bg-[#FAFBFD]"
                >
                  <td className="px-4 py-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <CourseIcon />
                      <span className="text-sm font-semibold text-[#24262B]">
                        {course.course}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-5 text-sm text-[#454B55]">
                    {course.level}
                  </td>

                  <td className="px-4 py-5">
                    <TutorInfo course={course} />
                  </td>

                  <td className="px-4 py-5">
                    {course.schedule ? (
                      <div className="flex items-start gap-2 text-sm leading-5 text-[#454B55]">
                        <Clock3
                          size={16}
                          className="mt-0.5 shrink-0 text-[#737D8D]"
                        />
                        <div>
                          <p className="font-medium">{course.schedule}</p>
                          <p className="mt-1 text-xs text-[#667085]">
                            {course.time}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-[#98A2B3]">—</span>
                    )}
                  </td>

                  <td className="px-4 py-5">
                    <CourseStatus status={course.status} />
                  </td>

                  <td className="px-4 py-5">
                    <CourseActions
                      course={course}
                      onTutorAction={handleTutorAction}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {courses.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-[#667085]">
            This student isn't enrolled in any courses yet.
          </p>
        )}

        {/* Footer */}
        <div className="border-t border-[#EDF0F3] px-4 py-4 sm:px-6">
          <p className="text-sm text-[#667085]">
            {courses.length} courses listed
          </p>
        </div>
      </section>

      {/* Assign tutor modal */}
      <AssignTutorModal
        isOpen={Boolean(selectedCourse)}
        course={selectedCourse}
        onClose={closeTutorModal}
        onAssign={handleAssignTutor}
      />
    </>
  );
}
