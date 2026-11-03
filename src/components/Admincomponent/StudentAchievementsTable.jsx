
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const subjectNames = ["Mathematics", "English", "Science"];

const badgesData = [
  { id: 1, name: "Quick Learner", description: "Completed learning activities ahead of schedule.", icon: "zap", date: "2026-10-05", color: "yellow" },
  { id: 2, name: "Perfect Attendance", description: "Maintained excellent class attendance.", icon: "calendar", date: "2026-10-08", color: "blue" },
  { id: 3, name: "Problem Solver", description: "Successfully solved challenging questions.", icon: "brain", date: "2026-10-12", color: "purple" },
  { id: 4, name: "Star Student", description: "Demonstrated outstanding academic performance.", icon: "star", date: "2026-10-15", color: "orange" },
  { id: 5, name: "Reading Champion", description: "Demonstrated excellent reading progress.", icon: "book", date: "2026-10-16", color: "blue" },
  { id: 6, name: "Creative Thinker", description: "Showed creativity when solving learning tasks.", icon: "lightbulb", date: "2026-10-18", color: "yellow" },
  { id: 7, name: "Team Player", description: "Worked effectively with other learners.", icon: "users", date: "2026-10-20", color: "purple" },
  { id: 8, name: "Fast Finisher", description: "Completed assigned activities on time.", icon: "clock", date: "2026-10-22", color: "orange" },
  { id: 9, name: "Knowledge Seeker", description: "Showed enthusiasm for learning new topics.", icon: "graduation", date: "2026-10-25", color: "blue" },
  { id: 10, name: "Excellent Effort", description: "Consistently demonstrated dedication to learning.", icon: "medal", date: "2026-10-28", color: "yellow" },
];

const achievementsData = [
  { id: 1, name: "Mathematics Excellence", description: "Achieved excellent results in Mathematics.", date: "2026-10-06", status: "Completed", points: 100 },
  { id: 2, name: "Learning Champion", description: "Completed all assigned learning activities.", date: "2026-10-10", status: "Completed", points: 150 },
  { id: 3, name: "Consistent Performer", description: "Maintained consistent academic progress.", date: "2026-10-12", status: "Completed", points: 200 },
  { id: 4, name: "Perfect Attendance", description: "Achieved the required attendance milestone.", date: "2026-10-14", status: "Completed", points: 100 },
  { id: 5, name: "Reading Excellence", description: "Completed the assigned reading milestones.", date: "2026-10-16", status: "Completed", points: 150 },
  { id: 6, name: "Science Explorer", description: "Successfully completed science activities.", date: "2026-10-18", status: "Completed", points: 100 },
  { id: 7, name: "Creative Mind", description: "Demonstrated creativity in classroom activities.", date: "2026-10-20", status: "Completed", points: 150 },
  { id: 8, name: "Academic Star", description: "Reached an outstanding academic milestone.", date: "2026-10-22", status: "Completed", points: 200 },
  { id: 9, name: "Independent Learner", description: "Completed independent learning tasks.", date: "2026-10-25", status: "Completed", points: 100 },
  { id: 10, name: "Outstanding Progress", description: "Made excellent progress across learning activities.", date: "2026-10-28", status: "Completed", points: 200 },
];

const rewardsData = [
  { id: 1, name: "Gold Star Reward", description: "Awarded for outstanding classroom performance.", date: "2026-10-07", points: 100, status: "Claimed" },
  { id: 2, name: "Learning Champion Reward", description: "Reward for completing learning milestones.", date: "2026-10-10", points: 150, status: "Claimed" },
  { id: 3, name: "Excellence Award", description: "Recognition for excellent academic performance.", date: "2026-10-12", points: 200, status: "Claimed" },
  { id: 4, name: "Perfect Attendance Reward", description: "Awarded for maintaining excellent attendance.", date: "2026-10-14", points: 100, status: "Claimed" },
  { id: 5, name: "Reading Star Reward", description: "Recognition for reading achievements.", date: "2026-10-16", points: 150, status: "Claimed" },
  { id: 6, name: "Science Explorer Reward", description: "Awarded for completing science milestones.", date: "2026-10-18", points: 100, status: "Claimed" },
  { id: 7, name: "Creative Thinker Reward", description: "Recognition for creative learning.", date: "2026-10-20", points: 150, status: "Claimed" },
  { id: 8, name: "Academic Star Reward", description: "Awarded for excellent academic performance.", date: "2026-10-22", points: 200, status: "Claimed" },
  { id: 9, name: "Independent Learner Reward", description: "Recognition for independent learning.", date: "2026-10-25", points: 100, status: "Claimed" },
  { id: 10, name: "Outstanding Progress Reward", description: "Reward for outstanding learning progress.", date: "2026-10-28", points: 200, status: "Available" },
];

