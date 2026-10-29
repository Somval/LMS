import React from 'react';
import { ArrowLeft, Bell, User, ArrowRight, ChevronDown, Lock, Video, FileText } from 'lucide-react';

export default function CourseDetail({ course, weeksState, onBack, onToggleWeek }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top Navbar Header */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

            </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 pb-16 space-y-8">
        
        {/* Breadcrumb & Title Section */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <span className="text-indigo-600 hover:underline cursor-pointer" onClick={onBack}>My Learning Journey</span>
            <span>&gt;</span>
            <span className="text-slate-800">{course.category}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {course.category}: {course.title.split(': ').pop()}
          </h1>

          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
            {course.description}
          </p>

          {/* Progress Bar & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <span className="text-sm font-bold text-indigo-950">{course.progress}% Complete</span>
            <div className="w-full sm:w-64 bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${course.theme.barBg}`} 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-slate-500 font-medium">
              {course.lessonsCompleted} of {course.totalLessons} lessons completed
            </span>
          </div>

          {/* Continue Learning Button */}
          <div className="pt-2">
            <button className={`flex items-center gap-2 py-3 px-6 rounded-xl text-white font-medium text-sm shadow-sm transition-all ${course.theme.primary} ${course.theme.hover}`}>
              <span>Continue learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Learning Content Accordions Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Learning Content</h2>

          {weeksState.map((week) => (
            <div key={week.id} className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white">
              
              {/* Week Header */}
              <div 
                onClick={() => onToggleWeek(week.id)}
                className={`flex items-center justify-between p-4 md:p-5 cursor-pointer bg-slate-50/70 hover:bg-slate-100/80 transition-colors ${week.isOpen ? 'border-b border-slate-100' : ''}`}
              >
                <div className="flex items-center gap-3">
                  {week.locked ? (
                    <div className="w-7 h-7 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-500">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border-2 border-indigo-400 flex items-center justify-center p-0.5">
                      <div className="w-full h-full rounded-full bg-indigo-500"></div>
                    </div>
                  )}
                  <span className={`font-bold text-sm md:text-base ${week.locked ? 'text-slate-400' : 'text-slate-900'}`}>
                    {week.title}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${week.isOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Lessons List */}
              {week.isOpen && (
                <div className="divide-y divide-slate-100">
                  {week.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className={`flex items-center justify-between p-4 md:px-6 md:py-4 transition-colors ${lesson.active ? 'bg-indigo-50/60' : 'hover:bg-slate-50/50'}`}
                    >
                      <div className="flex items-center gap-3">
                        {week.locked ? (
                          <div className="w-6 h-6 flex items-center justify-center text-slate-300">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className={`w-6 h-6 rounded-full border ${lesson.active ? 'border-indigo-400 bg-white flex items-center justify-center' : 'border-slate-300'}`}>
                            {lesson.active && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                          </div>
                        )}
                        <span className={`text-sm font-medium ${week.locked ? 'text-slate-400' : lesson.active ? 'text-indigo-950 font-semibold' : 'text-slate-600'}`}>
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 text-slate-400 text-sm">
                        <span>{lesson.duration}</span>
                        <div className="flex items-center gap-3">
                          <Video className={`w-4 h-4 ${week.locked ? 'text-slate-300' : 'text-slate-400'}`} />
                          <FileText className={`w-4 h-4 ${week.locked ? 'text-slate-300' : 'text-slate-400'}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}