import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Calculator,
  BookOpen,
  Atom,
  Code2,
  ArrowRight,
  X,
} from "lucide-react";
import { api } from "../lib/api";

const THEMES = {
  mathematics: {
    icon: Calculator, badgeText: "text-[#2F327D]", iconBg: "bg-[#2F327D] text-white", barColor: "bg-[#2F327D]",
    btnPrimary: "bg-[#2F327D] hover:bg-[#252865] text-white", btnSecondary: "border-[#2F327D] text-[#2F327D] hover:bg-[#2F327D]/5",
    arrowColor: "text-white", secondaryArrow: "text-[#2F327D]",
  },
  english: {
    icon: BookOpen, badgeText: "text-amber-500", iconBg: "bg-amber-400 text-white", barColor: "bg-amber-400",
    btnPrimary: "bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold", btnSecondary: "border-amber-400 text-amber-600 hover:bg-amber-50",
    arrowColor: "text-slate-900", secondaryArrow: "text-amber-600",
  },
  science: {
    icon: Atom, badgeText: "text-emerald-500", iconBg: "bg-emerald-500 text-white", barColor: "bg-emerald-500",
    btnPrimary: "bg-emerald-500 hover:bg-emerald-600 text-white", btnSecondary: "border-emerald-500 text-emerald-600 hover:bg-emerald-50",
    arrowColor: "text-white", secondaryArrow: "text-emerald-600",
  },
  coding: {
    icon: Code2, badgeText: "text-[#8F3985]", iconBg: "bg-[#8F3985] text-white", barColor: "bg-[#8F3985]",
    btnPrimary: "bg-[#8F3985] hover:bg-[#762f6e] text-white", btnSecondary: "border-[#8F3985] text-[#8F3985] hover:bg-[#8F3985]/5",
    arrowColor: "text-white", secondaryArrow: "text-[#8F3985]",
  },
};
const DEFAULT_THEME = { ...THEMES.mathematics, icon: BookOpen };

