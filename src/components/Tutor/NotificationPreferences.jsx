import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const NotificationPreferences = ({ initialSettings }) => {
  const { user } = useAuth();
  const storageKey = `tutor-notification-preferences:${user?.id}`;

  // Choices are remembered on this device (the browser's storage).
  const [preferences, setPreferences] = useState(() => {
    try {
      return { ...initialSettings, ...JSON.parse(localStorage.getItem(storageKey) || '{}') };
    } catch {
      return initialSettings;
    }
  });

  const togglePreference = (key) => {
    const next = { ...preferences, [key]: !preferences[key] };
    setPreferences(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // storage unavailable (private mode): the choice just won't be remembered
    }
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
              type="button"
              role="switch"
              aria-checked={!!preferences[key]}
              aria-label={title}
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

      <p className="mt-6 text-[11px] text-gray-400">Your choices are remembered on this device.</p>
    </div>
  );
};