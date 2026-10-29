
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ChevronDown,
  Plus,
  Trash2,
  Save,
  Send,
  CheckCircle2,
  BookOpen,
  FileText,
  AlertCircle,
} from 'lucide-react';

const initialForm = {
  title: '',
  week: '',
  day: '',
  subject: '',
  description: '',
  availability: 'immediately',
  unlockWeek: '',
  deadline: '7',
  deadlineUnit: 'days',
};

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const inputClass =
  'mt-2 h-11 w-full rounded-lg border border-[#DDE3ED] bg-white px-3.5 text-sm text-[#252B36] outline-none transition duration-200 placeholder:text-[#9AA3B2] hover:border-[#B8C4D8] focus:border-[#4775F5] focus:ring-4 focus:ring-[#4775F5]/10';

const labelClass = 'block text-sm font-semibold text-[#343B4A]';

const errorClass = 'mt-1.5 text-xs font-medium text-red-500';

const SectionHeader = ({ number, title, description, icon: Icon }) => (
  <div className="mb-6 flex items-start gap-3.5">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF0FF] text-[#3568F5]">
      <Icon size={18} strokeWidth={1.9} />
    </div>

    <div className="min-w-0 flex-1 pt-0.5">
      <h2 className="text-base font-bold leading-6 text-[#202638] sm:text-lg">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-sm leading-5 text-[#818A9B]">
          {description}
        </p>
      )}
    </div>
  </div>
);

const FieldError = ({ children }) => {
  if (!children) return null;

  return (
    <p role="alert" className={errorClass}>
      {children}
    </p>
  );
};

const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
}) => (
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
        className={`${inputClass} appearance-none pr-10 ${
          error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''
        }`}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={17}
        strokeWidth={1.8}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#858FA1]"
      />
    </div>

    <FieldError>{error}</FieldError>
  </div>
);