const SCHOOL_YEARS = ["Reception", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12"];

/* ---------- Enrol in another subject ---------- */
function EnrollModal({ enrolledIds, onClose, onDone }) {
  const [options, setOptions] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/subjects").then((all) => setOptions(all.filter((s) => !enrolledIds.includes(s.id)))).catch(() => setError("Could not load subjects."));
  }, [enrolledIds]);

  const submit = async () => {
    if (!subjectId || !yearLevel) return setError("Choose a subject and a school year.");
    setSaving(true);
    try {
      await api.post("/student/subjects", { subjectId: Number(subjectId), yearLevel });
      onDone();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const field = "h-[44px] w-full rounded-[9px] border border-slate-200 bg-white px-3 text-[14px] text-slate-800 outline-none focus:border-[#2F327D]";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Enroll in a new subject</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-slate-400 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        {options.length === 0 && !error ? (
          <p className="py-4 text-sm text-slate-500">You are already enrolled in every available subject.</p>
        ) : (
          <div className="space-y-3">
            <select value={subjectId} onChange={(e) => { setSubjectId(e.target.value); setError(""); }} className={field}>
              <option value="">Select subject</option>
              {options.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select value={yearLevel} onChange={(e) => { setYearLevel(e.target.value); setError(""); }} className={field}>
              <option value="">Select school year</option>
              {SCHOOL_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        )}
        {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700">Cancel</button>
          {options.length > 0 && (
            <button type="button" onClick={submit} disabled={saving} className="rounded-xl bg-[#2E6DFF] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Adding…" : "Enroll"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CourseDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    Promise.all([api.get("/student/subjects"), api.get("/dashboard/student")])
      .then(([subjects, dash]) => {
        const stats = new Map((dash.subjects ?? []).map((x) => [x.subjectId, x]));
        setCoursesData(
          subjects.map((sub) => {
            const st = stats.get(sub.id);
            return {
              id: sub.id,
              title: sub.yearLevel ? `${sub.name} · ${sub.yearLevel}` : sub.name,
              category: sub.name.toUpperCase(),
              description: sub.description || `Continue your ${sub.name} lessons.`,
              progress: st?.lessonProgress ?? 0,
              completedLessons: st?.lessonsCompleted ?? 0,
              totalLessons: st?.lessonsTotal ?? 0,
              theme: THEMES[sub.name.toLowerCase()] || DEFAULT_THEME,
            };
          })
        );
      })
      .catch((err) => setError(err.message || "Could not load your subjects."))
      .finally(() => setLoading(false));
  }, [reloadKey]);

  const filteredCourses = coursesData.filter((course) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      course.title.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    );
  });

  return (
    <section className="min-h-screen w-full font-sans">
      {enrollOpen && (
        <EnrollModal
          enrolledIds={coursesData.map((c) => c.id)}
          onClose={() => setEnrollOpen(false)}
          onDone={() => { setEnrollOpen(false); setReloadKey((k) => k + 1); }}
        />
      )}
      <div className="w-full px-5 py-6 sm:px-6 lg:px-7 xl:px-8">

        {/* ======================================================
            SEARCH & ENROLL HEADER
        ====================================================== */}

        <div className="mb-7 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-[560px]">
            <Search
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-slate-400
              "
              strokeWidth={2}
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects..."
              className="
                h-[48px]
                w-full
                rounded-[9px]
                border
                border-slate-200
                bg-white
                pl-12
                pr-4
                text-[14px]
                font-normal
                text-slate-800
                placeholder:text-slate-400
                shadow-sm
                outline-none
                transition-all
                focus:border-[#2F327D]
                focus:ring-2
                focus:ring-[#2F327D]/10
              "
            />
          </div>

          <button
            type="button"
            onClick={() => setEnrollOpen(true)}
            className="
              flex
              h-[48px]
              items-center
              justify-center
              gap-2
              rounded-[9px]
              bg-[#2E6DFF]
              px-5
              text-[14px]
              font-medium
              text-white
              shadow-sm
              transition-all
              hover:bg-[#255be8]
              whitespace-nowrap
            "
          >
            <span>Enroll new Subject</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* ======================================================
            COURSE GRID
        ====================================================== */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
            2xl:gap-6
          "
        >
          {filteredCourses.map((course) => {
            const IconComponent = course.theme.icon;

            return (
              <div
                key={course.id}
                className="
                  flex
                  w-full
                  flex-col
                  justify-between
                  rounded-[12px]
                  border
                  border-slate-100
                  bg-white
                  p-6
                  shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)]
                "
              >
                {/* ==================================================
                    TOP CONTENT CONTAINER
                ================================================== */}

                <div className="space-y-5">

                  {/* HEADER */}

                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        flex
                        h-[52px]
                        w-[52px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[9px]
                        ${course.theme.iconBg}
                      `}
                    >
                      <IconComponent
                        className="h-[25px] w-[25px]"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={`
                          mb-1
                          block
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.04em]
                          ${course.theme.badgeText}
                        `}
                      >
                        {course.category}
                      </span>

                      <h3
                        className="
                          text-[15px]
                          font-bold
                          leading-[20px]
                          tracking-[-0.01em]
                          text-slate-900
                        "
                      >
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      text-[13px]
                      leading-[19px]
                      text-slate-500
                    "
                  >
                    {course.description}
                  </p>

                  {/* ==================================================
                      PROGRESS
                  ================================================== */}

                  <div className="space-y-2 pt-1">
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className={`
                          text-[11px]
                          font-semibold
                          ${course.theme.badgeText}
                        `}
                      >
                        {course.progress}% Complete
                      </span>

                      <span
                        className="
                          whitespace-nowrap
                          text-[11px]
                          font-medium
                          text-slate-400
                        "
                      >
                        {course.completedLessons} of{" "}
                        {course.totalLessons} lessons
                      </span>
                    </div>

                    <div
                      className="
                        h-[9px]
                        w-full
                        overflow-hidden
                        rounded-full
                        bg-slate-100
                      "
                    >
                      <div
                        className={`
                          h-full
                          rounded-full
                          transition-all
                          duration-500
                          ${course.theme.barColor}
                        `}
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ==================================================
                    ACTION BUTTONS
                ================================================== */}

                <div className="mt-6 space-y-3 pt-2">

                  {/* CONTINUE LEARNING */}

                  <button
                    type="button"
                    onClick={() => navigate(`/student/learning/${course.id}`)}
                    className={`
                      group
                      flex
                      h-[43px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[7px]
                      px-4
                      text-[12px]
                      font-medium
                      transition-all
                      ${course.theme.btnPrimary}
                    `}
                  >
                    <span>Continue Learning</span>

                    <ArrowRight
                      className={`
                        h-4
                        w-4
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                        ${course.theme.arrowColor}
                      `}
                      strokeWidth={1.8}
                    />
                  </button>

                  {/* VIEW COURSE */}

                  <button
                    type="button"
                    onClick={() => navigate(`/student/learning/${course.id}`)}
                    className={`
                      group
                      flex
                      h-[43px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[7px]
                      border
                      bg-white
                      px-4
                      text-[12px]
                      font-medium
                      transition-all
                      ${course.theme.btnSecondary}
                    `}
                  >
                    <span>View Course</span>

                    <ArrowRight
                      className={`
                        h-4
                        w-4
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                        ${course.theme.secondaryArrow}
                      `}
                      strokeWidth={1.8}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================
            EMPTY STATE
        ====================================================== */}

        {error && (
          <p role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}
        {loading && <p className="py-10 text-center text-sm text-slate-400">Loading your subjects…</p>}

        {!loading && filteredCourses.length === 0 && (
          <div
            className="
              flex
              min-h-[280px]
              w-full
              items-center
              justify-center
              rounded-[12px]
              border
              border-dashed
              border-slate-200
              bg-white
            "
          >
            <div className="text-center">
              <Search className="mx-auto mb-3 h-7 w-7 text-slate-300" />

              <p className="text-[14px] font-medium text-slate-600">
                No subjects found
              </p>

              <p className="mt-1 text-[12px] text-slate-400">
                No courses match "{searchQuery}"
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}