import React from "react";
import NeedHelpCard from "../../components/parent/Help";
import LinkCompleteSidebar from "../../components/parent/LinkCompleteSidebar";
import SucessfulLinked from "./successfulLinkchildMessage";

export default function Linkcomplete({
  childData,
  onGoToLinkedChildren,
  onGoToDashboard,
  onSupportClick,
}) {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-[Inter]">
      {/* Container: Stacks vertically on mobile/tablet, aligns horizontally on desktop */}
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-8">
        
        {/* Left Sidebar: Success Info */}
        <div className="w-full max-w-md lg:max-w-[369px] shrink-0">
          <LinkCompleteSidebar />
        </div>

        {/* Center Main Card: Success Message & Profile */}
        <div className="w-full max-w-md lg:max-w-[440px] shrink-0">
          <SucessfulLinked
            childData={childData}
            onGoToLinkedChildren={onGoToLinkedChildren}
            onGoToDashboard={onGoToDashboard}
          />
        </div>

        {/* Right Sidebar: Help & FAQ Card */}
        <div className="w-full max-w-md lg:max-w-[369px] shrink-0">
          <NeedHelpCard onSupportClick={onSupportClick} />
        </div>

      </div>
    </div>
  );
}