import React from 'react';
import { FileText, Check, AlertCircle, Clock } from 'lucide-react';

export default function AssignmentsSummary() {
  const stats = [
    {
      title: 'Total Assigned',
      count: 12,
      subtitle: 'All time',
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Submitted',
      count: 10,
      subtitle: '',
      icon: Check,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Pending',
      count: 2,
      subtitle: '',
      icon: AlertCircle,
      iconBg: 'bg-red-50 text-red-500',
    },
    {
      title: 'Awaiting Grading',
      count: 1,
      subtitle: 'Needs review',
      icon: Clock,
      iconBg: 'bg-orange-50 text-orange-500',
    },
  ];

  return (
    <div className="w-full bg-slate-50/50 p-6 md:p-10 font-sans antialiased flex flex-col justify-center">
      <div className="w-full max-w-6xl space-y-6">
        
        {/* Section Title */}
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          Assignments & Quizzes
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex items-center gap-4 transition-all hover:shadow-md"
              >
                {/* Circular Icon Container */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <IconComponent className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-500">
                    {item.title}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-bold tracking-tight text-slate-900">
                      {item.count}
                    </span>
                    {item.subtitle && (
                      <span className="text-[11px] font-medium text-slate-400">
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