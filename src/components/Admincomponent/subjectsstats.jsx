
import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";


export default function Subjects({ subjects = [], loading = false }) {
  const navigate = useNavigate();

  // The platform keeps one subject per name; year levels are listed on each subject.
  const stats = [
    { id: 1, title: "Total Subjects", value: subjects.length },
    { id: 2, title: "Active Subjects", value: subjects.filter((s) => s.active).length },
  ];

  return (
    <main className="min-h-full w-full min-w-0 bg-[#F5F7FD] px-4 py-5 font-[Inter,sans-serif] text-[#111827] sm:px-5 sm:py-6 lg:px-6">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Page Header */}
        <header className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold leading-7 tracking-[-0.4px] text-[#111111] sm:text-2xl">
              Subjects
            </h1>

            <p className="mt-1 text-sm leading-5 text-[#64748B]">
              Manage the subjects available on the platform.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/add-subject")}
            className="inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#064E0B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#086313] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2 sm:w-auto"
          >
            <Plus size={17} strokeWidth={2} />
            <span>Add Subject</span>
          </button>
        </header>

        {/* Subject Statistics */}
        <section
          aria-label="Subject statistics"
          className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:max-w-[820px]"
        >
          {stats.map((subject) => (
            <article
              key={subject.id}
              className="flex min-h-[82px] min-w-0 items-center gap-3 rounded-md border border-[#E6EAF0] bg-white px-4 py-3 transition-shadow hover:shadow-sm sm:min-h-[90px] sm:gap-4 sm:px-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#E5FFF2] text-[#00B96B] sm:h-12 sm:w-12">
                <BookOpen
                  size={23}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <p className="break-words text-xs leading-5 text-[#64748B] sm:text-sm">
                  {subject.title}
                </p>

                <p className="mt-0.5 text-xl font-semibold leading-6 text-[#111111] sm:text-2xl">
                  {loading ? "…" : subject.value}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
