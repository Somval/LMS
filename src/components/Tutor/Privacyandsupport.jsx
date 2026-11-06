import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, ChevronRight, ChevronDown, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';

const ROWS = [
  { key: 'privacy', label: 'Privacy & Terms' },
  { key: 'help', label: 'Help & Support' },
  { key: 'report', label: 'Report an Issue' },
];

export const PrivacyAndSupport = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null); // 'privacy' | 'help' | 'report' | null
  const [form, setForm] = useState({ subject: '', description: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  // The report goes to the support team (the admins) as a message, so it lands in their inbox.
  const handleReport = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const people = await api.get('/messages/contacts');
      const support = people.find((person) => person.role === 'ADMIN');
      if (!support) throw new Error("The support team isn't available right now. Please try again later.");

      await api.post('/messages', {
        recipientId: support.id,
        body: `Issue report: ${form.subject.trim()}\n\n${form.description.trim()}`,
      });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ subject: '', description: '' });
        setOpen(null);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Could not send your report. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
          <Headphones size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Privacy & Support</h2>
          <p className="text-xs text-gray-400">Find help, report issues, and review our policies.</p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {ROWS.map(({ key, label }) => (
          <div key={key}>
            <button
              type="button"
              aria-expanded={open === key}
              onClick={() => setOpen(open === key ? null : key)}
              className="w-full flex items-center justify-between py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors text-left"
            >
              <span className="text-sm font-semibold text-gray-800">{label}</span>
              {open === key ? (
                <ChevronDown size={18} className="text-blue-600" />
              ) : (
                <ChevronRight size={18} className="text-gray-400" />
              )}
            </button>

            {open === key && key === 'privacy' && (
              <div className="px-3 pb-5 space-y-3 text-sm text-gray-600">
                <p>
                  We value your privacy and are committed to protecting your personal data. This policy outlines how we
                  collect, use, and safeguard your information when you use the portal.
                </p>
                <p>
                  <strong>Data collection:</strong> We collect information you provide directly, such as your profile
                  details and the documents you upload for verification.
                </p>
                <p>
                  <strong>Security:</strong> Your password is stored securely and your files are only visible to the
                  people who need them.
                </p>
              </div>
            )}

            {open === key && key === 'help' && (
              <div className="px-3 pb-5">
                <p className="text-sm text-gray-500 mb-3">Need assistance? You can message the support team directly.</p>
                <button
                  type="button"
                  onClick={() => navigate('/tutor/messages')}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 hover:bg-blue-50 hover:border-blue-200 transition"
                >
                  Message the Support Team
                </button>
              </div>
            )}

            {open === key && key === 'report' && (
              <div className="px-3 pb-5">
                {sent ? (
                  <div className="py-6 flex flex-col items-center text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    <p className="font-semibold text-gray-900 text-sm">Issue reported</p>
                    <p className="text-xs text-gray-500">Thank you for helping us improve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReport} className="space-y-4 max-w-2xl">
                    <p className="text-sm text-gray-500">Let us know if something isn't working properly.</p>
                    {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Issue Subject</label>
                      <input
                        type="text"
                        required
                        maxLength={150}
                        placeholder="e.g. Cannot upload a lesson file"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</label>
                      <textarea
                        required
                        rows="3"
                        maxLength={4000}
                        placeholder="Please describe what happened..."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setOpen(null)} className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-50">
                        Cancel
                      </button>
                      <button type="submit" disabled={sending} className="flex items-center gap-1.5 px-5 py-2 disabled:opacity-60 bg-blue-600 text-white text-xs font-medium rounded-xl hover:bg-blue-700">
                        <Send size={14} /> {sending ? 'Sending…' : 'Submit Report'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
