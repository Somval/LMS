import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { BookOpen, FileText, ChevronDown } from "lucide-react";

export default function CourseOverview() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    Promise.all([api.get("/tutors/me"), api.get("/coursework")])
      .then(([me, work]) => {
        const list = me.subjects.map(({ subject }) => ({
          id: subject.id,
          name: subject.name,
          assignments: work.filter((w) => w.subjectId === subject.id && w.type === "ASSIGNMENT").length,
          quizzes: work.filter((w) => w.subjectId === subject.id && w.type === "QUIZ").length,
        }));
        setCourses(list);
        setSelectedCourseId(list[0]?.id ?? null);
      })
      .catch(() => {});
  }, []);

  const selectedCourse =
    courses.find((course) => course.id === selectedCourseId) ?? { name: "", assignments: 0, quizzes: 0 };

  return (
    <section className="w-full bg-[#F4F6FC] p-3 sm:p-5">
      <div className="mx-auto flex w-full flex-col gap-5 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        {/* Course selector */}
        <div className="min-w-0 flex-1">
          <label
            htmlFor="course"
            className="mb-2 block text-xs font-semibold text-[#171717] sm:text-sm"
          >
            Select Course
          </label>

          <div className="relative">
            <select
              id="course"
              value={selectedCourseId}
              onChange={(event) => setSelectedCourseId(Number(event.target.value))}
              className="h-11 w-full appearance-none rounded-xl border border-[#E1E1E1] bg-white py-0 pl-3.5 pr-10 text-xs font-semibold text-[#171717] outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-sm"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              size={18}
              strokeWidth={1.8}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#171717]"
            />
          </div>
        </div>

        {/* Course statistics */}
        <div className="flex w-full shrink-0 flex-col gap-3 rounded-xl bg-[#DCE3FA] p-3.5 sm:h-[76px] sm:w-[380px] sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-0">
          {/* Assignments */}
          <div className="flex min-w-0 flex-1 items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C7D5FF]">
              <BookOpen
                aria-hidden="true"
                size={20}
                strokeWidth={1.8}
                className="text-[#2563EB]"
              />
            </div>
            <div className="min-w-0">
              <p className="whitespace-nowrap text-[11px] font-medium text-[#5B6474] sm:text-xs">
                Total Assignments
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#171717] sm:text-base">
                {selectedCourse.assignments}
              </p>
            </div>
          </div>

          {/* Divider: Hidden on mobile stack, visible on desktop row */}
          <div
            aria-hidden="true"
            className="hidden h-10 w-px shrink-0 bg-[#C9D3F0] sm:block sm:mx-2"
          />

          {/* Quizzes */}
          <div className="flex min-w-0 flex-1 items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C7D5FF]">
              <FileText
                aria-hidden="true"
                size={20}
                strokeWidth={1.8}
                className="text-[#2563EB]"
              />
            </div>
            <div className="min-w-0">
              <p className="whitespace-nowrap text-[11px] font-medium text-[#5B6474] sm:text-xs">
                Total Quizzes
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#171717] sm:text-base">
                {selectedCourse.quizzes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}