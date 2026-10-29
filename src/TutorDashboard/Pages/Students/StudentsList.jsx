import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const studentsData = [
  {
    id: 1,
    name: "Olivia Johnson",
    subject: "Mathematics",
    year: "Year 1",
    performance: "82%",
    attendance: "92%",
    status: "Active",
    pending: "2 Assignment, 1 Quiz",
    lastClass: "May 26, 2025",
    time: "5:00 PM",
    type: "New Students",
  },
  {
    id: 2,
    name: "James Anderson",
    subject: "Mathematics",
    year: "Year 1",
    performance: "88%",
    attendance: "95%",
    status: "Active",
    pending: "1 Assignment",
    lastClass: "May 26, 2025",
    time: "4:00 PM",
    type: "New Students",
  },
  {
    id: 3,
    name: "Sophia Williams",
    subject: "English",
    year: "Year 2",
    performance: "91%",
    attendance: "94%",
    status: "Active",
    pending: "1 Quiz",
    lastClass: "May 25, 2025",
    time: "3:00 PM",
    type: "Active Students",
  },
  {
    id: 4,
    name: "Noah Brown",
    subject: "Science",
    year: "Year 2",
    performance: "76%",
    attendance: "89%",
    status: "Active",
    pending: "3 Assignments",
    lastClass: "May 25, 2025",
    time: "5:00 PM",
    type: "New Students",
  },
  {
    id: 5,
    name: "Emma Davis",
    subject: "Mathematics",
    year: "Year 3",
    performance: "85%",
    attendance: "96%",
    status: "Active",
    pending: "1 Assignment, 1 Quiz",
    lastClass: "May 24, 2025",
    time: "4:30 PM",
    type: "Active Students",
  },
  {
    id: 6,
    name: "Liam Miller",
    subject: "English",
    year: "Year 1",
    performance: "79%",
    attendance: "91%",
    status: "Active",
    pending: "2 Assignments",
    lastClass: "May 24, 2025",
    time: "2:00 PM",
    type: "New Students",
  },
  {
    id: 7,
    name: "Ava Wilson",
    subject: "Science",
    year: "Year 3",
    performance: "94%",
    attendance: "97%",
    status: "Active",
    pending: "No pending work",
    lastClass: "May 23, 2025",
    time: "5:00 PM",
    type: "Active Students",
  },
  {
    id: 8,
    name: "William Moore",
    subject: "Mathematics",
    year: "Year 2",
    performance: "81%",
    attendance: "90%",
    status: "Active",
    pending: "2 Assignments",
    lastClass: "May 23, 2025",
    time: "3:30 PM",
    type: "New Students",
  },
  {
    id: 9,
    name: "Isabella Taylor",
    subject: "English",
    year: "Year 3",
    performance: "89%",
    attendance: "93%",
    status: "Active",
    pending: "1 Quiz",
    lastClass: "May 22, 2025",
    time: "4:00 PM",
    type: "Active Students",
  },
  {
    id: 10,
    name: "Lucas Thomas",
    subject: "Science",
    year: "Year 1",
    performance: "74%",
    attendance: "88%",
    status: "Active",
    pending: "2 Assignments, 1 Quiz",
    lastClass: "May 22, 2025",
    time: "5:00 PM",
    type: "New Students",
  },
  {
    id: 11,
    name: "Mia Jackson",
    subject: "Mathematics",
    year: "Year 2",
    performance: "93%",
    attendance: "98%",
    status: "Active",
    pending: "No pending work",
    lastClass: "May 21, 2025",
    time: "4:00 PM",
    type: "Active Students",
  },
  {
    id: 12,
    name: "Benjamin White",
    subject: "English",
    year: "Year 1",
    performance: "83%",
    attendance: "92%",
    status: "Active",
    pending: "1 Assignment",
    lastClass: "May 21, 2025",
    time: "3:00 PM",
    type: "New Students",
  },
  {
    id: 13,
    name: "Charlotte Harris",
    subject: "Science",
    year: "Year 2",
    performance: "87%",
    attendance: "94%",
    status: "Active",
    pending: "1 Quiz",
    lastClass: "May 20, 2025",
    time: "5:00 PM",
    type: "Active Students",
  },
  {
    id: 14,
    name: "Henry Martin",
    subject: "Mathematics",
    year: "Year 3",
    performance: "78%",
    attendance: "90%",
    status: "Active",
    pending: "2 Assignments",
    lastClass: "May 20, 2025",
    time: "4:30 PM",
    type: "New Students",
  },
  {
    id: 15,
    name: "Amelia Thompson",
    subject: "English",
    year: "Year 2",
    performance: "95%",
    attendance: "99%",
    status: "Active",
    pending: "No pending work",
    lastClass: "May 19, 2025",
    time: "3:30 PM",
    type: "Active Students",
  },
  {
    id: 16,
    name: "Alexander Garcia",
    subject: "Science",
    year: "Year 1",
    performance: "80%",
    attendance: "91%",
    status: "Active",
    pending: "1 Assignment",
    lastClass: "May 19, 2025",
    time: "5:00 PM",
    type: "New Students",
  },
  {
    id: 17,
    name: "Harper Martinez",
    subject: "Mathematics",
    year: "Year 2",
    performance: "86%",
    attendance: "94%",
    status: "Active",
    pending: "2 Assignments",
    lastClass: "May 18, 2025",
    time: "4:00 PM",
    type: "Active Students",
  },
  {
    id: 18,
    name: "Michael Robinson",
    subject: "English",
    year: "Year 3",
    performance: "72%",
    attendance: "86%",
    status: "Active",
    pending: "3 Assignments",
    lastClass: "May 18, 2025",
    time: "3:00 PM",
    type: "New Students",
  },
  {
    id: 19,
    name: "Evelyn Clark",
    subject: "Science",
    year: "Year 2",
    performance: "90%",
    attendance: "96%",
    status: "Active",
    pending: "1 Quiz",
    lastClass: "May 17, 2025",
    time: "5:00 PM",
    type: "Active Students",
  },
  {
    id: 20,
    name: "Daniel Rodriguez",
    subject: "Mathematics",
    year: "Year 1",
    performance: "84%",
    attendance: "93%",
    status: "Active",
    pending: "1 Assignment",
    lastClass: "May 17, 2025",
    time: "4:00 PM",
    type: "New Students",
  },
  {
    id: 21,
    name: "Abigail Lewis",
    subject: "English",
    year: "Year 2",
    performance: "88%",
    attendance: "95%",
    status: "Active",
    pending: "No pending work",
    lastClass: "May 16, 2025",
    time: "3:00 PM",
    type: "Active Students",
  },
  {
    id: 22,
    name: "Matthew Lee",
    subject: "Science",
    year: "Year 3",
    performance: "77%",
    attendance: "89%",
    status: "Active",
    pending: "2 Assignments",
    lastClass: "May 16, 2025",
    time: "5:00 PM",
    type: "New Students",
  },
  {
    id: 23,
    name: "Emily Walker",
    subject: "Mathematics",
    year: "Year 1",
    performance: "92%",
    attendance: "97%",
    status: "Active",
    pending: "1 Quiz",
    lastClass: "May 15, 2025",
    time: "4:00 PM",
    type: "Active Students",
  },
  {
    id: 24,
    name: "Joseph Hall",
    subject: "English",
    year: "Year 3",
    performance: "80%",
    attendance: "91%",
    status: "Active",
    pending: "2 Assignments",
    lastClass: "May 15, 2025",
    time: "3:30 PM",
    type: "New Students",
  },
  {
    id: 25,
    name: "Elizabeth Allen",
    subject: "Science",
    year: "Year 1",
    performance: "89%",
    attendance: "94%",
    status: "Active",
    pending: "1 Assignment",
    lastClass: "May 14, 2025",
    time: "5:00 PM",
    type: "Active Students",
  },
  {
    id: 26,
    name: "David Young",
    subject: "Mathematics",
    year: "Year 3",
    performance: "83%",
    attendance: "92%",
    status: "Active",
    pending: "1 Quiz",
    lastClass: "May 14, 2025",
    time: "4:00 PM",
    type: "New Students",
  },
  {
    id: 27,
    name: "Sofia Hernandez",
    subject: "English",
    year: "Year 1",
    performance: "96%",
    attendance: "98%",
    status: "Active",
    pending: "No pending work",
    lastClass: "May 13, 2025",
    time: "3:00 PM",
    type: "Active Students",
  },
  {
    id: 28,
    name: "Samuel King",
    subject: "Science",
    year: "Year 2",
    performance: "75%",
    attendance: "87%",
    status: "Active",
    pending: "2 Assignments, 1 Quiz",
    lastClass: "May 13, 2025",
    time: "5:00 PM",
    type: "New Students",
  },
];

