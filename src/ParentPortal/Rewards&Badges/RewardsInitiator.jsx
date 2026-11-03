import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { api } from "../../lib/api";
import { splitKinds } from "../Achievements/achievementsData";
import SelectChild from "../HomeworkAssignments/SelectChild";
import ArentAchievementAnalytics from "./arentAchievementAnalytics";
import RewardsEarned from "./RewardsEarned";
import BadgesSection from "./BadgesSection";

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

export default function RewardInitiator() {
  const location = useLocation();

  const [kids, setKids] = useState(null); // null while loading
  const [kidsError, setKidsError] = useState("");
  const [currentChild, setCurrentChild] = useState(null);

  const [items, setItems] = useState(null); // { earned, locked } for the selected child
  const [itemsError, setItemsError] = useState("");
  const [reload, setReload] = useState(0);

  const loadKids = useCallback(() => {
    setKids(null);
    setKidsError("");
    api
      .get("/parent/children")
      .then((list) => {
        setKids(list);
        const wanted = list.find((child) => child.id === location.state?.childId);
        setCurrentChild((current) => current ?? wanted ?? list[0] ?? null);
      })
      .catch((err) => setKidsError(err.message || "Could not load your children."));
  }, [location.state?.childId]);

  useEffect(loadKids, [loadKids]);

  useEffect(() => {
    if (!currentChild) return;

    let cancelled = false;
    setItems(null);
    setItemsError("");

    Promise.all([
      api.get("/rewards/earned", { studentId: currentChild.id }),
      api.get("/rewards/locked", { studentId: currentChild.id }),
    ])
      .then(([earned, locked]) => !cancelled && setItems({ earned: earned.earned, locked }))
      .catch((err) => !cancelled && setItemsError(err.message || "Could not load badges and rewards."));

    return () => {
      cancelled = true;
    };
  }, [currentChild, reload]);

  const { badges, rewards } = useMemo(() => splitKinds(items?.earned ?? []), [items]);

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
          Link your child's learner account to see their badges and rewards here.
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
        <SelectChild
          kids={kids}
          selectedChild={currentChild}
          onChildSelect={setCurrentChild}
        />

        {itemsError && <ErrorBox message={itemsError} onRetry={() => setReload((n) => n + 1)} />}

        {!itemsError && items === null && <Spinner />}

        {items !== null && (
          <>
            <ArentAchievementAnalytics badges={badges} rewards={rewards} />
            <RewardsEarned rewards={rewards} childName={currentChild.fullName} />
            <BadgesSection earned={badges} locked={items.locked} childName={currentChild.fullName} />
          </>
        )}
      </>
    );
  }

  return (
    <main className="w-full">
      <div className="flex w-full flex-col gap-6">{body}</div>
    </main>
  );
}
