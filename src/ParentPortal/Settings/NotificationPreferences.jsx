import React, { useState } from 'react';
import { Bell, Check, Save } from 'lucide-react';

export default function NotificationPreferences() {
  // Initial preferences state matching the screenshot items
  const [preferences, setPreferences] = useState({
    homeworkUpdates: true,
    attendanceAlerts: true,
    newProgressReports: true,
    newAchievements: true,
    tutorMessages: true,
    platformAnnouncements: true,
  });

  const [savedMessage, setSavedMessage] = useState(false);

  // Toggle individual notification setting
  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSavedMessage(false);
  };

  // Save changes handler
  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000); // Hide success after 3s
  };

  // List of notification items for clean mapping
  const notificationItems = [
    { key: 'homeworkUpdates', label: 'Homework Updates' },
    { key: 'attendanceAlerts', label: 'Attendance Alerts' },
    { key: 'newProgressReports', label: 'New Progress Reports' },
    { key: 'newAchievements', label: 'New Achievements' },
    { key: 'tutorMessages', label: 'Tutor Messages' },
    { key: 'platformAnnouncements', label: 'Platform Announcements' },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Bell className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
          <p className="text-sm text-gray-500">Choose what email notifications you want to receive.</p>
        </div>
      </div>

      {/* Preferences Toggle List */}
      <div className="divide-y divide-gray-100">
        {notificationItems.map(({ key, label }) => {
          const isEnabled = preferences[key];
          return (
            <div
              key={key}
              onClick={() => handleToggle(key)}
              className="flex items-center justify-between py-4 cursor-pointer group select-none"
            >
              <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">
                {label}
              </span>

              {/* Custom Toggle Switch */}
              <div
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
                  isEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / Save Action */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        {savedMessage ? (
          <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium animate-in fade-in">
            <Check className="w-4 h-4" /> Preferences saved successfully!
          </div>
        ) : (
          <span className="text-xs text-gray-400">Changes apply to your email inbox</span>
        )}

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm transition active:scale-95"
        >
          <Save className="w-4 h-4" /> Save Preferences
        </button>
      </div>
    </div>
  );
}