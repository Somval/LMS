import React, { useState } from 'react';
import { User, LogOut, Trash2, X } from 'lucide-react';

// onLogOut and onDeactivate run after the tutor confirms.
export const AccountActionsCard = ({ onLogOut, onDeactivate }) => {
  const [modal, setModal] = useState(null); // 'logout' | 'deactivate' | null

  const confirm = () => {
    const action = modal === 'logout' ? onLogOut : onDeactivate;
    setModal(null);
    action?.();
  };

  const isLogout = modal === 'logout';

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
          type="button"
          onClick={() => setModal('logout')}
          className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          <LogOut size={16} />
          Log Out
        </button>
        <button
          type="button"
          onClick={() => setModal('deactivate')}
          className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-500 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 size={16} />
          Deactivate Account
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="account-modal-title">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 id="account-modal-title" className="text-lg font-bold text-gray-900">
                {isLogout ? 'Log out?' : 'Deactivate account?'}
              </h3>
              <button type="button" onClick={() => setModal(null)} aria-label="Close" className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {isLogout
                ? 'You will need to sign in again to use your tutor dashboard.'
                : "Accounts are deactivated by the support team. We'll take you to Messages so you can ask them, and nothing changes until they confirm with you."}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setModal(null)} className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button
                type="button"
                onClick={confirm}
                className={`rounded-xl px-4 py-2 text-xs font-medium text-white ${isLogout ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {isLogout ? 'Log Out' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
