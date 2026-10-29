
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock3,
  ChevronDown,
  Plus,
  Trash2,
  Save,
  Send,
  CheckCircle2,
  CircleHelp,
} from 'lucide-react';

const initialQuiz = {
  title: '',
  week: '',
  subject: '',
  description: '',
  availability: 'immediately',
  unlockWeek: '',
  deadline: '7',
  deadlineUnit: 'days',
  timeLimit: '30',
  attempts: '1',
  shuffleQuestions: true,
  shuffleAnswers: false,
};

const createQuestion = (id) => ({
  id,
  text: '',
  points: '1',
  options: [
    { id: `${id}-a`, text: '', correct: true },
    { id: `${id}-b`, text: '', correct: false },
    { id: `${id}-c`, text: '', correct: false },
    { id: `${id}-d`, text: '', correct: false },
  ],
});

const inputClass =
  'mt-1.5 h-10 w-full rounded-md border border-[#DDE3ED] bg-white px-3 text-sm text-[#273044] outline-none transition placeholder:text-[#A0A8B6] focus:border-[#4675F5] focus:ring-2 focus:ring-[#4675F5]/10';

const labelClass =
  'block text-xs font-semibold leading-5 text-[#374154] sm:text-sm';

function SectionHeader({ number, title, description, icon: Icon }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3568F5] text-white">
        {Icon ? (
          <Icon size={16} strokeWidth={2} />
        ) : (
          <span className="text-sm font-bold">{number}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-bold leading-5 text-[#202638] sm:text-base">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 text-xs leading-5 text-[#828B9B] sm:text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  error,
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={Boolean(error)}
          className={`${inputClass} appearance-none pr-9 ${
            error ? 'border-red-400' : ''
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8A94A5]"
        />
      </div>

      {error && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function ToggleSetting({ title, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg py-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />

      <span
        aria-hidden="true"
        className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-[#3568F5]' : 'bg-[#CBD2DE]'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-[18px]' : 'translate-x-0.5'
          }`}
        />
      </span>

      <span className="min-w-0">
        <span className="block text-xs font-semibold text-[#343D50] sm:text-sm">
          {title}
        </span>
        <span className="mt-0.5 block text-xs leading-4 text-[#8992A1]">
          {description}
        </span>
      </span>
    </label>
  );
}

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialQuiz);
  const [questions, setQuestions] = useState([createQuestion(1)]);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [nextQuestionId, setNextQuestionId] = useState(2);

  const totalPoints = useMemo(
    () =>
      questions.reduce(
        (total, question) => total + (Number(question.points) || 0),
        0
      ),
    [questions]
  );

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
    setNotice('');
  };

  const updateQuestion = (questionId, field, value) => {
    setQuestions((previous) =>
      previous.map((question) =>
        question.id === questionId
          ? { ...question, [field]: value }
          : question
      )
    );

    setErrors((previous) => ({ ...previous, questions: '' }));
    setNotice('');
  };

  const updateOption = (questionId, optionId, field, value) => {
    setQuestions((previous) =>
      previous.map((question) => {
        if (question.id !== questionId) return question;

        return {
          ...question,
          options: question.options.map((option) => {
            if (field === 'correct' && value) {
              return {
                ...option,
                correct: option.id === optionId,
              };
            }

            return option.id === optionId
              ? { ...option, [field]: value }
              : option;
          }),
        };
      })
    );

    setErrors((previous) => ({ ...previous, questions: '' }));
    setNotice('');
  };

  const addQuestion = () => {
    setQuestions((previous) => [
      ...previous,
      createQuestion(nextQuestionId),
    ]);

    setNextQuestionId((previous) => previous + 1);
    setNotice('');
  };

  const removeQuestion = (questionId) => {
    setQuestions((previous) =>
      previous.filter((question) => question.id !== questionId)
    );

    setErrors((previous) => ({ ...previous, questions: '' }));
    setNotice('');
  };

  const addOption = (questionId) => {
    setQuestions((previous) =>
      previous.map((question) => {
        if (question.id !== questionId) return question;

        return {
          ...question,
          options: [
            ...question.options,
            {
              id: `${questionId}-${Date.now()}`,
              text: '',
              correct: false,
            },
          ],
        };
      })
    );
  };

  const removeOption = (questionId, optionId) => {
    setQuestions((previous) =>
      previous.map((question) => {
        if (question.id !== questionId) return question;

        return {
          ...question,
          options: question.options.filter(
            (option) => option.id !== optionId
          ),
        };
      })
    );
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = 'Enter a quiz title.';
    }

    if (!form.week) {
      nextErrors.week = 'Select a week.';
    }

    if (!form.subject) {
      nextErrors.subject = 'Select a subject.';
    }

    if (
      form.availability === 'after-week' &&
      (!form.unlockWeek ||
        Number(form.unlockWeek) <= Number(form.week))
    ) {
      nextErrors.unlockWeek =
        'Select an unlocking week after the quiz week.';
    }

    if (
      !form.deadline ||
      !Number.isInteger(Number(form.deadline)) ||
      Number(form.deadline) < 1
    ) {
      nextErrors.deadline = 'Enter a whole number of at least 1.';
    }

    if (!['days', 'weeks'].includes(form.deadlineUnit)) {
      nextErrors.deadlineUnit = 'Select a valid deadline unit.';
    }

    if (!form.timeLimit || Number(form.timeLimit) < 1) {
      nextErrors.timeLimit = 'Enter a time limit of at least 1 minute.';
    }

    if (!form.attempts || Number(form.attempts) < 1) {
      nextErrors.attempts = 'Allow at least 1 attempt.';
    }

    const invalidQuestion = questions.some((question) => {
      const hasQuestion = question.text.trim().length > 0;
      const hasValidPoints =
        question.points !== '' &&
        Number.isInteger(Number(question.points)) &&
        Number(question.points) >= 1;

      const filledOptions = question.options.filter((option) =>
        option.text.trim()
      );

      const hasEnoughOptions = filledOptions.length >= 2;
      const hasCorrectAnswer = filledOptions.some(
        (option) => option.correct
      );

      return (
        !hasQuestion ||
        !hasValidPoints ||
        !hasEnoughOptions ||
        !hasCorrectAnswer
      );
    });

    if (invalidQuestion) {
      nextErrors.questions =
        'Complete each question, add at least two options, select a correct answer, and assign valid points.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = (status) => ({
    ...form,
    week: Number(form.week),
    unlockWeek: form.unlockWeek
      ? Number(form.unlockWeek)
      : null,
    deadline: Number(form.deadline),
    deadlineUnit: form.deadlineUnit,
    deadlineDays:
      Number(form.deadline) *
      (form.deadlineUnit === 'weeks' ? 7 : 1),
    timeLimitMinutes: Number(form.timeLimit),
    attemptsAllowed: Number(form.attempts),
    totalPoints,
    status,
    questions: questions.map((question, index) => ({
      order: index + 1,
      text: question.text.trim(),
      points: Number(question.points),
      options: question.options
        .filter((option) => option.text.trim())
        .map((option) => ({
          text: option.text.trim(),
          correct: option.correct,
        })),
    })),
  });

  const saveDraft = () => {
    const payload = buildPayload('draft');

    // Replace with your backend draft-saving request.
    console.log('Quiz draft:', payload);

    setNotice(
      'Draft prepared. Connect your API to save this quiz permanently.'
    );
  };

  const publishQuiz = (event) => {
    event.preventDefault();

    if (!validate()) {
      setNotice('');
      return;
    }

    const payload = buildPayload('published');

    // Replace with your backend publish request.
    console.log('Quiz to publish:', payload);

    setNotice(
      'Quiz validated. Connect your API to publish it to students.'
    );
  };

  return (
    <main className="min-h-screen bg-[#F4F7FD] font-sans text-[#252B36]">
      {/* Top navigation */}
      <header>
        <div className="mx-auto flex min-h-[58px] max-w-[1100px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate('/tutor/assignment-quize')}
            className="group inline-flex min-w-0 items-center gap-2 text-xs font-medium text-[#4C5668] transition hover:text-[#3568F5] sm:text-sm"
          >
            <ArrowLeft
              size={16}
              className="shrink-0 transition-transform group-hover:-translate-x-0.5"
            />
            <span className="truncate">
              Back to Assignments &amp; Quizzes
            </span>
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[900px] px-4 pb-6 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-[#202638] sm:text-2xl">
            Create Quiz
          </h1>

          <p className="mt-1 text-xs leading-5 text-[#818A9B] sm:text-sm">
            Create a quiz for your students to complete.
          </p>
        </div>

        <form onSubmit={publishQuiz} className="space-y-5">
          {/* 1. Basic Information */}
          <section className="rounded-lg border border-[#E6EAF1] bg-white p-4 shadow-[0_1px_3px_rgba(20,35,70,0.03)] sm:rounded-xl sm:p-5">
            <SectionHeader
              number="1"
              title="Basic Information"
              description="Enter the basic details of your quiz."
            />

            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quiz-title" className={labelClass}>
                  Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="quiz-title"
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    updateField('title', event.target.value)
                  }
                  placeholder="e.g. Quadratic Equations Practice"
                  aria-invalid={Boolean(errors.title)}
                  className={`${inputClass} ${
                    errors.title ? 'border-red-400' : ''
                  }`}
                />

                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title}
                  </p>
                )}
              </div>

              <SelectField
                id="quiz-week"
                label="Week"
                required
                value={form.week}
                error={errors.week}
                onChange={(event) =>
                  updateField('week', event.target.value)
                }
                options={[
                  { value: '', label: 'Select week' },
                  ...Array.from({ length: 12 }, (_, index) => ({
                    value: String(index + 1),
                    label: `Week ${index + 1}`,
                  })),
                ]}
              />

              <div className="sm:col-span-2">
                <SelectField
                  id="quiz-subject"
                  label="Subject"
                  required
                  value={form.subject}
                  error={errors.subject}
                  onChange={(event) =>
                    updateField('subject', event.target.value)
                  }
                  options={[
                    { value: '', label: 'Select subject' },
                    { value: 'Mathematics', label: 'Mathematics' },
                    { value: 'English Language', label: 'English Language' },
                    { value: 'Physics', label: 'Physics' },
                    { value: 'Chemistry', label: 'Chemistry' },
                    { value: 'Biology', label: 'Biology' },
                    { value: 'Computer Science', label: 'Computer Science' },
                  ]}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="quiz-description" className={labelClass}>
                  Description / Instructions
                </label>

                <textarea
                  id="quiz-description"
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    updateField('description', event.target.value)
                  }
                  placeholder="Describe your instructions to students..."
                  className="mt-1.5 min-h-[96px] w-full resize-y rounded-md border border-[#DDE3ED] bg-white px-3 py-2.5 text-sm leading-6 outline-none placeholder:text-[#A0A8B6] focus:border-[#4675F5] focus:ring-2 focus:ring-[#4675F5]/10"
                />

                <p className="mt-1 text-right text-[11px] text-[#929AAA]">
                  {form.description.length} characters
                </p>
              </div>
            </div>
          </section>

          {/* 2. Availability & Deadline — styled to match the reference */}
          <section className="rounded-lg border border-[#E6EAF1] bg-white p-4 shadow-[0_1px_3px_rgba(20,35,70,0.03)] sm:rounded-xl sm:p-5">
            {/* Compact heading */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3568F5] text-xs font-semibold text-white">
                2
              </div>

              <h2 className="text-base font-bold leading-6 text-black">
                Availability &amp; Deadline
              </h2>
            </div>

            <div className="space-y-4">
              {/* Availability / unlocking week */}
              {form.availability === 'after-week' ? (
                <div className="min-w-0">
                  <label
                    htmlFor="quiz-unlock-week"
                    className="block text-sm font-medium text-black"
                  >
                    After completing a specific week
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative mt-2">
                    <select
                      id="quiz-unlock-week"
                      value={form.unlockWeek}
                      onChange={(event) =>
                        updateField('unlockWeek', event.target.value)
                      }
                      required
                      aria-invalid={Boolean(errors.unlockWeek)}
                      className={`h-[43px] w-full appearance-none rounded-lg border bg-white px-4 pr-10 text-sm text-[#343434] outline-none transition hover:border-[#B8C4D8] focus:border-[#4775F5] focus:ring-2 focus:ring-[#4775F5]/10 ${
                        errors.unlockWeek
                          ? 'border-red-400'
                          : 'border-[#E5E5E5]'
                      }`}
                    >
                      <option value="">Select week</option>

                      {Array.from({ length: 12 }, (_, index) => ({
                        value: String(index + 1),
                        label: `Week ${index + 1}`,
                      })).map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777]"
                    />
                  </div>

                  {errors.unlockWeek && (
                    <p role="alert" className="mt-1 text-xs text-red-500">
                      {errors.unlockWeek}
                    </p>
                  )}
                </div>
              ) : (
                <SelectField
                  id="quiz-availability"
                  label="Availability"
                  value={form.availability}
                  onChange={(event) =>
                    updateField('availability', event.target.value)
                  }
                  options={[
                    {
                      value: 'immediately',
                      label: 'Available immediately',
                    },
                    {
                      value: 'after-week',
                      label: 'After completing a specific week',
                    },
                  ]}
                />
              )}

              {/* Deadline */}
              <div className="min-w-0">
                <label
                  htmlFor="quiz-deadline"
                  className="block text-sm font-medium text-black"
                >
                  Set deadline after unlocking
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="mt-2 flex w-full items-center gap-5">
                  {/* Short number field */}
                  <div className="w-[167px] shrink-0">
                    <input
                      id="quiz-deadline"
                      type="number"
                      min="1"
                      step="1"
                      value={form.deadline}
                      onChange={(event) =>
                        updateField('deadline', event.target.value)
                      }
                      required
                      aria-invalid={Boolean(errors.deadline)}
                      className={`h-[43px] w-full rounded-lg border bg-white px-3 text-sm text-[#343434] outline-none transition focus:border-[#4775F5] focus:ring-2 focus:ring-[#4775F5]/10 ${
                        errors.deadline
                          ? 'border-red-400'
                          : 'border-[#E5E5E5]'
                      }`}
                    />
                  </div>

                  {/* Full-width Days / Weeks dropdown */}
                  <div className="relative min-w-0 flex-1">
                    <select
                      id="quiz-deadline-unit"
                      value={form.deadlineUnit}
                      onChange={(event) =>
                        updateField('deadlineUnit', event.target.value)
                      }
                      aria-label="Deadline unit"
                      aria-invalid={Boolean(errors.deadlineUnit)}
                      className={`h-[43px] w-full appearance-none rounded-lg border bg-white px-3 pr-10 text-sm text-[#343434] outline-none transition hover:border-[#B8C4D8] focus:border-[#4775F5] focus:ring-2 focus:ring-[#4775F5]/10 ${
                        errors.deadlineUnit
                          ? 'border-red-400'
                          : 'border-[#E5E5E5]'
                      }`}
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777]"
                    />
                  </div>
                </div>

                {errors.deadline && (
                  <p role="alert" className="mt-1 text-xs text-red-500">
                    {errors.deadline}
                  </p>
                )}

                {errors.deadlineUnit && (
                  <p role="alert" className="mt-1 text-xs text-red-500">
                    {errors.deadlineUnit}
                  </p>
                )}
              </div>

              {/* Let users change availability when currently using unlock-week mode */}
              {form.availability === 'after-week' && (
                <button
                  type="button"
                  onClick={() => {
                    updateField('availability', 'immediately');
                    updateField('unlockWeek', '');
                  }}
                  className="text-xs font-medium text-[#3568F5] hover:underline"
                >
                  Change to available immediately
                </button>
              )}
            </div>
          </section>

          {/* 3. Quiz Settings */}
          <section className="rounded-lg border border-[#E6EAF1] bg-white p-4 shadow-[0_1px_3px_rgba(20,35,70,0.03)] sm:rounded-xl sm:p-5">
            <SectionHeader
              number="3"
              title="Quiz Settings"
              description="Customize the quiz experience for students."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quiz-time-limit" className={labelClass}>
                  Time limit
                </label>

                <div className="relative">
                  <Clock3
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8993A3]"
                  />

                  <input
                    id="quiz-time-limit"
                    type="number"
                    min="1"
                    value={form.timeLimit}
                    onChange={(event) =>
                      updateField('timeLimit', event.target.value)
                    }
                    className={`${inputClass} pl-9 ${
                      errors.timeLimit ? 'border-red-400' : ''
                    }`}
                  />
                </div>

                <p className="mt-1 text-xs text-[#8992A1]">
                  Minutes allowed to complete the quiz.
                </p>

                {errors.timeLimit && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.timeLimit}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="quiz-attempts" className={labelClass}>
                  Number of attempts
                </label>

                <div className="relative">
                  <select
                    id="quiz-attempts"
                    value={form.attempts}
                    onChange={(event) =>
                      updateField('attempts', event.target.value)
                    }
                    className={`${inputClass} appearance-none pr-9`}
                  >
                    {[1, 2, 3, 4, 5, 10].map((attempt) => (
                      <option key={attempt} value={String(attempt)}>
                        {attempt} {attempt === 1 ? 'attempt' : 'attempts'}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8993A3]"
                  />
                </div>

                <p className="mt-1 text-xs text-[#8992A1]">
                  Maximum attempts per student.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[#EEF0F5] pt-4 sm:grid-cols-2">
              <ToggleSetting
                title="Shuffle questions"
                description="Randomize the order of questions."
                checked={form.shuffleQuestions}
                onChange={(value) =>
                  updateField('shuffleQuestions', value)
                }
              />

              <ToggleSetting
                title="Shuffle answer options"
                description="Randomize the order of answer choices."
                checked={form.shuffleAnswers}
                onChange={(value) =>
                  updateField('shuffleAnswers', value)
                }
              />
            </div>
          </section>

          {/* 4. Questions */}
          <section className="rounded-lg border border-[#E6EAF1] bg-white p-4 shadow-[0_1px_3px_rgba(20,35,70,0.03)] sm:rounded-xl sm:p-5">
            <SectionHeader
              number="4"
              title="Questions"
              description="Add multiple-choice questions and mark the correct answers."
            />

            <div className="space-y-5">
              {questions.map((question, questionIndex) => (
                <article
                  key={question.id}
                  className="rounded-lg border border-[#E4E9F2] bg-[#FAFBFE] p-3 sm:p-4"
                >
                  {/* Question heading */}
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E8EEFF] text-[#3568F5]">
                        <CircleHelp size={15} />
                      </div>

                      <h3 className="text-sm font-semibold text-[#30394B]">
                        Question {questionIndex + 1}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`points-${question.id}`}
                        className="text-xs font-medium text-[#687286]"
                      >
                        Points
                      </label>

                      <input
                        id={`points-${question.id}`}
                        type="number"
                        min="1"
                        value={question.points}
                        onChange={(event) =>
                          updateQuestion(
                            question.id,
                            'points',
                            event.target.value
                          )
                        }
                        className="h-8 w-16 rounded-md border border-[#DDE3ED] bg-white px-2 text-center text-sm outline-none focus:border-[#4675F5]"
                      />

                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(question.id)}
                          aria-label={`Delete question ${questionIndex + 1}`}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-[#929AAA] transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Question text */}
                  <label
                    htmlFor={`question-text-${question.id}`}
                    className="sr-only"
                  >
                    Question text
                  </label>

                  <textarea
                    id={`question-text-${question.id}`}
                    rows={2}
                    value={question.text}
                    onChange={(event) =>
                      updateQuestion(
                        question.id,
                        'text',
                        event.target.value
                      )
                    }
                    placeholder="Enter your question here..."
                    className="min-h-[72px] w-full resize-y rounded-md border border-[#E0E6F0] bg-white px-3 py-2.5 text-sm leading-6 outline-none placeholder:text-[#A0A8B6] focus:border-[#4675F5] focus:ring-2 focus:ring-[#4675F5]/10"
                  />

                  {/* Answer options */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-[#667186]">
                      Answer options
                    </p>

                    {question.options.map((option, optionIndex) => (
                      <div
                        key={option.id}
                        className="flex min-w-0 items-center gap-2"
                      >
                        <input
                          type="radio"
                          name={`correct-answer-${question.id}`}
                          checked={option.correct}
                          onChange={() =>
                            updateOption(
                              question.id,
                              option.id,
                              'correct',
                              true
                            )
                          }
                          aria-label={`Mark option ${optionIndex + 1} as correct`}
                          className="h-4 w-4 shrink-0 cursor-pointer accent-[#3568F5]"
                        />

                        <input
                          type="text"
                          value={option.text}
                          onChange={(event) =>
                            updateOption(
                              question.id,
                              option.id,
                              'text',
                              event.target.value
                            )
                          }
                          placeholder={`Option ${optionIndex + 1}`}
                          aria-label={`Answer option ${optionIndex + 1}`}
                          className="h-9 min-w-0 flex-1 rounded-md border border-[#E0E6F0] bg-white px-3 text-xs outline-none placeholder:text-[#A0A8B6] focus:border-[#4675F5] sm:text-sm"
                        />

                        <label className="flex shrink-0 items-center gap-1.5 text-[10px] text-[#758096] sm:text-xs">
                          <input
                            type="checkbox"
                            checked={option.correct}
                            onChange={(event) =>
                              updateOption(
                                question.id,
                                option.id,
                                'correct',
                                event.target.checked
                              )
                            }
                            className="h-3.5 w-3.5 accent-[#3568F5]"
                          />
                          <span className="hidden sm:inline">Correct</span>
                        </label>

                        {question.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeOption(question.id, option.id)
                            }
                            aria-label={`Remove option ${optionIndex + 1}`}
                            className="flex h-8 w-7 shrink-0 items-center justify-center rounded-md text-[#9AA3B2] hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => addOption(question.id)}
                    className="mt-3 inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-[#3568F5] transition hover:bg-[#EDF2FF]"
                  >
                    <Plus size={14} />
                    Add option
                  </button>

                  <p className="mt-2 text-[11px] leading-4 text-[#929AAA]">
                    Select the radio button or checkbox beside the correct
                    answer.
                  </p>
                </article>
              ))}
            </div>

            {errors.questions && (
              <p
                role="alert"
                className="mt-3 rounded-md bg-red-50 p-3 text-xs leading-5 text-red-600"
              >
                {errors.questions}
              </p>
            )}

            {/* Add question */}
            <button
              type="button"
              onClick={addQuestion}
              className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-dashed border-[#9BB5FF] bg-[#EAF0FF] px-4 py-3 text-sm font-semibold text-[#3568F5] transition hover:border-[#3568F5] hover:bg-[#DFE8FF]"
            >
              <Plus size={16} />
              Add Question
            </button>

            {/* Points summary */}
            <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-[#F4F6FB] px-3 py-3 sm:px-4">
              <div>
                <p className="text-xs font-medium text-[#687286]">
                  Total Questions
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#30394B]">
                  {questions.length}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-medium text-[#687286]">
                  Total Points
                </p>
                <p className="mt-0.5 text-base font-bold text-[#25345F]">
                  {totalPoints}
                </p>
              </div>
            </div>
          </section>

          {/* Form feedback */}
          {notice && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-lg border border-[#CFE0FF] bg-[#EDF3FF] p-3 text-sm leading-5 text-[#3155AD]"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <p>{notice}</p>
            </div>
          )}

          {/* Bottom action bar */}
          <div className="sticky bottom-0 z-20 -mx-4 border-t border-[#E3E8F1] bg-[#F4F7FD]/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#D6DDEA] bg-white px-6 py-3 text-sm font-semibold text-[#4D5870] transition hover:bg-[#F8FAFD] focus:outline-none focus:ring-2 focus:ring-[#AAB6CA]/40"
              >
                <Save size={16} />
                Save Draft
              </button>

              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#3568F5] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2857DC] focus:outline-none focus:ring-2 focus:ring-[#3568F5]/40 focus:ring-offset-2"
              >
                <Send size={15} />
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
