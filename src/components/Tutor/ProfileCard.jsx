import React, { useRef, useState } from 'react';
import { Edit3, Mail, Phone, MapPin, Camera, X, Plus, Check } from 'lucide-react';
import Avatar from '../Avatar';

const PHOTO_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const PHOTO_MAX_BYTES = 5 * 1024 * 1024;

export const ProfileCard = ({ user, onSave, onAvatarChange }) => {
  const photoInput = useRef(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  
  // Temporary input state for adding new subjects/levels
  const [newLevel, setNewLevel] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLevel = () => {
    if (!newLevel.trim()) return;
    setFormData((prev) => ({
      ...prev,
      levels: [...prev.levels, newLevel.trim()]
    }));
    setNewLevel('');
  };

  const handleRemoveLevel = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      levels: prev.levels.filter((_, i) => i !== indexToRemove)
    }));
  };

  const handleSave = async () => {
    if (formData.name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (formData.phone.trim() && formData.phone.trim().length < 7) {
      setError('Please enter a valid phone number.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (onSave) await onSave(formData);
      setIsEditing(false);
    } catch (err) {
      setError(err?.message || 'Could not save your changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Picking a photo saves it straight away (it does not wait for "Save Changes").
  const handlePhotoPicked = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = ''; // lets the same file be picked again later
    if (!file) return;
    if (!PHOTO_TYPES.includes(file.type)) {
      setPhotoError('Please choose a PNG, JPEG or WebP image.');
      return;
    }
    if (file.size > PHOTO_MAX_BYTES) {
      setPhotoError('That photo is too large. Please choose one under 5 MB.');
      return;
    }
    setPhotoBusy(true);
    setPhotoError('');
    try {
      await onAvatarChange?.(file);
    } catch (err) {
      setPhotoError(err?.message || 'Could not update your photo. Please try again.');
    } finally {
      setPhotoBusy(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...user }); // Revert changes
    setError('');
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm max-w-2xl w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Profile Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors shadow-xs"
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-xs disabled:opacity-60"
            >
              <Check size={16} />
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {(error || photoError) && (
        <p role="alert" className="mb-4 text-sm font-medium text-red-600">
          {error || photoError}
        </p>
      )}

      {/* Main Profile Info */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
        {/* Avatar with Camera Badge */}
        <div className="relative shrink-0">
          <Avatar
            name={formData.name}
            avatarUrl={user.avatarUrl}
            className="w-24 h-24 rounded-full border border-gray-200"
            textClassName="text-2xl"
          />
          <input
            ref={photoInput}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handlePhotoPicked}
          />
          <button
            type="button"
            onClick={() => photoInput.current?.click()}
            disabled={photoBusy || !onAvatarChange}
            aria-label="Change profile photo"
            title="Change profile photo"
            className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-gray-200 shadow-xs text-gray-600 hover:bg-gray-50 disabled:opacity-60"
          >
            <Camera size={14} />
          </button>
          {photoBusy && <p className="mt-1 text-center text-[11px] text-gray-400">Uploading…</p>}
        </div>

        {/* User Details */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="font-bold text-gray-900 text-lg border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              />
            ) : (
              <h3 className="font-bold text-gray-900 text-lg">{formData.name}</h3>
            )}
            <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
              {formData.role}
            </span>
          </div>
          {formData.id && <p className="text-xs text-gray-400 font-medium"> {formData.id}</p>}

          <div className="space-y-2.5 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <span>{formData.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gray-400 shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-2.5 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span>{formData.phone}</span>
              )}
            </div>

            {formData.location !== undefined && (
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-2.5 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span>{formData.location}</span>
              )}
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-6 space-y-5">
        {/* Subjects Taught */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
          <span className="text-sm font-medium text-gray-900 sm:w-36 shrink-0 pt-1">Subjects Taught</span>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap gap-2">
              {formData.subjects.length === 0 && <span className="text-xs text-gray-400">No subjects assigned yet.</span>}
              {formData.subjects.map((sub, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-gray-100/80 text-gray-700 text-xs px-3.5 py-1.5 rounded-lg font-medium">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Levels Taught */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
          <span className="text-sm font-medium text-gray-900 sm:w-36 shrink-0 pt-1">Levels Taught</span>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap gap-2">
              {formData.levels.map((lvl, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-gray-100/80 text-gray-700 text-xs px-3.5 py-1.5 rounded-lg font-medium">
                  {lvl}
                  {isEditing && (
                    <button onClick={() => handleRemoveLevel(i)} className="text-gray-400 hover:text-red-500">
                      <X size={12} />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Add level..."
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLevel())}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddLevel}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded-lg transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};