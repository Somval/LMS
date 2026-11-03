import React, { useState } from 'react';
import { api } from '../../lib/api';
import { Shield, Lock, ShieldCheck, Globe, ChevronRight, X, Save, Check } from 'lucide-react';

export default function SecurityAndPreferences() {
  // State for Security & 2FA
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // State for Password Form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // State for Language Preference
  const [language, setLanguage] = useState('English');

  const [passwordError, setPasswordError] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);

  // Handle password change submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setPasswordError('Your new password needs at least 8 characters, with a letter and a number.');
      return;
    }

    setPasswordSaving(true);
    try {
      await api.post('/account/change-password', { currentPassword, newPassword });
      setPasswordSuccess(true);
      setTimeout(() => {
        setPasswordSuccess(false);
        setIsPasswordModalOpen(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }, 1500);
    } catch (err) {
      setPasswordError(err.message || 'Could not change your password. Please try again.');
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      {/* 1. Security Card Section */}
      <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            <p className="text-sm text-gray-500">Manage your account security settings.</p>
          </div>
        </div>

        {/* Security Options List */}
        <div className="divide-y divide-gray-100">
          {/* Change Password Row */}
          <div
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center justify-between py-4 cursor-pointer group hover:bg-gray-50/50 px-2 rounded-xl transition"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                Change Password
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
          </div>

          {/* Two-Factor Authentication Row */}
          <div
            className="flex items-center justify-between py-4 px-2 rounded-xl opacity-70"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                Two-Factor Authentication
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  'bg-gray-100 text-gray-500'
                }`}
              >
                Coming soon
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Preferences Card Section */}
      <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
            <p className="text-sm text-gray-500">Customize your portal experience.</p>
          </div>
        </div>

        {/* Language Selection Row */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled
            title="More languages are coming soon"
            className="w-48 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm cursor-pointer"
          >
            <option value="English">English</option>
          </select>
        </div>
      </div>

      {/* --- MODAL: Change Password --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Change Password</h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passwordSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-semibold text-gray-900">Password Updated Successfully!</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {passwordError && (
                  <p role="alert" className="text-sm font-medium text-red-600">{passwordError}</p>
                )}

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={passwordSaving}
                    className="flex items-center gap-1.5 px-5 py-2 disabled:opacity-60 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm transition"
                  >
                    <Save className="w-4 h-4" /> {passwordSaving ? 'Updating…' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
