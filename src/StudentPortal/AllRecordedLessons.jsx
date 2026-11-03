import React from 'react';
import { Play } from 'lucide-react';

const RecordedLessons = ({ lessons: source = [] }) => {
  const lessons = source.map((l) => ({
    id: l.id,
    date: l.shortDate,
    subDate: l.subDate,
    className: l.subject,
    topic: l.title,
    duration: l.duration,
    tutor: l.instructor,
    thumbnail: l.image,
    recordingUrl: l.recordingUrl,
  }));

  if (lessons.length === 0) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-xl font-bold text-slate-900 mb-6">
          All Recorded Lessons
        </h1>

        {/* Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-sm font-medium">
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Class</th>
                  <th className="py-4 px-6">Topic</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Tutor</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-sm">
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Date */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">{lesson.date}</div>
                      <div className="text-slate-400 text-xs">{lesson.subDate}</div>
                    </td>

                    {/* Class */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={lesson.thumbnail}
                          alt={lesson.className}
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                        <span className="font-medium text-slate-900">
                          {lesson.className}
                        </span>
                      </div>
                    </td>

                    {/* Topic */}
                    <td className="py-4 px-6 text-slate-600 font-medium max-w-[200px]">
                      {lesson.topic}
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {lesson.duration}
                    </td>

                    {/* Tutor */}
                    <td className="py-4 px-6 text-slate-600">
                      {lesson.tutor}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button type="button" onClick={() => window.open(lesson.recordingUrl, "_blank", "noopener,noreferrer")} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-blue-400 text-blue-500 hover:bg-blue-50 rounded-lg text-xs font-medium transition-colors">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Watch Recording
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordedLessons;