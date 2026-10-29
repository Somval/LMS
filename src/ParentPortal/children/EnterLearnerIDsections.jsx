import React from "react";
import SecuritySidebar from "../../components/parent/Securelylinksidebar";
import EnterLearnerID from "./EnterLearnerID";
import NeedHelpCard from "../../components/parent/Help";

export default function EnterId({
  onNext,
  learnerId,
  setLearnerId,
  relationship,
  setRelationship,
  error,
  setError,
  onSupportClick,
}) {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-[Inter]">
      {/* 3-Column Container: Stacks vertically on mobile/tablet, aligns horizontally on desktop */}
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-8">
        
        {/* Security Info Sidebar */}
        <div className="w-full max-w-md lg:max-w-[369px] shrink-0">
          <SecuritySidebar />
        </div>

        {/* Step 1 Form Content */}
        <div className="w-full max-w-md lg:max-w-[440px] shrink-0">
          <EnterLearnerID
            onNext={onNext}
            learnerId={learnerId}
            setLearnerId={setLearnerId}
            relationship={relationship}
            setRelationship={setRelationship}
            setError={setError}
          />
        </div>

        {/* Help & FAQ Card */}
        <div className="w-full max-w-md lg:max-w-[369px] shrink-0">
          <NeedHelpCard onSupportClick={onSupportClick} />
        </div>

      </div>
    </div>
  );
}