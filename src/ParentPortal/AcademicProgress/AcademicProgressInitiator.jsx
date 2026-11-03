import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { api } from "../../lib/api";
import ChildSelectorBar from "../AcademicProgress/selectAchild";
import Analytics from "../AcademicProgress/Analytics";
import SubjectBreakdown from "./SubjectBreakdown";
import RecentLearningActivity from "./RecentLearningActivity";
import { PERIODS } from "./academicData";

const Spinner = () => (
  <div className="flex items-center justify-center p-16">
    <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
  </div>
);

const ErrorBox = ({ message, onRetry }) => (
  <div className="mx-auto max-w-6xl rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
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

export default function AcademiaInitiator() {
  const location = useLocation();

  const [children, setChildren] = useState(null); // null while loading
  const [childrenError, setChildrenError] = useState("");
  const [currentChild, setCurrentChild] = useState(null);
  const [period, setPeriod] = useState(PERIODS[0]);

  const [data, setData] = useState(null); // everything for the selected child
  const [dataError, setDataError] = useState("");
  const [reload, setReload] = useState(0);

  const loadChildren = useCallback(() => {
    setChildren(null);
    setChildrenError("");
    api
      .get("/parent/children")
      .then((list) => {
        setChildren(list);
        const wanted = list.find((child) => child.id === location.state?.childId);
        setCurrentChild((current) => current ?? wanted ?? list[0] ?? null);
      })
      .catch((err) => setChildrenError(err.message || "Could not load your children."));
  }, [location.state?.childId]);

  useEffect(loadChildren, [loadChildren]);

  useEffect(() => {
    if (!currentChild) return;

    let cancelled = false;
    setData(null);
    setDataError("");

    api
      .get(`/dashboard/parent/${currentChild.id}`)
      .then((result) => !cancelled && setData(result))
      .catch(
        (err) => !cancelled && setDataError(err.message || "Could not load academic progress.")
      );

    return () => {
      cancelled = true;
    };
  }, [currentChild, reload]);

  let body;
  if (childrenError) {
    body = <ErrorBox message={childrenError} onRetry={loadChildren} />;
  } else if (children === null) {
    body = <Spinner />;
  } else if (!currentChild) {
    body = (
      <div className="mx-auto max-w-6xl rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h2 className="text-base font-semibold text-slate-900">No child linked yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Link your child's learner account to see their academic progress here.
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
        <ChildSelectorBar
          kids={children}
          selectedChild={currentChild}
          onChildSelect={setCurrentChild}
          selectedPeriod={period}
          onPeriodSelect={setPeriod}
        />

        {dataError && (
          <ErrorBox message={dataError} onRetry={() => setReload((n) => n + 1)} />
        )}

        {!dataError && !data && <Spinner />}

        {data && (
          <div key={currentChild.id}>
            <Analytics currentChild={currentChild} data={data} period={period} />
            <SubjectBreakdown currentChild={currentChild} data={data} />
            <RecentLearningActivity currentChild={currentChild} data={data} />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Unified wrapper to control max width and keep sections cohesively grouped */}
      <div className=" mx-auto ">{body}</div>
    </div>
  );
}
