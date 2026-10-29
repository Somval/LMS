import React, { useState } from 'react';
import Assignments from "./Assignmentslist";
import SelctChild from "./SelectChild";

export default function AssignmentInitor() {
  const [isDetailView, setIsDetailView] = useState(false);

  return (
    <div>
      {/* Hide SelctChild when an assignment detail is open */}
      {!isDetailView && (
        <div className="mb-10">
          <SelctChild />
        </div>
      )}

      <Assignments onViewChange={setIsDetailView} />
    </div>
  );
}