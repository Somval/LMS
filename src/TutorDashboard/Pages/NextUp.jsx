import React from "react";

const NextUp = () => {
  const items = [
    {
      id: 1,
      month: "May",
      day: "15",
      title: "Quiz: Linear Equations",
      subtitle: "Math – Year 1",
      badge: "Tomorrow",
    },
    {
      id: 2,
      month: "May",
      day: "15",
      title: "Submit progress reports",
      subtitle: "All Subjects",
      badge: "Friday",
    },
    {
      id: 3,
      month: "May",
      day: "15",
      title: "Quiz: Linear Equations",
      subtitle: "Math – Year 1",
      badge: "Tomorrow",
    },
    {
      id: 4,
      month: "May",
      day: "15",
      title: "Quiz: Linear Equations",
      subtitle: "Math – Year 1",
      badge: "Tomorrow",
    },
  ];

  return (
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Header */}
      <div className="shrink-0 px-4 pt-5 sm:px-5 sm:pt-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Next Up
        </h2>
      </div>

      {/* Header Divider */}
      <div className="mx-4 mt-7 border-b border-slate-100 sm:mx-5" />

      {/* Items */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className="
              flex
              min-w-0
              items-center
              gap-3
              border-b
              border-slate-100
              px-4
              py-4
              last:border-b-0
              sm:gap-4
              sm:px-5
            "
          >
            {/* Calendar */}
            <div
              className="
                w-16
                shrink-0
                overflow-hidden
                rounded-lg
                bg-white
                text-center
                shadow-[0_4px_10px_rgba(0,0,0,0.10)]
              "
            >
              {/* Month */}
              <div className="bg-purple-600 px-2 py-1 text-sm font-medium leading-5 text-white">
                {item.month}
              </div>

              {/* Day */}
              <div className="px-2 py-1.5 text-xl font-bold leading-6 text-slate-900">
                {item.day}
              </div>
            </div>

            {/* Information */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold leading-5 text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 truncate text-sm font-medium leading-4 text-slate-400">
                {item.subtitle}
              </p>
            </div>

            {/* Status */}
            <div className="shrink-0">
              <span
                className="
                  inline-flex
                  min-w-[105px]
                  items-center
                  justify-center
                  rounded-lg
                  bg-emerald-50
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-emerald-500
                  sm:min-w-[115px]
                "
              >
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextUp;