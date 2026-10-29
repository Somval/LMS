import React from 'react';
import { Plus } from 'lucide-react';
import badgeIcon from '../../../assets/images/134a082cca973150969aa91355d8ac63a4934a6a (4).png';

const achievementsData = [
  { id: 1, title: 'Perfect Attendance', description: 'Awarded for attending all scheduled classes.', date: 'May 20, 2025' },
  { id: 2, title: 'Perfect Attendance', description: 'Awarded for attending all scheduled classes.', date: 'May 20, 2025' },
  { id: 3, title: 'Perfect Attendance', description: 'Awarded for attending all scheduled classes.', date: 'May 20, 2025' },
  { id: 4, title: 'Perfect Attendance', description: 'Awarded for attending all scheduled classes.', date: 'May 20, 2025' },
];

export default function AchievementsSection() {
  return (
    <div className="w-full bg-slate-50/50 p-4 md:p-8 font-sans antialiased flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl space-y-6">
        
        {/* Header & Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Achievements
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              A record of this student’s key milestones and accomplishments.
            </p>
          </div>

          <button 
            type="button"
            className="inline-flex items-center justify-center gap-1.5 p-3 px-4 py-2 text-xs md:text-sm font-medium text-blue-600  border border-[#2E6DFF] hover:bg-blue-50/50 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Create Achievements</span>
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200/70 text-xs md:text-sm font-semibold text-slate-500 tracking-normal">
                  <th className="py-4 px-6 font-medium">Title</th>
                  <th className="py-4 px-6 font-medium">Description</th>
                  <th className="py-4 px-6 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-xs md:text-sm">
                {achievementsData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                    
                    {/* Title Column with Imported Image Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                          <img 
                            src={badgeIcon} 
                            alt="Achievement Badge" 
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <span className="text-slate-900 font-semibold">
                          {item.title}
                        </span>
                      </div>
                    </td>

                    {/* Description Column */}
                    <td className="py-4 px-6 text-slate-500 font-medium max-w-[350px]">
                      {item.description}
                    </td>

                    {/* Date Column */}
                    <td className="py-4 px-6 text-slate-900 font-semibold whitespace-nowrap">
                      {item.date}
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
}