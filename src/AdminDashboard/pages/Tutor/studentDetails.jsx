import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import TutorHeader from "../../../components/Admincomponent/TutorDetailsHeader";
import Tutortabs from "../../../components/Admincomponent/Tutortabs";

export default function TutorDetails() {
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setTutor(await api.get(`/admin/tutors/${tutorId}`));
      setError("");
    } catch (err) {
      setError(err.status === 404 ? "This tutor could not be found." : err.message || "Could not load the tutor.");
    } finally {
      setLoading(false);
    }
  }, [tutorId]);

  useEffect(() => {
    setLoading(true);
    setTutor(null);
    load();
  }, [load]);

  if (loading) return <p className="p-6 text-sm text-[#667085]">Loading tutor…</p>;
  if (error || !tutor) {
    return (
      <p role="alert" className="m-6 rounded-md bg-[#FDE7E7] px-4 py-3 text-sm text-[#D14343]">
        {error || "This tutor could not be found."}
      </p>
    );
  }

  return (
    <div>
      <TutorHeader tutor={tutor} />
      <Tutortabs tutor={tutor} onChanged={load} />
    </div>
  );
}
