import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
// Example local logo import statement (uncomment and adjust path as needed for your project):
 import achievementBadge from '../../assets/images/134a082cca973150969aa91355d8ac63a4934a6a (1).png';

// Default mock JSON data structured with months, details, and imported image support
const timelineData = [
  {
    month: 'August 2026',
    achievements: [
      {
        id: 1,
        title: 'Mathematics Milestone',
        description: 'Completed a major Mathematics learning milestone.',
        date: 'Aug 8, 2026',
        achievedDate: 'August 8, 2026',
        detailedSummary: 'Olivia completed the required learning activities and reached this major milestone in Mathematics.',
        pointsAchieved: [
          'Completed required learning activities',
          'Consistent effort and improvement',
          'Demonstrated strong understanding of key concepts'
        ],
        // Use imported variable here, or keep string path for backend CDN
        logo: achievementBadge
      },
      {
        id: 2,
        title: 'Mathematics Milestone',
        description: 'Completed a major Mathematics learning milestone.',
        date: 'Aug 8, 2026',
        achievedDate: 'August 8, 2026',
        detailedSummary: 'Olivia successfully solved advanced problem sets and demonstrated leadership during group sessions.',
        pointsAchieved: [
          'Solved advanced problem sets',
          'Demonstrated peer collaboration',
          'Completed all problem sets accurately'
        ],
  logo: achievementBadge
      }
    ]
  },
  {
    month: 'July 2026',
    achievements: [
      {
        id: 3,
        title: 'Mathematics Milestone',
        description: 'Completed a major Mathematics learning milestone.',
        date: 'Jul 15, 2026',
        achievedDate: 'July 15, 2026',
        detailedSummary: 'Completed foundational modules with exceptional accuracy and dedication.',
        pointsAchieved: [
          'Mastered foundational concepts',
          'Scored above 90% on evaluations'
        ],
        logo: achievementBadge
      }
    ]
  }
];

export default function AchievementTimeline({ data = timelineData }) {
  // Track selected achievement for the detail panel (defaults to the first item)
  const [selectedAchievement, setSelectedAchievement] = useState(data[0]?.achievements[0] || null);

  return (
    <div className="w-full font-sans text-slate-800">
      <div className=" rounded-2xl  p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Achievement Timeline (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Achievement Timeline
          </h2>

          <div className="space-y-8 relative pl-4">
            {/* Vertical timeline connecting line */}
            <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-slate-200 -z-0" />

            {data.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-4 relative z-10">
                
                {/* Month Group Header */}
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100 shrink-0" />
                  <h3 className="text-sm font-bold text-blue-600 tracking-wide">
                    {group.month}
                  </h3>
                </div>

                {/* Achievement Items inside Month */}
                <div className="space-y-3 pl-7">
                  {group.achievements.map((item) => {
                    const isSelected = selectedAchievement?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedAchievement(item)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-200 shadow-2xs'
                            : 'bg-white border-slate-200/80 hover:bg-slate-50/60'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Logo Image */}
                          <div className="w-11 h-11 rounded-xl bg-blue-100/60 border border-blue-200/50 flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-2xs">
                            <img 
                              src={item.logo} 
                              alt={item.title} 
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-500 truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="text-xs font-medium text-slate-400 whitespace-nowrap shrink-0">
                          {item.date}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Achievement Details Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-50/50 border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-6 sticky top-6">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Achievement Details
          </h3>

          {selectedAchievement ? (
            <div className="space-y-6">
              
              {/* Badge & Title Info */}
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-blue-100/80 border border-blue-200 flex items-center justify-center p-3.5 shadow-sm">
                    <img 
                      src={selectedAchievement.logo} 
                      alt={selectedAchievement.title} 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {selectedAchievement.title}
                  </h4>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    Achieved on {selectedAchievement.achievedDate}
                  </p>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs text-slate-600 leading-relaxed border-t border-b border-slate-200/60 py-4">
                {selectedAchievement.detailedSummary}
              </p>

              {/* What was achieved checklist */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  What was achieved
                </h5>
                <ul className="space-y-2.5">
                  {selectedAchievement.pointsAchieved?.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-12">
              Select an achievement from the timeline to view details.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}