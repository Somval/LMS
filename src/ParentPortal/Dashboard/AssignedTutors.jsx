
import React from "react";
import TutorImage from "../../assets/images/03a69e3af2677c18576441e05e66092043930940.jpg";
import { MessageSquare, Star, Flag } from "lucide-react";

export default function AssignedTutor() {
  const tutorsData = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Mathematics Tutor",
      rating: 4.9,
      reviews: "120+ reviews",
      imageUrl: TutorImage,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Mathematics Tutor",
      rating: 4.9,
      reviews: "120+ reviews",
      imageUrl: TutorImage,
    },
  ];

  const actions = [
    {
      label: "Message",
      Icon: MessageSquare,
      color: "text-purple-600",
      border: "border-purple-200",
      hover: "hover:bg-purple-50 hover:border-purple-300",
      ring: "focus-visible:ring-purple-500",
    },
    {
      label: "Rate",
      Icon: Star,
      color: "text-amber-500",
      border: "border-amber-200",
      hover: "hover:bg-amber-50 hover:border-amber-300",
      ring: "focus-visible:ring-amber-500",
    },
    {
      label: "Report",
      Icon: Flag,
      color: "text-red-500",
      border: "border-red-200",
      hover: "hover:bg-red-50 hover:border-red-300",
      ring: "focus-visible:ring-red-500",
    },
  ];

  return (
    <section className="box-border mb-5 lg:mb-1 w-full min-w-0 max-w-none rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5 lg:p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
          Assigned Tutors
        </h2>

        <span className="shrink-0 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500 sm:text-sm">
          {tutorsData.length} tutors
        </span>
      </div>

      {/* TUTOR CARDS */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {tutorsData.map((tutor) => (
          <article
            key={tutor.id}
            className="box-border flex min-h-[170px] w-full min-w-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-3 transition-shadow duration-200 hover:shadow-md sm:min-h-[180px] sm:p-4 lg:p-5"
          >
            {/* TUTOR INFORMATION */}
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={tutor.imageUrl}
                alt={tutor.name}
                loading="lazy"
                className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-gray-100 sm:h-12 sm:w-12"
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold leading-5 text-gray-900 sm:text-base">
                  {tutor.name}
                </h3>

                <p className="mt-0.5 truncate text-xs text-gray-500 sm:text-sm">
                  {tutor.role}
                </p>

                {/* RATING */}
                <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-1.5">
                  <Star
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400"
                    strokeWidth={2}
                  />

                  <span className="text-xs font-semibold text-gray-800">
                    {tutor.rating.toFixed(1)}
                  </span>

                  <span className="text-[10px] text-gray-400 sm:text-xs">
                    ({tutor.reviews})
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {actions.map(({ label, Icon, color, border, hover, ring }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`${label} ${tutor.name}`}
                  className={`flex min-h-[48px] min-w-0 items-center justify-center gap-1.5 rounded-lg border ${border} px-1.5 py-2 ${color} ${hover} transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${ring} sm:gap-2 sm:px-2`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 ${
                      label === "Rate" ? "fill-amber-100" : ""
                    }`}
                    strokeWidth={2}
                  />

                  <span className="text-[10px] font-semibold leading-none sm:text-xs">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
