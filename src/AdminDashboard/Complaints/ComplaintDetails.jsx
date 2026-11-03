import React from "react";
import ComplaintHeader from "../../components/Admincomponent/ComplaintHeader";
import ComplaintDetails from "../../components/Admincomponent/compliantDescription";
import ComplaintStatusAction from "../../components/Admincomponent/ComplaintStatusAction";

export default function ComplaintHeaders() {
  return (
    <div className="w-full">
      <ComplaintHeader />
      <ComplaintDetails />
      <ComplaintStatusAction/>
    </div>
  );
}