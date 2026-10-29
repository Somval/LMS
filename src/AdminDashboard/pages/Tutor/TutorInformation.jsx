import React from "react";

import TutorInformation from "../../TutorTabs/TutorInformation";
import SubjectsLevelsTaught from "./SubjectsLevelsTaught";
import Qualifications from "./Qualifications";
import TeachingExperience from "./TeachingExperience";
import VerificationDocuments from "./VerificationDocuments";

export default function TutorInformations() {
  return (
    <main className="w-full min-w-0 max-w-full overflow-x-clip bg-[#F5F7FF]">
      <div className="mx-auto flex w-full min-w-0 max-w-[1400px] flex-col gap-3 p-3 sm:gap-4 sm:p-4 lg:gap-5 lg:p-5">
        {/* Tutor Information */}
        <section className="w-full min-w-0">
          <TutorInformation />
        </section>

        {/* Subjects and Levels Taught */}
        <section className="w-full min-w-0">
          <SubjectsLevelsTaught />
        </section>

        {/* Qualifications */}
        <section className="w-full min-w-0">
          <Qualifications />
        </section>

        {/* Teaching Experience */}
        <section className="w-full min-w-0">
          <TeachingExperience />
        </section>

        {/* Verification Documents */}
        <section className="w-full min-w-0">
          <VerificationDocuments />
        </section>
      </div>
    </main>
  );
}