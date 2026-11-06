
import React, { useMemo, useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

const PAGE_SIZE = 8;

const ratingOptions = [
  { value: "all", label: "All Ratings" },
  { value: "5", label: "5 Stars" },
  { value: "4", label: "4 Stars" },
  { value: "3", label: "3 Stars" },
  { value: "2", label: "2 Stars" },
  { value: "1", label: "1 Star" },
];

const timeOptions = [
  { value: "all", label: "All Time" },
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 3 Months" },
];

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="relative min-w-0 w-full">
      <label className="sr-only">{label}</label>

      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full min-w-0 appearance-none rounded-md border border-[#E0E5EC] bg-white pl-2.5 pr-7 text-xs font-medium text-[#536174] outline-none transition focus:border-[#9BB8F8] focus:ring-2 focus:ring-[#EAF0FF] sm:h-9 sm:text-[13px]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={14}
        strokeWidth={1.7}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8590A0]"
        aria-hidden="true"
      />
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div
      className="flex items-center gap-0.5 whitespace-nowrap"
      aria-label={`${rating} out of 5 stars`}
      title={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          strokeWidth={1.5}
          fill={star <= rating ? "#FFC400" : "#D5D9E0"}
          color={star <= rating ? "#FFC400" : "#D5D9E0"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ParentCell({ review }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8EFFF] text-xs font-semibold text-[#326AFF] sm:h-10 sm:w-10"
      >
        {review.parent
          .replace(/^(Mr\.|Mrs\.)\s*/, "")
          .charAt(0)
          .toUpperCase()}
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <span className="truncate text-xs font-semibold leading-4 text-[#242A33] sm:text-[13px]">
          {review.parent}
        </span>

        <span className="truncate text-[11px] leading-4 text-[#929BA8] sm:text-xs">
          {review.student}
        </span>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const visiblePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      Math.abs(page - currentPage) <= 1
  );

  return (
    <nav
      aria-label="Reviews pagination"
      className="flex flex-wrap items-center justify-end gap-1.5"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E9F0] text-[#596779] transition hover:bg-[#F1F5FF] disabled:cursor-not-allowed disabled:opacity-40 sm:h-8 sm:w-8"
      >
        <ChevronLeft size={16} />
      </button>

      {visiblePages.map((page, index) => (
        <React.Fragment key={page}>
          {index > 0 &&
            page - visiblePages[index - 1] > 1 && (
              <span className="px-1 text-sm text-[#8993A2]">
                …
              </span>
            )}

          <button
            type="button"
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-xs transition sm:h-8 sm:min-w-8 ${
              currentPage === page
                ? "border border-[#B7CBFF] bg-[#E8EFFF] font-semibold text-[#326AFF]"
                : "border border-transparent text-[#596779] hover:border-[#E0E7F5] hover:bg-[#F5F7FB]"
            }`}
          >
            {page}
          </button>
        </React.Fragment>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E9F0] text-[#596779] transition hover:bg-[#F1F5FF] disabled:cursor-not-allowed disabled:opacity-40 sm:h-8 sm:w-8"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function ParentReviews({ reviews: apiReviews = [], loading = false, error = "" }) {
  const [course, setCourse] = useState("all");
  const [rating, setRating] = useState("all");
  const [time, setTime] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // One row per review. A review belongs to the parent, so the student and course columns
  // show the children (and courses) of theirs that this tutor teaches.
  const reviews = useMemo(
    () =>
      apiReviews.map((r) => ({
        id: r.id,
        parent: r.parentName,
        student: r.children.length ? r.children.join(", ") : "—",
        rating: r.rating,
        courses: r.courses,
        course: r.courses.length ? r.courses.join(", ") : "—",
        feedback: r.comment?.trim() || "No written feedback.",
        date: formatDate(r.createdAt),
        createdAt: r.createdAt,
      })),
    [apiReviews]
  );

  const courseOptions = useMemo(
    () => [
      { value: "all", label: "All Courses" },
      ...[...new Set(reviews.flatMap((r) => r.courses))]
        .sort()
        .map((c) => ({ value: c, label: c })),
    ],
    [reviews]
  );


  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesCourse =
        course === "all" || review.courses.includes(course);

      const matchesRating =
        rating === "all" || review.rating === Number(rating);

      const daysOld = Math.floor(
        (Date.now() - new Date(review.createdAt).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const matchesTime =
        time === "all" ||
        (time === "7" && daysOld >= 0 && daysOld <= 7) ||
        (time === "30" && daysOld >= 0 && daysOld <= 30) ||
        (time === "90" && daysOld >= 0 && daysOld <= 90);

      return matchesCourse && matchesRating && matchesTime;
    });
  }, [course, rating, time, reviews]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReviews.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);

  // Keep the selected page valid whenever the result count changes.
  useEffect(() => {
    if (currentPage !== safePage) {
      setCurrentPage(safePage);
    }
  }, [currentPage, safePage]);

  const pageReviews = filteredReviews.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const start =
    filteredReviews.length === 0
      ? 0
      : (safePage - 1) * PAGE_SIZE + 1;

  const end = Math.min(
    safePage * PAGE_SIZE,
    filteredReviews.length
  );

  function updateFilter(setter, value) {
    setter(value);
    setCurrentPage(1);
  }

  return (
    <section className="min-h-full w-full min-w-0 bg-[#F4F7FD] p-3 sm:p-5 lg:p-7">
      <div className="mx-auto w-full min-w-0 max-w-[1093px] overflow-hidden rounded-xl border border-[#EDF0F5] bg-white shadow-sm shadow-black/[0.02]">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-[#EDF0F5] px-4 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl">
              Parent Reviews
            </h1>

            <p className="mt-1 text-xs leading-5 text-[#8792A1] sm:text-sm">
              Review feedback and track your students' learning experience.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:w-auto lg:min-w-[510px]">
            <FilterSelect
              label="Filter by course"
              value={course}
              onChange={(value) => updateFilter(setCourse, value)}
              options={courseOptions}
            />

            <FilterSelect
              label="Filter by rating"
              value={rating}
              onChange={(value) => updateFilter(setRating, value)}
              options={ratingOptions}
            />

            <FilterSelect
              label="Filter by time"
              value={time}
              onChange={(value) => updateFilter(setTime, value)}
              options={timeOptions}
            />
          </div>
        </div>

        {/* Reviews table */}
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] table-fixed border-separate border-spacing-0 text-left">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[19%]" />
                <col className="w-[12%]" />
                <col className="w-[18%]" />
                <col className="w-[31%]" />
                <col className="w-[15%]" />
              </colgroup>

              <thead>
                <tr className="h-12 bg-[#EEF3FB] text-[#536C89]">
                  <th className="px-3 text-center text-xs font-semibold">
                    #
                  </th>

                  <th className="px-3 text-xs font-semibold">
                    Parent
                  </th>

                  <th className="px-3 text-xs font-semibold">
                    Rating
                  </th>

                  <th className="px-3 text-xs font-semibold">
                    Course
                  </th>

                  <th className="px-3 text-xs font-semibold">
                    Feedback
                  </th>

                  <th className="px-3 text-xs font-semibold">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {pageReviews.map((review, index) => (
                  <tr
                    key={review.id}
                    className="transition-colors hover:bg-[#F8FAFE]"
                  >
                    <td className="border-b border-[#EDF0F4] px-3 py-5 text-center align-middle text-xs text-[#667085]">
                      {(safePage - 1) * PAGE_SIZE + index + 1}
                    </td>

                    <td className="border-b border-[#EDF0F4] px-3 py-5 align-middle">
                      <ParentCell review={review} />
                    </td>

                    <td className="border-b border-[#EDF0F4] px-3 py-5 align-middle">
                      <StarRating rating={review.rating} />
                    </td>

                    <td className="border-b border-[#EDF0F4] px-3 py-5 align-middle">
                      <span className="block break-words text-xs leading-5 text-[#596779]">
                        {review.course}
                      </span>
                    </td>

                    <td className="border-b border-[#EDF0F4] px-3 py-5 align-middle">
                      <p className="whitespace-normal break-words text-xs leading-5 text-[#667085]">
                        {review.feedback}
                      </p>
                    </td>

                    <td className="border-b border-[#EDF0F4] px-3 py-5 align-middle text-xs leading-5 text-[#596779]">
                      {review.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {loading && (
            <p className="py-12 text-center text-sm text-[#8792A1]">Loading reviews…</p>
          )}

          {!loading && error && (
            <p role="alert" className="py-12 text-center text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {!loading && !error && pageReviews.length === 0 && (
            <div className="flex min-h-[180px] flex-col items-center justify-center px-5 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF3FB]">
                <Star size={21} className="text-[#8B9AB1]" />
              </div>

              <p className="mt-3 text-sm font-semibold text-[#344054]">
                No reviews found
              </p>

              <p className="mt-1 text-xs leading-5 text-[#8792A1]">
                {reviews.length === 0
                  ? "Parents of your students can review you, and their reviews will show up here."
                  : "Try changing your filters to see more reviews."}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-[#EDF0F4] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p
            aria-live="polite"
            className="text-xs leading-5 text-[#667085] sm:text-sm"
          >
            Showing{" "}
            <span className="font-semibold text-[#344054]">
              {start}–{end}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#344054]">
              {filteredReviews.length}
            </span>{" "}
            reviews
          </p>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
