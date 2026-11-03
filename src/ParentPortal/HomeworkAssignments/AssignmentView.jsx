import React from 'react';
import {
  ArrowLeft,
  FileText,
  BookOpen,
  Calendar,
  Info,
  Clock,
  AlertCircle,
  CheckCircle2,
  Award,
  Check,
  X,
} from 'lucide-react';
import {
  dueText,
  formatDate,
  maxScore,
  scorePercent,
  statusBadge,
} from './homeworkData';

// Where the child stands, worked out the same way as the list.
const workStatus = (assignment) => {
  const sub = assignment.submission;
  if (sub) return sub.gradedAt ? 'GRADED' : 'SUBMITTED';
  return assignment.dueAt && new Date(assignment.dueAt) < new Date() ? 'OVERDUE' : 'PENDING';
};

const questionPoints = (questions) => questions.reduce((n, q) => n + (q.points ?? 1), 0);

// assignment: GET /coursework/:id (questions have no answer key until the work has been graded).
export default function AssignmentView({ assignment, child, onBack }) {
  const firstName = (child?.fullName || 'Your child').split(/\s+/)[0];
  const questions = assignment.questions ?? [];
  const submission = assignment.submission;
  const status = workStatus(assignment);
  const isQuiz = assignment.type === 'QUIZ';

  const max = isQuiz ? questionPoints(questions) : 100;
  const percent = submission?.score != null ? scorePercent(submission.score, max) : null;

  // Reuse the list's badge, with the numbers it needs.
  const badge = statusBadge({
    status,
    dueAt: assignment.dueAt,
    type: assignment.type,
    totalPoints: max,
    submission,
  });

  // What to show in the child's status card.
  const statusCard = {
    PENDING: {
      box: 'bg-orange-50/70 border-orange-100',
      icon: 'bg-orange-100 text-orange-600',
      Icon: Clock,
      title: 'Not Yet Completed',
      text: dueText(assignment.dueAt),
    },
    OVERDUE: {
      box: 'bg-red-50/70 border-red-100',
      icon: 'bg-red-100 text-red-600',
      Icon: AlertCircle,
      title: 'Overdue',
      text: dueText(assignment.dueAt),
    },
    SUBMITTED: {
      box: 'bg-blue-50/70 border-blue-100',
      icon: 'bg-blue-100 text-blue-600',
      Icon: CheckCircle2,
      title: 'Submitted',
      text: submission ? `Handed in on ${formatDate(submission.submittedAt)}. Waiting to be marked.` : '',
    },
    GRADED: {
      box: 'bg-emerald-50/70 border-emerald-100',
      icon: 'bg-emerald-100 text-emerald-600',
      Icon: Award,
      title: submission?.score != null ? `Graded: ${submission.score} / ${max}${percent != null ? ` (${percent}%)` : ''}` : 'Graded',
      text: submission ? `Marked on ${formatDate(submission.gradedAt)}.` : '',
    },
  }[status];

  const answers = Array.isArray(submission?.answers) ? submission.answers : null;
  const writtenAnswer = typeof submission?.answers === 'string' ? submission.answers : null;

  return (
    <div className="w-full font-sans text-slate-800 space-y-6 max-w-5xl mx-auto p-4 md:p-6 bg-slate-50/50 min-h-screen">

      {/* Back Navigation */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Homework & Assignments</span>
      </button>

      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex items-center gap-4">
        <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
          <FileText className="w-8 h-8" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {assignment.title}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {assignment.subject?.name ?? 'No subject'} • {assignment.dueAt ? `Due ${formatDate(assignment.dueAt)}` : 'No due date'}
          </p>
        </div>
      </div>

      {/* Assignment Overview Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-2">
        <h3 className="text-sm font-bold text-slate-900">Assignment Overview</h3>
        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          {assignment.instructions?.trim() || 'Your child\u2019s tutor hasn\u2019t added any instructions for this assignment.'}
        </p>
      </div>

      {/* Assignment Information Table Box */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="p-6 pb-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Assignment Information</h3>
        </div>
        <div className="divide-y divide-slate-100 text-sm">
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium text-slate-700">Subject</span>
            </div>
            <span className="font-semibold text-slate-900">{assignment.subject?.name ?? '—'}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500">
              <Calendar className="w-4 h-4" />
              <span className="font-medium text-slate-700">Assigned Date</span>
            </div>
            <span className="font-semibold text-slate-900">{formatDate(assignment.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500">
              <Calendar className="w-4 h-4" />
              <span className="font-medium text-slate-700">Due Date</span>
            </div>
            <span className="font-semibold text-slate-900">
              {assignment.dueAt ? formatDate(assignment.dueAt) : 'No due date'}
            </span>
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500">
              <Info className="w-4 h-4" />
              <span className="font-medium text-slate-700">Status</span>
            </div>
            <span className={`font-semibold text-xs px-2.5 py-1 rounded-md ${badge.className}`}>
              {badge.label}
            </span>
          </div>
        </div>
      </div>

      {/* Assignment Questions Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          {isQuiz ? 'Quiz Questions' : 'Assignment Questions'}
        </h3>

        {questions.length === 0 && (
          <p className="text-sm text-slate-500">
            {writtenAnswer === null
              ? `This is a written assignment, so there are no listed questions. ${firstName} hands in their answer directly.`
              : `This is a written assignment. ${firstName} handed in the answer below.`}
          </p>
        )}

        <div className="space-y-3">
          {questions.map((q, index) => {
            const chosen = answers ? answers[index] : null;
            const showKey = q.correctIndex !== undefined; // the key is only sent once the work is graded
            return (
              <div key={q.id ?? index} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                <div className="w-8 h-8 rounded-full bg-[#2D336B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-900">{q.text}</div>
                  <ul className="mt-2 space-y-1.5">
                    {q.options.map((option, optionIndex) => {
                      const isCorrect = showKey && optionIndex === q.correctIndex;
                      const isWrongPick = showKey && chosen === optionIndex && optionIndex !== q.correctIndex;
                      return (
                        <li
                          key={optionIndex}
                          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-700 font-semibold'
                              : isWrongPick
                                ? 'bg-red-50 text-red-600 font-semibold'
                                : 'text-slate-600'
                          }`}
                        >
                          {isCorrect && <Check className="w-3.5 h-3.5 shrink-0" />}
                          {isWrongPick && <X className="w-3.5 h-3.5 shrink-0" />}
                          <span>{option}</span>
                          {!showKey && chosen === optionIndex && (
                            <span className="ml-auto text-[10px] font-semibold text-blue-600">{firstName}'s answer</span>
                          )}
                          {isWrongPick && <span className="ml-auto text-[10px]">{firstName}'s answer</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {writtenAnswer && (
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="text-xs font-semibold text-slate-500 mb-1">{firstName}'s answer</div>
            <p className="text-sm text-slate-800 whitespace-pre-line">{writtenAnswer}</p>
          </div>
        )}

        {submission?.fileUrl && (
          <p className="text-xs text-slate-500">{firstName} also uploaded a file with this submission.</p>
        )}
      </div>

      {/* Student Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">{firstName}'s Status</h3>
        <div className={`border rounded-xl p-4 flex items-center gap-4 ${statusCard.box}`}>
          <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${statusCard.icon}`}>
            <statusCard.Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{statusCard.title}</h4>
            <p className="text-xs text-slate-600 mt-0.5">{statusCard.text}</p>
          </div>
        </div>

        {status === 'GRADED' && submission?.feedback && (
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="text-xs font-semibold text-slate-500 mb-1">Tutor feedback</div>
            <p className="text-sm text-slate-800 whitespace-pre-line">{submission.feedback}</p>
          </div>
        )}
      </div>

    </div>
  );
}
