import React from 'react';
import { ChevronDown } from 'lucide-react';
import ImageChild from "../../assets/images/0f8e1d9734e359a5f167b12e36f573ba6133942a.jpg";
import ImageTwo from "../../assets/images/ff2c1ec6db577f2e345c44c9bf9e3999ff815caa.jpg";

export default function ChildrenOverviewTable() {
  const childrenData = [
    {
      id: 1,
      name: "Olivia Johnson",
      avatar: ImageChild,
      subject: "Mathematics",
      tutor: "Sarah J.",
      achievements: "+12",
      attendance: "90%",
      dateLinked: "July 19, 2026",
      status: "Active"
    },
    {
      id: 2,
      name: "Liam Johnson",
      avatar: ImageTwo,
      subject: "Mathematics",
      tutor: "Sarah J.",
      achievements: "+12",
      attendance: "90%",
      dateLinked: "July 19, 2026",
      status: "Active"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
      {/* Section Header */}
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
        Children Overview
      </h2>

      {/* Table Container Card with Background #EBF0F6 */}
      <div 
        style={{ backgroundColor: "#EBF0F6" }} 
        className="border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800 text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 sm:py-4 px-4 sm:px-6">Child</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Subjects</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Tutors</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Achievements</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Attendance</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Date Linked</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs sm:text-sm">
              {childrenData.map((child) => (
                <tr 
                  key={child.id}
                  className="hover:bg-slate-200/40 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {/* Child Profile & Name */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img 
                        src={child.avatar} 
                        alt={child.name} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 flex-shrink-0"
                      />
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {child.name}
                      </span>
                    </div>
                  </td>

                  {/* Subjects Dropdown Field */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors">
                      <span>{child.subject}</span>
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                    </div>
                  </td>

                  {/* Tutors Dropdown Field */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors">
                      <span>{child.tutor}</span>
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                    </div>
                  </td>

                  {/* Achievements */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                    {child.achievements}
                  </td>

                  {/* Attendance */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                    {child.attendance}
                  </td>

                  {/* Date Linked */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {child.dateLinked}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      {child.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}