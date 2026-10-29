
import React from "react";

export default function ParentsOverview() {
  const stats = [
    {
      title: "Total Parents",
      value: "86",
      type: "users",
      cardColor: "bg-[#E5F6DC]",
      borderColor: "border-[#C4E3B9]",
      iconBg: "bg-[#D0F5B8]",
      iconColor: "#079B43",
    },
    {
      title: "Active Parents",
      value: "1,200",
      type: "check",
      cardColor: "bg-[#E5F6DC]",
      borderColor: "border-[#C4E3B9]",
      iconBg: "bg-[#D0F5B8]",
      iconColor: "#079B43",
    },
    {
      title: "Inactive Parents",
      value: "6",
      type: "warning",
      cardColor: "bg-[#F7DCDC]",
      borderColor: "border-[#E8BFC0]",
      iconBg: "bg-[#F8C4B9]",
      iconColor: "#FF1717",
    },
  ];

  const renderIcon = (type, color) => {
    if (type === "users") {
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="h-9 w-9"
          aria-hidden="true"
        >
          <path
            d="M14.5 19.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
            fill={color}
          />
          <path
            d="M27 18a5.5 5.5 0 1 0-3.8-9.5 8.6 8.6 0 0 1 0 12.9c1.4-.6 2.7-1.7 3.8-3.4Z"
            fill={color}
          />
          <path
            d="M2.5 29.5c0-5.5 5.4-9 12-9s12 3.5 12 9v1.2c0 1.3-1 2.3-2.3 2.3H4.8c-1.3 0-2.3-1-2.3-2.3v-1.2Z"
            fill={color}
          />
          <path
            d="M27 22c5.5.2 10 3.4 10 8v.8c0 1.2-.9 2.2-2.2 2.2h-5.5c.5-.7.7-1.5.7-2.3v-1.2c0-2.9-1.1-5.3-3-7.5Z"
            fill={color}
          />
        </svg>
      );
    }

    if (type === "check") {
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="h-9 w-9"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="15" fill={color} />
          <path
            d="m12.5 20.5 5 5 10-11"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <path
          d="M17.2 5.7a3.2 3.2 0 0 1 5.6 0l14 25a3.2 3.2 0 0 1-2.8 4.8H6a3.2 3.2 0 0 1-2.8-4.8l14-25Z"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M20 14v9"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="28" r="1.4" fill={color} />
      </svg>
    );
  };

  return (
    <section className=" w-full bg-[#F5F7FC] px-5 py-5 sm:px-8">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.5px] text-black">
            Parents
          </h1>

          <p className="mt-1 text-[17px] leading-6 text-[#5B7591]">
            View and manage all parents on the platform.
          </p>
        </div>

        <button
          type="button"
          className="flex h-[54px] w-full shrink-0 items-center justify-center gap-6 rounded-lg bg-[#004509] px-7 text-[16px] font-medium text-white transition-colors hover:bg-[#003607] sm:w-[208px]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <span>Add Tutor</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 px-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`flex min-h-[124px] items-center gap-3 rounded-lg border ${stat.borderColor} ${stat.cardColor} px-5 py-5 sm:gap-3 sm:px-6`}
          >
            {/* Icon */}
            <div
              className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
            >
              {renderIcon(stat.type, stat.iconColor)}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-[15px] font-normal leading-6 text-black">
                {stat.title}
              </p>

              <p className="mt-1 text-[23px] font-semibold leading-7 tracking-[-0.4px] text-black">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
