import React from "react";
import Lessonstatistics from "../../../components/Tutor/lessonstatistics"
import Lessonhistory from "../../../components/Tutor/lessonhistory"
export default function LessonHistory(){

    return(
        <div  className="bg-white">   <Lessonstatistics/>
      <Lessonhistory/>
      </div>
   
    )
}