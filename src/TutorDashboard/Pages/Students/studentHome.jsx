import React from "react";

import StudenStatics from "./Studentstatistics";
import StudentList from "./StudentsList"
export default function StudentHome(){

    return(
        <div>
          <StudenStatics/>
          <StudentList/>
        </div>
    )
}