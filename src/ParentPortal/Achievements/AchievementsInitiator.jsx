import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { api } from '../../lib/api';
import ChildSelectorBar from './childselector';
import ParentAchievementAnalytics from './parentAchievementAnalytics';
import RecentAchievements from './RecentAchievements';
import AchievementTimeline from './AchievementTimeline';

const Spinner = () => (
  <div className="flex items-center justify-center p-16">
    <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
  </div>
);

const ErrorBox = ({ message, onRetry }) => (
  <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
    <p>{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
    >
      Try again
    </button>
  </div>
);

export default function Achievements() {
  const location = useLocation();

  const [kids, setKids] = useState(null); // null while loading
  const [kidsError, setKidsError] = useState('');
  const [currentChild, setCurrentChild] = useState(null);

  const [earned, setEarned] = useState(null); // the selected child's achievements, newest first
  const [earnedError, setEarnedError] = useState('');
  const [reload, setReload] = useState(0);

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

  useEffect(() => {
    if (!currentChild) return;

    let cancelled = false;
    setEarned(null);
    setEarnedError('');

    api
      .get('/rewards/earned', { studentId: currentChild.id })
      .then((result) => !cancelled && setEarned(result.earned))
      .catch((err) => !cancelled && setEarnedError(err.message || 'Could not load achievements.'));

    return () => {
      cancelled = true;
    };
  }, [currentChild, reload]);

  let body;
  if (kidsError) {
    body = <ErrorBox message={kidsError} onRetry={loadKids} />;
  } else if (kids === null) {
    body = <Spinner />;
  } else if (!currentChild) {
    body = (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h2 className="text-base font-semibold text-slate-900">No child linked yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Link your child's learner account to see their achievements here.
        </p>
        <Link
          to="/parent/link-children"
          className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Link a Child
        </Link>
      </div>
    );
  } else {
    body = (
      <>
        {/* Child Selector Component Bar */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 md:p-6">
          <ChildSelectorBar
            kids={kids}
            selectedChild={currentChild}
            onChildSelect={setCurrentChild}
          />
        </div>

        {earnedError && <ErrorBox message={earnedError} onRetry={() => setReload((n) => n + 1)} />}

        {!earnedError && earned === null && <Spinner />}

        {earned !== null && (
          <>
            {/* Analytics & Metrics Cards Component */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80">
              <ParentAchievementAnalytics earned={earned} />
            </div>

            {/* Recent Achievements Grid Component */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80">
              <RecentAchievements achievements={earned.slice(0, 3)} />
            </div>

            {/* Achievement Timeline & Detail Panel Component */}
            <div className="">
              <AchievementTimeline
                key={currentChild.id}
                earned={earned}
                childName={currentChild.fullName}
              />
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 font-sans text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">{body}</div>
    </div>
  );
}
