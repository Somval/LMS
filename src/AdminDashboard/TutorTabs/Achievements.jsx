import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";
import TutorAchivementstats from "../../components/Admincomponent/TutorAchievementstats";
import Achievementlist from "../pages/Tutor/Achievementlist";

// Badges and rewards this tutor created: GET /rewards (admins get the whole catalogue), filtered to this tutor.
export default function Achievements({ tutor }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!tutor?.id) return;
    try {
      const all = await api.get("/rewards");
      setItems(all.filter((a) => a.createdById === tutor.id));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load achievements.");
    } finally {
      setLoading(false);
    }
  }, [tutor?.id]);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <TutorAchivementstats items={items} loading={loading} />
      <Achievementlist items={items} loading={loading} error={error} onChanged={load} />
    </div>
  );
}
