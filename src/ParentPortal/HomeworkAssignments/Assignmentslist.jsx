import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import AssignmentDetail from './AssignmentDetail';

const assignmentsData = [
  {
    id: 1,
    title: 'Algebra Practice',
    description: 'Practice solving linear equations',
    longDescription: 'Practice solving linear equations using the exercises provided. Complete questions 1–20 and show your working.',
    subject: 'Mathematics',
    assignedDate: 'Aug 8, 2026',
    dueDateFormatted: 'Aug 12, 2026',
    dueDate: 'Aug 12, 2025\nTue',
    status: 'Due Soon',
    questions: [
      { id: 1, title: 'Solve for x:', equation: '3x + 2 = 14' },
      { id: 2, title: 'Solve for x:', equation: '3x + 2 = 14' },
      { id: 3, title: 'Solve for x:', equation: '3x + 2 = 14' },
      { id: 4, title: 'Solve for x:', equation: '3x + 2 = 14' },
      { id: 5, title: 'Solve for x:', equation: '3x + 2 = 14' },
    ]
  },
  {
    id: 2,
    title: 'Algebra Practice',
    description: 'Practice solving linear equations',
    longDescription: 'Practice solving linear equations using the exercises provided. Complete questions 1–20 and show your working.',
    subject: 'Mathematics',
    assignedDate: 'Aug 5, 2026',
    dueDateFormatted: 'Aug 12, 2026',
    dueDate: 'Aug 12, 2025\nTue',
    status: 'Overdue',
    questions: [
      { id: 1, title: 'Solve for x:', equation: '3x + 2 = 14' },
      { id: 2, title: 'Solve for x:', equation: '3x + 2 = 14' },
    ]
  },
  {
    id: 3,
    title: 'Algebra Practice',
    description: 'Practice solving linear equations',
    longDescription: 'Practice solving linear equations using the exercises provided. Complete questions 1–20 and show your working.',
    subject: 'Mathematics',
    assignedDate: 'Aug 8, 2026',
    dueDateFormatted: 'Aug 12, 2026',
    dueDate: 'Aug 12, 2025\nTue',
    status: 'Due Soon',
    questions: [
      { id: 1, title: 'Solve for x:', equation: '3x + 2 = 14' },
    ]
  },
  {
    id: 4,
    title: 'Algebra Practice',
    description: 'Practice solving linear equations',
    longDescription: 'Practice solving linear equations using the exercises provided. Complete questions 1–20 and show your working.',
    subject: 'Mathematics',
    assignedDate: 'Aug 8, 2026',
    dueDateFormatted: 'Aug 12, 2026',
    dueDate: 'Aug 12, 2025\nTue',
    status: 'Due Soon',
    questions: [
      { id: 1, title: 'Solve for x:', equation: '3x + 2 = 14' },
    ]
  },
  {
    id: 5,
    title: 'Algebra Practice',
    description: 'Practice solving linear equations',
    longDescription: 'Practice solving linear equations using the exercises provided. Complete questions 1–20 and show your working.',
    subject: 'Mathematics',
    assignedDate: 'Aug 8, 2026',
    dueDateFormatted: 'Aug 12, 2026',
    dueDate: 'Aug 12, 2025\nTue',
    status: 'Due Soon',
    questions: [
      { id: 1, title: 'Solve for x:', equation: '3x + 2 = 14' },
    ]
  },
];


const tabs = ['All', 'Completed', 'Overdue'];

export default function Assignments({ onViewChange }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Helper function to select an assignment and notify parent
  const handleSelectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    if (onViewChange) onViewChange(true); // Notify parent that detail view is active
  };

  // Helper function to go back and notify parent
  const handleBack = () => {
    setSelectedAssignment(null);
    if (onViewChange) onViewChange(false); // Notify parent that detail view is closed
  };

  const filteredAssignments = assignmentsData.filter((item) => {
    if (activeTab === 'Completed') return item.status === 'Completed';
    if (activeTab === 'Overdue') return item.status === 'Overdue';
    return true;
  });

  // Render Detail View
  if (selectedAssignment) {
    return (
      <AssignmentDetail 
        assignment={selectedAssignment} 
        onBack={handleBack} 
      />
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="w-full font-sans text-slate-800 space-y-6">
      
      {/* Filter Tabs Header */}
      <div className="flex items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-2xs ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 md:p-8 space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Assignments
        </h2>

        {/* Table Container */}
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#F1F3F9] text-slate-600 text-xs md:text-sm font-semibold">
                <th className="py-4 px-6 rounded-tl-xl">Assignment</th>
                <th className="py-4 px-6">Subject</th>
                <th className="py-4 px-6">Due Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 rounded-tr-xl">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((row) => {
                  const isOverdue = row.status === 'Overdue';
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{row.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{row.description}</div>
                      </td>

                      <td className="py-4 px-6 text-slate-800 font-medium whitespace-nowrap">
                        {row.subject}
                      </td>

                      <td className="py-4 px-6 text-slate-700 whitespace-nowrap">
                        <div className="leading-tight">
                          {row.dueDate.split('\n')[0]}
                          <br />
                          <span className="text-slate-500 font-medium">{row.dueDate.split('\n')[1]}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        {isOverdue ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#FEE2E2] text-[#DC2626]">
                            Overdue
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#FFEDD5] text-[#C2410C]">
                            Due Soon
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleSelectAssignment(row)}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          <span>View</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500 text-sm">
                    No assignments found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}