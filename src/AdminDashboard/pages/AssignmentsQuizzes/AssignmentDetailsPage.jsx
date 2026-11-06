import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import AssignmentDetailsView from "../../../components/Admincomponent/AssignmentDetailsView";

export default function AssignmentDetails() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get(`/admin/assignments/${id}`)
      .then((res) => {
        if (cancelled) return;
        setAssignment(res);
        setError("");
      })
      .catch((err) =>
        !cancelled && setError(err.status === 404 ? "This assignment could not be found." : err.message || "Could not load the assignment.")
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p className="p-6 text-sm text-[#667085]">Loading assignment…</p>;
  if (error || !assignment) {
    return (
      <p role="alert" className="m-6 rounded-md bg-[#FDE7E7] px-4 py-3 text-sm text-[#D14343]">
        {error || "This assignment could not be found."}
      </p>
    );
  }
  return <AssignmentDetailsView assignment={assignment} />;
}
