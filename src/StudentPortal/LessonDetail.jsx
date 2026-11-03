import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen, Video, FileText, Image as ImageIcon, Link2, CheckCircle2 } from 'lucide-react';
import { api, assetUrl } from '../lib/api';

const kindOf = (a) => {
  const t = a.mimeType || '';
  if (t.startsWith('video/')) return 'video';
  if (t.startsWith('image/')) return 'image';
  if (t.startsWith('audio/')) return 'audio';
  return 'file';
};

const ICONS = { video: Video, image: ImageIcon, audio: Video, file: FileText };

function Resource({ a }) {
  const kind = kindOf(a);
  const src = assetUrl(a.fileUrl);
  if (kind === 'video') return <video controls preload="metadata" src={src} className="w-full max-h-[420px] rounded-xl bg-black" />;
  if (kind === 'audio') return <audio controls src={src} className="w-full" />;
  if (kind === 'image') return <img src={src} alt={a.fileName} className="max-h-[420px] rounded-xl border border-slate-200" />;
  const Icon = a.fileUrl.startsWith('https://') ? Link2 : ICONS[kind];
  return (
    <a href={src} target="_blank" rel="noopener noreferrer"
       className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300">
      <Icon className="h-4 w-4 text-blue-500" /> {a.fileName}
    </a>
  );
}

export default function LessonDetail() {
  const navigate = useNavigate();
  const { courseId, lessonId: topicId } = useParams(); // the URL segment :lessonId is the topic id
  const [subjectName, setSubjectName] = useState('');
  const [topic, setTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('lessons');
  const [openId, setOpenId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.get('/student/subjects'), api.get(`/curriculum/subjects/${courseId}/topics`)])
      .then(([subjects, topics]) => {
        setSubjectName(subjects.find((s) => String(s.id) === String(courseId))?.name ?? 'Course');
        const t = topics.find((x) => String(x.id) === String(topicId));
        if (!t) throw new Error('This topic could not be found.');
        setTopic(t);
        setOpenId((t.lessons.find((l) => !l.completed) ?? t.lessons[0])?.id ?? null);
      })
      .catch((err) => setError(err.message || 'Could not load this topic.'))
      .finally(() => setLoading(false));
  }, [courseId, topicId]);

  const markComplete = async (lesson) => {
    setBusyId(lesson.id);
    try {
      await api.post(`/curriculum/lessons/${lesson.id}/complete`);
      setTopic((t) => ({ ...t, lessons: t.lessons.map((l) => (l.id === lesson.id ? { ...l, completed: true } : l)) }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const lessons = topic?.lessons ?? [];
  const done = lessons.filter((l) => l.completed).length;
  const progress = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
  const firstOpen = lessons.find((l) => !l.completed) ?? lessons[0];

  const tab = (name, label) => (
    <button onClick={() => setActiveTab(name)}
      className={`pb-3 relative transition-colors ${activeTab === name ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
      {label}
      {activeTab === name && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-full" />}
    </button>
  );

  return (
    <div className="w-full min-h-screen p-6 md:p-10 font-sans text-slate-800 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
          <span className="text-blue-600 hover:text-blue-700 cursor-pointer" onClick={() => navigate('/student/learning')}>My Learning Journey</span>
          <ChevronRight className="w-4 h-4 text-blue-500" />
          <span className="text-blue-600 hover:text-blue-700 cursor-pointer" onClick={() => navigate(`/student/learning/${courseId}`)}>{subjectName}</span>
          {topic && (<><ChevronRight className="w-4 h-4 text-blue-500" /><span className="text-blue-600 font-medium">{topic.title}</span></>)}
        </div>

        {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        {loading && <p className="py-10 text-center text-sm text-slate-400">Loading…</p>}

        {topic && (
          <>
            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{topic.title}</h1>
                {topic.description && <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{topic.description}</p>}
              </div>

              <div className="space-y-2.5 max-w-xl">
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="font-bold text-slate-900">{progress}% Complete</span>
                  <span className="text-slate-500 font-medium text-xs">{done} of {lessons.length} lessons completed</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="flex items-center gap-8 border-b border-slate-200 pt-4 text-sm font-semibold">
                {tab('lessons', 'Lessons')}
                {tab('about', 'About this topic')}
              </div>
            </div>

            {activeTab === 'about' && (
              <p className="rounded-2xl border border-slate-200/80 bg-white p-6 text-sm text-slate-600 shadow-sm">
                {topic.description || 'No description has been added for this topic yet.'}
              </p>
            )}

            {activeTab === 'lessons' && (
              <div className="space-y-4 pt-2">
                {lessons.length === 0 && <p className="py-8 text-center text-sm text-slate-400">No lessons in this topic yet.</p>}
                {lessons.map((lesson, i) => {
                  const open = openId === lesson.id;
                  return (
                    <div key={lesson.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-sm space-y-4">
                      <button type="button" onClick={() => setOpenId(open ? null : lesson.id)} className="flex w-full items-center justify-between gap-4 text-left">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 font-bold text-base flex items-center justify-center shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-base md:text-lg">{lesson.title}</h3>
                            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                              {lesson.attachments.length} resource{lesson.attachments.length === 1 ? '' : 's'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${
                            lesson.completed ? 'bg-[#2EE59D]/20 text-[#00A859] border border-[#2EE59D]/30' : 'bg-slate-200/70 text-slate-600 border border-slate-300/50'}`}>
                            {lesson.completed ? 'Completed' : 'Not Started'}
                          </span>
                          <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {open && (
                        <div className="space-y-4 border-t border-slate-100 pt-4">
                          {lesson.content && (
                            <div className="flex gap-3">
                              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{lesson.content}</p>
                            </div>
                          )}
                          <div className="space-y-3">
                            {lesson.attachments.map((a) => <Resource key={a.id} a={a} />)}
                          </div>
                          {!lesson.completed && (
                            <button type="button" onClick={() => markComplete(lesson)} disabled={busyId === lesson.id}
                              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60">
                              <CheckCircle2 className="h-4 w-4" /> {busyId === lesson.id ? 'Saving…' : 'Mark as complete'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                {firstOpen && done < lessons.length && openId !== firstOpen.id && (
                  <button type="button" onClick={() => setOpenId(firstOpen.id)} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    Jump to next lesson
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
