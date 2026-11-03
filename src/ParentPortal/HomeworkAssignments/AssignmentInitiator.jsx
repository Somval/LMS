import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { api } from '../../lib/api';
import Assignments from "./Assignmentslist";
import SelctChild from "./SelectChild";

export default function AssignmentInitor() {
  const location = useLocation();

  const [isDetailView, setIsDetailView] = useState(false);
  const [kids, setKids] = useState(null); // null while loading
  const [kidsError, setKidsError] = useState('');
  const [currentChild, setCurrentChild] = useState(null);

  const loadKids = useCallback(() => {
    setKids(null);
    setKidsError('');
    api
      .get('/parent/children')
      .then((list) => {
        setKids(list);
        const wanted = list.find((child) => child.id === location.state?.childId);
        setCurrentChild((current) => current ?? wanted ?? list[0] ?? null);
      })
      .catch((err) => setKidsError(err.message || 'Could not load your children.'));
  }, [location.state?.childId]);

  useEffect(loadKids, [loadKids]);

  if (kidsError) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
        <p>{kidsError}</p>
        <button
          type="button"
          onClick={loadKids}
          className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
        >
          Try again
        </button>
      </div>
    );
  }

  if (kids === null) {
    return (
      <div className="flex items-center justify-center p-16">
        <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!currentChild) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h2 className="text-base font-semibold text-slate-900">No child linked yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Link your child's learner account to see their homework and assignments here.
        </p>
        <Link
          to="/parent/link-children"
          className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Link a Child
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hide SelctChild when an assignment detail is open */}
      {!isDetailView && (
        <div className="mb-10">
          <SelctChild
            kids={kids}
            selectedChild={currentChild}
            onChildSelect={setCurrentChild}
          />
        </div>
      )}

      <Assignments key={currentChild.id} child={currentChild} onViewChange={setIsDetailView} />
    </div>
  );
}
