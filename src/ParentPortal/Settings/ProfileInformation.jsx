import React, { useState, useRef } from 'react';
import { User, Edit3, Camera, Save, X } from 'lucide-react';

export default function ProfileInformation() {
  // Initial profile state
  const [profile, setProfile] = useState({
    fullName: 'Mary Johnson',
    email: 'mary.johnson@email.com',
    phone: '+44 801 234 5678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  });

  // Form edit state (temporary store while editing)
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  // Save changes
  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  // Cancel changes
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
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

      {/* Main Content */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar Section */}
        <div className="relative group mx-auto sm:mx-0">
          <img
            src={isEditing ? formData.avatar : profile.avatar}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 shadow-inner"
          />
          {isEditing && (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-blue-600 transition"
                title="Upload Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </>
          )}
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

          {/* Email Address */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 font-semibold">{profile.email}</p>
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 font-semibold">{profile.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm transition"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-50 transition"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}