import React, { useEffect, useState } from 'react';
import { User, Edit3, Save, X, Loader2, Check } from 'lucide-react';
import { api } from '../../lib/api';
import { initials } from '../Dashboard/dashboardData';

export default function ProfileInformation() {
  const [profile, setProfile] = useState(null); // { fullName, email, phoneNumber }; null while loading
  const [loadError, setLoadError] = useState('');

  // Form edit state (temporary store while editing)
  const [formData, setFormData] = useState({ fullName: '', phoneNumber: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const load = () => {
    setLoadError('');
    api
      .get('/account/profile')
      .then(setProfile)
      .catch((err) => setLoadError(err.message || 'Could not load your profile.'));
  };

  useEffect(load, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleEdit = () => {
    setFormData({ fullName: profile.fullName, phoneNumber: profile.phoneNumber || '' });
    setError('');
    setSaved(false);
    setIsEditing(true);
  };

  // Save changes
  const handleSave = async () => {
    const fullName = formData.fullName.trim();
    const phoneNumber = formData.phoneNumber.trim();

    if (fullName.length < 2) {
      setError('Enter your full name.');
      return;
    }
    if (phoneNumber && (phoneNumber.length < 7 || phoneNumber.length > 20)) {
      setError('Enter a valid phone number (7 to 20 characters).');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const updated = await api.patch('/account/profile', {
        fullName,
        ...(phoneNumber && { phoneNumber }),
      });
      setProfile(updated);
      setIsEditing(false);
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Could not save your changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Cancel changes
  const handleCancel = () => {
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
          <p className="text-sm text-gray-500">View and update your personal information.</p>
        </div>
      </div>

      {loadError && (
        <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <p>{loadError}</p>
          <button
            type="button"
            onClick={load}
            className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      )}

      {!loadError && !profile && (
        <div className="flex items-center justify-center p-10">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      )}

      {profile && (
        <>
          {/* Main Content */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar Section */}
            <div className="relative group mx-auto sm:mx-0">
              <span
                aria-hidden="true"
                className="flex w-24 h-24 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700 border-2 border-gray-100 shadow-inner"
              >
                {initials(isEditing ? formData.fullName || profile.fullName : profile.fullName)}
              </span>
            </div>

            {/* Details / Form Section */}
            <div className="flex-1 w-full space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-semibold">{profile.fullName}</p>
                )}
              </div>

              {/* Email Address (can't be changed here) */}
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <p className="text-gray-900 font-semibold">{profile.email}</p>
                {isEditing && (
                  <p className="mt-1 text-xs text-gray-400">
                    Your email is your login, so it can't be changed here. Contact support to change it.
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. +2348012345678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-semibold">{profile.phoneNumber || '—'}</p>
                )}
              </div>
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {/* Action Buttons */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            {saved && !isEditing && (
              <span className="mr-auto flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <Check className="w-4 h-4" /> Profile updated
              </span>
            )}
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition disabled:opacity-60"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm transition disabled:opacity-60"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-50 transition"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
