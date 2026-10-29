import React, { useState } from 'react';
import { Edit3, Mail, Phone, MapPin, Camera, X, Plus, Check } from 'lucide-react';

export const ProfileCard = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  
  // Temporary input state for adding new subjects/levels
  const [newSubject, setNewSubject] = useState('');
  const [newLevel, setNewLevel] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, newSubject.trim()]
    }));
    setNewSubject('');
  };

  const handleRemoveSubject = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== indexToRemove)
    }));
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

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...user }); // Revert changes
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
              className="flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Check size={16} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Main Profile Info */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
        {/* Avatar with Camera Badge */}
        <div className="relative shrink-0">
          <img
            src={formData.avatarUrl}
            alt={formData.name}
            className="w-24 h-24 rounded-full object-cover border border-gray-200"
          />
          <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-gray-200 shadow-xs text-gray-600 cursor-pointer hover:bg-gray-50">
            <Camera size={14} />
          </div>
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
          <p className="text-xs text-gray-400 font-medium"> {formData.id}</p>

          <div className="space-y-2.5 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400 shrink-0" />
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-2.5 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span>{formData.email}</span>
              )}
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
              {formData.subjects.map((sub, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-gray-100/80 text-gray-700 text-xs px-3.5 py-1.5 rounded-lg font-medium">
                  {sub}
                  {isEditing && (
                    <button onClick={() => handleRemoveSubject(i)} className="text-gray-400 hover:text-red-500">
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
                  placeholder="Add subject..."
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubject())}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded-lg transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
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