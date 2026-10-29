import React, { useState } from 'react';
import { Shield, Lock, ShieldCheck, Globe, ChevronRight, X, Save, Check } from 'lucide-react';

export default function SecurityAndPreferences() {
  // State for Security & 2FA
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  // State for Password Form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // State for Language Preference
  const [language, setLanguage] = useState('English');

  // Handle password change submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setIsPasswordModalOpen(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 1500);
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
            onClick={() => setIs2FAModalOpen(true)}
            className="flex items-center justify-between py-4 cursor-pointer group hover:bg-gray-50/50 px-2 rounded-xl transition"
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
                  is2FAEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {is2FAEnabled ? 'Enabled' : 'Disabled'}
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
            className="w-48 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm cursor-pointer"
          >
            <option value="English">English</option>
            <option value="French">French (Français)</option>
            <option value="Spanish">Spanish (Español)</option>
            <option value="German">German (Deutsch)</option>
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
                    className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm transition"
                  >
                    <Save className="w-4 h-4" /> Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL: Two-Factor Authentication Toggle --- */}
      {is2FAModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Two-Factor Authentication (2FA)</h3>
              <button
                onClick={() => setIs2FAModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <p className="text-sm text-gray-600">
                Protect your account with an extra layer of security. When 2FA is enabled, you will need to enter a security code during login.
              </p>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-sm font-medium text-gray-900">Status</span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    is2FAEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {is2FAEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIs2FAModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIs2FAEnabled(!is2FAEnabled);
                  setIs2FAModalOpen(false);
                }}
                className={`px-5 py-2 text-white text-sm font-medium rounded-xl shadow-sm transition ${
                  is2FAEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}