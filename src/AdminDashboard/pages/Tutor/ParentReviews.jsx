import React, { useState, useMemo, useEffect, useRef } from 'react';

// Star Rating Component
const StarRating = ({ rating }) => (
  <div
    className="flex items-center gap-0.5 text-amber-400"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 ${
          star <= rating
            ? 'fill-amber-400 text-amber-400'
            : 'fill-slate-300 text-slate-300'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Initial Sample Reviews Dataset
const INITIAL_REVIEWS = [
  {
    id: 1,
    parentName: 'Mrs. Tunde',
    childSubtitle: "Olivia's Parent",
    rating: 4,
    course: 'Mathematics- Year 1',
    feedback:
      'My child has improved so much in Maths. Very patient and explains things clearly.',
    date: 'Sep 12, 2026',
    period: 'this_month',
  },
  {
    id: 2,
    parentName: 'Mrs. Tunde',
    childSubtitle: "Olivia's Parent",
    rating: 4,
    course: 'Mathematics- Year 1',
    feedback:
      'My child has improved so much in Maths. Very patient and explains things clearly.',
    date: 'Sep 12, 2026',
    period: 'this_month',
  },
  {
    id: 3,
    parentName: 'Mrs. Tunde',
    childSubtitle: "Olivia's Parent",
    rating: 4,
    course: 'Mathematics- Year 1',
    feedback:
      'My child has improved so much in Maths. Very patient and explains things clearly.',
    date: 'Sep 12, 2026',
    period: 'this_month',
  },
  {
    id: 4,
    parentName: 'Mrs. Tunde',
    childSubtitle: "Olivia's Parent",
    rating: 4,
    course: 'Mathematics- Year 1',
    feedback:
      'My child has improved so much in Maths. Very patient and explains things clearly.',
    date: 'Sep 12, 2026',
    period: 'this_month',
  },
  {
    id: 5,
    parentName: 'Mrs. Tunde',
    childSubtitle: "Olivia's Parent",
    rating: 4,
    course: 'Mathematics- Year 1',
    feedback:
      'My child has improved so much in Maths. Very patient and explains things clearly.',
    date: 'Sep 12, 2026',
    period: 'this_month',
  },
  {
    id: 6,
    parentName: 'Mrs. Tunde',
    childSubtitle: "Olivia's Parent",
    rating: 4,
    course: 'Mathematics- Year 1',
    feedback:
      'My child has improved so much in Maths. Very patient and explains things clearly.',
    date: 'Sep 12, 2026',
    period: 'this_month',
  },
  {
    id: 7,
    parentName: 'Mr. David',
    childSubtitle: "Liam's Parent",
    rating: 5,
    course: 'Science- Year 2',
    feedback:
      'Fantastic practical experiments and interactive sessions. Highly recommended!',
    date: 'Aug 28, 2026',
    period: 'last_month',
  },
  {
    id: 8,
    parentName: 'Sarah Jenkins',
    childSubtitle: "Emma's Parent",
    rating: 5,
    course: 'English- Year 1',
    feedback:
      'Great reading exercises. Her reading speed and vocabulary doubled in weeks.',
    date: 'Jul 15, 2026',
    period: 'this_year',
  },
];

const ITEMS_PER_PAGE = 6;

const getInitials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((part) => part.replace(/[^a-zA-Z]/g, '').charAt(0))
    .join('')
    .toUpperCase();

const MoreIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5 fill-current"
    viewBox="0 0 24 24"
  >
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const ReviewActions = ({
  item,
  activeMenuId,
  setActiveMenuId,
  triggerToast,
}) => (
  <div
    className="relative"
    onClick={(event) => event.stopPropagation()}
  >
    <button
      type="button"
      aria-label={`Actions for review by ${item.parentName}`}
      aria-expanded={activeMenuId === item.id}
      onClick={() =>
        setActiveMenuId((current) =>
          current === item.id ? null : item.id
        )
      }
      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
    >
      <MoreIcon />
    </button>

    {activeMenuId === item.id && (
      <div className="absolute right-0 top-10 z-30 w-36 rounded-xl border border-slate-100 bg-white py-1.5 text-left text-xs font-medium text-slate-700 shadow-lg">
        <button
          type="button"
          onClick={() => {
            setActiveMenuId(null);
            triggerToast(`Viewing details for ${item.parentName}`);
          }}
          className="w-full px-3.5 py-2 text-left hover:bg-slate-50"
        >
          View Details
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveMenuId(null);
            triggerToast(`Replying to ${item.parentName}`);
          }}
          className="w-full px-3.5 py-2 text-left hover:bg-slate-50"
        >
          Reply
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveMenuId(null);
            triggerToast(`Review #${item.id} flagged`);
          }}
          className="w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50"
        >
          Flag Review
        </button>
      </div>
    )}
  </div>
);

