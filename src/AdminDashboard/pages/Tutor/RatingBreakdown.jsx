
import React from 'react';

const ratingData = [
  { stars: 5, percentage: 22, count: 28 },
  { stars: 4, percentage: 72, count: 92 },
  { stars: 3, percentage: 4, count: 5 },
  { stars: 2, percentage: 1, count: 2 },
  { stars: 1, percentage: 1, count: 1 },
];

export default function RatingBreakdown() {
  return (
    <section
      aria-labelledby="rating-breakdown-title"
      className="w-full min-w-0 font-sans"
    >
      <div
        className="
          w-full min-w-0 rounded-2xl
          border border-[#E2E8F0]
          bg-white p-4
          shadow-[0_2px_12px_rgba(15,23,42,0.03)]
          sm:p-6
          lg:p-8
        "
      >
        {/* Header */}
        <div className="mb-6 sm:mb-7">
          <h2
            id="rating-breakdown-title"
            className="text-lg font-bold leading-6 tracking-tight text-[#0F172A] sm:text-xl"
          >
            Rating Breakdown
          </h2>

          <p className="mt-1.5 text-sm leading-5 text-[#64748B]">
            See how customers rated their experience.
          </p>
        </div>

        {/* Rating rows */}
        <div className="flex flex-col gap-5 sm:gap-5">
          {ratingData.map((item) => (
            <div
              key={item.stars}
              className="
                grid min-w-0 grid-cols-[48px_minmax(0,1fr)_76px]
                items-center gap-3
                sm:grid-cols-[64px_minmax(0,1fr)_100px]
                sm:gap-5
              "
            >
              {/* Star label */}
              <span className="whitespace-nowrap text-xs font-medium text-[#64748B] sm:text-sm">
                {item.stars} {item.stars === 1 ? 'star' : 'stars'}
              </span>

              {/* Progress bar */}
              <div
                className="h-2.5 min-w-0 overflow-hidden rounded-full bg-[#EEF2F6] sm:h-3"
                role="progressbar"
                aria-label={`${item.stars}-star ratings`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={item.percentage}
              >
                <div
                  className="
                    h-full rounded-full bg-[#1D61E7]
                    transition-[width] duration-500 ease-out
                  "
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              {/* Percentage and count */}
              <span className="whitespace-nowrap text-right text-xs font-medium tabular-nums text-[#64748B] sm:text-sm">
                {item.percentage}%{' '}
                <span className="text-[#94A3B8]">({item.count})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
