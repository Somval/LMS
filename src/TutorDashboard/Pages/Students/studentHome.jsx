import React, { useEffect, useState } from "react";
import StudenStatics from "./Studentstatistics";
import StudentList from "./StudentsList";
import { api } from "../../../lib/api";

export default function StudentHome() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/tutors/students")
      .then(setStudents)
      .catch((err) => setError(err.message || "Could not load your students."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {error && <p role="alert" className="mx-6 mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <StudenStatics students={students} />
      <StudentList students={students} loading={loading} />
    </div>
  );
}
