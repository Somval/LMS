import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../../lib/api";
import Attendancestatistics from "./Attendancestatistics";
import AttendanceList from "./AttendanceList";
import { thisWeek, toRow } from "./attendanceFormat";

export default function AttendanceHome() {
  const [range, setRange] = useState(thisWeek);
  const [data, setData] = useState({ summary: null, records: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!range.from || !range.to) return undefined;
    let cancelled = false;
    setLoading(true);
    api
      .get("/admin/attendance", { from: range.from, to: range.to })
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setError("");
      })
      .catch((err) => !cancelled && setError(err.message || "Could not load attendance."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [range.from, range.to]);

  const rows = useMemo(() => data.records.map(toRow), [data.records]);
  const isThisWeek = range.from === thisWeek().from && range.to === thisWeek().to;

  return (
    <div>
      <Attendancestatistics summary={data.summary} rangeLabel={isThisWeek ? "This week" : "Selected dates"} />
      <AttendanceList data={rows} loading={loading} error={error} range={range} onRangeChange={setRange} />
    </div>
  );
}
