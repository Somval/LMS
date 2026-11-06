import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Copy, X } from "lucide-react";
import { api } from "../../lib/api";

const YEAR_LEVELS = [
  "Primary (Grades 1-5)",
  "Junior High (Grades 6-8)",
  "Senior High (Grades 9-12)",
  "Undergraduate / Tertiary",
];
const EXPERIENCE = ["0-1 year", "2-4 years", "5-8 years", "9+ years"];

const field =
  "h-11 w-full rounded-lg border border-[#D9E0EA] bg-white px-3.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
const label = "mb-1.5 block text-xs font-semibold text-slate-700";

// A readable temporary password: 9 letters (no look-alikes) and a digit.
const generatePassword = () => {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
  const random = crypto.getRandomValues(new Uint32Array(10));
  return Array.from(random.slice(0, 9), (n) => letters[n % letters.length]).join("") + String(random[9] % 10);
};

// Add a parent or tutor account. `kind` is "parent" or "tutor".
export default function AddUserModal({ kind, onClose, onCreated }) {
  const isTutor = kind === "tutor";
  const title = isTutor ? "Add Tutor" : "Add Parent";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: generatePassword(),
    subjectIds: [],
    yearLevels: [],
    experience: EXPERIENCE[0],
    status: "APPROVED",
  });
  const [subjects, setSubjects] = useState([]);
  const [subjectsError, setSubjectsError] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [created, setCreated] = useState(null); // { name, email, password } once saved
  const [copied, setCopied] = useState(false);

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  };

  const toggle = (key, value) =>
    set(key, form[key].includes(value) ? form[key].filter((v) => v !== value) : [...form[key], value]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (!isTutor) return;
    api
      .get("/subjects")
      .then(setSubjects)
      .catch((err) => setSubjectsError(err.message || "Could not load subjects."));
  }, [isTutor]);

  const submit = async (e) => {
    e.preventDefault();
    if (saving) return;

    const name = form.fullName.trim();
    const email = form.email.trim();
    if (name.length < 2) return setError("Enter the full name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (form.phoneNumber.trim() && form.phoneNumber.trim().length < 7) return setError("Enter a valid phone number.");
    if (form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
      return setError("The password must be at least 8 characters with a letter and a number.");
    }
    if (isTutor && !form.subjectIds.length) return setError("Select at least one subject.");
    if (isTutor && !form.yearLevels.length) return setError("Select at least one year level.");

    const body = {
      fullName: name,
      email,
      password: form.password,
      ...(form.phoneNumber.trim() && { phoneNumber: form.phoneNumber.trim() }),
      ...(isTutor && {
        subjectIds: form.subjectIds,
        yearLevels: form.yearLevels,
        experience: form.experience,
        status: form.status,
      }),
    };

    setSaving(true);
    try {
      await api.post(isTutor ? "/admin/tutors" : "/admin/parents", body);
      setCreated({ name, email, password: form.password });
      onCreated?.();
    } catch (err) {
      setError(err.message || "Could not create the account.");
    } finally {
      setSaving(false);
    }
  };

  const copyLogin = async () => {
    try {
      await navigator.clipboard.writeText(`Email: ${created.email}\nPassword: ${created.password}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy. Select the details and copy them manually.");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-slate-900/40 p-3 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-user-title"
        className="relative my-auto max-h-[95dvh] w-full max-w-[520px] overflow-y-auto rounded-xl bg-white shadow-2xl"
      >
        <div className="h-[3px] w-full bg-gradient-to-r from-[#B7E5D9] via-[#D9C5F2] to-[#F2D0D8]" />

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 id="add-user-title" className="text-lg font-bold text-slate-900">
                {created ? `${isTutor ? "Tutor" : "Parent"} added` : title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {created
                  ? "Share these login details with them."
                  : `Create ${isTutor ? "a tutor" : "a parent"} account. They can sign in straight away.`}
              </p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100">
              <X size={22} />
            </button>
          </div>

          {created ? (
            <div className="space-y-4">
              <div className="space-y-2 rounded-lg border border-[#D9E0EA] bg-[#F8FAFD] p-4 text-sm">
                <p><span className="text-slate-400">Name: </span><span className="font-medium text-slate-900">{created.name}</span></p>
                <p><span className="text-slate-400">Email: </span><span className="break-all font-medium text-slate-900">{created.email}</span></p>
                <p><span className="text-slate-400">Temporary password: </span><span className="font-mono font-semibold text-slate-900">{created.password}</span></p>
              </div>
              <p className="text-xs text-slate-500">
                This is the only time the password is shown. They can change it from their account settings after signing in.
              </p>
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={copyLogin}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-[#D9E0EA] bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Copy size={16} />
                  {copied ? "Copied" : "Copy details"}
                </button>
                <button type="button" onClick={onClose} className="h-11 flex-1 rounded-lg bg-[#004509] text-sm font-semibold text-white transition hover:bg-[#003607]">
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="au-name" className={label}>Full name</label>
                <input id="au-name" className={field} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="au-email" className={label}>Email</label>
                  <input id="au-email" type="email" className={field} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="au-phone" className={label}>Phone number <span className="font-normal text-slate-400">(optional)</span></label>
                  <input id="au-phone" type="tel" className={field} value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)} placeholder="+234…" autoComplete="off" />
                </div>
              </div>

              <div>
                <label htmlFor="au-password" className={label}>Temporary password</label>
                <div className="flex gap-2">
                  <input id="au-password" className={`${field} font-mono`} value={form.password} onChange={(e) => set("password", e.target.value)} autoComplete="off" />
                  <button
                    type="button"
                    onClick={() => set("password", generatePassword())}
                    className="h-11 shrink-0 rounded-lg border border-[#D9E0EA] bg-white px-3.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Generate
                  </button>
                </div>
              </div>

              {isTutor && (
                <>
                  <fieldset>
                    <legend className={label}>Subjects they teach</legend>
                    <div className="grid max-h-[130px] grid-cols-1 gap-1.5 overflow-y-auto rounded-lg border border-[#D9E0EA] p-3 sm:grid-cols-2">
                      {subjects.map((s) => (
                        <label key={s.id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                          <input type="checkbox" checked={form.subjectIds.includes(s.id)} onChange={() => toggle("subjectIds", s.id)} />
                          {s.name}
                        </label>
                      ))}
                      {!subjects.length && (
                        <p className="col-span-full text-xs text-slate-400">{subjectsError || "Loading subjects…"}</p>
                      )}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className={label}>Year levels</legend>
                    <div className="grid grid-cols-1 gap-1.5 rounded-lg border border-[#D9E0EA] p-3 sm:grid-cols-2">
                      {YEAR_LEVELS.map((level) => (
                        <label key={level} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                          <input type="checkbox" checked={form.yearLevels.includes(level)} onChange={() => toggle("yearLevels", level)} />
                          {level}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="au-exp" className={label}>Teaching experience</label>
                      <select id="au-exp" className={field} value={form.experience} onChange={(e) => set("experience", e.target.value)}>
                        {EXPERIENCE.map((x) => <option key={x}>{x}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="au-status" className={label}>Status</label>
                      <select id="au-status" className={field} value={form.status} onChange={(e) => set("status", e.target.value)}>
                        <option value="APPROVED">Approved (can teach now)</option>
                        <option value="PENDING">Pending review</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose} disabled={saving} className="h-11 flex-1 rounded-lg border border-[#D9E0EA] bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="h-11 flex-1 rounded-lg bg-[#004509] text-sm font-semibold text-white transition hover:bg-[#003607] disabled:opacity-60">
                  {saving ? "Creating…" : title}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
