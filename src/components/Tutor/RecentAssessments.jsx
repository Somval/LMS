import React, { useState, useMemo } from 'react';
import { Search, Eye, Filter, ArrowUpDown, ChevronRight, BookOpen, Calendar, Award, CheckCircle2, X } from 'lucide-react';

const initialAssessments = [
  {
    id: 1,
    title: 'Algebra Quiz',
    subtitle: 'Week 1',
    type: 'Quiz',
    score: '95%',
    numericScore: 95,
    date: 'May 20, 2025',
    status: 'Graded',
    details: 'Covers basic linear equations, variable isolation, and foundational algebraic principles.'
  },
  {
    id: 2,
    title: 'Algebra Quiz',
    subtitle: 'Week 1',
    type: 'Assignment',
    score: '18/20',
    numericScore: 90,
    date: 'May 20, 2025',
    status: 'Graded',
    details: 'Homework assignment focusing on multi-step equations and word problem translations.'
  },
  {
    id: 3,
    title: 'Place Value Practice',
    subtitle: 'Week 1 Lesson 1',
    type: 'Practice Activity',
    score: '95%',
    numericScore: 95,
    date: 'May 20, 2025',
    status: 'Completed',
    details: 'Interactive exercise set covering place values up to hundred-thousands.'
  },
  {
    id: 4,
    title: 'Algebra Quiz',
    subtitle: 'Week 1',
    type: 'Quiz',
    score: '95%',
    numericScore: 95,
    date: 'May 20, 2025',
    status: 'Graded',
    details: 'Follow-up quiz assessing comprehension of linear inequalities.'
  },
  {
    id: 5,
    title: 'Algebra Quiz',
    subtitle: 'Week 1',
    type: 'Quiz',
    score: '95%',
    numericScore: 95,
    date: 'May 20, 2025',
    status: 'Graded',
    details: 'Comprehensive weekly review covering basic functions and graph interpretations.'
  }
];

export default function App() {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const renderTypeBadge = (type) => {
    switch (type) {
      case 'Quiz':
        return (
          <span className="inline-block bg-[#f2e7fe] text-[#9333ea] text-[13px] font-medium px-3 py-1 rounded-md tracking-wide">
            Quiz
          </span>
        );
      case 'Assignment':
        return (
          <span className="inline-block bg-[#e0ebff] text-[#3b82f6] text-[13px] font-medium px-3 py-1 rounded-md tracking-wide">
            Assignment
          </span>
        );
      case 'Practice Activity':
        return (
          <span className="inline-block bg-[#fde8f3] text-[#ec4899] text-[13px] font-medium px-3 py-1 rounded-md tracking-wide">
            Practice Activity
          </span>
        );
      default:
        return (
          <span className="inline-block bg-slate-100 text-slate-700 text-[13px] font-medium px-3 py-1 rounded-md">
            {type}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 md:p-10 font-sans text-slate-800 flex justify-center items-start">
      <div className="w-full max-w-5xl space-y-4">
        {/* Table Card */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Recent Assessments
            </h2>
          </div>

          {/* Table Container with Overflow scroll for responsive screens */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              {/* Header Row */}
              <thead>
                <tr className="bg-[#f3f5f9] text-[#64748b] text-sm font-semibold border-b border-slate-100">
                  <th className="py-3.5 px-6 font-semibold">Assessment</th>
                  <th className="py-3.5 px-6 font-semibold">Type</th>
                  <th className="py-3.5 px-6 font-semibold">Score</th>
                  <th className="py-3.5 px-6 font-semibold">Date</th>
                  <th className="py-3.5 px-6 font-semibold">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {assessments.length > 0 ? (
                  assessments.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/70 transition-colors duration-150 group"
                    >
                      {/* Assessment Title & Subtitle */}
                      <td className="py-4 px-6 align-middle">
                        <div className="font-bold text-slate-900 text-base leading-tight">
                          {item.title}
                        </div>
                        <div className="text-slate-400 text-sm font-normal mt-0.5">
                          {item.subtitle}
                        </div>
                      </td>

                      {/* Assessment Badge */}
                      <td className="py-4 px-6 align-middle">
                        {renderTypeBadge(item.type)}
                      </td>

                      {/* Score */}
                      <td className="py-4 px-6 align-middle font-bold text-slate-900 text-base">
                        {item.score}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 align-middle font-bold text-slate-900 text-base">
                        {item.date}
                      </td>

                      {/* View Action Button */}
                      <td className="py-4 px-6 align-middle">
                        <button
                          onClick={() => setSelectedAssessment(item)}
                          className="inline-flex items-center justify-center border border-[#7c3aed]/40 text-[#6d28d9] hover:bg-[#f3e8ff] hover:border-[#7c3aed] text-xs font-semibold px-4 py-1.5 rounded-md transition-all shadow-2xs active:scale-95"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400 text-sm">
                      No assessments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Details View */}
        {selectedAssessment && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Assessment Details
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {selectedAssessment.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {selectedAssessment.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAssessment(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 my-6">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600 font-medium">Type</span>
                    </div>
                    {renderTypeBadge(selectedAssessment.type)}
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600 font-medium">Achieved Score</span>
                    </div>
                    <span className="font-bold text-slate-900 text-base">
                      {selectedAssessment.score}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600 font-medium">Completion Date</span>
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">
                      {selectedAssessment.date}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">
                      Summary & Description
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedAssessment.details}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAssessment(null)}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}