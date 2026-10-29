import React from "react";
import AssignmentStats from "./AssignmentsStats"
import AssignmentsTableComponent from "./AssignmentTable";

export default function AssignmentHome(){

    return(
        <div>
            <AssignmentStats/>
            <AssignmentsTableComponent/>
        </div>
    )
}