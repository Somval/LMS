
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  Calendar,
  Clock,
  User,
  Calculator,
  ChevronDown,
  X,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Pencil,
} from "lucide-react";

import SetClassModal from "./SetClass";
import EditCourseModal from "./EditCourseModal";

const TUTORS = [
  "David Smith",
  "Sarah Johnson",
  "Emily Davis",
  "Michael Brown",
];

const initialClassesData = {
  summary: {
    selectedCourses: ["Mathematics", "English", "Science"],
    preferredTime: {
      days: "Mon, Tue, Wed, Sat (Days)",
      morning: "8:00 AM - 12:00 PM (Morning)",
      afternoon: "12:00 PM - 5:00 PM (Afternoon)",
    },
    assignedTutors: [],
  },
  courses: [
    {
      id: 1,
      title: "Mathematics",
      level: "Year 4",
      assignedTutor: "David Smith",
      email: "david.smith@email.com",
      availableTutors: TUTORS,
      scheduleDays: "Monday, Tuesday",
      scheduleTime: "10:00 AM – 11:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      title: "English",
      level: "Year 4",
      assignedTutor: "David Smith",
      email: "david.smith@email.com",
      availableTutors: TUTORS,
      scheduleDays: "Not Scheduled",
      scheduleTime: "Not Scheduled",
      status: "Not Scheduled",
    },
    {
      id: 3,
      title: "Science",
      level: "Year 4",
      assignedTutor: "David Smith",
      email: "david.smith@email.com",
      availableTutors: TUTORS,
      scheduleDays: "Monday, Tuesday",
      scheduleTime: "10:00 AM – 11:00 AM",
      status: "Scheduled",
    },
  ],
};

const EMPTY_COURSE_FORM = {
  title: "",
  level: "Year 4",
  assignedTutor: TUTORS[0],
  scheduleDays: "",
  scheduleTime: "",
  status: "Not Scheduled",
};

