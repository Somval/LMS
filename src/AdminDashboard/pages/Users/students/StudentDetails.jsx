import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../lib/api";
import StudentHeader from "../../../../components/Admincomponent/StudentDetailsHeader";
import SwitchTabs from "../../../../components/Admincomponent/switchtabs";

export default function StudentDetails() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setStudent(await api.get(`/admin/students/${studentId}`));
      setError("");
    } catch (err) {
      setError(err.status === 404 ? "This student could not be found." : err.message || "Could not load the student.");
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    setLoading(true);
    setStudent(null);
    load();
  }, [load]);

  if (loading) return <p className="p-6 text-sm text-[#667085]">Loading student…</p>;
  if (error || !student) {
    return (
      <p role="alert" className="m-6 rounded-md bg-[#FDE7E7] px-4 py-3 text-sm text-[#D14343]">
        {error || "This student could not be found."}
      </p>
    );
  }

  return (
    <div>
      <StudentHeader student={student} />
      <SwitchTabs student={student} onChanged={load} />
    </div>
  );
}