// All student records are maintained in this file.
// Each student has their own copies of the badge, achievement and reward records.
export const students = Array.from({ length: 127 }, (_, index) => {
  const id = index + 1;

  const badges = badgesData.map((item) => ({ ...item }));
  const achievements = achievementsData.map((item) => ({ ...item }));
  const rewards = rewardsData.map((item) => ({ ...item }));

  return {
    id,
    name: "John Doe",
    studentId: `STU${String(id).padStart(4, "0")}`,
    subject: subjectNames[index % subjectNames.length],
    badgesEarned: badges.length,
    achievementsEarned: achievements.length,
    rewardsEarned: rewards.length,
    badges,
    achievements,
    rewards,
  };
});

const subjects = [
  { label: "All Subjects", value: "All Subjects" },
  { label: "Mathematics", value: "Mathematics" },
  { label: "English", value: "English" },
  { label: "Science", value: "Science" },
];

const rowsPerPage = 8;

export default function Achievement({ onViewStudent }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [startDate, setStartDate] = useState("2026-10-01");
  const [endDate, setEndDate] = useState("2026-10-31");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStudents = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm) ||
        student.studentId.toLowerCase().includes(searchTerm);

      const matchesSubject =
        selectedSubject === "All Subjects" ||
        student.subject === selectedSubject;

      const allDates = [
        ...student.badges.map((item) => item.date),
        ...student.achievements.map((item) => item.date),
        ...student.rewards.map((item) => item.date),
      ];

      const matchesDate =
        (!startDate && !endDate) ||
        allDates.some((date) => {
          const afterStart = !startDate || date >= startDate;
          const beforeEnd = !endDate || date <= endDate;
          return afterStart && beforeEnd;
        });

      return matchesSearch && matchesSubject && matchesDate;
    });
  }, [search, selectedSubject, startDate, endDate]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / rowsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const visibleStudents = filteredStudents.slice(
    (safePage - 1) * rowsPerPage,
    safePage * rowsPerPage
  );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setCurrentPage(1);
  };

  const handleViewStudent = (student) => {
    onViewStudent?.(student);
    navigate(`/admin/achievements/${student.id}`);
  };

  const startCount =
    filteredStudents.length === 0
      ? 0
      : (safePage - 1) * rowsPerPage + 1;

  const endCount = Math.min(
    safePage * rowsPerPage,
    filteredStudents.length
  );

  const paginationItems = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )
    .filter(
      (page) =>
        page === 1 ||
        page === totalPages ||
        Math.abs(page - safePage) <= 1
    )
    .reduce((result, page, index, pages) => {
      if (index > 0 && page - pages[index - 1] > 1) {
        result.push(`ellipsis-${page}`);
      }

      result.push(page);
      return result;
    }, []);

  return (
    <section className="w-full min-w-0 bg-[#F4F7FD] p-3 font-sans text-[#252A34] sm:p-4 lg:p-5">
      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(150px,0.65fr)] lg:grid-cols-[minmax(200px,1fr)_minmax(155px,0.6fr)_minmax(250px,0.85fr)] lg:items-center">
        <label className="relative block min-w-0">
          <Search
            size={18}
            strokeWidth={1.7}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3B2]"
          />
          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by student or ID..."
            aria-label="Search by student name or ID"
            className="h-11 w-full rounded-md border border-[#D9DFE9] bg-white pl-10 pr-3 text-sm text-[#343A46] outline-none placeholder:text-[#929BAA] focus:border-[#9CAFEA] focus:ring-2 focus:ring-[#E8EDFF] sm:h-12 sm:text-[15px]"
          />
        </label>

        <div className="relative min-w-0">
          <select
            value={selectedSubject}
            onChange={handleSubjectChange}
            aria-label="Filter by subject"
            className="h-11 w-full cursor-pointer appearance-none rounded-md border border-[#D9DFE9] bg-white px-3.5 pr-10 text-sm text-[#343A46] outline-none transition-colors focus:border-[#9CAFEA] focus:ring-2 focus:ring-[#E8EDFF] sm:h-12 sm:text-[15px]"
          >
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8B94A3]"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2 rounded-md border border-[#D9DFE9] bg-white p-3 sm:col-span-2 sm:flex-row sm:items-center lg:col-span-1">
          <div className="flex items-center gap-2">
            <CalendarDays
              size={18}
              strokeWidth={1.7}
              aria-hidden="true"
              className="shrink-0 text-[#454B57]"
            />
            <span className="text-sm font-medium text-[#454B57] sm:hidden">
              Report period
            </span>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
            <input
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(event) => {
                setStartDate(event.target.value);
                setCurrentPage(1);
              }}
              aria-label="Start date"
              className="h-9 w-full min-w-0 bg-transparent text-xs text-[#343A46] outline-none focus:text-[#171717] sm:text-sm"
            />
            <span className="text-xs text-[#737D8B]">to</span>
            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => {
                setEndDate(event.target.value);
                setCurrentPage(1);
              }}
              aria-label="End date"
              className="h-9 w-full min-w-0 bg-transparent text-xs text-[#343A46] outline-none focus:text-[#171717] sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Desktop and Tablet Table */}
      <div className="hidden w-full overflow-x-auto rounded-md border border-[#E2E7F0] bg-white md:block">
        <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[19%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
            <col className="w-[20%]" />
            <col className="w-[17%]" />
            <col className="w-[14%]" />
          </colgroup>

          <thead>
            <tr className="h-12 bg-[#F0F3FA]">
              {[
                "Student",
                "Subjects",
                "Badges Earned",
                "Achievements Earned",
                "Rewards Earned",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="whitespace-nowrap border-r border-[#E8ECF3] px-3 py-3 text-xs font-semibold text-[#626D7D] last:border-r-0 lg:text-sm"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleStudents.map((student) => (
              <tr
                key={student.id}
                className="h-[58px] border-b border-[#EDF0F5] last:border-b-0 hover:bg-[#FAFBFE]"
              >
                <td className="border-r border-[#EDF0F5] px-3 py-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-[#D9D9D9]" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold leading-snug text-[#272B33]">
                        {student.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#8993A2]">
                        {student.studentId}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="whitespace-nowrap border-r border-[#EDF0F5] px-3 py-3 text-sm text-[#454B57]">
                  {student.subject}
                </td>
                <td className="whitespace-nowrap border-r border-[#EDF0F5] px-3 py-3 text-sm text-[#454B57]">
                  {student.badgesEarned}
                </td>
                <td className="whitespace-nowrap border-r border-[#EDF0F5] px-3 py-3 text-sm text-[#454B57]">
                  {student.achievementsEarned}
                </td>
                <td className="whitespace-nowrap border-r border-[#EDF0F5] px-3 py-3 text-sm text-[#454B57]">
                  {student.rewardsEarned}
                </td>
                <td className="px-3 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleViewStudent(student)}
                    className="inline-flex min-h-8 min-w-[58px] items-center justify-center rounded border border-[#A5A8E8] bg-white px-3 py-1.5 text-xs font-medium text-[#373A82] transition-colors hover:bg-[#F0F1FF] focus:outline-none focus:ring-2 focus:ring-[#D9DCFF]"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {visibleStudents.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#7A8493]">
                  No students found. Try changing your search, subject or date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {visibleStudents.map((student) => (
          <article
            key={student.id}
            className="rounded-lg border border-[#E2E7F0] bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6E8ED]">
                <span className="text-sm font-semibold text-[#667085]">
                  {student.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-[#272B33]">
                  {student.name}
                </h3>
                <p className="mt-0.5 text-sm text-[#8993A2]">
                  {student.studentId}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleViewStudent(student)}
                className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-md border border-[#A5A8E8] bg-white px-4 py-2 text-sm font-medium text-[#373A82] transition-colors hover:bg-[#F0F1FF] focus:outline-none focus:ring-2 focus:ring-[#D9DCFF]"
              >
                View
              </button>
            </div>

            <div className="my-4 border-t border-[#EDF0F5]" />

            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#8993A2]">Subject</p>
                <p className="mt-1 break-words text-sm font-medium text-[#343A46]">
                  {student.subject}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#8993A2]">Badges Earned</p>
                <p className="mt-1 text-base font-semibold text-[#343A46]">
                  {student.badgesEarned}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#8993A2]">Achievements Earned</p>
                <p className="mt-1 text-base font-semibold text-[#343A46]">
                  {student.achievementsEarned}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#8993A2]">Rewards Earned</p>
                <p className="mt-1 text-base font-semibold text-[#343A46]">
                  {student.rewardsEarned}
                </p>
              </div>
            </div>
          </article>
        ))}

        {visibleStudents.length === 0 && (
          <div className="rounded-lg border border-[#E2E7F0] bg-white px-4 py-12 text-center text-sm text-[#7A8493]">
            No students found. Try changing your search, subject or date range.
          </div>
        )}
      </div>

      {/* Results and Pagination */}
      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#454B57] sm:text-sm">
          Showing {startCount}–{endCount} of {filteredStudents.length} students
        </p>

        <nav
          aria-label="Student table pagination"
          className="flex flex-wrap items-center justify-start gap-1 sm:justify-end"
        >
          <button
            type="button"
            aria-label="Previous page"
            disabled={safePage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E1E6EF] bg-white text-[#7B8492] transition-colors hover:bg-[#F0F3FA] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={17} />
          </button>

          {paginationItems.map((page) =>
            typeof page === "string" ? (
              <span
                key={page}
                className="flex h-9 min-w-7 items-center justify-center text-sm text-[#697386]"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                aria-label={`Go to page ${page}`}
                aria-current={safePage === page ? "page" : undefined}
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm transition-colors ${
                  safePage === page
                    ? "border-[#B6C8FF] bg-[#DDE6FF] font-semibold text-[#315FEA]"
                    : "border-transparent bg-transparent text-[#566174] hover:border-[#E1E6EF] hover:bg-white"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            aria-label="Next page"
            disabled={safePage === totalPages}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E1E6EF] bg-white text-[#7B8492] transition-colors hover:bg-[#F0F3FA] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={17} />
          </button>
        </nav>
      </div>
    </section>
  );
}
