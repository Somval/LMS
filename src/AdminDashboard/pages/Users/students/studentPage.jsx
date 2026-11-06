import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../../lib/api";
import StudentsTable from "./StudentsTable";
import Students from "./students";

export default function StudentPage() {
  const [data, setData] = useState({ summary: null, students: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setData(await api.get("/admin/students"));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load students.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section className="mx-auto flex w-full min-w-0 flex-col gap-5">
      {/* Students Page Header and Summary Cards */}
      <div className="w-full min-w-0">
        <Students summary={data.summary} />
      </div>

      {/* Students Table */}
      <div className="w-full min-w-0">
        <StudentsTable students={data.students} loading={loading} error={error} onChanged={load} />
      </div>
    </section>
  );
}
