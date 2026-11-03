import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, ExternalLink, Users, Video } from "lucide-react";
import { api } from "../../../lib/api";
import { classStatusLabel, fullDate, openLink, timeRange } from "../../../StudentPortal/classFormat";

const toLocalInput = (iso) => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const STATUSES = [
  { key: "PRESENT", label: "Present", on: "bg-emerald-600 text-white border-emerald-600" },
  { key: "LATE", label: "Late", on: "bg-amber-500 text-white border-amber-500" },
  { key: "ABSENT", label: "Absent", on: "bg-red-600 text-white border-red-600" },
];

const card = "rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6";
const input = "h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500";
const btn = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:opacity-60";

export default function ClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [roster, setRoster] = useState([]);
  const [marks, setMarks] = useState({}); // studentId -> status
  const [links, setLinks] = useState({ meetingUrl: "", recordingUrl: "" });
  const [times, setTimes] = useState({ startsAt: "", endsAt: "" });
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const [c, r] = await Promise.all([api.get(`/classes/${id}`), api.get(`/attendance/classes/${id}`)]);
      setCls(c);
      setRoster(r);
      setMarks(Object.fromEntries(r.filter((s) => s.status).map((s) => [s.studentId, s.status])));
      setLinks({ meetingUrl: c.meetingUrl ?? "", recordingUrl: c.recordingUrl ?? "" });
      setTimes({ startsAt: toLocalInput(c.startsAt), endsAt: toLocalInput(c.endsAt) });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Could not load this class." });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const run = async (key, fn, okText) => {
    setBusy(key);
    setMessage({ type: "", text: "" });
    try {
      await fn();
      await load();
      if (okText) setMessage({ type: "success", text: okText });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Something went wrong." });
    } finally {
      setBusy("");
    }
  };

  const patch = (body, okText, key = "patch") => run(key, () => api.patch(`/classes/${id}`, body), okText);

  const saveAttendance = () => {
    const records = Object.entries(marks).map(([studentId, status]) => ({ studentId: Number(studentId), status }));
    if (!records.length) return setMessage({ type: "error", text: "Mark at least one student first." });
    run("attendance", () => api.post(`/attendance/classes/${id}`, { records }), "Attendance saved.");
  };

  const markAll = (status) => setMarks(Object.fromEntries(roster.map((s) => [s.studentId, status])));

  if (loading) return <p className="py-10 text-center text-sm text-slate-400">Loading…</p>;
  if (!cls) return <p role="alert" className="py-10 text-center text-sm text-red-600">{message.text || "Class not found."}</p>;

  const started = new Date(cls.startsAt) <= new Date();
  const cancelled = cls.status === "CANCELLED";
  const finished = cls.status === "COMPLETED";

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5">
      <button type="button" onClick={() => navigate("/tutor/class")} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Back to classes
      </button>

      {message.text && (
        <p role={message.type === "error" ? "alert" : "status"} className={`rounded-md px-3 py-2 text-sm ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"}`}>
          {message.text}
        </p>
      )}

      {/* Overview */}
      <section className={card}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{cls.subject.name}</p>
            <h1 className="mt-1 text-xl font-bold text-slate-900">{cls.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{fullDate(cls.startsAt)}</span>
              <span>{timeRange(cls.startsAt, cls.endsAt)}</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" />{roster.length} student{roster.length === 1 ? "" : "s"}</span>
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{classStatusLabel(cls)}</span>
        </div>

        {!cancelled && !finished && (
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" disabled={!!busy} className={`${btn} bg-blue-600 text-white hover:bg-blue-700`}
              onClick={async () => { await patch({ status: "LIVE" }, "Class marked as live.", "live"); openLink(cls.meetingUrl); }}>
              <Video className="h-4 w-4" /> Start class
            </button>
            {cls.status === "LIVE" && (
              <button type="button" disabled={!!busy} className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}
                onClick={() => patch({ status: "COMPLETED" }, "Class marked as finished.", "done")}>
                <CheckCircle2 className="h-4 w-4" /> Mark as finished
              </button>
            )}
            <button type="button" disabled={!!busy} className={`${btn} border border-red-200 text-red-600 hover:bg-red-50`}
              onClick={() => window.confirm("Cancel this class? Your students will be notified.") && patch({ status: "CANCELLED" }, "Class cancelled.", "cancel")}>
              Cancel class
            </button>
          </div>
        )}
        {finished && !cancelled && <p className="mt-4 text-sm text-slate-500">This class is finished.</p>}
        {cancelled && <p className="mt-4 text-sm text-red-600">This class was cancelled.</p>}
      </section>

      {/* Links and time */}
      <section className={card}>
        <h2 className="mb-4 text-base font-bold text-slate-900">Links and schedule</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold text-slate-600">Meeting link
            <input className={`${input} mt-1`} type="url" value={links.meetingUrl} placeholder="https://meet.google.com/…" onChange={(e) => setLinks((l) => ({ ...l, meetingUrl: e.target.value }))} />
          </label>
          <label className="text-xs font-semibold text-slate-600">Recording link (add after class)
            <input className={`${input} mt-1`} type="url" value={links.recordingUrl} placeholder="https://…" onChange={(e) => setLinks((l) => ({ ...l, recordingUrl: e.target.value }))} />
          </label>
        </div>
        <button type="button" disabled={!!busy} className={`${btn} mt-4 bg-slate-900 text-white hover:bg-slate-800`}
          onClick={() => patch({ meetingUrl: links.meetingUrl.trim() || null, recordingUrl: links.recordingUrl.trim() || null }, "Links saved.", "links")}>
          Save links
        </button>

        {!started && !cancelled && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="mb-3 text-sm font-bold text-slate-900">Reschedule</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-slate-600">Starts
                <input className={`${input} mt-1`} type="datetime-local" value={times.startsAt} onChange={(e) => setTimes((t) => ({ ...t, startsAt: e.target.value }))} />
              </label>
              <label className="text-xs font-semibold text-slate-600">Ends
                <input className={`${input} mt-1`} type="datetime-local" value={times.endsAt} onChange={(e) => setTimes((t) => ({ ...t, endsAt: e.target.value }))} />
              </label>
            </div>
            <button type="button" disabled={!!busy} className={`${btn} mt-4 border border-slate-200 text-slate-700 hover:bg-slate-50`}
              onClick={() => patch({ startsAt: new Date(times.startsAt).toISOString(), endsAt: new Date(times.endsAt).toISOString() }, "Class rescheduled. Students have been notified.", "resched")}>
              Save new time
            </button>
          </div>
        )}
        {cls.meetingUrl && (
          <button type="button" onClick={() => openLink(cls.meetingUrl)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline">
            <ExternalLink className="h-4 w-4" /> Open meeting link
          </button>
        )}
      </section>

      {/* Attendance */}
      <section className={card}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900">Attendance</h2>
          {started && !cancelled && roster.length > 0 && (
            <div className="flex gap-2 text-xs">
              <button type="button" onClick={() => markAll("PRESENT")} className="rounded-md border border-slate-200 px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-50">Everyone present</button>
            </div>
          )}
        </div>

        {roster.length === 0 && <p className="py-4 text-sm text-slate-400">No students are enrolled in this subject yet.</p>}
        {(!started || cancelled) && roster.length > 0 && (
          <p className="mb-3 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-500">
            {cancelled ? "Attendance isn't taken for cancelled classes." : "You can take attendance once the class has started."}
          </p>
        )}

        <ul className="divide-y divide-slate-100">
          {roster.map((s) => (
            <li key={s.studentId} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{s.fullName}</p>
                <p className="text-xs text-slate-400">{s.learnerId}</p>
              </div>
              <div className="flex gap-2">
                {STATUSES.map((o) => (
                  <button key={o.key} type="button" disabled={!started || cancelled}
                    onClick={() => setMarks((m) => ({ ...m, [s.studentId]: o.key }))}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold disabled:opacity-40 ${marks[s.studentId] === o.key ? o.on : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {started && !cancelled && roster.length > 0 && (
          <button type="button" disabled={!!busy} onClick={saveAttendance} className={`${btn} mt-5 bg-blue-600 text-white hover:bg-blue-700`}>
            {busy === "attendance" ? "Saving…" : "Save attendance"}
          </button>
        )}
      </section>
    </div>
  );
}
