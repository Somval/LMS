import React from 'react';
import { 
  ArrowLeft, 
  FileText, 
  BookOpen, 
  Calendar, 
  Info, 
  Clock 
} from 'lucide-react';

export default function AssignmentDetail({ assignment, onBack }) {
  const isOverdue = assignment.status === 'Overdue';
  
  return (
    <div className="w-full font-sans text-slate-800 space-y-6 max-w-5xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen">
      
      {/* Back Navigation */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Homework & Assignments</span>
      </button>

      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex items-center gap-4">
        <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {assignment.title}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {assignment.subject} • Due {assignment.dueDateFormatted}
          </p>
        </div>
      </div>

      {/* Assignment Overview Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-2">
        <h3 className="text-sm font-bold text-slate-900">Assignment Overview</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {assignment.longDescription}
        </p>
      </div>

      {/* Assignment Information Table Box */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="p-6 pb-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Assignment Information</h3>
        </div>
        <div className="divide-y divide-slate-100 text-sm">
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium text-slate-700">Subject</span>
            </div>
            <span className="font-semibold text-slate-900">{assignment.subject}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500">
              <Calendar className="w-4 h-4" />
              <span className="font-medium text-slate-700">Assigned Date</span>
            </div>
            <span className="font-semibold text-slate-900">{assignment.assignedDate}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500">
              <Calendar className="w-4 h-4" />
              <span className="font-medium text-slate-700">Due Date</span>
            </div>
            <span className="font-semibold text-slate-900">{assignment.dueDateFormatted}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500">
              <Info className="w-4 h-4" />
              <span className="font-medium text-slate-700">Status</span>
            </div>
            <span className={`font-semibold text-xs px-2.5 py-1 rounded-md ${isOverdue ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
              {assignment.status}
            </span>
          </div>
        </div>
      </div>

      {/* Assignment Questions Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Assignment Questions</h3>
        <div className="space-y-3">
          {assignment.questions.map((q, index) => (
            <div key={q.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/40">
              <div className="w-8 h-8 rounded-full bg-[#2D336B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {index + 1}
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">{q.title}</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{q.equation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Olivia's Status</h3>
        <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-4 flex items-center gap-4">
          <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Not Yet Completed</h4>
            <p className="text-xs text-slate-600 mt-0.5">This assignment is due in 2 days.</p>
          </div>
        </div>
      </div>

    </div>
  );
}