import React from "react";
import TutorInfoSections from "../../../components/Admincomponent/TutorInfoSections";

export default function TutorInformations({ tutor, onChanged }) {
  return (
    <main className="w-full min-w-0 max-w-full overflow-x-clip bg-[#F5F7FF]">
      <div className="mx-auto flex w-full min-w-0 max-w-[1400px] flex-col gap-3 p-3 sm:gap-4 sm:p-4 lg:gap-5 lg:p-5">
        <TutorInfoSections tutor={tutor} onChanged={onChanged} />
      </div>
    </main>
  );
}
