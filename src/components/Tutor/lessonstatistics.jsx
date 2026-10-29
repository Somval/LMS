import React from 'react';
import { FileText, BookOpen, Check } from 'lucide-react';

export default function LessonHistorySummary() {
  const stats = [
    {
      title: 'Subject',
      value: 'Mathematics',
      subtitle: 'Year 1',
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Total Lessons',
      value: '10',
      subtitle: '',
      icon: BookOpen,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Lessons Opened',
      value: '2',
      subtitle: '',
      icon: Check,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="w-full bg-slate-50/50 p-6 md:p-10 font-sans antialiased flex flex-col justify-center">
      <div className="w-full max-w-6xl space-y-6">
        
        {/* Section Title */}
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          Lesson History
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center gap-5 transition-all hover:shadow-md"
              >
                {/* Circular Icon Container */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <IconComponent className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-500">
                    {item.title}
                  </span>
                  <div className="flex flex-col mt-0.5">
                    <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                      {item.value}
                    </span>
                    {item.subtitle && (
                      <span className="text-xs font-medium text-slate-400 mt-0.5">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}