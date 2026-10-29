import React from 'react';
import { ProfileCard } from '../../components/Tutor/ProfileCard';
import { NotificationPreferences } from '../../components/Tutor/NotificationPreferences';
import { AccountSecurity } from '../../components/Tutor/AccountSecurity';
import { PaymentSettings } from '../../components/Tutor/PaymentSettings';
import { PrivacyAndSupport } from '../../components/Tutor/Privacyandsupport';
import { AccountActionsCard } from '../../components/Tutor/AccountActionsCard';

export default function SettingsPage() {
  const userData = {
    name: 'Mary Johnson',
    role: 'Tutor',
    id: 'TD401011',
    email: 'mary.johnson@email.com',
    phone: '+234 810 123 4567',
    location: 'Sango Ota, Ogun State, Nigeria',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    subjects: ['Mathematics', 'Further Mathematics'],
    levels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
  };

  const notificationDefaults = {
    assignments: true,
    grades: true,
    reminders: true,
    messages: true,
    announcements: true,
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Section: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <ProfileCard user={userData} />
          <AccountSecurity />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <NotificationPreferences initialSettings={notificationDefaults} />
          <PaymentSettings />
        </div>
      </div>

      {/* Middle Full-Width Section */}
      <PrivacyAndSupport />

      {/* Bottom Full-Width Section */}
      <AccountActionsCard
        onLogOut={() => alert('Logging out...')}
        onDeactivate={() => alert('Deactivating account...')}
      />
    </div>
  );
}