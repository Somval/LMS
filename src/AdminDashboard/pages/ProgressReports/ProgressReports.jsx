import React from "react";
import ProgressReportsStatistics from "../../../components/Admincomponent/ProgressReportsstatistic";

import StudentProgressTable from "../../../components/Admincomponent/StudentProgressTable";


export default function ProgressReports(){

    return(
        <div>
            <ProgressReportsStatistics/>
            <StudentProgressTable/>
        </div>
    )
}