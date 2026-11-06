import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { ProfileCard } from '../../components/Tutor/ProfileCard';
import { NotificationPreferences } from '../../components/Tutor/NotificationPreferences';
import { AccountSecurity } from '../../components/Tutor/AccountSecurity';
import { PaymentSettings } from '../../components/Tutor/PaymentSettings';
import { PrivacyAndSupport } from '../../components/Tutor/Privacyandsupport';
import { AccountActionsCard } from '../../components/Tutor/AccountActionsCard';

const notificationDefaults = {
  assignments: true,
  grades: true,
  reminders: true,
  messages: true,
  announcements: true,
};

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout, updateUser } = useAuth();

  const [profile, setProfile] = useState(null); // null while loading
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setProfile(null);
    setError('');
    Promise.all([api.get('/account/profile'), api.get('/tutors/me')])
      .then(([account, tutor]) =>
        setProfile({
          name: account.fullName,
          role: 'Tutor',
          email: account.email,
          phone: account.phoneNumber ?? '',
          avatarUrl: account.avatarUrl ?? null,
          subjects: (tutor.subjects ?? []).map((s) => s.subject.name),
          levels: Array.isArray(tutor.yearLevels) ? tutor.yearLevels : [],
        })
      )
      .catch((err) => setError(err.message || 'Could not load your profile.'));
  }, []);

  useEffect(load, [load]);

  // Name and phone live on the account, year levels on the tutor profile.
  // Throws when something could not be saved so the profile card can show why.
  const handleSaveProfile = async (data) => {
    const name = data.name.trim();
    const phone = data.phone.trim();
    await api.patch('/account/profile', {
      fullName: name,
      ...(phone ? { phoneNumber: phone } : {}),
    });
    await api.put('/tutors/me', { yearLevels: data.levels });
    updateUser({ fullName: name });
    setProfile((current) => ({ ...current, ...data, name, phone }));
  };

  // Uploads the chosen photo, then shows it here and in the rest of the app (navbar, chats).
  const handleAvatarChange = async (file) => {
    const updated = await api.upload('/account/avatar', file);
    updateUser({ avatarUrl: updated.avatarUrl });
    setProfile((current) => ({ ...current, avatarUrl: updated.avatarUrl }));
  };

  const handleLogOut = () => {
    logout();
    navigate('/tutor/login', { replace: true });
  };

  // Accounts are deactivated by the support team, so this takes the tutor to a message to them.
  const handleDeactivate = () => navigate('/tutor/messages');

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Section: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {error ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">
              <p role="alert">{error}</p>
              <button
                type="button"
                onClick={load}
                className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
              >
                Try again
              </button>
            </div>
          ) : profile ? (
            <ProfileCard user={profile} onSave={handleSaveProfile} onAvatarChange={handleAvatarChange} />
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-7 text-sm text-gray-500 shadow-sm">
              Loading your profile…
            </div>
          )}
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
      <AccountActionsCard onLogOut={handleLogOut} onDeactivate={handleDeactivate} />
    </div>
  );
}
