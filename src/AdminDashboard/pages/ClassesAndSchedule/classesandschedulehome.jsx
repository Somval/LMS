import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, CornerUpRight, CircleCheck, CircleX } from "lucide-react";
import { api } from "../../../lib/api";
import ClassesSchedule from "./ClassesSchedulestats";
import ClassesTable from "./ClassesTable";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

// Upcoming / Completed / Cancelled, as the table shows it.
const statusOf = (c) => {
  if (c.status === "CANCELLED") return "Cancelled";
  if (c.status === "COMPLETED" || new Date(c.endsAt) < new Date()) return "Completed";
  return "Upcoming";
};

// <input type="datetime-local"> wants local "YYYY-MM-DDTHH:mm".
const toLocalInput = (d) => {
  const x = new Date(d);
  const pad = (n) => String(n).padStart(2, "0");
  return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}T${pad(x.getHours())}:${pad(x.getMinutes())}`;
};

function RescheduleModal({ item, onClose, onSaved }) {
  const [start, setStart] = useState(toLocalInput(item.startsAt));
  const [end, setEnd] = useState(toLocalInput(item.endsAt));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (new Date(end) <= new Date(start)) return setError("The end time must be after the start time.");
    setSaving(true);
    try {
      await api.patch(`/classes/${item.id}`, {
        startsAt: new Date(start).toISOString(),
        endsAt: new Date(end).toISOString(),
      });
      onSaved();
    } catch (err) {
      setError(err.message || "Could not reschedule this class.");
    } finally {
      setSaving(false);
    }
  };

  const field = "h-11 w-full rounded-lg border border-[#DCE3ED] px-3 text-sm outline-none focus:border-[#3269F6]";
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Edit schedule"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-[#252B35]">Edit schedule</h3>
        <p className="text-sm text-[#647084]">{item.student} · {item.tutor}. Students of this subject are notified of the change.</p>
        <label className="block text-xs font-semibold text-[#647084]">
          Starts
          <input type="datetime-local" value={start} onChange={(e) => { setStart(e.target.value); setError(""); }} className={`${field} mt-1`} />
        </label>
        <label className="block text-xs font-semibold text-[#647084]">
          Ends
          <input type="datetime-local" value={end} onChange={(e) => { setEnd(e.target.value); setError(""); }} className={`${field} mt-1`} />
        </label>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="min-h-10 rounded-lg border border-[#DCE3ED] px-4 text-sm font-medium text-[#596476]">Cancel</button>
          <button type="submit" disabled={saving} className="min-h-10 rounded-lg bg-[#2DC746] px-4 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ClassSchedule() {
  const [rawClasses, setRawClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState(null);

  // GET /classes: admins get every tutor's classes (newest 200).
  const load = useCallback(async () => {
    try {
      setRawClasses(await api.get("/classes"));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load classes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Rows in the shape the table draws.
  const classes = useMemo(
    () =>
      rawClasses.map((c) => ({
        id: c.id,
        startsAt: c.startsAt,
        endsAt: c.endsAt,
        student: c.title, // the class itself (a class is for a subject, not one student)
        studentId: `Class #${c.id}`,
        subject: c.subject?.name ?? "",
        year: "",
        tutor: c.tutor?.user?.fullName ?? "",
        tutorId: `Tutor #${c.tutor?.id ?? ""}`,
        nextDate: fmtDate(c.startsAt),
        nextTime: `${fmtTime(c.startsAt)} – ${fmtTime(c.endsAt)}`,
        status: statusOf(c),
        recordingUrl: c.recordingUrl,
        meetingUrl: c.meetingUrl,
      })),
    [rawClasses]
  );

  const statistics = useMemo(() => {
    const count = (s) => classes.filter((c) => c.status === s).length;
    const upcoming = count("Upcoming");
    return [
      { id: "scheduled", label: "Scheduled Classes", value: loading ? "…" : classes.length - count("Cancelled"), Icon: CalendarDays, iconColor: "text-[#20D987]", iconBg: "bg-[#E4FFF1]" },
      { id: "upcoming", label: "Upcoming Classes", value: loading ? "…" : upcoming, Icon: CornerUpRight, iconColor: "text-[#D946EF]", iconBg: "bg-[#FCE7FF]" },
      { id: "completed", label: "Completed Classes", value: loading ? "…" : count("Completed"), Icon: CircleCheck, iconColor: "text-[#FFA51F]", iconBg: "bg-[#FFF2D9]" },
      { id: "cancelled", label: "Cancelled Classes", value: loading ? "…" : count("Cancelled"), Icon: CircleX, iconColor: "text-[#FF4262]", iconBg: "bg-[#FFE5EA]" },
    ];
  }, [classes, loading]);

  const flash = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 4000);
  };

  // PATCH /classes/:id { status: "CANCELLED" } (students are notified by the backend)
  const handleCancel = async (item) => {
    try {
      await api.patch(`/classes/${item.id}`, { status: "CANCELLED" });
      flash("The class was cancelled and students were notified.");
      load();
    } catch (err) {
      flash(err.message || "Could not cancel this class.");
    }
  };

  const handleRecordings = (item) => {
    if (item.recordingUrl) window.open(item.recordingUrl, "_blank", "noopener,noreferrer");
    else flash("There is no recording for this class yet.");
  };

  return (
    <div>
      <ClassesSchedule statistics={statistics} />
      {(error || notice) && (
        <p
          role={error ? "alert" : "status"}
          className={`mx-4 rounded-md px-3 py-2 text-sm sm:mx-6 lg:mx-8 ${error ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"}`}
        >
          {error || notice}
        </p>
      )}
      <ClassesTable
        classes={classes}
        loading={loading}
        onCancelClass={handleCancel}
        onEditSchedule={setEditing}
        onViewRecordings={handleRecordings}
      />
      {editing && (
        <RescheduleModal
          item={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            flash("The class was rescheduled and students were notified.");
            load();
          }}
        />
      )}
    </div>
  );
}
