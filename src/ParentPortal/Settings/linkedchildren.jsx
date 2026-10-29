import React, { useState, useRef } from 'react';
import { Users, Plus, ChevronRight, X, Trash2, Camera, Save } from 'lucide-react';

export default function LinkedChildrenSection() {
  // Initial list of linked children matching the design
  const [children, setChildren] = useState([
    {
      id: '1',
      name: 'Olivia Johnson',
      learnerId: 'LMS1001STU',
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      name: 'Ethan Johnson',
      learnerId: 'LMS1002STU',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
  ]);

  // Modal / Editing state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChild, setEditingChild] = useState(null); // null = adding new, object = editing existing
  
  // Form state
  const [formData, setFormData] = useState({ name: '', learnerId: '', avatar: '' });
  const fileInputRef = useRef(null);

  // Open modal for adding a new child
  const handleOpenAddModal = () => {
    setEditingChild(null);
    setFormData({
      name: '',
      learnerId: `LMS${Math.floor(1000 + Math.random() * 9000)}STU`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing child
  const handleOpenEditModal = (child) => {
    setEditingChild(child);
    setFormData({ name: child.name, learnerId: child.learnerId, avatar: child.avatar });
    setIsModalOpen(true);
  };

  // Handle image upload inside modal
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  // Save child (either create new or update)
  const handleSaveChild = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingChild) {
      // Update existing
      setChildren((prev) =>
        prev.map((c) => (c.id === editingChild.id ? { ...c, ...formData } : c))
      );
    } else {
      // Add new
      const newChild = {
        id: Date.now().toString(),
        ...formData,
      };
      setChildren((prev) => [...prev, newChild]);
    }
    setIsModalOpen(false);
  };

  // Delete/Unlink child
  const handleDeleteChild = (id) => {
    setChildren((prev) => prev.filter((c) => c.id !== id));
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Linked Children</h2>
          <p className="text-sm text-gray-500">Manage the children linked to your account.</p>
        </div>
      </div>

      {/* Children List */}
      <div className="mt-6 space-y-3">
        {children.map((child) => (
          <div
            key={child.id}
            onClick={() => handleOpenEditModal(child)}
            className="flex items-center justify-between p-4 bg-white border border-gray-200/80 rounded-2xl hover:border-blue-400 hover:shadow-sm transition cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <img
                src={child.avatar}
                alt={child.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-100"
              />
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  {child.name}
                </h3>
                <p className="text-xs text-gray-500">Learner ID: {child.learnerId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                Linked
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
            </div>
          </div>
        ))}
      </div>

      {/* Link Another Child Button */}
      <button
        onClick={handleOpenAddModal}
        className="w-full mt-4 py-4 border-2 border-dashed border-blue-200 bg-blue-50/30 hover:bg-blue-50/60 rounded-2xl flex items-center justify-center gap-2 text-blue-600 font-medium text-sm transition"
      >
        <Plus className="w-4 h-4" /> Link Another Child
      </button>

      {/* Modal for Adding / Editing Child */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">
                {editingChild ? 'Edit Linked Child' : 'Link a New Child'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveChild} className="mt-6 space-y-4">
              {/* Avatar Upload Preview */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative group">
                  <img
                    src={formData.avatar}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-blue-600 transition"
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
                </div>
                <span className="text-xs text-gray-400 mt-2">Click camera icon to change photo</span>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Johnson"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Learner ID Field */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Learner ID
                </label>
                <input
                  type="text"
                  required
                  value={formData.learnerId}
                  onChange={(e) => setFormData({ ...formData, learnerId: e.target.value })}
                  placeholder="e.g. LMS1003STU"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-6">
                {editingChild ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteChild(editingChild.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" /> Unlink
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm transition"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}