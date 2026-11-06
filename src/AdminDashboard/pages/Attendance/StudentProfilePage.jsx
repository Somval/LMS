import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import StudentPage from "../../../components/Admincomponent/StudentProfilePage";
import StudentAttendanceTable from "./StudentAttendanceTable";
import { toRow } from "./attendanceFormat";

export default function StudentProfilePage() {
  const { studentId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get(`/admin/attendance/students/${studentId}`)
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setError("");
      })
      .catch((err) =>
        !cancelled && setError(err.status === 404 ? "This student could not be found." : err.message || "Could not load attendance.")
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [studentId]);

  if (loading) return <p className="p-6 text-sm text-[#667085]">Loading attendance…</p>;
  if (error || !data) {
    return (
      <p role="alert" className="m-6 rounded-md bg-[#FDE7E7] px-4 py-3 text-sm text-[#D14343]">
        {error || "This student could not be found."}
      </p>
    );
  }

  return (
    <div>
      <StudentPage data={data} />
      <StudentAttendanceTable data={data.records.map(toRow)} />
    </div>
  );
}
