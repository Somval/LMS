import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Info,
  ChevronDown
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { STATUS_DOT, progressSeries, statusOf } from './academicData';

// data: GET /dashboard/parent/:studentId. period: { id, label } chosen in the filter bar.
export default function StudentDashboard({ currentChild, data, period }) {
  const childName = currentChild?.fullName || 'your child';
  const firstName = childName.split(/\s+/)[0];

  const [subjectFilter, setSubjectFilter] = useState('all'); // 'all' or a subject id

  const subjectsData = data.subjects.map((subject) => ({
    id: subject.subjectId,
    name: subject.subject,
    progress: subject.lessonProgress,
    status: statusOf(subject),
  }));

  const onTrack = subjectsData.filter((s) => s.status === 'On Track' || s.status === 'Ahead').length;
  const improving = subjectsData.filter((s) => s.status === 'Improving').length;

  // The chart follows the chosen subject (or all of them) and the chosen period.
  const { series, change } = useMemo(() => {
    const subject = data.subjects.find((s) => String(s.subjectId) === String(subjectFilter));
    const dates = subject ? data.lessons.bySubject?.[subject.subjectId] ?? [] : data.lessons.completedAt;
    const total = subject ? subject.lessonsTotal : data.lessons.total;
    return progressSeries(dates, total, period.id);
  }, [data, subjectFilter, period.id]);

  const periodWord = period.id === 'week' ? 'week' : period.id === 'month' ? 'month' : 'year';

  return (
    <div className="w-full bg-slate-50 px-2 py-4 sm:p-6 font-sans text-slate-800">
      <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* TOP STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Card 1: Active Subjects */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{subjectsData.length}</div>
              <div className="text-sm font-semibold text-slate-700">Active Subjects</div>
              <div className="text-xs text-slate-400">Currently enrolled</div>
            </div>
          </div>

          {/* Card 2: On Track */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{onTrack}</div>
              <div className="text-sm font-semibold text-slate-700">On Track</div>
              <div className="text-xs text-slate-400">Subjects on track</div>
            </div>
          </div>

          {/* Card 3: Improving */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{improving}</div>
              <div className="text-sm font-semibold text-slate-700">Improving</div>
              <div className="text-xs text-slate-400">Needs more practice</div>
            </div>
          </div>

          {/* Card 4: Overall Progress */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{data.overall.lessonProgress}%</div>
              <div className="text-sm font-semibold text-slate-700">Overall Progress</div>
              <div className="text-xs text-slate-400">Across all subjects</div>
            </div>
          </div>

        </div>

        {/* MAIN CONTENT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

          {/* SUBJECT PROGRESS TABLE */}
          <div className="lg:col-span-5 bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Subject Progress</h2>
              <p className="text-xs text-slate-500 mt-0.5 mb-4 sm:mb-6">Overview of progress for <span className="font-semibold text-slate-700">{childName}</span>.</p>

              {subjectsData.length === 0 ? (
                <p className="text-sm text-slate-400">No subjects have been selected yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[300px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Subject</th>
                        <th className="pb-3 font-semibold">Progress</th>
                        <th className="pb-3 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                      {subjectsData.map((item) => (
                        <tr key={item.id} className="group">
                          <td className="py-3.5 font-semibold text-slate-900">{item.name}</td>
                          <td className="py-3.5 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 w-20 sm:w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-blue-600 h-full rounded-full"
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-semibold text-slate-600 w-8">{item.progress}%</span>
                            </div>
                          </td>
                          <td className="py-3.5 text-right">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                              <span className={`w-2 h-2 rounded-full ${STATUS_DOT[item.status]}`}></span>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* LEARNING PROGRESS CHART */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Learning Progress</h2>

                {/* Subject filter */}
                <div className="relative">
                  <select
                    aria-label="Show progress for"
                    value={subjectFilter}
                    onChange={(event) => setSubjectFilter(event.target.value)}
                    className="appearance-none text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 pl-3 pr-8 py-1.5 rounded-lg cursor-pointer hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="all">All Subjects</option>
                    {subjectsData.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-4">{period.label}</p>

              {/* Recharts Line Chart */}
              <div className="h-52 sm:h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tickLine={false}
                      axisLine={false}
                      ticks={[0, 20, 40, 60, 80, 100]}
                      tickFormatter={(val) => `${val}%`}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="#22c55e"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Alert Banner */}
            <div className="mt-4 sm:mt-6 bg-blue-50/70 border border-blue-100/80 rounded-xl p-3.5 flex items-center gap-3 text-xs text-blue-900">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              {change > 0 ? (
                <span>
                  Great job! <strong className="font-semibold text-blue-950">{firstName}'s</strong> progress has improved by <strong className="font-semibold text-blue-950">{change}%</strong> this {periodWord}.
                </span>
              ) : (
                <span>
                  No new lessons have been completed this {periodWord} yet. Encourage <strong className="font-semibold text-blue-950">{firstName}</strong> to keep learning.
                </span>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
