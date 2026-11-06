import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";
import AchievementsRewards from "../../components/Admincomponent/AchievementsRewards";
import StudentAchievementsTable from "../../components/Admincomponent/StudentAchievementsTable";

// GET /admin/achievements/overview -> { stats, students }
export default function Achievement() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    api
      .get("/admin/achievements/overview")
      .then((res) => { setData(res); setError(""); })
      .catch((err) => setError(err.message || "Could not load achievements."));
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <AchievementsRewards stats={data?.stats} loading={!data && !error} onCreated={load} />
      {error && (
        <p role="alert" className="mx-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
      <StudentAchievementsTable students={data?.students ?? []} loading={!data && !error} />
    </div>
  );
}
