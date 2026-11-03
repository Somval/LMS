import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { api } from '../../lib/api';
import AssignmentView from './AssignmentView';

// Loads one assignment for the selected child, then shows it.
export default function AssignmentDetail({ assignmentId, child, onBack }) {
  const [assignment, setAssignment] = useState(null); // null while loading
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setAssignment(null);
    setError('');

    api
      .get(`/coursework/${assignmentId}`, { studentId: child.id })
      .then((work) => !cancelled && setAssignment(work))
      .catch((err) => !cancelled && setError(err.message || 'Could not load this assignment.'));

    return () => {
      cancelled = true;
    };
  }, [assignmentId, child.id, reload]);

  if (assignment) {
    return <AssignmentView assignment={assignment} child={child} onBack={onBack} />;
  }

  return (
    <div className="w-full font-sans text-slate-800 space-y-6 max-w-5xl mx-auto p-4 md:p-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Homework & Assignments</span>
      </button>

      {error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setReload((n) => n + 1)}
            className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center p-16">
          <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
        </div>
      )}
    </div>
  );
}
