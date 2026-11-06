import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Mail, Phone } from "lucide-react";
import Avatar from "../Avatar";

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

const badge = (status) =>
  status === "Active"
    ? "bg-[#E2F5D8] text-[#1E7212]"
    : status === "Pending"
    ? "bg-[#FFF0D9] text-[#B96A08]"
    : "bg-[#FDE2E2] text-[#E53E3E]";

export default function TutorDetailsHeader({ tutor }) {
  const navigate = useNavigate();

  return (
    <section className="w-full min-w-0 bg-[#F5F7FD] font-[Inter,sans-serif] text-[#111827]">
      <div className="border-b border-[#E8EBF2] px-4 py-2 sm:px-5">
        <button
          type="button"
          onClick={() => navigate("/admin/users/tutors")}
          className="inline-flex items-center gap-2 rounded-md text-[12px] font-medium text-black transition-colors hover:text-[#159A42] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2"
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
          <span>Back to Tutors</span>
        </button>
      </div>

      <div className="px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <Avatar
            name={tutor?.name}
            avatarUrl={tutor?.avatarUrl}
            textClassName="text-[16px]"
            className="h-12 w-12 rounded-full sm:h-[50px] sm:w-[50px]"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="break-words text-[24px] font-semibold leading-tight tracking-[-0.5px] text-[#111111] sm:text-[28px]">
                {tutor?.name ?? "Tutor"}
              </h1>
              {tutor?.status && (
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(tutor.status)}`}>{tutor.status}</span>
              )}
            </div>
            <div className="mt-2.5 flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2.5 text-[10px] leading-4 text-[#69737D] sm:text-[11px]">
              <span className="inline-flex min-w-0 items-center gap-2 break-all"><Mail size={15} />{tutor?.email ?? "—"}</span>
              <span className="inline-flex items-center gap-2"><Phone size={15} />{tutor?.phoneNumber || "—"}</span>
              <span className="inline-flex items-center gap-2"><CalendarDays size={15} />Joined {fmtDate(tutor?.joinedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
