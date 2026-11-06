import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../lib/api";

import SubjectStas from "../../../components/Admincomponent/subjectsstats";

import SubjectList from "../../../components/Admincomponent/subjectlist";

// Loads the subjects once and shares them with the stat cards and the list below them.
export default function SubjectPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setSubjects(await api.get("/admin/subjects"));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load the subjects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <SubjectStas subjects={subjects} loading={loading} />

      <SubjectList
        subjects={subjects}
        loading={loading}
        error={error}
        onChanged={load}
      />
    </div>
  );
}
