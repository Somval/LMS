import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, ChevronRight, X, Trash2, Loader2 } from 'lucide-react';
import { api } from '../../lib/api';
import { initials } from '../Dashboard/dashboardData';

export default function LinkedChildrenSection() {
  const navigate = useNavigate();

  const [children, setChildren] = useState(null); // null while loading
  const [loadError, setLoadError] = useState('');

  // The child whose details are open in the modal
  const [selectedChild, setSelectedChild] = useState(null);
  const [confirmingUnlink, setConfirmingUnlink] = useState(false);
  const [unlinking, setUnlinking] = useState(false);
  const [unlinkError, setUnlinkError] = useState('');

  const load = useCallback(() => {
    setLoadError('');
    api
      .get('/parent/children')
      .then(setChildren)
      .catch((err) => setLoadError(err.message || 'Could not load your children.'));
  }, []);

  useEffect(load, [load]);

  const closeModal = () => {
    setSelectedChild(null);
    setConfirmingUnlink(false);
    setUnlinkError('');
  };

  // Unlink child
  const handleUnlink = async () => {
    setUnlinking(true);
    setUnlinkError('');
    try {
      await api.delete(`/parent/children/${selectedChild.id}`);
      setChildren((prev) => prev.filter((c) => c.id !== selectedChild.id));
      closeModal();
    } catch (err) {
      setUnlinkError(err.message || 'Could not unlink this child. Please try again.');
    } finally {
      setUnlinking(false);
    }
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

      {!loadError && children === null && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      )}

      {/* Children List */}
      {children && (
        <div className="mt-6 space-y-3">
          {children.length === 0 && (
            <p className="text-sm text-gray-500">No child is linked to your account yet.</p>
          )}

          {children.map((child) => (
            <div
              key={child.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedChild(child)}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedChild(child)}
              className="flex items-center justify-between p-4 bg-white border border-gray-200/80 rounded-2xl hover:border-blue-400 hover:shadow-sm transition cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex w-12 h-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 border border-gray-100"
                >
                  {initials(child.fullName)}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {child.fullName}
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
      )}

      {/* Link Another Child Button */}
      <button
        onClick={() => navigate('/parent/link-children')}
        className="w-full mt-4 py-4 border-2 border-dashed border-blue-200 bg-blue-50/30 hover:bg-blue-50/60 rounded-2xl flex items-center justify-center gap-2 text-blue-600 font-medium text-sm transition"
      >
        <Plus className="w-4 h-4" /> Link Another Child
      </button>

      {/* Modal with the child's details and the option to unlink */}
      {selectedChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div role="dialog" aria-modal="true" className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Linked Child</h3>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col items-center justify-center">
                <span
                  aria-hidden="true"
                  className="flex w-20 h-20 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700 border-2 border-gray-100 shadow-sm"
                >
                  {initials(selectedChild.fullName)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <p className="text-sm font-semibold text-gray-900">{selectedChild.fullName}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Learner ID
                </label>
                <p className="text-sm font-semibold text-gray-900">{selectedChild.learnerId}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Active Subjects
                </label>
                <p className="text-sm text-gray-700">
                  {selectedChild.subjects?.length
                    ? selectedChild.subjects.map((s) => s.name ?? s.subject?.name).filter(Boolean).join(', ')
                    : 'None selected yet'}
                </p>
              </div>

              {unlinkError && (
                <p role="alert" className="text-sm font-medium text-red-600">{unlinkError}</p>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-6">
                {confirmingUnlink ? (
                  <div className="w-full space-y-3">
                    <p className="text-sm text-gray-600">
                      Unlink {selectedChild.fullName.split(/\s+/)[0]} from your account? You'll stop seeing their progress. They can be linked again with a new code.
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirmingUnlink(false)}
                        disabled={unlinking}
                        className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition disabled:opacity-60"
                      >
                        Keep Linked
                      </button>
                      <button
                        type="button"
                        onClick={handleUnlink}
                        disabled={unlinking}
                        className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 shadow-sm transition disabled:opacity-60"
                      >
                        {unlinking && <Loader2 className="w-4 h-4 animate-spin" />}
                        {unlinking ? 'Unlinking…' : 'Yes, Unlink'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setConfirmingUnlink(true)}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4" /> Unlink Child
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 shadow-sm transition"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
