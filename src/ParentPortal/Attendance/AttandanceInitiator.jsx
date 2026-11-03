import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { api } from '../../lib/api';
import ChildSelectorBar from './childselector';
import AttendanceAnalytics from './attandaneAnalytics';
import SessionAttendance from './SessionAttendance';
import { PERIODS, recordsInPeriod, summarise } from './attendanceData';

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

export default function Attendance() {
    const location = useLocation();

    const [kids, setKids] = useState(null); // null while loading
    const [kidsError, setKidsError] = useState('');
    const [currentChild, setCurrentChild] = useState(null);
    const [period, setPeriod] = useState(PERIODS[0]);

    const [records, setRecords] = useState(null); // the selected child's attendance
    const [recordsError, setRecordsError] = useState('');
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
        setRecords(null);
        setRecordsError('');

        api
            .get('/attendance', { studentId: currentChild.id })
            .then((result) => !cancelled && setRecords(result.records))
            .catch((err) => !cancelled && setRecordsError(err.message || 'Could not load attendance.'));

        return () => {
            cancelled = true;
        };
    }, [currentChild, reload]);

    // Only the classes in the chosen period feed both the cards and the table.
    const rows = useMemo(() => recordsInPeriod(records ?? [], period.id), [records, period.id]);
    const stats = useMemo(() => summarise(rows), [rows]);

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
                    Link your child's learner account to see their attendance here.
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
                {/* Child Selector Header Bar */}
                <ChildSelectorBar
                    kids={kids}
                    selectedChild={currentChild}
                    onChildSelect={setCurrentChild}
                    selectedPeriod={period}
                    onPeriodSelect={setPeriod}
                />

                {recordsError && (
                    <ErrorBox message={recordsError} onRetry={() => setReload((n) => n + 1)} />
                )}

                {!recordsError && records === null && <Spinner />}

                {records !== null && (
                    <>
                        {/* Attendance Summary Cards / Analytics Widget */}
                        <AttendanceAnalytics stats={stats} />

                        {/* Session Attendance Table & Filter */}
                        <SessionAttendance
                            key={`${currentChild.id}-${period.id}`}
                            rows={rows}
                            selectedPeriod={period}
                            onPeriodSelect={setPeriod}
                        />
                    </>
                )}
            </>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">{body}</div>
        </div>
    );
}
