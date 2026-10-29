import React from 'react';
import { User, LogOut, Trash2 } from 'lucide-react';

export const AccountActionsCard = ({ onLogOut, onDeactivate }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-red-50 text-red-500 rounded-xl">
          <User size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Account</h2>
          <p className="text-xs text-gray-400">Manage your account status.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onLogOut}
          className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          <LogOut size={16} />
          Log Out
        </button>
        <button
          onClick={onDeactivate}
          className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-500 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 size={16} />
          Deactivate Account
        </button>
      </div>
    </div>
  );
};