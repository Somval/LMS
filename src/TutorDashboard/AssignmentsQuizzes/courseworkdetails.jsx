
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Calendar,
  Lock,
  Clock,
  BarChart3,
} from 'lucide-react';

import Submissions from '../../components/Tutor/Submissions';

const assessmentDetails = [
  { label: 'Type', value: 'Assignment', icon: FileText },
  { label: 'Week', value: 'Week 1', icon: Calendar },
  {
    label: 'Availability',
    value: 'After completing Week 1',
    icon: Lock,
  },
  {
    label: 'Deadline',
    value: '7 days after unlocking',
    icon: Clock,
  },
  { label: 'Total Marks', value: '10 marks', icon: BarChart3 },
  {
    label: 'Created',
    value: 'Sep 10, 2026, 10:24 AM',
    icon: Calendar,
  },
  {
    label: 'Last Updated',
    value: 'Sep 10, 2026, 10:24 AM',
    icon: Calendar,
  },
];

const questions = [
  { id: 1, question: '3x + 2 = 14', marks: 2 },
  { id: 2, question: 'x² - 5x + 6 = 0', marks: 3 },
  { id: 3, question: 'x² + 4x + 4 = 0', marks: 2 },
  { id: 4, question: '2x² - 8 = 0', marks: 3 },
];

export default function AssessmentDetail() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('Overview');

  const tabs = [
    { label: 'Overview', count: null },
    { label: 'Submissions', count: 6 },
  ];

  return (
    <main className="min-h-screen w-full bg-[#F4F7FD] px-4 py-5 font-sans text-[#252B36] sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto w-full max-w-[1100px] space-y-5 sm:space-y-6">

        {/* Back navigation */}
        <div>
          <button
            type="button"
            onClick={() => navigate('/tutor/assignment-quize')}
            className="group inline-flex items-center gap-2 text-xs font-medium text-[#454B56] transition-colors hover:text-blue-600 sm:text-sm"
          >
            <ArrowLeft
              size={17}
              strokeWidth={1.8}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span>Back to Assignments &amp; Quizzes</span>
          </button>
        </div>

        {/* Assessment heading */}
        <header className="space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight text-[#171A22] sm:text-2xl">
            Quadratic Equations Practice
          </h1>

          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#727A8B] sm:text-sm">
            <span>Mathematics</span>
            <span className="text-[#B5BBC7]">|</span>
            <span>Year 1</span>
            <span className="text-[#B5BBC7]">|</span>
            <span>Week 1</span>
          </p>
        </header>

        {/* Assessment tabs */}
        <div
          role="tablist"
          aria-label="Assessment sections"
          className="flex items-stretch gap-6 border-b border-[#E5E9F2] sm:gap-8"
        >
          {tabs.map((tab) => {
            const active = currentTab === tab.label;
            const tabId = `assessment-tab-${tab.label.toLowerCase()}`;
            const panelId = `assessment-panel-${tab.label.toLowerCase()}`;

            return (
              <button
                key={tab.label}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={panelId}
                onClick={() => setCurrentTab(tab.label)}
                className={`relative inline-flex min-h-11 items-center gap-2 pb-3 text-xs font-semibold transition-colors sm:text-sm ${
                  active
                    ? 'text-[#2864F0]'
                    : 'text-[#858C9B] hover:text-[#424B5B]'
                }`}
              >
                {tab.label}

                {tab.count !== null && (
                  <span className="text-xs font-medium text-[#858C9B]">
                    ({tab.count})
                  </span>
                )}

                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-t bg-[#2864F0]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Overview tab */}
        {currentTab === 'Overview' && (
          <div
            id="assessment-panel-overview"
            role="tabpanel"
            aria-labelledby="assessment-tab-overview"
            className="space-y-5 sm:space-y-6"
          >
            {/* Coursework details */}
            <section className="rounded-xl border border-[#EDF0F5] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-5 text-sm font-bold text-[#20242C] sm:text-base">
                Coursework Details
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {assessmentDetails.map((detail) => {
                  const Icon = detail.icon;

                  return (
                    <div
                      key={detail.label}
                      className="flex min-w-0 items-start gap-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E9ECEF] text-[#727A83] sm:h-10 sm:w-10">
                        <Icon size={18} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-[#777F8C] sm:text-sm">
                          {detail.label}
                        </p>

                        <p className="mt-1 break-words text-sm font-medium leading-5 text-[#282D36]">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Instructions */}
            <section className="rounded-xl border border-[#D5E1FF] bg-[#D8E3FF] p-4 sm:p-5">
              <h2 className="mb-1.5 text-sm font-bold text-[#202B47] sm:text-base">
                Instructions
              </h2>

              <p className="text-sm leading-6 text-[#56637D]">
                Solve each equation and show your working. Complete all 10
                questions before submitting.
              </p>
            </section>

            {/* Assignment questions */}
            <section className="rounded-xl border border-[#EBEEF4] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-4 text-sm font-bold text-[#20242C] sm:text-base">
                Assignment Questions
              </h2>

              <div className="divide-y divide-[#F1F3F9]">
                {questions.map((question) => (
                  <article
                    key={question.id}
                    className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4"
                  >
                    <div className="flex min-w-0 items-start gap-3 sm:gap-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#343783] text-xs font-semibold text-white">
                        {question.id}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#222630]">
                          Solve for x:
                        </p>

                        <p className="mt-1 break-words text-sm font-medium text-[#303540]">
                          {question.question}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-md bg-[#E5EDFF] px-2.5 py-1.5 text-xs font-medium text-[#2864F0] sm:px-3 sm:text-sm">
                      {question.marks} marks
                    </span>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Submissions tab */}
        {currentTab === 'Submissions' && (
          <div
            id="assessment-panel-submissions"
            role="tabpanel"
            aria-labelledby="assessment-tab-submissions"
            className="min-w-0"
          >
            <Submissions />
          </div>
        )}
      </div>
    </main>
  );
}
