import React, { useState } from 'react';

export const NotificationPreferences = ({ initialSettings }) => {
  const [preferences, setPreferences] = useState(initialSettings);

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const options = [
    { key: 'assignments', title: 'Assignments & Quizzes', desc: 'New submissions and updates' },
    { key: 'grades', title: 'Grades & Feedback', desc: 'When students are graded or receive feedback' },
    { key: 'reminders', title: 'Live Class Reminders', desc: 'Upcoming live classes' },
    { key: 'messages', title: 'Messages', desc: 'New messages from parents' },
    { key: 'announcements', title: 'Platform Announcements', desc: 'Important updates from LMS' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
      <p className="text-xs text-gray-500 mb-6">Choose what you want to be notified about.</p>

      <div className="space-y-5">
        {options.map(({ key, title, desc }) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">{title}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            <button
              onClick={() => togglePreference(key)}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                preferences[key] ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};