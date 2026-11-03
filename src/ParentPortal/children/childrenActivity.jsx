import React, { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { api } from "../../lib/api";
import ChildrenOverviewTable from "./ChildrenOverview";
import LinkedChildren from "./LinkedChildren";
import Activity from "./Activity";

export default function Children() {
  const [data, setData] = useState(null); // { children, upcomingClasses, recentActivity }
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setData(null);
    setError("");
    api
      .get("/dashboard/parent")
      .then(setData)
      .catch((err) => setError(err.message || "Could not load your children."));
  }, []);

  useEffect(load, [load]);

  if (error) {
    return (
      <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={load}
            className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center p-16">
        <Loader2 className="h-7 w-7 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div>
      <LinkedChildren kids={data.children} />

      {data.children.length > 0 && (
        <>
          <ChildrenOverviewTable kids={data.children} />
          <Activity data={data} />
        </>
      )}
    </div>
  );
}
