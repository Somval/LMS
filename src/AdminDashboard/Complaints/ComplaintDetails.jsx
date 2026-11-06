import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import ComplaintHeader from "../../components/Admincomponent/ComplaintHeader";
import ComplaintDetails from "../../components/Admincomponent/compliantDescription";
import ComplaintStatusAction from "../../components/Admincomponent/ComplaintStatusAction";

export default function ComplaintHeaders() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setComplaint(await api.get(`/admin/complaints/${id}`));
      setError("");
    } catch (err) {
      setError(err.status === 404 ? "This complaint could not be found." : err.message || "Could not load the complaint.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setComplaint(null);
    load();
  }, [load]);

  if (loading) return <p className="p-6 text-sm text-[#667085]">Loading complaint…</p>;
  if (error || !complaint) {
    return (
      <p role="alert" className="m-6 rounded-md bg-[#FDE7E7] px-4 py-3 text-sm text-[#D14343]">
        {error || "This complaint could not be found."}
      </p>
    );
  }

  return (
    <div className="w-full">
      <ComplaintHeader complaint={complaint} />
      <ComplaintDetails complaint={complaint} />
      <ComplaintStatusAction complaint={complaint} onChanged={load} />
    </div>
  );
}
