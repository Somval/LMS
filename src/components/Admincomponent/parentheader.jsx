
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  CalendarDays,
  ContactRound,
  Phone,
} from "lucide-react";

export default function ParentDetails() {
  const navigate = useNavigate();

  // Parent details
  const parent = {
    name: "Daniel Smith",
    email: "daniel.smith@email.com",
    joinedDate: "12 Mar 2024",
    parentId: "TID1010111",
    phone: "+44 7700 123456",
  };

  const information = [
    {
      icon: Mail,
      label: parent.email,
      breakText: true,
    },
    {
      icon: CalendarDays,
      label: `Joined ${parent.joinedDate}`,
    },
    {
      icon: ContactRound,
      label: `Parent ID: ${parent.parentId}`,
    },
    {
      icon: Phone,
      label: `Phone No.: ${parent.phone}`,
    },
  ];

  return (
    <section className="min-h-full w-full min-w-0 bg-[#F5F7FD] font-[Inter,sans-serif] text-[#111827]">
      {/* Back Navigation */}
      <div className="border-b border-[#E8EBF2] px-5 py-5 sm:px-7">
        <button
          type="button"
          onClick={() => navigate("/admin/users/parents")}
          className="inline-flex items-center gap-3 text-sm font-semibold text-black transition-colors hover:text-[#159A42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-4"
        >
          <ArrowLeft size={25} strokeWidth={1.7} />
          <span>Back to Parents</span>
        </button>
      </div>

      {/* Parent Profile Header */}
      <div className="w-full px-5 py-6 sm:px-7 sm:py-7">
        <div className="flex w-full min-w-0 flex-col items-start gap-4 sm:flex-row sm:gap-5">
          {/* Parent Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9] sm:h-24 sm:w-24">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="24" cy="16" r="10" fill="#D9D9D9" />
              <path
                d="M6 43C6 33.0589 14.0589 25 24 25C33.9411 25 42 33.0589 42 43"
                fill="#D9D9D9"
              />
            </svg>
          </div>

          {/* Parent Information */}
          <div className="min-w-0 flex-1 pt-0 sm:pt-2">
            <h1 className="break-words text-[26px] font-semibold leading-[1.2] tracking-[-0.6px] text-black sm:text-[30px]">
              {parent.name}
            </h1>

            {/* Contact and Parent Metadata */}
            <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-6 gap-y-3 text-sm font-normal leading-5 text-[#69737D] sm:gap-x-7">
              {information.map(({ icon: Icon, label, breakText }) => (
                <div
                  key={label}
                  className="inline-flex min-w-0 items-center gap-3"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#69737D]"
                    aria-hidden="true"
                  />

                  <span
                    className={
                      breakText
                        ? "min-w-0 break-all sm:break-normal"
                        : "min-w-0"
                    }
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
