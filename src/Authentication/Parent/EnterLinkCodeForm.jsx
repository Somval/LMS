import React, { useEffect, useState } from 'react';
import { Calculator, ArrowLeft } from 'lucide-react';
import { api } from '../../lib/api';

const LEARNER_ID = /^LRN-\d{8}$/;

export default function EnterLinkCodeForm({ onBack, onNext }) {
  const [learnerId, setLearnerId] = useState('');
  const [linkCode, setLinkCode] = useState('');
  const [child, setChild] = useState(null); // preview of the child once both values check out
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const cleanId = learnerId.trim().toUpperCase();
  const cleanCode = linkCode.replace(/\D/g, '');
  const ready = LEARNER_ID.test(cleanId) && cleanCode.length === 6;

  // Look the child up as soon as both values are complete (the code is not used up by this).
  useEffect(() => {
    setChild(null);
    if (!ready) {
      setError('');
      return undefined;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setChecking(true);
      try {
        const found = await api.post('/parent/children/preview', { learnerId: cleanId, code: cleanCode });
        if (!cancelled) { setChild(found); setError(''); }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not find this learner.');
      } finally {
        if (!cancelled) setChecking(false);
      }
    }, 500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [cleanId, cleanCode, ready]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!ready) return setError('Enter the Learner ID and the 6-digit code from your child.');
    setSubmitting(true);
    try {
      const { child: linked } = await api.post('/parent/children/link', { learnerId: cleanId, code: cleanCode });
      await onNext?.(linked);
    } catch (err) {
      setError(err.message || 'Could not link this account.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-gray-200 rounded-xl text-base sm:text-sm placeholder:text-gray-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors';

  return (
    <form id="onboarding-form" onSubmit={handleSubmit} className="w-full font-sans text-slate-800 space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Enter Your Child's Link Code</h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
          Ask your child for their Learner ID and link code. They can find both on their account setup complete page.
        </p>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="learnerId" className="block text-xs font-bold text-gray-900 mb-2">Learner ID</label>
          <input id="learnerId" type="text" value={learnerId} onChange={(e) => setLearnerId(e.target.value)}
            placeholder="LRN-12345678" autoComplete="off" className={inputClass} />
        </div>
        <div>
          <label htmlFor="linkCode" className="block text-xs font-bold text-gray-900 mb-2">Link Code</label>
          <input id="linkCode" type="text" inputMode="numeric" value={linkCode} onChange={(e) => setLinkCode(e.target.value)}
            placeholder="6-digit code" autoComplete="off" className={inputClass} />
        </div>
      </div>

      {checking && <p className="text-xs text-gray-400">Checking…</p>}
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      {child && (
        <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden w-full animate-in fade-in duration-300">
          <div className="p-5 flex items-start gap-4">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-700 font-bold rounded-full flex-shrink-0 flex items-center justify-center">
              {child.fullName.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 leading-snug">{child.fullName}</h3>
              <p className="text-xs font-medium text-gray-400">Learner Account · {child.learnerId}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-emerald-100/70 text-emerald-600 font-semibold text-xs rounded-md">
                Account Found
              </span>
            </div>
          </div>
          <div className="px-5 pb-5 border-t border-gray-100/80 pt-4">
            <h4 className="text-xs font-bold text-gray-900 mb-3">Courses Selected by Child</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {child.subjects.map((course) => (
                <div key={course.id} className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-gray-100/80 shadow-sm">
                  <div className="w-9 h-9 bg-[#2D2A6E] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    <Calculator className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-gray-900 truncate leading-tight">{course.name}</h5>
                    <p className="text-[10px] font-semibold text-[#6C72B9]">{course.yearLevel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <button type="button" onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Choose another method</span>
      </button>
    </form>
  );
}
