import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../lib/api";
import Parentstats from "./parentstats";
import ParentsTable from "./ParentsTable";
import AddUserModal from "../../../components/Admincomponent/AddUserModal";

export default function Parents() {
  const [data, setData] = useState({ summary: null, parents: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await api.get("/admin/parents"));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load parents.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <Parentstats summary={data.summary} onAddParent={() => setShowAdd(true)} />
      <ParentsTable parents={data.parents} loading={loading} error={error} />
      {showAdd && <AddUserModal kind="parent" onClose={() => setShowAdd(false)} onCreated={load} />}
    </div>
  );
}