export default function CreateAssignment() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [questions, setQuestions] = useState([
    { id: 1, question: '', marks: '2' },
  ]);

  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: '',
    }));

    setNotice('');
  };

  const updateQuestion = (id, field, value) => {
    setQuestions((previous) =>
      previous.map((question) =>
        question.id === id
          ? { ...question, [field]: value }
          : question
      )
    );

    setErrors((previous) => ({
      ...previous,
      questions: '',
    }));

    setNotice('');
  };

  const addQuestion = () => {
    setQuestions((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${previous.length}`,
        question: '',
        marks: '2',
      },
    ]);

    setNotice('');
  };

  const removeQuestion = (id) => {
    setQuestions((previous) =>
      previous.filter((question) => question.id !== id)
    );

    setErrors((previous) => ({
      ...previous,
      questions: '',
    }));

    setNotice('');
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = 'Please enter an assignment title.';
    }

    if (!form.week) {
      nextErrors.week = 'Please select a week.';
    }

    if (!form.day) {
      nextErrors.day = 'Please select a day.';
    }

    if (!form.subject) {
      nextErrors.subject = 'Please select a lesson.';
    }

    if (
      form.availability === 'after-week' &&
      (!form.unlockWeek ||
        Number(form.unlockWeek) < 1 ||
        Number(form.unlockWeek) > 12)
    ) {
      nextErrors.unlockWeek = 'Please select a valid unlocking week.';
    }

    if (
      !form.deadline ||
      !Number.isInteger(Number(form.deadline)) ||
      Number(form.deadline) < 1
    ) {
      nextErrors.deadline = 'Enter a whole number of at least 1.';
    }

    if (!['days', 'weeks'].includes(form.deadlineUnit)) {
      nextErrors.deadlineUnit = 'Please select a valid deadline unit.';
    }

    if (
      questions.length === 0 ||
      questions.some(
        (question) =>
          !question.question.trim() ||
          !question.marks ||
          !Number.isInteger(Number(question.marks)) ||
          Number(question.marks) < 1
      )
    ) {
      nextErrors.questions =
        'Add at least one question, complete every question, and enter valid marks.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const getPayload = (status) => ({
    ...form,
    week: Number(form.week),
    unlockWeek: form.unlockWeek ? Number(form.unlockWeek) : null,
    deadline: Number(form.deadline),
    questions: questions.map((question) => ({
      question: question.question.trim(),
      marks: Number(question.marks),
    })),
    totalMarks: questions.reduce(
      (total, question) => total + (Number(question.marks) || 0),
      0
    ),
    status,
  });

  const handleSaveDraft = () => {
    const payload = getPayload('draft');

    // Connect this payload to your backend draft-saving API.
    console.log('Assignment draft:', payload);

    setIsPublished(false);
    setNotice(
      'Draft prepared. Connect your backend to save it permanently.'
    );
  };

  const handlePublish = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setNotice('');
      return;
    }

    const payload = getPayload('published');

    // Connect this payload to your assignment creation API.
    console.log('Assignment to publish:', payload);

    setIsPublished(true);
    setNotice(
      'Assignment validated. Connect your backend to publish it.'
    );
  };

  const totalMarks = questions.reduce(
    (total, question) => total + (Number(question.marks) || 0),
    0
  );

  const weekOptions = Array.from({ length: 12 }, (_, index) => ({
    value: String(index + 1),
    label: `Week ${index + 1}`,
  }));

  const subjectOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English Language', label: 'English Language' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Computer Science', label: 'Computer Science' },
  ];

  return (
    <main className="min-h-screen  font-sans text-[#252B36]">
      {/* Top navigation */}
      <header className=" ">
        <div className="mx-auto flex min-h-[64px] w-full max-w-[1100px] items-center px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate('/tutor/assignment-quize')}
            className="group inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-medium text-[#4C5668] transition hover:text-[#3568F5] focus:outline-none focus:ring-2 focus:ring-[#3568F5]/30"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span>Back to Assignments &amp; Quizzes</span>
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[900px] px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
        {/* Page heading */}
        <div className="mb-7 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#202638] sm:text-3xl">
            Create Assignment
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#7C8698] sm:text-base">
            Create an assignment for your students to complete.
          </p>
        </div>

        <form onSubmit={handlePublish} className="space-y-6">
          {/* Section 1: Basic information */}
          <section className="rounded-xl border border-[#E6EAF1] bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-7">
            <SectionHeader
              number="1"
              title="Basic Information"
              description="Enter the basic details of your assignment."
              icon={FileText}
            />

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              {/* Title */}
              <div>
                <label htmlFor="assignment-title" className={labelClass}>
                  Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="assignment-title"
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    updateField('title', event.target.value)
                  }
                  placeholder="e.g. Quadratic Equations Practice"
                  required
                  aria-invalid={Boolean(errors.title)}
                  className={`${inputClass} ${
                    errors.title ? 'border-red-400' : ''
                  }`}
                />

                <FieldError>{errors.title}</FieldError>
              </div>

              {/* Week */}
              <SelectField
                id="assignment-week"
                label="Week"
                value={form.week}
                onChange={(event) =>
                  updateField('week', event.target.value)
                }
                options={weekOptions}
                placeholder="Select week"
                error={errors.week}
                required
              />

              {/* Day */}
              <SelectField
                id="assignment-day"
                label="Day"
                value={form.day}
                onChange={(event) =>
                  updateField('day', event.target.value)
                }
                options={daysOfWeek.map((day) => ({
                  value: day,
                  label: day,
                }))}
                placeholder="Select day"
                error={errors.day}
                required
              />

              {/* Lesson */}
              <SelectField
                id="assignment-subject"
                label="Lesson"
                value={form.subject}
                onChange={(event) =>
                  updateField('subject', event.target.value)
                }
                options={subjectOptions}
                placeholder="Select lesson"
                error={errors.subject}
                required
              />

              {/* Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="assignment-description"
                  className={labelClass}
                >
                  Description / Instructions
                </label>

                <textarea
                  id="assignment-description"
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    updateField('description', event.target.value)
                  }
                  placeholder="Describe the instructions students should follow..."
                  className="mt-2 min-h-[120px] w-full resize-y rounded-lg border border-[#DDE3ED] bg-white px-3.5 py-3 text-sm leading-6 text-[#252B36] outline-none transition placeholder:text-[#9AA3B2] hover:border-[#B8C4D8] focus:border-[#4775F5] focus:ring-4 focus:ring-[#4775F5]/10"
                />

                <p className="mt-1.5 text-right text-xs text-[#9AA3B2]">
                  {form.description.length} characters
                </p>
              </div>
            </div>
          </section>











          {/* Section 2: Availability and deadline */}
          <section className="rounded-xl border border-[#E6EAF1] bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-6">
            {/* Compact section heading matching the reference */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3568F5] text-xs font-semibold text-white">
                2
              </div>

              <h2 className="text-base font-bold leading-6 text-black">
                Availability &amp; Deadline
              </h2>
            </div>

            <div className="space-y-4">
              {/* Availability */}
              <div className="min-w-0">
                {form.availability === 'after-week' ? (
                  <>
                    <label
                      htmlFor="unlock-week"
                      className="block text-sm font-medium text-black"
                    >
                      After completing a specific week
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative mt-2">
                      <select
                        id="unlock-week"
                        value={form.unlockWeek}
                        onChange={(event) =>
                          updateField('unlockWeek', event.target.value)
                        }
                        required
                        aria-invalid={Boolean(errors.unlockWeek)}
                        className={`h-[43px] w-full appearance-none rounded-lg border bg-white px-4 pr-10 text-sm text-[#343434] outline-none transition hover:border-[#B8C4D8] focus:border-[#4775F5] focus:ring-4 focus:ring-[#4775F5]/10 ${
                          errors.unlockWeek
                            ? 'border-red-400'
                            : 'border-[#E5E5E5]'
                        }`}
                      >
                        <option value="">Select week</option>
                        {weekOptions.map((option) => (
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

                    <FieldError>{errors.unlockWeek}</FieldError>
                  </>
                ) : (
                  <SelectField
                    id="assignment-availability"
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
                    placeholder="Select availability"
                    required
                  />
                )}
              </div>

              {/* Deadline */}
              <div className="min-w-0">
                <label
                  htmlFor="assignment-deadline"
                  className="block text-sm font-medium text-black"
                >
                  Set deadline after unlocking
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="mt-2 flex w-full items-center gap-5">
                  {/* Short number input */}
                  <div className="w-[167px] shrink-0">
                    <input
                      id="assignment-deadline"
                      type="number"
                      min="1"
                      step="1"
                      value={form.deadline}
                      onChange={(event) =>
                        updateField('deadline', event.target.value)
                      }
                      required
                      aria-label="Deadline number"
                      aria-invalid={Boolean(errors.deadline)}
                      className={`h-[43px] w-full rounded-lg border bg-white px-3 text-sm text-[#343434] outline-none transition focus:border-[#4775F5] focus:ring-4 focus:ring-[#4775F5]/10 ${
                        errors.deadline
                          ? 'border-red-400'
                          : 'border-[#E5E5E5]'
                      }`}
                    />
                  </div>

                  {/* Long Days / Weeks dropdown fills remaining width */}
                  <div className="relative min-w-0 flex-1">
                    <select
                      id="assignment-deadline-unit"
                      value={form.deadlineUnit}
                      onChange={(event) =>
                        updateField('deadlineUnit', event.target.value)
                      }
                      aria-label="Deadline unit"
                      aria-invalid={Boolean(errors.deadlineUnit)}
                      className={`h-[43px] w-full appearance-none rounded-lg border bg-white px-3 pr-10 text-sm text-[#343434] outline-none transition hover:border-[#B8C4D8] focus:border-[#4775F5] focus:ring-4 focus:ring-[#4775F5]/10 ${
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

                <FieldError>{errors.deadline}</FieldError>
                <FieldError>{errors.deadlineUnit}</FieldError>
              </div>
            </div>
          </section>



          
          
         

          {/* Section 3: Assignment Questions */}
          <section className="rounded-xl border border-[#E6EAF1] bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
            {/* Section heading */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3568F5] text-xs font-semibold text-white">
                3
              </div>

              <h2 className="text-base font-bold leading-6 text-black">
                Assignment Questions
              </h2>
            </div>

            {/* Questions */}
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-md border border-[#E1E2E7] bg-[#F5F5F7] p-3.5 sm:p-4"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px] sm:gap-3">
                    {/* Question text */}
                    <div className="min-w-0">
                      <div className="mb-2 flex min-h-5 items-center justify-between gap-2">
                        <label
                          htmlFor={`question-${question.id}`}
                          className="text-sm font-semibold text-[#111111]"
                        >
                          Question {index + 1}
                        </label>

                        {questions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeQuestion(question.id)}
                            aria-label={`Remove question ${index + 1}`}
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#8B94A5] transition hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>

                      <textarea
                        id={`question-${question.id}`}
                        rows={3}
                        value={question.question}
                        onChange={(event) =>
                          updateQuestion(
                            question.id,
                            'question',
                            event.target.value
                          )
                        }
                        placeholder="Type your question here..."
                        required
                        aria-invalid={Boolean(errors.questions)}
                        className="min-h-[72px] w-full resize-y rounded-md border border-[#E7E7E9] bg-white px-2 py-2 text-xs leading-5 text-[#252B36] outline-none transition placeholder:text-[#A6A6A6] focus:border-[#4775F5] focus:ring-2 focus:ring-[#4775F5]/10 sm:min-h-[72px]"
                      />
                    </div>

                    {/* Points and image upload */}
                    <div className="flex min-w-0 flex-col gap-3">
                      <div className="flex items-center gap-3 sm:justify-between">
                        <label
                          htmlFor={`marks-${question.id}`}
                          className="shrink-0 text-sm font-semibold text-[#111111]"
                        >
                          Points
                        </label>

                        <input
                          id={`marks-${question.id}`}
                          type="number"
                          min="1"
                          step="1"
                          value={question.marks}
                          onChange={(event) =>
                            updateQuestion(
                              question.id,
                              'marks',
                              event.target.value
                            )
                          }
                          aria-label={`Points for question ${index + 1}`}
                          className="h-[38px] min-w-0 flex-1 rounded-md border border-[#E7E7E9] bg-white px-3 text-sm text-[#343434] outline-none transition focus:border-[#4775F5] focus:ring-2 focus:ring-[#4775F5]/10 sm:w-[103px] sm:flex-none"
                        />
                      </div>

                      {/* Hidden file input + clickable upload label */}
                      <input
                        id={`question-image-${question.id}`}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0];

                          if (!file) return;

                          if (!file.type.startsWith('image/')) {
                            event.target.value = '';
                            return;
                          }

                          updateQuestion(
                            question.id,
                            'image',
                            file
                          );

                          updateQuestion(
                            question.id,
                            'imagePreview',
                            URL.createObjectURL(file)
                          );

                          event.target.value = '';
                        }}
                      />

                      <label
                        htmlFor={`question-image-${question.id}`}
                        className="inline-flex min-h-[43px] cursor-pointer items-center justify-center gap-2 rounded-md border border-[#E8E9ED] bg-[#EDEEF1] px-2.5 text-xs font-medium text-[#606979] transition hover:bg-[#E4E7ED] focus-within:ring-2 focus-within:ring-[#4775F5]/20"
                      >
                      
                      <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.53125 0C2.02871 0 0 2.02871 0 4.53125V17.2188C0 19.7213 2.02871 21.75 4.53125 21.75H13.5938C14.0943 21.75 14.5 21.3443 14.5 20.8438C14.5 20.3432 14.0943 19.9375 13.5938 19.9375H4.53125C3.04791 19.9375 1.84203 18.7496 1.81303 17.2732L6.34375 12.7425L9.96875 16.3675L19.0312 7.30497L22.1756 10.4494C22.4411 10.7148 22.8714 10.7148 23.1369 10.4494C23.4023 10.1839 23.4023 9.75357 23.1369 9.48814L19.0312 5.38253L9.96875 14.445L6.34375 10.82L1.8125 15.3513V4.53125C1.8125 3.02973 3.02973 1.8125 4.53125 1.8125H24.4688C25.9703 1.8125 27.1875 3.02973 27.1875 4.53125V9.96875C27.1875 10.4693 27.5932 10.875 28.0938 10.875C28.5943 10.875 29 10.4693 29 9.96875V4.53125C29 2.02871 26.9713 0 24.4688 0H4.53125Z" fill="#2E6DFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.34375 9.0625C7.84527 9.0625 9.0625 7.84527 9.0625 6.34375C9.0625 4.84223 7.84527 3.625 6.34375 3.625C4.84223 3.625 3.625 4.84223 3.625 6.34375C3.625 7.84527 4.84223 9.0625 6.34375 9.0625ZM6.34375 7.70312C7.09451 7.70312 7.70312 7.09451 7.70312 6.34375C7.70312 5.59299 7.09451 4.98438 6.34375 4.98438C5.59299 4.98438 4.98438 5.59299 4.98438 6.34375C4.98438 7.09451 5.59299 7.70312 6.34375 7.70312Z" fill="#2E6DFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M29 19.0312C29 22.5348 26.1598 25.375 22.6562 25.375C19.1527 25.375 16.3125 22.5348 16.3125 19.0312C16.3125 15.5277 19.1527 12.6875 22.6562 12.6875C26.1598 12.6875 29 15.5277 29 19.0312ZM22.6562 15.4062C23.1568 15.4062 23.5625 15.812 23.5625 16.3125V18.125H25.375C25.8755 18.125 26.2812 18.5307 26.2812 19.0312C26.2812 19.5318 25.8755 19.9375 25.375 19.9375H23.5625V21.75C23.5625 22.2505 23.1568 22.6562 22.6562 22.6562C22.1557 22.6562 21.75 22.2505 21.75 21.75V19.9375H19.9375C19.437 19.9375 19.0312 19.5318 19.0312 19.0312C19.0312 18.5307 19.437 18.125 19.9375 18.125H21.75V16.3125C21.75 15.812 22.1557 15.4062 22.6562 15.4062Z" fill="#2E6DFF"/>
</svg>

                        <span>
                          {question.image
                            ? 'Change image'
                            : 'Add image (optional)'}
                        </span>
                      </label>

                      {/* Selected image preview */}
                      {question.imagePreview && (
                        <div className="relative overflow-hidden rounded-md border border-[#E1E5ED] bg-white p-1.5">
                          <img
                            src={question.imagePreview}
                            alt={`Preview for question ${index + 1}`}
                            className="max-h-36 w-full rounded object-contain"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              if (question.imagePreview) {
                                URL.revokeObjectURL(
                                  question.imagePreview
                                );
                              }

                              updateQuestion(
                                question.id,
                                'image',
                                null
                              );

                              updateQuestion(
                                question.id,
                                'imagePreview',
                                ''
                              );
                            }}
                            aria-label={`Remove image from question ${index + 1}`}
                            className="mt-2 inline-flex min-h-8 w-full items-center justify-center gap-1.5 rounded-md border border-red-100 bg-red-50 px-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 size={13} />
                            Remove image
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <FieldError>{errors.questions}</FieldError>

            {/* Add question */}
            <button
              type="button"
              onClick={addQuestion}
              className="mt-3 flex min-h-[59px] w-full items-center justify-center gap-3 rounded-md border border-[#A9C1FF] bg-[#E6EDFF] px-4 py-3 text-sm font-semibold text-[#326AFF] transition hover:border-[#7EA2FF] hover:bg-[#DCE6FF] focus:outline-none focus:ring-2 focus:ring-[#3568F5]/30 sm:min-h-[59px]"
            >
              <Plus size={23} strokeWidth={1.8} />
              <span>Add Question</span>
            </button>
          </section>

          {/* Feedback */}
          {notice && (
            <div
              role="status"
              className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
                isPublished
                  ? 'border-[#B8E8CC] bg-[#EEFBF3] text-[#16733C]'
                  : 'border-[#D5E1FF] bg-[#EEF3FF] text-[#3155AD]'
              }`}
            >
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              <p>{notice}</p>
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>Please correct the highlighted fields before publishing.</p>
            </div>
          )}

          {/* Bottom actions */}
          <div className="sticky bottom-0 z-10 -mx-4 border-t border-[#E5EAF2] bg-[#F4F7FD]/95 px-4 py-3 backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-2 sm:backdrop-blur-none">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#D5DCE8] bg-white px-6 py-3 text-sm font-semibold text-[#48536A] transition hover:bg-[#F8FAFD] focus:outline-none focus:ring-2 focus:ring-[#9BA8C0]/40 sm:w-auto"
              >
                <Save size={17} />
                Save Draft
              </button>

              <button
                type="submit"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#3568F5] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2857DC] focus:outline-none focus:ring-4 focus:ring-[#3568F5]/30 sm:w-auto"
              >
                <Send size={16} />
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
