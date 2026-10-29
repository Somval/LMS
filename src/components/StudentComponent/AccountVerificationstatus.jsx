import React from "react";
import { Clock } from "lucide-react";

export default function AccountVerification() {
  return (
    <div className="w-full max-w-[798px] min-h-[121px] rounded-[5px] bg-[#FFE9C2] p-4 sm:p-6 flex items-center">
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full">
        {/* Clock Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFA50045]">
          <Clock
            size={20}
            strokeWidth={1.8}
            className="text-[#FF812D]"
          />
        </div>

        {/* Verification Message */}
        <div className="min-w-0 flex-1">
          <h2 className="font-inter text-sm sm:text-[14px] font-semibold leading-5 text-[#171717]">
            Your account is waiting for activation
          </h2>

          <p className="mt-1 max-w-[440px] font-inter text-xs sm:text-[12px] leading-[17px] text-[#858585]">
            Your parent/guardian needs to complete the subscription payment
            before you can access your courses.
          </p>
        </div>
      </div>
    </div>
  );
}