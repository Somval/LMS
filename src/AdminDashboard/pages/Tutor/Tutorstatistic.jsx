import React from "react";

export default function TutorStats() {
  const stats = [
    {
      title: "Total Tutors",
      value: "86",
      bgColor: "bg-[#E2F5D8]", // Light green card background
      borderColor: "border-[#C5EBAA]",
      circleBg: "bg-[#CEF1B2]", // Lighter green icon circle
      icon: (
        // Users / Group icon
<svg width="39" height="32" viewBox="0 0 39 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.0463 19C22.9123 19 26.0463 15.866 26.0463 12C26.0463 8.13401 22.9123 5 19.0463 5C15.1803 5 12.0463 8.13401 12.0463 12C12.0463 15.866 15.1803 19 19.0463 19Z" fill="#089A3A"/>
<path d="M7.49876 24.3798L7.18715 26.8727C10.1095 30.0262 14.287 32 18.9254 32C23.6775 32 27.9457 29.9283 30.8761 26.6389L30.5937 24.3798C30.281 21.8777 28.154 20 25.6323 20H24.0462L20.9032 21.2572C19.7111 21.734 18.3813 21.734 17.1893 21.2572L14.0462 20H12.4602C9.93854 20 7.81153 21.8777 7.49876 24.3798Z" fill="#089A3A"/>
<path d="M21.6754 2.3468C25.9274 3.49817 29.0552 7.38381 29.0552 12C29.0552 12.5825 29.0053 13.1534 28.9096 13.7088C31.7988 12.8467 33.9051 10.1693 33.9051 7C33.9051 3.13401 30.771 0 26.905 0C24.8254 0 22.9575 0.906904 21.6754 2.3468Z" fill="#089A3A"/>
<path d="M33.7543 25.4061C35.6546 24.4849 37.3452 23.1988 38.7349 21.6389L38.4525 19.3798C38.1397 16.8777 36.0127 15 33.4911 15H31.905L28.762 16.2572C28.5099 16.3581 28.2516 16.4376 27.9898 16.4958C27.8621 16.749 27.724 16.996 27.5761 17.2363C30.7197 18.0184 33.1616 20.6647 33.5795 24.0077L33.7543 25.4061Z" fill="#089A3A"/>
<path d="M16.0465 2.3468C11.8951 3.47096 8.84119 7.26477 8.84119 11.7719C8.84119 12.3406 8.88988 12.898 8.9833 13.4402C6.16245 12.5986 4.10595 9.98447 4.10595 6.89003C4.10595 3.1154 7.16589 0.0554609 10.9405 0.0554609C12.971 0.0554609 14.7947 0.940932 16.0465 2.3468Z" fill="#089A3A"/>
<path d="M3.94615 25.4061C2.44048 24.4849 1.10103 23.1988 -6.10352e-05 21.6389L0.223675 19.3798C0.471484 16.8777 2.15674 15 4.15465 15H5.41133L7.9016 16.2572C8.10135 16.3581 8.30599 16.4376 8.51343 16.4958C8.61456 16.749 8.72396 16.996 8.84118 17.2363C6.35047 18.0184 4.41573 20.6647 4.08464 24.0077L3.94615 25.4061Z" fill="#089A3A"/>
</svg>

      ),
    },
    {
      title: "Active Tutors",
      value: "1,200",
      bgColor: "bg-[#E2F5D8]",
      borderColor: "border-[#C5EBAA]",
      circleBg: "bg-[#CEF1B2]",
      icon: (
        // Checkmark circle icon
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="16" fill="#058B37" />
          <path
            d="M10 16L14 20L22 12"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Pending Applications",
      value: "6",
      bgColor: "bg-[#FBE2E2]", // Light red/pink card background
      borderColor: "border-[#F8C8C8]",
      circleBg: "bg-[#F7C8C8]", // Soft reddish icon circle
      icon: (
        // Alert triangle icon
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3L1 21H23L12 3Z"
            stroke="#E53E3E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="9"
            x2="12"
            y2="14"
            stroke="#E53E3E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="17" r="1" fill="#E53E3E" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#F4F7FC]">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-5 p-6 rounded-2xl border ${item.bgColor} ${item.borderColor}`}
        >
          {/* Circular Icon Container */}
          <div
            className={`w-[72px] h-[72px] rounded-full flex items-center justify-center shrink-0 ${item.circleBg}`}
          >
            {item.icon}
          </div>

          {/* Text Content */}
          <div className="flex flex-col">
            <span className="text-[16px] font-medium text-[#1E293B]">
              {item.title}
            </span>
            <span className="text-[28px] font-bold text-[#0F172A] leading-tight mt-1">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}