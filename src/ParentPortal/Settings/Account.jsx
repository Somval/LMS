import React, { useState } from 'react';
import { User, LogOut, Trash2, X, AlertTriangle } from 'lucide-react';

export default function AccountManagement() {
  // Modal state management
  const [activeModal, setActiveModal] = useState(null); // 'logout' | 'deactivate'

  // Handle Logout action
  const handleLogoutConfirm = () => {
    alert('Logging out...');
    // Add your auth logout logic here (e.g., clear tokens, redirect to login)
    setActiveModal(null);
  };

  // Handle Deactivate Account action
  const handleDeactivateConfirm = () => {
    alert('Account deactivated successfully.');
    // Add your account deactivation logic here
    setActiveModal(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        {/* Left Side: Icon, Title, and Description */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl flex-shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Account</h2>
            <p className="text-sm text-gray-500">Manage your account status.</p>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Log Out Button */}
          <button
            onClick={() => setActiveModal('logout')}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-xl hover:bg-blue-50/50 transition shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>

          {/* Deactivate Account Button */}
          <button
            onClick={() => setActiveModal('deactivate')}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-xl hover:bg-red-50/50 transition shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            Deactivate Account
          </button>
        </div>
      </div>

      {/* --- MODALS --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-600 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 1. Log Out Confirmation Modal */}
            {activeModal === 'logout' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <LogOut className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Log Out</h3>
                    <p className="text-sm text-gray-500">Are you sure you want to log out of your session?</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleLogoutConfirm}
                    className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition shadow-sm"
                  >
                    Yes, Log Out
                  </button>
                </div>
              </div>
            )}

            {/* 2. Deactivate Account Confirmation Modal */}
            {activeModal === 'deactivate' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Deactivate Account</h3>
                    <p className="text-sm text-gray-500">This action is permanent and cannot be easily undone.</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 bg-red-50/50 border border-red-100 p-3 rounded-xl mb-6">
                  All your personal data, linked child records, and portal configurations will be disabled.
                </p>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeactivateConfirm}
                    className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition shadow-sm"
                  >
                    Confirm Deactivation
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}