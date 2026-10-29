import React from "react";
import { Lock, Users, ChevronRight } from "lucide-react";

export default function AccountSecurity() {
  const handleCardClick = (actionName) => {
    console.log(`Clicked: ${actionName}`);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      
      {/* Section Header */}
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Account & Security
      </h2>

      {/* Action Cards Grid */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">

        {/* Change Password Card */}
        <button
          type="button"
          onClick={() => handleCardClick("Change Password")}
          className="
            group
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            p-5
            text-left
            transition-all
            outline-none
            hover:border-blue-300
            hover:shadow-sm
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <div className="flex min-w-0 items-center gap-4">

            {/* Icon */}
            <div
              className="
                shrink-0
                rounded-xl
                bg-blue-50/50
                p-3
                text-blue-600
                transition-colors
                group-hover:bg-blue-100/50
              "
            >
              <Lock className="h-6 w-6" />
            </div>

            {/* Text */}
            <div className="flex min-w-0 flex-col">
              <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                Change Password
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Update your password regularly
              </p>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight
            className="
              ml-4
              h-5
              w-5
              shrink-0
              text-slate-400
              transition-all
              group-hover:translate-x-1
              group-hover:text-blue-600
            "
          />
        </button>

        {/* Linked Accounts Card */}
        <button
          type="button"
          onClick={() => handleCardClick("Linked Accounts")}
          className="
            group
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            p-5
            text-left
            transition-all
            outline-none
            hover:border-blue-300
            hover:shadow-sm
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <div className="flex min-w-0 items-center gap-4">

            {/* Icon */}
            <div
              className="
                shrink-0
                rounded-xl
                bg-blue-50/50
                p-3
                text-blue-600
                transition-colors
                group-hover:bg-blue-100/50
              "
            >
              <Users className="h-6 w-6" />
            </div>

            {/* Text */}
            <div className="flex min-w-0 flex-col">
              <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                Linked Accounts
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                View parent or guardian linked to your profile
              </p>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight
            className="
              ml-4
              h-5
              w-5
              shrink-0
              text-slate-400
              transition-all
              group-hover:translate-x-1
              group-hover:text-blue-600
            "
          />
        </button>

      </div>
    </div>
  );
}