import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Headphones,
  ChevronRight,
  LogOut,
  Trash2,
  User,
} from "lucide-react";

export default function PrivacySupportAccount() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleItemClick = () => {};

  const handleAction = (action) => {
    if (action === "Log Out") {
      logout();
      navigate("/student-auth/login", { replace: true });
    }
  };

  const supportItems = [
    { title: "Privacy & Terms" },
    { title: "Help & Support" },
    { title: "Report an Issue" },
  ];

  return (
    <div className="flex w-full flex-col gap-6">

      {/* =========================================
          CARD 1: PRIVACY & SUPPORT
      ========================================== */}
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

        {/* Header */}
        <div className="mb-6 flex items-center gap-3.5">
          
          <div className="shrink-0 rounded-xl bg-blue-50/60 p-2.5 text-blue-600">
            <Headphones className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900">
              Privacy & Support
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Find help, report issues, and review our policies
            </p>
          </div>
        </div>

        {/* Support Items */}
        <div className="divide-y divide-slate-100">
          {supportItems.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => handleItemClick(item.title)}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                px-3
                py-4
                text-left
                transition-colors
                outline-none
                hover:bg-slate-50
                focus:ring-2
                focus:ring-blue-100
              "
            >
              <span className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-base">
                {item.title}
              </span>

              <span className="ml-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600">
                <ChevronRight className="h-5 w-5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================
          CARD 2: ACCOUNT
      ========================================== */}
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

          {/* Account Information */}
          <div className="flex min-w-0 items-center gap-4">

            <div className="shrink-0 rounded-2xl bg-rose-50/70 p-3.5 text-rose-500 sm:p-4">
              <User className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-bold text-slate-900">
                Account
              </h2>

              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Manage your account status.
              </p>
            </div>
          </div>

          {/* Account Actions */}
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">

            {/* Log Out */}
            <button
              type="button"
              onClick={() => handleAction("Log Out")}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-blue-500
                px-5
                py-2.5
                text-sm
                font-medium
                text-blue-600
                transition-colors
                outline-none
                hover:bg-blue-50
                focus:ring-2
                focus:ring-blue-100
                sm:w-auto
              "
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>

            {/* Deactivate Account */}
            <button
              type="button"
              onClick={() => handleAction("Deactivate Account")}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-rose-400
                px-5
                py-2.5
                text-sm
                font-medium
                text-rose-500
                transition-colors
                outline-none
                hover:bg-rose-50
                focus:ring-2
                focus:ring-rose-100
                sm:w-auto
              "
            >
              <Trash2 className="h-4 w-4" />
              <span>Deactivate Account</span>
            </button>

          </div>
        </div>
      </div>

    </div>
  );
}