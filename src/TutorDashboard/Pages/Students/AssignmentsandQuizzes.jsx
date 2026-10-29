import React from "react";
import ActiveAssignments from "../../../components/Tutor/Assignmentstatistics"
import AssignmentHistory from "../../../components/Tutor/AssignmentHistory"
export default function AssignmentQuize(){
    return(
        <div className="bg-white">
           <ActiveAssignments/>
           <AssignmentHistory/>
        </div>
    )
}