export default function StudentsTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [studentType, setStudentType] = useState("New Students");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const filteredStudents = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return studentsData.filter((student) => {
      const matchesSearch =
        searchValue === "" ||
        student.name.toLowerCase().includes(searchValue) ||
        student.subject.toLowerCase().includes(searchValue);

      const matchesSubject =
        subject === "All Subjects" ||
        student.subject.toLowerCase() === subject.toLowerCase();

      const matchesStudentType =
        studentType === "All Students" ||
        student.type === studentType;

      return matchesSearch && matchesSubject && matchesStudentType;
    });
  }, [search, subject, studentType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / rowsPerPage)
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredStudents.length);
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, subject, studentType, rowsPerPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Navigates to /view-student/[id]
  const handleViewStudent = (id) => {
    navigate(`/Tutor/view-student/${id}`);
  };

  return (
    <section className="w-full bg-[#f5f7fc] px-6 pb-6">
      <div className="w-full">
        {/* FILTER BAR */}
        <div className="mb-3 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[300px] sm:shrink-0">
            <Search
              size={17}
              strokeWidth={1.5}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C929B]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name..."
              className="h-[40px] w-full rounded-[6px] border border-[#D7DCE5] bg-white pl-10 pr-3 text-[12px] font-normal text-[#222] outline-none transition placeholder:text-[#9BA1AA] focus:border-[#2E6DFF] focus:ring-1 focus:ring-[#2E6DFF]/10"
            />
          </div>

          <div className="relative w-full sm:w-[150px] sm:shrink-0">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-[40px] w-full appearance-none rounded-[6px] border border-[#D7DCE5] bg-white px-3 pr-9 text-[12px] font-normal text-[#20242A] outline-none transition focus:border-[#2E6DFF] focus:ring-1 focus:ring-[#2E6DFF]/10"
            >
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>Science</option>
            </select>
            <ChevronDown
              size={15}
              strokeWidth={1.5}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7C838D]"
            />
          </div>

          <div className="relative w-full sm:w-[150px] sm:shrink-0">
            <select
              value={studentType}
              onChange={(e) => setStudentType(e.target.value)}
              className="h-[40px] w-full appearance-none rounded-[6px] border border-[#D7DCE5] bg-white px-3 pr-9 text-[12px] font-normal text-[#20242A] outline-none transition focus:border-[#2E6DFF] focus:ring-1 focus:ring-[#2E6DFF]/10"
            >
              <option>New Students</option>
              <option>All Students</option>
              <option>Active Students</option>
            </select>
            <ChevronDown
              size={15}
              strokeWidth={1.5}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7C838D]"
            />
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="w-full overflow-hidden rounded-[7px] border border-[#E0E4EA] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.025)]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed border-collapse">
              <thead>
                <tr className="h-[44px] bg-[#F5F7FB]">
                  <th className="w-[13%] px-3 text-left text-[10px] font-medium text-[#596273]">
                    Student
                  </th>
                  <th className="w-[14%] px-3 text-left text-[10px] font-medium text-[#596273]">
                    Subject
                  </th>
                  <th className="w-[10%] px-3 text-left text-[10px] font-medium text-[#596273]">
                    Performance
                  </th>
                  <th className="w-[11%] px-3 text-left text-[10px] font-medium text-[#596273]">
                    Attendance
                  </th>
                  <th className="w-[10%] px-3 text-left text-[10px] font-medium text-[#596273]">
                    Status
                  </th>
                  <th className="w-[18%] px-3 text-left text-[10px] font-medium text-[#596273]">
                    Pending Work
                  </th>
                  <th className="w-[14%] px-3 text-left text-[10px] font-medium text-[#596273]">
                    Last Class
                  </th>
                  <th className="w-[10%] px-3 text-left text-[10px] font-medium text-[#596273]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="h-[57px] border-t border-[#ECEEF2] transition-colors hover:bg-[#FAFBFD]"
                    >
                      <td className="px-3">
                        <div
                          onClick={() => handleViewStudent(student.id)}
                          className="flex cursor-pointer items-center gap-2 group"
                        >
                          <div className="h-[15px] w-[15px] shrink-0 rounded-full bg-[#D8D8D8]" />
                          <span className="max-w-[90px] text-[9px] font-medium leading-[12px] text-[#17191C] group-hover:text-[#2E6DFF] transition">
                            {student.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-3">
                        <span className="block max-w-[100px] text-[9px] leading-[12px] text-[#25282D]">
                          {student.subject}-
                          <br />
                          {student.year}
                        </span>
                      </td>

                      <td className="px-3 text-[9px] text-[#25282D]">
                        {student.performance}
                      </td>

                      <td className="px-3 text-[9px] text-[#25282D]">
                        {student.attendance}
                      </td>

                      <td className="px-3">
                        <span className="text-[9px] font-medium text-[#00C853]">
                          {student.status}
                        </span>
                      </td>

                      <td className="px-3">
                        <span className="text-[8px] leading-[11px] text-[#25282D]">
                          {student.pending}
                        </span>
                      </td>

                      <td className="px-3">
                        <div className="text-[8px] leading-[11px] text-[#25282D]">
                          <div>{student.lastClass}</div>
                          <div className="text-[#9A9EA5]">{student.time}</div>
                        </div>
                      </td>

                      <td className="px-3">
                        <button
                          type="button"
                          onClick={() => handleViewStudent(student.id)}
                          className="whitespace-nowrap rounded-[3px] border border-[#2E6DFF] bg-white px-2 py-[4px] text-[8px] font-medium text-[#2E6DFF] transition hover:bg-[#2E6DFF] hover:text-white"
                        >
                          View Student
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="h-[150px] text-center text-[11px] text-[#8C929B]"
                    >
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex min-h-[48px] flex-wrap items-center justify-between gap-3 border-t border-[#ECEEF2] px-4 py-2">
            <span className="text-[9px] text-[#25282D]">
              {filteredStudents.length === 0
                ? "Showing 0 of 0 students"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredStudents.length} students`}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`flex h-[22px] w-[22px] items-center justify-center rounded-[4px] border border-[#E8EBF0] bg-white transition ${
                  currentPage === 1
                    ? "cursor-not-allowed text-[#D3D7DE]"
                    : "text-[#69717D] hover:border-[#2E6DFF] hover:text-[#2E6DFF]"
                }`}
              >
                <ChevronLeft size={12} />
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`flex h-[22px] min-w-[22px] items-center justify-center rounded-[4px] px-1 text-[9px] font-medium transition ${
                    currentPage === page
                      ? "bg-[#E8F0FF] text-[#2E6DFF]"
                      : "text-[#69717D] hover:bg-[#F5F7FB] hover:text-[#2E6DFF]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={goToNext}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`flex h-[22px] w-[22px] items-center justify-center rounded-[4px] border border-[#E8EBF0] bg-white transition ${
                  currentPage === totalPages
                    ? "cursor-not-allowed text-[#D3D7DE]"
                    : "text-[#69717D] hover:border-[#2E6DFF] hover:text-[#2E6DFF]"
                }`}
              >
                <ChevronRight size={12} />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-[#25282D]">Rows per page:</span>
              <div className="relative">
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="h-[24px] appearance-none rounded-[4px] border border-[#E0E4EA] bg-white px-2 pr-6 text-[9px] text-[#25282D] outline-none focus:border-[#2E6DFF]"
                >
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={20}>20</option>
                </select>
                <ChevronDown
                  size={11}
                  className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[#7C838D]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}