export default function ClassesTutors() {
  const [data, setData] = useState(initialClassesData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCourseForSchedule, setSelectedCourseForSchedule] =
    useState(null);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);
  const [courseForm, setCourseForm] = useState(EMPTY_COURSE_FORM);

  const courses = data.courses;

  const summary = useMemo(() => {
    const assignedTutors = courses.map((course) => ({
      subject: course.title,
      tutor: course.assignedTutor || "Not assigned",
    }));

    return {
      ...data.summary,
      selectedCourses: courses.map((course) => course.title),
      assignedTutors,
    };
  }, [data]);

  const updateCourse = (updatedCourse) => {
    setData((previous) => ({
      ...previous,
      courses: previous.courses.map((course) =>
        course.id === updatedCourse.id
          ? {
              ...course,
              ...updatedCourse,
              availableTutors: updatedCourse.availableTutors || TUTORS,
            }
          : course
      ),
    }));
  };

  const handleTutorChange = (courseId, newTutor) => {
    setData((previous) => ({
      ...previous,
      courses: previous.courses.map((course) =>
        course.id === courseId
          ? { ...course, assignedTutor: newTutor }
          : course
      ),
    }));
  };

  const openSetClassModal = (course) => {
    setSelectedCourseForEdit(null);
    setSelectedCourseForSchedule(course);
  };

  const handleScheduleSave = (updatedCourse) => {
    if (!updatedCourse) return;

    updateCourse(updatedCourse);
    setSelectedCourseForSchedule(null);
  };

  const openEditModal = (course) => {
    setSelectedCourseForSchedule(null);
    setSelectedCourseForEdit(course);
  };

  const handleEditSave = (updatedCourse) => {
    if (!updatedCourse) return;

    updateCourse(updatedCourse);
    setSelectedCourseForEdit(null);
  };

  const openAddModal = () => {
    setCourseForm({ ...EMPTY_COURSE_FORM });
    setIsAddModalOpen(true);
  };

  const handleAddFieldChange = (event) => {
    const { name, value } = event.target;

    setCourseForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddCourse = (event) => {
    event.preventDefault();

    const title = courseForm.title.trim();
    if (!title) return;

    const scheduleDays = courseForm.scheduleDays.trim();
    const scheduleTime = courseForm.scheduleTime.trim();

    const isScheduled = Boolean(scheduleDays && scheduleTime);

    const newCourse = {
      id: Date.now(),
      ...courseForm,
      title,
      level: courseForm.level.trim(),
      email: "tutor@email.com",
      availableTutors: TUTORS,
      scheduleDays: scheduleDays || "Not Scheduled",
      scheduleTime: scheduleTime || "Not Scheduled",
      status: isScheduled ? courseForm.status : "Not Scheduled",
    };

    setData((previous) => ({
      ...previous,
      courses: [...previous.courses, newCourse],
    }));

    setIsAddModalOpen(false);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const getCourseIcon = (title = "") => {
    const value = title.toLowerCase();

    if (value.includes("math")) {
      return <Calculator className="h-5 w-5" />;
    }

    if (
      value.includes("english") ||
      value.includes("literature") ||
      value.includes("language")
    ) {
      return <BookOpen className="h-5 w-5" />;
    }

    if (
      value.includes("science") ||
      value.includes("chemistry") ||
      value.includes("biology") ||
      value.includes("physics")
    ) {
      return <FlaskConical className="h-5 w-5" />;
    }

    return <GraduationCap className="h-5 w-5" />;
  };

  const fieldClass =
    "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10";

  return (
    <div className="box-border min-h-full w-full min-w-0 bg-[#f7f9fb] p-3 font-['Inter',sans-serif] antialiased sm:p-5 lg:p-8">
      <section className="w-full min-w-0 overflow-hidden rounded-xl border border-[#E7E9EF] bg-white shadow-[0_2px_12px_rgba(16,24,40,0.04)]">
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-slate-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-[#202124] sm:text-2xl">
              Classes &amp; Tutors
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Manage courses, assign tutors, and organize each student's class
              schedule.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#084518] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#063512] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:w-auto"
          >
            <Plus size={18} />
            Add Course
          </button>
        </header>

        {/* Summary */}
        <div className="m-4 grid grid-cols-1 gap-0 divide-y divide-emerald-100 rounded-xl border border-[#d2ead7] bg-[#f1f9f2] p-4 sm:m-6 sm:p-5 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-start gap-3.5 pb-4 md:pr-5 md:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9efdd] text-[#087333]">
              <Calendar size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-[#006b35]">
                Selected Courses
              </h2>

              <p className="mt-1 break-words text-xs leading-5 text-slate-600">
                {summary.selectedCourses.join(", ") || "No courses added"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 py-4 md:px-5 md:py-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9efdd] text-[#087333]">
              <Clock size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-[#006b35]">
                Preferred Time
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                {summary.preferredTime.days}
                <br />
                {summary.preferredTime.morning}
                <br />
                {summary.preferredTime.afternoon}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 pt-4 md:pl-5 md:pt-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d9efdd] text-[#087333]">
              <User size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-[#006b35]">
                Assigned Tutors
              </h2>

              <div className="mt-2 space-y-1.5">
                {summary.assignedTutors.map((item, index) => (
                  <p
                    key={`${item.subject}-${index}`}
                    className="break-words text-xs leading-5 text-slate-600"
                  >
                    <span className="font-semibold text-slate-700">
                      {item.subject}:
                    </span>{" "}
                    {item.tutor}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course list */}
        <div className="space-y-3 px-4 pb-5 sm:space-y-4 sm:px-6 sm:pb-6">
          {courses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-5 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <GraduationCap size={24} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                No courses yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Add a course to start assigning tutors and setting schedules.
              </p>
            </div>
          ) : (
            courses.map((course) => {
              const isScheduled = course.status === "Scheduled";

              return (
                <article
                  key={course.id}
                  className="grid min-w-0 grid-cols-1 gap-4 rounded-xl border border-[#E3E7EE] bg-white p-4 transition hover:border-slate-300 sm:p-5 lg:grid-cols-[minmax(170px,1.1fr)_minmax(180px,1fr)_minmax(200px,1.1fr)_auto] lg:items-center lg:gap-5"
                >
                  {/* Course information */}
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#34368C] text-white">
                      {getCourseIcon(course.title)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words text-sm font-bold text-[#20242B] sm:text-base">
                        {course.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {course.level}
                      </p>
                    </div>
                  </div>

                  {/* Tutor assignment */}
                  <div className="min-w-0">
                    <label
                      htmlFor={`tutor-${course.id}`}
                      className="mb-2 block text-xs font-medium text-slate-500"
                    >
                      Assign Tutor
                    </label>

                    <div className="relative">
                      <select
                        id={`tutor-${course.id}`}
                        value={course.assignedTutor || ""}
                        onChange={(event) =>
                          handleTutorChange(course.id, event.target.value)
                        }
                        className={`${fieldClass} appearance-none pr-9 text-xs font-medium`}
                      >
                        {(course.availableTutors || TUTORS).map((tutor) => (
                          <option key={tutor} value={tutor}>
                            {tutor}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="min-w-0">
                    <p className="mb-2 text-xs font-medium text-slate-500">
                      Class Schedule
                    </p>

                    <div className="space-y-1.5 text-xs leading-5">
                      <p className="break-words text-slate-600">
                        <span className="text-slate-400">Days: </span>
                        <span className="font-medium text-slate-700">
                          {course.scheduleDays || "Not Scheduled"}
                        </span>
                      </p>

                      <p className="break-words text-slate-600">
                        <span className="text-slate-400">Time: </span>
                        <span className="font-medium text-slate-700">
                          {course.scheduleTime || "Not Scheduled"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Status and actions */}
                  <div className="flex min-w-0 flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end lg:border-0 lg:pt-0">
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        isScheduled
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isScheduled ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />

                      {course.status || "Not Scheduled"}
                    </span>

                    <div className="block w-full gap-2 sm:w-auto lg:w-full">
                      <button
                        type="button"
                        onClick={() => openSetClassModal(course)}
                        className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-800 sm:flex-none lg:w-full"
                      >
                        Set Class
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(course)}
                        aria-label={`Edit ${course.title}`}
                        title="Edit course"
                        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        <Pencil size={14} />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-100 px-4 py-4 sm:px-6">
          <p className="text-xs text-slate-500">
            Showing {courses.length}{" "}
            {courses.length === 1 ? "course" : "courses"}
          </p>
        </footer>
      </section>

      {/* Set Class modal: rendered outside parent layout */}
      {selectedCourseForSchedule &&
        createPortal(
          <SetClassModal
            course={selectedCourseForSchedule}
            onClose={() => setSelectedCourseForSchedule(null)}
            onSave={handleScheduleSave}
          />,
          document.body
        )}

      {/* Edit Course modal: rendered outside parent layout */}
      {selectedCourseForEdit &&
        createPortal(
          <EditCourseModal
            course={selectedCourseForEdit}
            onClose={() => setSelectedCourseForEdit(null)}
            onSave={handleEditSave}
          />,
          document.body
        )}

      {/* Add Course modal */}
      {isAddModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeAddModal();
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-course-title"
              className="flex max-h-[calc(100dvh-24px)] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[calc(100dvh-40px)]"
            >
              <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
                <div>
                  <h2
                    id="add-course-title"
                    className="text-xl font-bold tracking-tight text-slate-900"
                  >
                    Add New Course
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter the subject and tutor details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeAddModal}
                  aria-label="Close modal"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </header>

              <form
                onSubmit={handleAddCourse}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-6 sm:px-7">
                  <div>
                    <label
                      htmlFor="add-title"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Subject title
                    </label>

                    <input
                      id="add-title"
                      name="title"
                      value={courseForm.title}
                      onChange={handleAddFieldChange}
                      className={`mt-2 ${fieldClass}`}
                      placeholder="e.g. Mathematics"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="add-level"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Year / Level
                    </label>

                    <input
                      id="add-level"
                      name="level"
                      value={courseForm.level}
                      onChange={handleAddFieldChange}
                      className={`mt-2 ${fieldClass}`}
                      placeholder="e.g. Year 4"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="add-tutor"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Assign Tutor
                    </label>

                    <select
                      id="add-tutor"
                      name="assignedTutor"
                      value={courseForm.assignedTutor}
                      onChange={handleAddFieldChange}
                      className={`mt-2 ${fieldClass}`}
                    >
                      {TUTORS.map((tutor) => (
                        <option key={tutor} value={tutor}>
                          {tutor}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="add-days"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Schedule days
                    </label>

                    <input
                      id="add-days"
                      name="scheduleDays"
                      value={courseForm.scheduleDays}
                      onChange={handleAddFieldChange}
                      className={`mt-2 ${fieldClass}`}
                      placeholder="e.g. Monday, Wednesday"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="add-time"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Schedule time
                    </label>

                    <input
                      id="add-time"
                      name="scheduleTime"
                      value={courseForm.scheduleTime}
                      onChange={handleAddFieldChange}
                      className={`mt-2 ${fieldClass}`}
                      placeholder="e.g. 10:00 AM – 11:00 AM"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="add-status"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Status
                    </label>

                    <select
                      id="add-status"
                      name="status"
                      value={courseForm.status}
                      onChange={handleAddFieldChange}
                      className={`mt-2 ${fieldClass}`}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Not Scheduled">Not Scheduled</option>
                    </select>
                  </div>
                </div>

                <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                  <button
                    type="button"
                    onClick={closeAddModal}
                    className="min-h-11 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#084518] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#063512]"
                  >
                    <Plus size={16} />
                    Create Course
                  </button>
                </footer>
              </form>
            </section>
          </div>,
          document.body
        )}
    </div>
  );
}
