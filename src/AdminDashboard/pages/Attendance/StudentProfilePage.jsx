import React from "react";
import StudentPage from "../../../components/Admincomponent/StudentProfilePage";
import StudentAttendanceTable from "./StudentAttendanceTable";

export default function StudentProfilePage(){

    return(
        <div>
            <StudentPage/>

            <StudentAttendanceTable/>
        </div>
    )
}