// Mobile-only review card
const MobileReviewCard = ({
  item,
  index,
  activeMenuId,
  setActiveMenuId,
  triggerToast,
}) => (
  <article className="relative w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
        {getInitials(item.parentName)}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="break-words text-sm font-bold text-slate-800">
          {item.parentName}
        </p>
        <p className="mt-0.5 break-words text-xs text-slate-400">
          {item.childSubtitle}
        </p>
      </div>

      <div className="shrink-0">
        <ReviewActions
          item={item}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
          triggerToast={triggerToast}
        />
      </div>
    </div>

    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
      <StarRating rating={item.rating} />
      <span className="text-xs text-slate-500">{item.date}</span>
    </div>

    <div className="mt-3">
      <span className="inline-block max-w-full break-words rounded-md bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600">
        {item.course}
      </span>
    </div>

    <div className="mt-3">
      <p className="mb-1 text-xs font-semibold text-slate-400">
        Feedback
      </p>
      <p className="break-words text-sm leading-6 text-slate-600">
        {item.feedback}
      </p>
    </div>

    <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
      Review #{index + 1}
    </div>
  </article>
);

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const toastTimerRef = useRef(null);

  const triggerToast = (message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToastMessage(message);

    toastTimerRef.current = setTimeout(() => {
      setToastMessage('');
      toastTimerRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    const handleOutsideClick = () => setActiveMenuId(null);

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);

      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const filteredReviews = useMemo(
    () =>
      INITIAL_REVIEWS.filter((item) => {
        const matchCourse =
          selectedCourse === 'all' ||
          item.course === selectedCourse;

        const matchRating =
          selectedRating === 'all' ||
          item.rating.toString() === selectedRating;

        const matchTime =
          selectedTime === 'all' ||
          item.period === selectedTime;

        return matchCourse && matchRating && matchTime;
      }),
    [selectedCourse, selectedRating, selectedTime]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReviews.length / ITEMS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedReviews = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

    return filteredReviews.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredReviews, safePage]);

  const firstItem =
    filteredReviews.length === 0
      ? 0
      : (safePage - 1) * ITEMS_PER_PAGE + 1;

  const lastItem = Math.min(
    safePage * ITEMS_PER_PAGE,
    filteredReviews.length
  );

  const updateFilter = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCourse('all');
    setSelectedRating('all');
    setSelectedTime('all');
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen w-full min-w-0 p-0 font-sans text-slate-800 sm:p-6">
      {/* Main container: full width on mobile, original desktop width preserved */}
      <div className="relative flex min-h-screen w-full min-w-0 max-w-none flex-col justify-start overflow-visible rounded-none border-0 bg-white p-3 shadow-none sm:min-h-[683px] sm:max-w-[1093px] sm:justify-between sm:overflow-hidden sm:rounded-2xl sm:border sm:border-slate-200/80 sm:p-8 sm:shadow-sm">
        <div className="w-full min-w-0 flex-1">
          {/* Header and filters */}
          <div className="mb-6 flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Parent Reviews
            </h1>

            {/* Responsive filters */}
            <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-3">
              <div className="relative w-full min-w-0 sm:w-auto sm:min-w-[130px]">
                <select
                  aria-label="Filter by course"
                  value={selectedCourse}
                  onChange={updateFilter(setSelectedCourse)}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-9 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:py-2"
                >
                  <option value="all">All Courses</option>
                  <option value="Mathematics- Year 1">
                    Mathematics- Year 1
                  </option>
                  <option value="Science- Year 2">
                    Science- Year 2
                  </option>
                  <option value="English- Year 1">
                    English- Year 1
                  </option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative w-full min-w-0 sm:w-auto sm:min-w-[120px]">
                <select
                  aria-label="Filter by rating"
                  value={selectedRating}
                  onChange={updateFilter(setSelectedRating)}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-9 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:py-2"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative w-full min-w-0 sm:w-auto sm:min-w-[110px]">
                <select
                  aria-label="Filter by time"
                  value={selectedTime}
                  onChange={updateFilter(setSelectedTime)}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-9 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:py-2"
                >
                  <option value="all">All Time</option>
                  <option value="this_month">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="this_year">This Year</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile review cards */}
          <div className="flex w-full min-w-0 flex-col gap-3 md:hidden">
            {paginatedReviews.length === 0 ? (
              <div className="w-full rounded-xl border border-slate-200 px-4 py-10 text-center">
                <p className="text-sm font-medium text-slate-500">
                  No reviews match the selected filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              paginatedReviews.map((item, index) => (
                <MobileReviewCard
                  key={item.id}
                  item={item}
                  index={(safePage - 1) * ITEMS_PER_PAGE + index}
                  activeMenuId={activeMenuId}
                  setActiveMenuId={setActiveMenuId}
                  triggerToast={triggerToast}
                />
              ))
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-xl md:block">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="bg-[#f0f4f9] text-sm font-semibold text-[#64748b]">
                  <th className="w-12 rounded-l-lg px-4 py-3.5 text-center">
                    #
                  </th>
                  <th className="w-48 px-4 py-3.5">Parent</th>
                  <th className="w-36 px-4 py-3.5">Rating</th>
                  <th className="w-48 px-4 py-3.5">Course</th>
                  <th className="px-4 py-3.5">Feedback</th>
                  <th className="w-32 px-4 py-3.5">Date</th>
                  <th className="w-10 rounded-r-lg px-4 py-3.5 text-center">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {paginatedReviews.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center font-medium text-slate-400"
                    >
                      No reviews match the selected filters.
                    </td>
                  </tr>
                ) : (
                  paginatedReviews.map((item, index) => (
                    <tr
                      key={item.id}
                      className="group transition-colors hover:bg-slate-50/80"
                    >
                      <td className="px-4 py-4 text-center font-semibold text-slate-700">
                        {(safePage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-slate-600">
                            {getInitials(item.parentName)}
                          </div>

                          <div className="leading-tight">
                            <div className="font-bold text-slate-800">
                              {item.parentName}
                            </div>
                            <div className="text-xs font-normal text-slate-400">
                              {item.childSubtitle}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <StarRating rating={item.rating} />
                      </td>

                      <td className="px-4 py-4 font-normal text-slate-500">
                        {item.course}
                      </td>

                      <td className="max-w-md px-4 py-4 font-normal leading-snug text-slate-600">
                        {item.feedback}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 font-normal text-slate-500">
                        {item.date}
                      </td>

                      <td className="relative px-4 py-4 text-center">
                        <ReviewActions
                          item={item}
                          activeMenuId={activeMenuId}
                          setActiveMenuId={setActiveMenuId}
                          triggerToast={triggerToast}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer and pagination */}
        <div className="mt-6 flex w-full min-w-0 flex-col items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:mt-4 sm:flex-row">
          <div className="text-center text-sm font-medium text-slate-600 sm:text-left">
            Showing {firstItem}–{lastItem} of {filteredReviews.length} reviews
          </div>

          <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={safePage === 1}
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-400 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - safePage) <= 1
              )
              .map((page, index, pages) => (
                <React.Fragment key={page}>
                  {index > 0 && page - pages[index - 1] > 1 && (
                    <span className="px-1 text-sm text-slate-400">
                      …
                    </span>
                  )}

                  <button
                    type="button"
                    aria-label={`Page ${page}`}
                    aria-current={safePage === page ? 'page' : undefined}
                    onClick={() => setCurrentPage(page)}
                    className={
                      safePage === page
                        ? 'rounded-lg bg-blue-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors'
                        : 'rounded-lg px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100'
                    }
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <button
              type="button"
              aria-label="Next page"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              disabled={safePage === totalPages}
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive toast notification */}
      {toastMessage && (
        <div className="fixed bottom-4 left-3 right-3 z-50 mx-auto w-fit max-w-[calc(100%-1.5rem)] rounded-xl bg-slate-900 px-4 py-3 text-center text-xs font-medium text-white shadow-xl sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0">
          {toastMessage}
        </div>
      )}
    </div>
  );
}