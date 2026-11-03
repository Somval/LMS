import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronRight, ArrowRight } from 'lucide-react';

const fmtDue = (d) =>
  d
    ? `Due ${new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, ${new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
    : 'No deadline';

export default function MyTasks({ tasks = [], loading = false }) {
  const navigate = useNavigate();
  const tasksData = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    type: t.type === 'QUIZ' ? 'Quiz' : 'Assignment',
    subject: t.subject?.name ?? 'General',
    dueDate: fmtDue(t.dueAt),
  }));

  return (
    <div className="w-full font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          My Tasks
        </h2>
        <button onClick={() => navigate('/student/assignments')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group">
          <span>View All Tasks</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Container Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="divide-y divide-slate-100">
          {!loading && tasksData.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400">You are all caught up. No pending tasks.</p>
          )}
          {tasksData.map((task, index) => (
            <div
              key={task.id}
              onClick={() => navigate(`/student/assignment/${task.id}`)}
              className={`flex items-center justify-between py-4 first:pt-0 last:pb-0 group cursor-pointer transition-colors hover:bg-slate-50/60 rounded-xl px-3`}
            >
              {/* Left Side: Icon & Details */}
              <div className="flex items-center gap-4 min-w-0">
                {/* File Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>

                {/* Task Title, Badge & Subtitle */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {task.title}
                    </h3>
                    <span className="text-[11px] font-medium bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full">
                      {task.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {task.subject} • {task.dueDate}
                  </p>
                </div>
              </div>

              {/* Right Side: Navigation Chevron */}
              <div className="p-2 rounded-full text-slate-400 group-hover:text-indigo-600 group-hover:bg-white transition-all shadow-xs shrink-0 ml-4">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}