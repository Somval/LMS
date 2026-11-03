import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2, Plus, Save, Send, Trash2, X } from "lucide-react";
import { api } from "../../lib/api";

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[#DDE3ED] bg-white px-3.5 text-sm text-[#252B36] outline-none transition duration-200 placeholder:text-[#9AA3B2] hover:border-[#B8C4D8] focus:border-[#4775F5] focus:ring-4 focus:ring-[#4775F5]/10";
const labelClass = "block text-sm font-semibold text-[#343B4A]";
const sectionClass = "rounded-xl border border-[#E6EAF1] bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-7";

let counter = 0;
const newOption = () => ({ id: ++counter, text: "" });
const newQuestion = () => ({ id: ++counter, text: "", points: "1", correct: 0, options: [newOption(), newOption(), newOption(), newOption()] });

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ subjectId: "", title: "", instructions: "", dueAt: "" });
  const [questions, setQuestions] = useState(() => [newQuestion()]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState("");
  const [done, setDone] = useState(null);

  useEffect(() => {
    api.get("/tutors/me").then((me) => setSubjects(me.subjects.map((s) => s.subject))).catch(() => {});
  }, []);

  const total = useMemo(() => questions.reduce((n, q) => n + (Number(q.points) || 0), 0), [questions]);

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError(""); };
  const updateQ = (id, patch) => setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  const updateOption = (qid, oid, text) =>
    setQuestions((qs) => qs.map((q) => (q.id === qid ? { ...q, options: q.options.map((o) => (o.id === oid ? { ...o, text } : o)) } : q)));
  const addOption = (qid) =>
    setQuestions((qs) => qs.map((q) => (q.id === qid && q.options.length < 8 ? { ...q, options: [...q.options, newOption()] } : q)));
  const removeOption = (qid, oid) =>
    setQuestions((qs) => qs.map((q) => {
      if (q.id !== qid || q.options.length <= 2) return q;
      const index = q.options.findIndex((o) => o.id === oid);
      const options = q.options.filter((o) => o.id !== oid);
      const correct = q.correct === index ? 0 : q.correct > index ? q.correct - 1 : q.correct;
      return { ...q, options, correct };
    }));

  const buildQuestions = () => {
    for (const [i, q] of questions.entries()) {
      const filled = q.options.map((o, index) => ({ text: o.text.trim(), index })).filter((o) => o.text);
      const pts = Number(q.points);
      if (!q.text.trim()) throw new Error(`Question ${i + 1} needs some text.`);
      if (filled.length < 2) throw new Error(`Question ${i + 1} needs at least two answer options.`);
      if (!q.options[q.correct]?.text.trim()) throw new Error(`Choose a correct answer for question ${i + 1} (it must have text).`);
      if (!Number.isInteger(pts) || pts < 1) throw new Error(`Question ${i + 1} needs points of 1 or more.`);
    }
    return questions.map((q) => {
      const filled = q.options.map((o, index) => ({ text: o.text.trim(), index })).filter((o) => o.text);
      return {
        text: q.text.trim(),
        options: filled.map((o) => o.text),
        correctIndex: filled.findIndex((o) => o.index === q.correct),
        points: Number(q.points),
      };
    });
  };

  const submit = async (publish) => {
    if (saving) return;
    if (!form.subjectId) return setError("Choose a subject.");
    if (form.title.trim().length < 2) return setError("Enter a title for the quiz.");
    if (publish && form.dueAt && new Date(form.dueAt) < new Date()) return setError("The deadline must be in the future.");

    let built;
    try {
      built = buildQuestions();
    } catch (err) {
      return setError(err.message);
    }

    setSaving(publish ? "publish" : "draft");
    try {
      const work = await api.post("/coursework", {
        type: "QUIZ",
        subjectId: Number(form.subjectId),
        title: form.title.trim(),
        instructions: form.instructions.trim() || undefined,
        dueAt: form.dueAt ? new Date(form.dueAt).toISOString() : undefined,
        questions: built,
        published: publish,
      });
      setDone({ id: work.id, published: publish });
    } catch (err) {
      setError(err.message || "Could not save the quiz.");
    } finally {
      setSaving("");
    }
  };

  if (done) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center font-sans">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <h1 className="text-2xl font-bold text-[#202638]">{done.published ? "Quiz published" : "Draft saved"}</h1>
        <p className="max-w-sm text-sm text-[#7C8698]">{done.published ? "Your students have been notified. Quizzes are marked automatically." : "It is saved as a draft. Publish it from the list when you're ready."}</p>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(`/tutor/assignment-quize/${done.id}`)} className="rounded-lg bg-[#3568F5] px-5 py-2.5 text-sm font-semibold text-white">View quiz</button>
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
          <h1 className="text-2xl font-bold tracking-tight text-[#202638] sm:text-3xl">Create Quiz</h1>
          <p className="mt-2 text-sm leading-6 text-[#7C8698] sm:text-base">Multiple-choice quizzes are marked automatically when a student submits.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submit(true); }} className="space-y-6">
          <section className={sectionClass}>
            <h2 className="mb-5 text-lg font-bold">Basic information</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="q-subject" className={labelClass}>Subject</label>
                <select id="q-subject" value={form.subjectId} onChange={set("subjectId")} className={inputClass}>
                  <option value="">Select subject</option>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="q-due" className={labelClass}>Deadline <span className="font-normal text-[#9AA3B2]">(optional)</span></label>
                <input id="q-due" type="datetime-local" value={form.dueAt} onChange={set("dueAt")} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-title" className={labelClass}>Title</label>
                <input id="q-title" value={form.title} onChange={set("title")} placeholder="e.g. Fractions quiz" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-instr" className={labelClass}>Instructions <span className="font-normal text-[#9AA3B2]">(optional)</span></label>
                <textarea id="q-instr" rows={3} value={form.instructions} onChange={set("instructions")} className="mt-2 w-full rounded-lg border border-[#DDE3ED] p-3.5 text-sm outline-none focus:border-[#4775F5] focus:ring-4 focus:ring-[#4775F5]/10" />
              </div>
            </div>
            <p className="mt-4 text-xs text-[#9AA3B2]">Each student gets one attempt, with no timer.</p>
          </section>

          <section className={sectionClass}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Questions <span className="text-sm font-normal text-[#7C8698]">· {total} mark{total === 1 ? "" : "s"} in total</span></h2>
              <button type="button" onClick={() => setQuestions((qs) => [...qs, newQuestion()])} className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDE3ED] px-3.5 py-2 text-sm font-semibold text-[#3568F5] hover:bg-blue-50"><Plus size={16} /> Add question</button>
            </div>

            <div className="space-y-6">
              {questions.map((q, i) => (
                <div key={q.id} className="rounded-xl border border-[#E6EAF1] p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-4 text-sm font-semibold text-[#7C8698]">{i + 1}.</span>
                    <input aria-label={`Question ${i + 1}`} value={q.text} onChange={(e) => updateQ(q.id, { text: e.target.value })} placeholder="Type the question" className={`${inputClass} flex-1`} />
                    <input aria-label={`Points for question ${i + 1}`} value={q.points} onChange={(e) => updateQ(q.id, { points: e.target.value.replace(/\D/g, "") })} className={`${inputClass} w-20 text-center`} placeholder="Pts" />
                    <button type="button" onClick={() => questions.length > 1 && setQuestions((qs) => qs.filter((x) => x.id !== q.id))} aria-label="Remove question" className="mt-3 text-[#9AA3B2] hover:text-red-500"><Trash2 size={18} /></button>
                  </div>

                  <div className="mt-3 space-y-2 pl-7">
                    {q.options.map((o, oi) => (
                      <div key={o.id} className="flex items-center gap-3">
                        <input type="radio" name={`correct-${q.id}`} checked={q.correct === oi} onChange={() => updateQ(q.id, { correct: oi })} aria-label={`Mark option ${oi + 1} as correct`} className="h-4 w-4 accent-emerald-600" />
                        <input aria-label={`Option ${oi + 1}`} value={o.text} onChange={(e) => updateOption(q.id, o.id, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + oi)}`} className="h-10 flex-1 rounded-lg border border-[#DDE3ED] px-3 text-sm outline-none focus:border-[#4775F5]" />
                        {q.options.length > 2 && <button type="button" onClick={() => removeOption(q.id, o.id)} aria-label="Remove option" className="text-[#9AA3B2] hover:text-red-500"><X size={16} /></button>}
                      </div>
                    ))}
                    {q.options.length < 8 && <button type="button" onClick={() => addOption(q.id)} className="text-xs font-semibold text-[#3568F5] hover:underline">+ Add option</button>}
                    <p className="text-xs text-[#9AA3B2]">Select the circle next to the correct answer.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {error && <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-500"><AlertCircle size={16} /> {error}</p>}

          <div className="flex flex-wrap justify-end gap-3">
            <button type="button" disabled={!!saving} onClick={() => submit(false)} className="inline-flex items-center gap-2 rounded-lg border border-[#DDE3ED] bg-white px-5 py-3 text-sm font-semibold text-[#4C5668] hover:bg-slate-50 disabled:opacity-60"><Save size={16} /> {saving === "draft" ? "Saving…" : "Save as draft"}</button>
            <button type="submit" disabled={!!saving} className="inline-flex items-center gap-2 rounded-lg bg-[#3568F5] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2858e0] disabled:opacity-60"><Send size={16} /> {saving === "publish" ? "Publishing…" : "Publish quiz"}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
