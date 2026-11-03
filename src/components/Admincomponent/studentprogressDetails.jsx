
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  BookOpen,
  TrendingUp,
  ClipboardCheck,
  GraduationCap,
} from "lucide-react";

const students = Array.from({ length: 127 }, (_, i) => ({
  id: i + 1,
  name: "John Doe",
  studentId: `STU${String(i + 1).padStart(4, "0")}`,
  email: "john.doe@example.com",
  phone: "+234 800 000 0000",
  dateJoined: "October 1, 2026",
  className: "Year 1",
  subjects: 5,
  average: 85,
  attendance: 50,
  progress: 45,
  status: ["Excellent", "On Track", "Poor", "Excellent", "Excellent", "Excellent"][i % 6],
}));

const statusStyles = {
  Excellent: "bg-[#DDFBE5] text-[#16803D]",
  "On Track": "bg-[#FFF0D9] text-[#986515]",
  Poor: "bg-[#FFE4E5] text-[#D92735]",
};

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-3 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F4FC] text-[#3973ED]">
        <Icon size={19} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[#8993A3] sm:text-sm">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-[#252B35]">
          {value}
        </p>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color }) {
  return (
    <article className="rounded-xl border border-[#E5E9F1] bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-[#687386]">{title}</p>
        <Icon size={19} className={color} />
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-[#171923]">
        {value}
      </p>
    </article>
  );
}

export default function StudentDetails() {
  const { id } = useParams();
  const student = students.find((item) => item.id === Number(id));

  if (!student) {
    return (
      <main className="min-h-screen bg-[#F4F7FD] p-4 sm:p-8">
        <div className="mx-auto max-w-5xl rounded-xl border border-[#E5E9F1] bg-white p-6">
          <h1 className="text-xl font-semibold text-[#252B35]">
            Student not found
          </h1>
          <Link
            to="/students"
            className="mt-4 inline-flex items-center gap-2 text-sm text-[#3973ED]"
          >
            <ArrowLeft size={16} />
            Back to Students
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#F4F7FD] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <Link
          to="/students"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#58718E] hover:text-[#3973ED]"
        >
          <ArrowLeft size={17} />
          Back to Students
        </Link>

        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[#171923] sm:text-[28px]">
            Student Details
          </h1>
          <p className="mt-1 text-sm text-[#58718E] sm:text-base">
            View and review the student's personal and academic information.
          </p>
        </header>

        {/* Student Profile */}
        <section className="rounded-xl border border-[#E2E7EF] bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E7F0FF] text-[#1763D1]">
              <UserRound size={30} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-[#252B35] sm:text-2xl">
                {student.name}
              </h2>
              <p className="mt-1 text-sm text-[#8993A3]">
                Student ID: {student.studentId}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[student.status]}`}
            >
              {student.status}
            </span>
          </div>

          {/* Academic Summary */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Average Score"
              value={`${student.average}%`}
              icon={TrendingUp}
              color="text-[#20B83A]"
            />
            <MetricCard
              title="Attendance Rate"
              value={`${student.attendance}%`}
              icon={ClipboardCheck}
              color="text-[#E8A000]"
            />
            <MetricCard
              title="Overall Progress"
              value={`${student.progress}%`}
              icon={TrendingUp}
              color="text-[#E600B8]"
            />
            <MetricCard
              title="Subjects Enrolled"
              value={student.subjects}
              icon={BookOpen}
              color="text-[#3973ED]"
            />
          </div>
        </section>

        {/* Personal Information */}
        <section className="mt-5 rounded-xl border border-[#E2E7EF] bg-white p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <UserRound size={19} className="text-[#3973ED]" />
            <h2 className="text-base font-semibold text-[#252B35] sm:text-lg">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-8 divide-y divide-[#F0F2F6] sm:grid-cols-2 sm:divide-y-0">
            <DetailItem
              icon={Mail}
              label="Email Address"
              value={student.email}
            />
            <DetailItem
              icon={Phone}
              label="Phone Number"
              value={student.phone}
            />
            <DetailItem
              icon={CalendarDays}
              label="Date Joined"
              value={student.dateJoined}
            />
            <DetailItem
              icon={GraduationCap}
              label="Class / Level"
              value={student.className}
            />
          </div>
        </section>

        {/* Academic Information */}
        <section className="mt-5 rounded-xl border border-[#E2E7EF] bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen size={19} className="text-[#3973ED]" />
            <h2 className="text-base font-semibold text-[#252B35] sm:text-lg">
              Academic Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-[#F7F9FD] p-4">
              <p className="text-sm text-[#687386]">Enrolled Subjects</p>
              <p className="mt-2 text-xl font-semibold text-[#252B35]">
                {student.subjects} subjects
              </p>
            </div>

            <div className="rounded-lg bg-[#F7F9FD] p-4">
              <p className="text-sm text-[#687386]">Academic Status</p>
              <p className="mt-2 text-xl font-semibold text-[#252B35]">
                {student.status}
              </p>
            </div>
          </div>

          <Link
            to={`/students/${student.id}/progress-report`}
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#3973ED] px-5 text-sm font-medium text-white transition-colors hover:bg-[#2D62D1] sm:w-auto"
          >
            View Full Progress Report
          </Link>
        </section>
      </div>
    </main>
  );
}
