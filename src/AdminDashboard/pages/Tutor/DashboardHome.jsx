import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../lib/api";
import Tutorhome from "../../../components/Admincomponent/Tutorheader";
import Tutorstatistic from "./Tutorstatistic";
import ListOfStudent from "./listofstudents";
import AddUserModal from "../../../components/Admincomponent/AddUserModal";

export default function Dashboard() {
  const [data, setData] = useState({ summary: null, tutors: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await api.get("/admin/tutors/list"));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load tutors.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <Tutorhome onAddTutor={() => setShowAdd(true)} />
      <Tutorstatistic summary={data.summary} />
      <ListOfStudent tutors={data.tutors} loading={loading} error={error} />
      {showAdd && <AddUserModal kind="tutor" onClose={() => setShowAdd(false)} onCreated={load} />}
    </div>
  );
}
