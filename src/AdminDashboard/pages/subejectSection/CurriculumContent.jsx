import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { api } from "../../../lib/api";

// Rebuilds the save payload from a stored topic so it can be re-published without losing lessons.
const toPayload = (topic, status) => ({
  topicTitle: topic.title,
  topicOrder: topic.position,
  topicDescription: topic.description || "",
  status,
  lessons: topic.lessons.map((l) => ({
    id: l.id,
    title: l.title,
    order: l.position,
    description: l.content || "",
    attachments: l.attachments.map((a) => ({
      resourceType: a.resourceType,
      name: a.fileName,
      size: a.sizeBytes ?? undefined,
      type: a.mimeType ?? undefined,
      url: a.fileUrl,
    })),
  })),
});

export default function CurriculumContent() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  const subjectId = params.get("subjectId") || (subjects[0] ? String(subjects[0].id) : "");

  useEffect(() => {
    api.get("/subjects").then(setSubjects).catch((e) => setError(e.message));
  }, []);

  const load = useCallback(async () => {
    if (!subjectId) return;
    setLoading(true);
    try {
      setTopics(await api.get(`/curriculum/subjects/${subjectId}/topics`));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load topics.");
    } finally {
      setLoading(false);
    }
  }, [subjectId]);

  useEffect(() => { load(); }, [load]);

  const act = async (topic, fn) => {
    setBusyId(topic.id);
    setError("");
    try {
      await fn();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const togglePublish = (t) =>
    act(t, () => api.put(`/curriculum/topics/${t.id}`, toPayload(t, t.published ? "Draft" : "Published")));
  const remove = (t) => {
    if (!window.confirm(`Delete “${t.title}” and its lessons? This cannot be undone.`)) return;
    act(t, () => api.delete(`/curriculum/topics/${t.id}`));
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Curriculum &amp; content</h1>
          <p className="mt-1 text-sm text-[#8181A5]">Topics and lessons students see in their Learning Journey. Only published topics are visible to them.</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={subjectId} onChange={(e) => setParams({ subjectId: e.target.value })}
            className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-indigo-600">
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <button type="button" disabled={!subjectId} onClick={() => navigate(`/admin/addtopicLesson?subjectId=${subjectId}`)}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#2F327D] px-5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
            <Plus className="h-4 w-4" /> Add topic
          </button>
        </div>
      </div>

      {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-gray-100 text-xs uppercase text-gray-400">
            <tr><th className="px-5 py-3">#</th><th className="px-5 py-3">Topic</th><th className="px-5 py-3">Lessons</th><th className="px-5 py-3">Status</th><th className="px-5 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading && <tr><td colSpan={5} className="py-10 text-center text-gray-400">Loading…</td></tr>}
            {!loading && topics.length === 0 && <tr><td colSpan={5} className="py-10 text-center text-gray-400">No topics for this subject yet.</td></tr>}
            {topics.map((t) => (
              <tr key={t.id} className="text-gray-700">
                <td className="px-5 py-3">{t.position}</td>
                <td className="px-5 py-3"><div className="font-medium text-gray-900">{t.title}</div>{t.description && <div className="max-w-md truncate text-xs text-gray-400">{t.description}</div>}</td>
                <td className="px-5 py-3">{t.lessons.length}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${t.published ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{t.published ? "Published" : "Draft"}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="inline-flex items-center gap-3">
                    <button type="button" disabled={busyId === t.id} onClick={() => togglePublish(t)} className="text-sm font-semibold text-indigo-600 hover:underline disabled:opacity-40">
                      {t.published ? "Unpublish" : "Publish"}
                    </button>
                    <button type="button" disabled={busyId === t.id} onClick={() => remove(t)} aria-label="Delete topic" className="text-gray-400 hover:text-red-600 disabled:opacity-40">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
