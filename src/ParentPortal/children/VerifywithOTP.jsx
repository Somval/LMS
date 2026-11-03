import React from "react";
import VerificationInfo from "../../components/parent/VerificationRequiredsidbar";
import VerifywithOTP from "./verificationcode";
import NeedHelpCard from "../../components/parent/Help";

export default function VerifyOtp({
  onNext,
  onResend,
  onChangeLearnerId,
  learnerId,
  error,
  setError,
  onSupportClick
}) {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-[Inter]">
      {/* Container: Stacks vertically on mobile/tablet, aligns horizontally on desktop */}
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-8">
        
        {/* Verification Info Sidebar */}
        <div className="w-full sm:max-w-md lg:max-w-[369px] shrink-0">
          <VerificationInfo />
        </div>

        {/* Step 2 OTP Form Content */}
        <div className="w-full sm:max-w-md lg:max-w-[440px] shrink-0">
          <VerifywithOTP
            onNext={onNext}
            onResend={onResend}
            onChangeLearnerId={onChangeLearnerId}
            learnerId={learnerId}
            error={error}
            setError={setError}
          />
        </div>

        {/* Help & FAQ Card */}
        <div className="w-full sm:max-w-md lg:max-w-[369px] shrink-0">
          <NeedHelpCard onSupportClick={onSupportClick} />
        </div>

      </div>
    </div>
  );
}