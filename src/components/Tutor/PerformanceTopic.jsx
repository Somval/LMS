import React from 'react';
import { CheckCircle, Clock, Edit3 } from 'lucide-react';

const topicData = [
  { topic: 'Quadratic Equations', score: '95%', percentage: 95, color: 'bg-emerald-500' },
  { topic: 'Algebra', score: '88%', percentage: 88, color: 'bg-emerald-500' },
  { topic: 'Functions', score: '80%', percentage: 80, color: 'bg-emerald-500' },
  { topic: 'Geometry', score: '75%', percentage: 75, color: 'bg-emerald-500' },
  { topic: 'Statistics', score: '40%', percentage: 40, color: 'bg-rose-500' },
];

export default function PerformanceDashboard() {
  return (
    <div className="w-full bg-slate-50/50 p-6 md:p-10 font-sans antialiased flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl space-y-6">
        
        {/* Section Title */}
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          Performance Summary
        </h1>

        {/* Bottom Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Performance by Topic */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm lg:col-span-7 flex flex-col justify-between space-y-6">
            <h2 className="text-base md:text-lg font-bold tracking-tight text-slate-900">
              Performance by Topic
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
                <span>Topic</span>
                <span>Average Score</span>
              </div>

              {topicData.map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4 py-2">
                  <span className="text-xs md:text-sm font-semibold text-slate-900 w-36 truncate">
                    {item.topic}
                  </span>
                  
                  <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color}`} 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  <span className="text-xs md:text-sm font-bold text-slate-900 w-10 text-right">
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Performance Insights */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm lg:col-span-5 flex flex-col space-y-6">
            <h2 className="text-base md:text-lg font-bold tracking-tight text-slate-900">
              Performance Insights
            </h2>

            <div className="space-y-4">
              {/* Lessons Completed */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-slate-700">
                    Lessons Completed
                  </span>
                </div>
                <span className="text-base md:text-lg font-bold text-slate-900">18</span>
              </div>

              {/* Time Spent Learning */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-slate-700">
                    Time Spent Learning
                  </span>
                </div>
                <span className="text-base md:text-lg font-bold text-slate-900">9h 45m</span>
              </div>
            </div>

            {/* Tutor Assessment Box */}
            <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-5 space-y-3 mt-auto">
              <h3 className="text-sm font-bold text-slate-900">
                Tutor Assessment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add your observations about this student's strengths and areas for improvement.
              </p>
              <button 
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-700 bg-white border border-purple-200 hover:bg-purple-50 rounded-full transition-colors shadow-sm"
              >
                <Edit3 className="w-3.5 h-3.5 text-purple-600" />
                <span>Add Tutor Assessment</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}