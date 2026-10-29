import React from "react";
import Tutorhome from "../../../components/Admincomponent/Tutorheader";
import Tutorstatistic from "./Tutorstatistic";
import ListOfStudent from "./listofstudents"

export default function Dashboard(){

    return(
        <div>
            <Tutorhome/>
            <Tutorstatistic/>
            <ListOfStudent/>
        </div>
    )
}