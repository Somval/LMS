import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { api } from "../../lib/api";

const field =
  "h-10 w-full rounded-md border border-[#E1E5EB] bg-white px-3 text-[12px] text-[#252525] outline-none transition focus:border-[#064B0B] disabled:bg-[#F3F4F6]";

// Assigns this tutor to one of a student's subjects:
// GET /admin/students, GET /admin/students/:userId, PUT /admin/students/:userId/subjects/:subjectId/tutor
export default function AssignStudentModal({ tutor, onClose, onAssigned }) {
  const [students, setStudents] = useState([]);
  const [userId, setUserId] = useState("");
  const [courses, setCourses] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const teaches = new Set((tutor?.subjects ?? []).map((s) => s.id));

  useEffect(() => {
    api
      .get("/admin/students")
      .then((res) => setStudents(res.students.filter((s) => s.status === "Active" && s.subjects.length)))
      .catch((err) => setError(err.message || "Could not load students."));
  }, []);

  // The chosen student's courses this tutor teaches and isn't already assigned to.
  useEffect(() => {
    setSubjectId("");
    setCourses([]);
    if (!userId) return;
    api
      .get(`/admin/students/${userId}`)
      .then((st) =>
        setCourses(st.courses.filter((c) => teaches.has(c.subjectId) && c.tutor?.id !== tutor.id))
      )
      .catch((err) => setError(err.message || "Could not load this student."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/admin/students/${userId}/subjects/${subjectId}/tutor`, { tutorId: tutor.id });
      onAssigned();
    } catch (err) {
      setError(err.message || "Could not assign this student.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Assign student"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-[#171717]">Assign Student</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        <p className="text-[12px] text-[#6B7280]">
          Choose a student and one of their subjects that {tutor?.name ?? "this tutor"} teaches.
        </p>

        <label className="block text-[11px] font-semibold text-[#4B5563]">
          Student
          <select value={userId} onChange={(e) => { setUserId(e.target.value); setError(""); }} className={`${field} mt-1`} required>
            <option value="">Select a student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.learnerId})</option>
            ))}
          </select>
        </label>

        <label className="block text-[11px] font-semibold text-[#4B5563]">
          Subject
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className={`${field} mt-1`} required disabled={!userId}>
            <option value="">
              {!userId ? "Choose a student first" : courses.length ? "Select a subject" : "No subject available for this tutor"}
            </option>
            {courses.map((c) => (
              <option key={c.subjectId} value={c.subjectId}>
                {c.course}{c.level ? ` · ${c.level}` : ""}{c.tutor ? ` (now ${c.tutor.name})` : ""}
              </option>
            ))}
          </select>
        </label>

        {error && <p role="alert" className="text-[12px] text-red-600">{error}</p>}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="h-10 rounded-md border border-[#E1E5EB] px-4 text-[12px] font-medium text-[#4B5563]">Cancel</button>
          <button type="submit" disabled={saving || !subjectId} className="h-10 rounded-md bg-[#064B0B] px-4 text-[12px] font-semibold text-white disabled:opacity-60">
            {saving ? "Assigning…" : "Assign"}
          </button>
        </div>
      </form>
    </div>
  );
}
