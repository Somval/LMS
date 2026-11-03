import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2, FileText, Plus, Save, Send, Trash2 } from "lucide-react";
import { api } from "../../lib/api";

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[#DDE3ED] bg-white px-3.5 text-sm text-[#252B36] outline-none transition duration-200 placeholder:text-[#9AA3B2] hover:border-[#B8C4D8] focus:border-[#4775F5] focus:ring-4 focus:ring-[#4775F5]/10";
const labelClass = "block text-sm font-semibold text-[#343B4A]";
const sectionClass = "rounded-xl border border-[#E6EAF1] bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-7";

export default function CreateAssignment() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ subjectId: "", title: "", instructions: "", dueAt: "" });
  const [questions, setQuestions] = useState([{ id: 1, text: "", marks: "2" }]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState("");
  const [done, setDone] = useState(null);

  useEffect(() => {
    api.get("/tutors/me").then((me) => setSubjects(me.subjects.map((s) => s.subject))).catch(() => {});
  }, []);

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError(""); };
  const updateQuestion = (id, field, value) =>
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, [field]: value } : q)));
  const addQuestion = () => setQuestions((qs) => [...qs, { id: Date.now(), text: "", marks: "2" }]);
  const removeQuestion = (id) => setQuestions((qs) => (qs.length > 1 ? qs.filter((q) => q.id !== id) : qs));

  // Students answer in one box, so the questions are written into the instructions as a numbered list.
  const buildInstructions = () => {
    const filled = questions.filter((q) => q.text.trim());
    const list = filled.map((q, i) => `${i + 1}. ${q.text.trim()}${q.marks ? ` (${q.marks} mark${Number(q.marks) === 1 ? "" : "s"})` : ""}`).join("\n");
    return [form.instructions.trim(), list && `Questions:\n${list}`].filter(Boolean).join("\n\n");
  };

  const submit = async (publish) => {
    if (saving) return;
    if (!form.subjectId) return setError("Choose a subject.");
    if (form.title.trim().length < 2) return setError("Enter a title for the assignment.");
    if (!buildInstructions()) return setError("Add instructions or at least one question.");
    if (form.dueAt && new Date(form.dueAt) < new Date() && publish) return setError("The deadline must be in the future.");

    setSaving(publish ? "publish" : "draft");
    try {
      const work = await api.post("/coursework", {
        type: "ASSIGNMENT",
        subjectId: Number(form.subjectId),
        title: form.title.trim(),
        instructions: buildInstructions(),
        dueAt: form.dueAt ? new Date(form.dueAt).toISOString() : undefined,
        published: publish,
      });
      setDone({ id: work.id, published: publish });
    } catch (err) {
      setError(err.message || "Could not save the assignment.");
    } finally {
      setSaving("");
    }
  };

  if (done) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center font-sans">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <h1 className="text-2xl font-bold text-[#202638]">{done.published ? "Assignment published" : "Draft saved"}</h1>
        <p className="max-w-sm text-sm text-[#7C8698]">
          {done.published ? "Your students have been notified." : "It is saved as a draft. Publish it from the list when you're ready."}
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(`/tutor/assignment-quize/${done.id}`)} className="rounded-lg bg-[#3568F5] px-5 py-2.5 text-sm font-semibold text-white">View assignment</button>
          <button type="button" onClick={() => navigate("/tutor/assignment-quize")} className="rounded-lg border border-[#DDE3ED] px-5 py-2.5 text-sm font-semibold text-[#4C5668]">Back to list</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-sans text-[#252B36]">
      <header>
        <div className="mx-auto flex min-h-[64px] w-full max-w-[1100px] items-center px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => navigate("/tutor/assignment-quize")} className="group inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-medium text-[#4C5668] transition hover:text-[#3568F5]">
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Assignments &amp; Quizzes</span>
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[900px] px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
        <div className="mb-7 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#202638] sm:text-3xl">Create Assignment</h1>
          <p className="mt-2 text-sm leading-6 text-[#7C8698] sm:text-base">Create an assignment for your students to complete.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submit(true); }} className="space-y-6">
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3"><FileText className="h-5 w-5 text-[#3568F5]" /><h2 className="text-lg font-bold">Basic information</h2></div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="a-subject" className={labelClass}>Subject</label>
                <select id="a-subject" value={form.subjectId} onChange={set("subjectId")} className={inputClass}>
                  <option value="">Select subject</option>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="a-due" className={labelClass}>Deadline <span className="font-normal text-[#9AA3B2]">(optional)</span></label>
                <input id="a-due" type="datetime-local" value={form.dueAt} onChange={set("dueAt")} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="a-title" className={labelClass}>Title</label>
                <input id="a-title" value={form.title} onChange={set("title")} placeholder="e.g. Quadratic equations practice" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="a-instr" className={labelClass}>Instructions</label>
                <textarea id="a-instr" rows={4} value={form.instructions} onChange={set("instructions")} placeholder="Explain what students need to do…"
                  className="mt-2 w-full rounded-lg border border-[#DDE3ED] p-3.5 text-sm outline-none focus:border-[#4775F5] focus:ring-4 focus:ring-[#4775F5]/10" />
              </div>
            </div>
          </section>

          <section className={sectionClass}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Questions <span className="text-sm font-normal text-[#9AA3B2]">(optional)</span></h2>
              <button type="button" onClick={addQuestion} className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDE3ED] px-3.5 py-2 text-sm font-semibold text-[#3568F5] hover:bg-blue-50"><Plus size={16} /> Add question</button>
            </div>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className="flex items-start gap-3">
                  <span className="mt-4 text-sm font-semibold text-[#7C8698]">{i + 1}.</span>
                  <input aria-label={`Question ${i + 1}`} value={q.text} onChange={(e) => updateQuestion(q.id, "text", e.target.value)} placeholder="Type the question, e.g. Solve 3x + 2 = 14" className={`${inputClass} flex-1`} />
                  <input aria-label={`Marks for question ${i + 1}`} value={q.marks} onChange={(e) => updateQuestion(q.id, "marks", e.target.value.replace(/\D/g, ""))} className={`${inputClass} w-20 text-center`} placeholder="Marks" />
                  <button type="button" onClick={() => removeQuestion(q.id)} aria-label="Remove question" className="mt-3 text-[#9AA3B2] hover:text-red-500"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#9AA3B2]">Students answer in a single box (and can attach a file). You score the whole assignment out of 100.</p>
          </section>

          {error && <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-500"><AlertCircle size={16} /> {error}</p>}

          <div className="flex flex-wrap justify-end gap-3">
            <button type="button" disabled={!!saving} onClick={() => submit(false)} className="inline-flex items-center gap-2 rounded-lg border border-[#DDE3ED] bg-white px-5 py-3 text-sm font-semibold text-[#4C5668] hover:bg-slate-50 disabled:opacity-60">
              <Save size={16} /> {saving === "draft" ? "Saving…" : "Save as draft"}
            </button>
            <button type="submit" disabled={!!saving} className="inline-flex items-center gap-2 rounded-lg bg-[#3568F5] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2858e0] disabled:opacity-60">
              <Send size={16} /> {saving === "publish" ? "Publishing…" : "Publish assignment"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
