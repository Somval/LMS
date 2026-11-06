// Small helpers shared by the tutor subject pages.

export const subjectLabel = (name, year) => (year ? `${name} (${year})` : name);

// Query string that carries the chosen subject between subject pages (survives a refresh).
export const subjectQuery = (subjectId, year) => {
  const q = new URLSearchParams();
  if (subjectId) q.set("subject", subjectId);
  if (year) q.set("year", year);
  const s = q.toString();
  return s ? `?${s}` : "";
};

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

export const formatTime = (iso) =>
  iso ? new Date(iso).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase() : "—";

export const formatDuration = (startIso, endIso) => {
  const mins = Math.round((new Date(endIso) - new Date(startIso)) / 60000);
  if (!Number.isFinite(mins) || mins <= 0) return "—";
  if (mins < 60) return `${mins} Mins`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} Hour${h > 1 ? "s" : ""}${m ? ` ${m} Mins` : ""}`;
};

export const percent = (n) => (n == null ? "—" : `${n}%`);

// Green / amber / red used by the students table.
export const scoreColor = (n) =>
  n == null ? "text-slate-400" : n >= 80 ? "text-emerald-500" : n >= 60 ? "text-amber-500" : "text-rose-500";

// "28 May" and "2025" for the two-line date cell.
export const splitDate = (iso) =>
  iso
    ? [
        new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        String(new Date(iso).getFullYear()),
      ]
    : ["—", ""];
