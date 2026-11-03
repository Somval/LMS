import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { Headphones, ChevronDown, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

export default function PrivacyAndSupport() {
  const navigate = useNavigate();
  // Accordion State Management ('privacy' | 'help' | 'report' | null)
  const [openSection, setOpenSection] = useState(null);

  // Report Issue Form State
  const [issueForm, setIssueForm] = useState({ subject: '', description: '' });
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [reportError, setReportError] = useState('');

  // Toggle Accordion section
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // The report is sent as a message to the support team (the admins), so it shows up in their inbox.
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setReportError('');
    setReporting(true);
    try {
      const people = await api.get('/messages/contacts');
      const support = people.find((person) => person.role === 'ADMIN');
      if (!support) throw new Error("The support team isn't available right now. Please try again later.");

      await api.post('/messages', {
        recipientId: support.id,
        body: `Issue report: ${issueForm.subject.trim()}

${issueForm.description.trim()}`,
      });

      setReportSubmitted(true);
      setTimeout(() => {
        setReportSubmitted(false);
        setIssueForm({ subject: '', description: '' });
        setOpenSection(null);
      }, 2000);
    } catch (err) {
      setReportError(err.message || 'Could not send your report. Please try again.');
    } finally {
      setReporting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-4 sm:p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
          <Headphones className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Privacy & Support</h2>
          <p className="text-sm text-gray-500">Find help, report issues, and review our policies.</p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-gray-100">
        
        {/* 1. Privacy & Terms Accordion Item */}
        <div className="py-2">
          <button
            onClick={() => toggleSection('privacy')}
            className="w-full flex items-center justify-between py-4 px-2 text-left cursor-pointer group hover:bg-gray-50/50 rounded-xl transition"
          >
            <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition">
              Privacy & Terms
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform duration-200 ${
                openSection === 'privacy' ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </button>

          {/* Accordion Content */}
          {openSection === 'privacy' && (
            <div className="px-4 pb-6 pt-2 space-y-3 text-sm text-gray-600 animate-in fade-in duration-200">
              <p className="text-xs text-gray-400">Last updated: August 2026</p>
              <p>
                We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information when you use our portal.
              </p>
              <p>
                <strong>Data Collection:</strong> We collect information you provide directly, such as your profile details, notifications preferences, and linked children credentials.
              </p>
              <p>
                <strong>Security:</strong> All communications and stored credentials are encrypted using industry-standard protocols.
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setOpenSection(null)}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-xl hover:bg-blue-700 transition"
                >
                  Collapse
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Help & Support Accordion Item */}
        <div className="py-2">
          <button
            onClick={() => toggleSection('help')}
            className="w-full flex items-center justify-between py-4 px-2 text-left cursor-pointer group hover:bg-gray-50/50 rounded-xl transition"
          >
            <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition">
              Help & Support
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform duration-200 ${
                openSection === 'help' ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </button>

          {/* Accordion Content */}
          {openSection === 'help' && (
            <div className="px-4 pb-6 pt-2 space-y-3 animate-in fade-in duration-200">
              <p className="text-sm text-gray-500 mb-3">Need assistance? Check out our quick resources below.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="#faq"
                  onClick={(e) => { e.preventDefault(); navigate('/parent/messages'); }}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 hover:bg-blue-50 hover:border-blue-200 transition"
                >
                  <span>Ask a Question</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); navigate('/parent/messages'); }}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 hover:bg-blue-50 hover:border-blue-200 transition"
                >
                  <span>Message the Support Team</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </a>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setOpenSection(null)}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-xl hover:bg-blue-700 transition"
                >
                  Collapse
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Report an Issue Accordion Item */}
        <div className="py-2">
          <button
            onClick={() => toggleSection('report')}
            className="w-full flex items-center justify-between py-4 px-2 text-left cursor-pointer group hover:bg-gray-50/50 rounded-xl transition"
          >
            <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition">
              Report an Issue
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform duration-200 ${
                openSection === 'report' ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </button>

          {/* Accordion Content */}
          {openSection === 'report' && (
            <div className="px-4 pb-6 pt-2 animate-in fade-in duration-200">
              <p className="text-sm text-gray-500 mb-4">Let us know if something isn't working properly.</p>

              {reportSubmitted ? (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                  <p className="font-semibold text-gray-900 text-sm">Issue Reported Successfully!</p>
                  <p className="text-xs text-gray-500">Thank you for helping us improve.</p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4 max-w-2xl">
                  {reportError && (
                    <p role="alert" className="text-sm font-medium text-red-600">{reportError}</p>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Issue Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Login error on mobile"
                      value={issueForm.subject}
                      onChange={(e) => setIssueForm({ ...issueForm, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Please describe what happened..."
                      value={issueForm.description}
                      onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setOpenSection(null)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={reporting}
                      className="flex items-center gap-1.5 px-5 py-2 disabled:opacity-60 bg-blue-600 text-white text-xs font-medium rounded-xl hover:bg-blue-700 shadow-sm transition"
                    >
                      <Send className="w-3.5 h-3.5" /> {reporting ? 'Sending…' : 'Submit Report'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}