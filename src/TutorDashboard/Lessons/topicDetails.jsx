
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const topicData = {
  "math-y4-numbers-01": {
    title: "Numbers",
    subject: "Mathematics",
    year: 4,
    lessons: 8,
    description: "Place value, rounding, ordering and more.",
  },
  "math-y4-numbers-02": {
    title: "Numbers",
    subject: "Mathematics",
    year: 4,
    lessons: 8,
    description: "Place value, rounding, ordering and more.",
  },
  "math-y4-numbers-03": {
    title: "Numbers",
    subject: "Mathematics",
    year: 4,
    lessons: 8,
    description: "Place value, rounding, ordering and more.",
  },
  "math-y4-numbers-04": {
    title: "Numbers",
    subject: "Mathematics",
    year: 4,
    lessons: 8,
    description: "Place value, rounding, ordering and more.",
  },
};

const resourceTypes = [
  {
    label: "Lesson Note",
    type: "lesson-note",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" fill="#FFF0F0"/><path d="M8 5.5h6l4 4v9H8a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" fill="#fff" stroke="#E65B5B" stroke-width="1.4"/><path d="M14 5.5v4h4M9 13h6M9 16h5" stroke="#E65B5B" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  },
  {
    label: "PowerPoint",
    type: "powerpoint",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#FCE8DF"/><circle cx="10" cy="12" r="7" fill="#D74726"/><path d="M8 7.5h3.5a3 3 0 0 1 0 6H9.5V17H8V7.5Zm1.5 1.5v3h2a1.5 1.5 0 0 0 0-3h-2Z" fill="#fff"/><path d="M16 8h2v8h-2" stroke="#D74726" stroke-width="1.3" fill="none"/></svg>`,
  },
  {
    label: "Worksheet",
    type: "worksheet",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" fill="#E8F1FF" stroke="#4785E8" stroke-width="1.2"/><path d="M7 8h3M7 12h3M7 16h3M13 8h4M13 12h4M13 16h4" stroke="#4785E8" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    label: "Practice Activity",
    type: "practice-activity",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" fill="#E1F7F0" stroke="#1A9C79" stroke-width="1.2"/><path d="m7 12 3.2 3.2L17.5 8" stroke="#1A9C79" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },
  {
    label: "Assessment",
    type: "assessment",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" fill="#FFF5D9" stroke="#C99521" stroke-width="1.2"/><path d="M8 8h8M8 12h3" stroke="#C99521" stroke-width="1.5" stroke-linecap="round"/><path d="m13 16 1.5 1.5L18 14" stroke="#C99521" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },
  {
    label: "Video",
    type: "video",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="3" fill="#F4E8FF" stroke="#9652CC" stroke-width="1.2"/><path d="m10 8.5 5.5 3.5-5.5 3.5v-7Z" fill="#9652CC"/></svg>`,
  },
];

const lessons = [
  {
    id: "lesson-01",
    number: "01",
    title: "Introduction to Place Value",
    description:
      "Understand what equivalent fractions are and how to identify them.",
    selected: true,
  },
  {
    id: "lesson-02",
    number: "02",
    title: "Introduction to Place Value",
    description:
      "Understand what equivalent fractions are and how to identify them.",
    selected: false,
  },
  {
    id: "lesson-03",
    number: "03",
    title: "Introduction to Place Value",
    description:
      "Understand what equivalent fractions are and how to identify them.",
    selected: false,
  },
  {
    id: "lesson-04",
    number: "04",
    title: "Introduction to Place Value",
    description:
      "Understand what equivalent fractions are and how to identify them.",
    selected: true,
  },
];

export default function TopicDetails() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const topic = topicData[topicId];

  const [activeTab, setActiveTab] = useState("lessons");
  const [selectedLessons, setSelectedLessons] = useState(
    lessons
      .filter((lesson) => lesson.selected)
      .map((lesson) => lesson.id)
  );
  const [saved, setSaved] = useState(false);

  const toggleLesson = (lessonId) => {
    setSelectedLessons((previous) =>
      previous.includes(lessonId)
        ? previous.filter((id) => id !== lessonId)
        : [...previous, lessonId]
    );
  };

  const handleSaveTopic = () => {
    setSaved(true);
    // Connect your API here to persist the saved topic.
  };

  if (!topic) {
    return (
      <main className="min-h-screen w-full bg-[#F4F6FC] px-4 py-6 font-sans sm:px-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg text-base font-medium text-[#333333] transition-colors hover:text-[#306BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306BFF]"
        >
          <span aria-hidden="true" className="text-xl">
            ←
          </span>
          Back to Lesson Notes
        </button>

        <section className="mt-8 rounded-xl border border-[#E2E7ED] bg-white p-5 sm:p-8">
          <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
            Topic not found
          </h1>
          <p className="mt-2 text-base leading-7 text-[#737B8C]">
            The requested topic could not be found. Please return to your
            lesson notes and select a topic.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F4F6FC] px-4 pb-8 pt-4 font-sans sm:px-6 sm:pt-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <header className="mb-6 flex min-h-11 items-center justify-between gap-3 sm:mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex min-h-11 min-w-0 items-center gap-2 rounded-lg text-sm font-medium text-[#333333] transition-colors hover:text-[#306BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306BFF] sm:text-base"
          >
            <span aria-hidden="true" className="shrink-0 text-xl">
              ←
            </span>
            <span>Back to Lesson Notes</span>
          </button>

         
        </header>

        {/* Topic Information */}
        <section className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#171717] sm:text-4xl">
            {topic.title}
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#737B8C] sm:text-base">
            {topic.lessons} lessons
            <span className="mx-2 text-[#C1C8D3]" aria-hidden="true">
              ·
            </span>
            Year {topic.year}
            <span className="mx-2 text-[#C1C8D3]" aria-hidden="true">
              ·
            </span>
            {topic.subject}
          </p>
        </section>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Topic information"
          className="flex w-full gap-5 overflow-x-auto border-b border-[#DFE4ED] sm:gap-8"
        >
          <button
            id="lessons-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "lessons"}
            aria-controls="lessons-panel"
            onClick={() => setActiveTab("lessons")}
            className={`relative min-h-12 shrink-0 px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#306BFF] sm:text-base ${
              activeTab === "lessons"
                ? "font-semibold text-[#252525]"
                : "font-medium text-[#777F8E] hover:text-[#252525]"
            }`}
          >
            Lessons
            {activeTab === "lessons" && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-[#3478FF]" />
            )}
          </button>

          <button
            id="about-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "about"}
            aria-controls="about-panel"
            onClick={() => setActiveTab("about")}
            className={`relative min-h-12 shrink-0 px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#306BFF] sm:text-base ${
              activeTab === "about"
                ? "font-semibold text-[#252525]"
                : "font-medium text-[#777F8E] hover:text-[#252525]"
            }`}
          >
            About this topic
            {activeTab === "about" && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-[#3478FF]" />
            )}
          </button>
        </div>

        {/* Lessons */}
        {activeTab === "lessons" && (
          <section
            id="lessons-panel"
            role="tabpanel"
            aria-labelledby="lessons-tab"
            className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5"
          >
            {lessons.map((lesson) => {
              const isSelected = selectedLessons.includes(lesson.id);

              return (
                <article
                  key={lesson.id}
                  className={`w-full min-w-0 rounded-xl border border-[#E2E7ED] p-4 transition-colors sm:p-5 lg:p-6 ${
                    isSelected ? "bg-[#D8F3E6]" : "bg-white"
                  }`}
                >
                  {/* Lesson heading and selection */}
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E2E5EB] text-sm font-bold text-[#30343B] sm:h-11 sm:w-11 sm:text-base">
                        {lesson.number}
                      </span>

                      <div className="min-w-0 flex-1 pt-0.5">
                        <h2 className="break-words text-base font-semibold leading-6 text-[#222222] sm:text-lg sm:leading-7">
                          {lesson.title}
                        </h2>

                        <p className="mt-1 break-words text-sm leading-6 text-[#657080] sm:text-base">
                          {lesson.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleLesson(lesson.id)}
                      className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg bg-[#00651D] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#004C16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00651D] focus-visible:ring-offset-2 sm:w-auto sm:min-w-36"
                    >
                      {isSelected ? "Remove Lesson" : "Select Lesson"}
                    </button>
                  </div>

                  {/* Learning resources */}
                  <div className="mt-5 border-t border-black/5 pt-4">
                    <h3 className="mb-3 text-sm font-semibold text-[#414957] sm:text-base">
                      Learning resources
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {resourceTypes.map((resource) => (
                        <button
                          key={resource.type}
                          type="button"
                          onClick={() => {
                            // Connect this resource to its viewer or URL.
                          }}
                          className="inline-flex min-h-10 max-w-full items-center justify-center gap-2 rounded-lg border border-[#E1E5EB] bg-white px-3 py-2 text-sm font-medium text-[#333333] transition-colors hover:border-[#B9C9E8] hover:bg-[#FAFBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3478FF] sm:min-h-11 sm:px-4"
                        >
                          <span
                            aria-hidden="true"
                            className="flex h-5 w-5 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full"
                            dangerouslySetInnerHTML={{
                              __html: resource.svg,
                            }}
                          />
                          <span className="break-words">
                            {resource.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* About Topic */}
        {activeTab === "about" && (
          <section
            id="about-panel"
            role="tabpanel"
            aria-labelledby="about-tab"
            className="mt-5 rounded-xl border border-[#E2E7ED] bg-white p-5 sm:mt-6 sm:p-7"
          >
            <h2 className="text-xl font-semibold text-[#222222] sm:text-2xl">
              About {topic.title}
            </h2>

            <p className="mt-3 text-base leading-7 text-[#5F6979] sm:text-lg sm:leading-8">
              {topic.description} Explore the lessons, learning resources,
              activities, and assessments available for this topic.
            </p>

            <dl className="mt-6 divide-y divide-[#E9EDF3]">
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <dt className="text-sm font-medium text-[#737B8C] sm:text-base">
                  Subject
                </dt>
                <dd className="text-base font-semibold text-[#252525]">
                  {topic.subject}
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <dt className="text-sm font-medium text-[#737B8C] sm:text-base">
                  Year group
                </dt>
                <dd className="text-base font-semibold text-[#252525]">
                  Year {topic.year}
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <dt className="text-sm font-medium text-[#737B8C] sm:text-base">
                  Total lessons
                </dt>
                <dd className="text-base font-semibold text-[#252525]">
                  {topic.lessons} lessons
                </dd>
              </div>
            </dl>
          </section>
        )}

        {/* Save Topic */}
        <div className="mt-6 sm:mt-8">
          <button
            type="button"
            onClick={handleSaveTopic}
            aria-live="polite"
            className="flex min-h-12 w-full items-center justify-center rounded-lg bg-[#323681] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#272B6D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#323681] focus-visible:ring-offset-2 sm:min-h-14 sm:text-lg"
          >
            {saved ? "Topic Saved" : "Save Topic"}
          </button>
        </div>
      </div>
    </main>
  );
}
