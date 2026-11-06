
import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

// Cards built from the tutor's real review stats.
const buildStats = (stats, loading) => [
  {
    id: 'rating',
    label: 'Average Rating',
    value: loading ? '…' : stats?.average != null ? stats.average.toFixed(1) : '–',
    suffix: stats?.average != null ? '/ 5' : '',
    icon: Star,
    iconColor: 'text-[#FACC15]',
    iconBg: 'bg-[#FFFBEB]',
    iconFill: true,
  },
  {
    id: 'reviews',
    label: 'Total Reviews',
    value: loading ? '…' : String(stats?.count ?? 0),
    suffix: '',
    icon: MessageSquare,
    iconColor: 'text-[#10B981]',
    iconBg: 'bg-[#ECFDF5]',
    iconFill: false,
  },
];

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div
      className="
        group flex min-w-0 flex-1 items-center gap-3
        rounded-2xl border border-[#E2E8F0] bg-white
        p-4 sm:gap-3.5 sm:p-5
        shadow-[0_2px_8px_rgba(15,23,42,0.03)]
        transition-shadow duration-200
        hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)]
      "
    >
      {/* Icon */}
      <div
        className={`
          flex h-11 w-11 shrink-0 items-center justify-center
          rounded-xl sm:h-12 sm:w-12
          ${stat.iconBg}
        `}
      >
        <Icon
          aria-hidden="true"
          className={`
            h-5 w-5 sm:h-6 sm:w-6
            ${stat.iconColor}
            ${stat.iconFill ? 'fill-current' : ''}
          `}
          strokeWidth={2.2}
        />
      </div>

      {/* Stat details */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="mb-1 truncate text-xs font-medium leading-4 text-[#64748B] sm:text-[13px]">
          {stat.label}
        </p>

        <div className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-[22px]">
            {stat.value}
          </span>

          {stat.suffix && (
            <span className="text-sm font-semibold leading-tight text-[#64748B] sm:text-base">
              {stat.suffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReviewStatsCards({ stats: reviewStats, loading = false }) {
  const stats = buildStats(reviewStats, loading);
  return (
    <section
      aria-label="Review statistics"
      className="
        grid w-full min-w-0 grid-cols-1 gap-3
        sm:grid-cols-2 sm:gap-4
      "
    >
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </section>
  );
}
