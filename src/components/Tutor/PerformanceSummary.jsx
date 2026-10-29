import React from 'react';
import { Star, Award, TrendingUp } from 'lucide-react';

export default function PerformanceSummary() {
  return (
    <div className="w-full  p-6 md:p-10 font-sans antialiased flex flex-col justify-center">
      <div className="w-full max-w-6xl space-y-6">
        
        {/* Section Title */}
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          Performance Summary
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Overall Performance */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center justify-between gap-4">
            
            {/* Circular Progress Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-950"
                  strokeDasharray="82, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-slate-900 tracking-tight">82%</span>
              </div>
            </div>

            {/* Performance Details */}
            <div className="flex flex-col flex-1">
              <span className="text-xs font-semibold text-slate-900">Overall Performance</span>
              <span className="text-xs font-medium text-indigo-900 mt-0.5">Good</span>
              <div className="flex items-center gap-1 mt-3 text-[11px] font-medium text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>6% from last month</span>
              </div>
            </div>
          </div>

          {/* Card 2: Highest Score */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 fill-emerald-500/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">Highest Score</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900 mt-0.5">95%</span>
              <span className="text-xs font-medium text-emerald-600 mt-1">Quadratic Equations Quiz</span>
              <span className="text-[11px] text-slate-400 mt-0.5">May 20, 2025</span>
            </div>
          </div>

          {/* Card 3: Assessments Completed */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 fill-amber-500/15" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">Assessments Completed</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900 mt-0.5">12</span>
              <span className="text-xs font-medium text-emerald-600 mt-1">Quadratic Equations Quiz</span>
              <span className="text-[11px] text-slate-400 mt-0.5">9 Quizzes · 3 Assignments</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}