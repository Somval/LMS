import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { api } from '../lib/api';

const COLORS = [
  'bg-emerald-500 text-white', 'bg-pink-600 text-white', 'bg-amber-400 text-white', 'bg-teal-500 text-white',
  'bg-rose-400 text-white', 'bg-slate-500 text-white', 'bg-amber-700 text-white', 'bg-emerald-400 text-white',
];

export default function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [subject, setSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get('/student/subjects'), api.get(`/curriculum/subjects/${courseId}/topics`)])
      .then(([subjects, tops]) => {
        setSubject(subjects.find((s) => String(s.id) === String(courseId)) ?? null);
        setTopics(tops);
      })
      .catch((err) => setError(err.message || 'Could not load this course.'))
      .finally(() => setLoading(false));
  }, [courseId]);

  const { total, done, nextTopic } = useMemo(() => {
    const all = topics.flatMap((t) => t.lessons);
    const completed = all.filter((l) => l.completed).length;
    const next = topics.find((t) => t.lessons.some((l) => !l.completed)) ?? topics[0];
    return { total: all.length, done: completed, nextTopic: next };
  }, [topics]);

  const progress = total ? Math.round((done / total) * 100) : 0;
  const subjectName = subject?.name ?? 'Course';

  const openTopic = (topic) => navigate(`/student/learning/${courseId}/lesson/${topic.id}`);

  return (
    <div className="w-full min-h-screen p-6 md:p-10 font-sans text-slate-800 bg-transparent">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
          <span className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors" onClick={() => navigate('/student/learning')}>
            My Learning Journey
          </span>
          <ChevronRight className="w-4 h-4 text-blue-500" />
          <span className="text-blue-600 font-medium">{subjectName}</span>
        </div>

        {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        {loading && <p className="py-10 text-center text-sm text-slate-400">Loading…</p>}

        {!loading && !error && (
          <>
            <div className="space-y-6 bg-transparent">
              <div className="space-y-2">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  {subjectName}{subject?.yearLevel ? ` · ${subject.yearLevel}` : ''}
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed max-w-2xl font-normal">
                  {subject?.description || `Your ${subjectName} lessons, topic by topic.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2 flex-1 max-w-xl">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="font-bold text-[#2F327D]">{progress}% Complete</span>
                    <span className="text-slate-400 font-medium">{done} of {total} lessons completed</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#2F327D] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                {nextTopic && (
                  <button
                    type="button"
                    onClick={() => openTopic(nextTopic)}
                    className="flex items-center justify-center gap-2 bg-[#2F327D] hover:bg-[#252865] text-white text-sm font-medium py-3 px-6 rounded-xl transition-all shadow-sm group whitespace-nowrap"
                  >
                    <span>{done > 0 && done < total ? 'Continue Learning' : 'Start Learning'}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>

            <div className="border border-slate-200/60 shadow-sm rounded-3xl p-6 md:p-8 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">Curriculum</h2>
              {topics.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-400">
                  Your tutor has not published any topics for this subject yet.
                </p>
              )}
              <div className="space-y-3">
                {topics.map((topic, i) => {
                  const completed = topic.lessons.filter((l) => l.completed).length;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => openTopic(topic)}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/70 hover:border-[#2F327D] hover:shadow-md transition-all cursor-pointer group bg-white"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 ${COLORS[i % COLORS.length]}`}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm md:text-base group-hover:text-[#2F327D] transition-colors">{topic.title}</h3>
                          {topic.description && <p className="text-xs text-slate-500 mt-0.5">{topic.description}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                          {completed}/{topic.lessons.length} lesson{topic.lessons.length === 1 ? '' : 's'}
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-400 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
