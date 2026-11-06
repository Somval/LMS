import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Bookmark } from "lucide-react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { readSaved, toggleSavedTopic, topicLink } from "./lessonStore";

export default function CurriculumTabs({ subject, year }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [curriculumTopics, setCurriculumTopics] = useState([]);
  const [loading, setLoading] = useState(!!subject);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(() => readSaved(user?.id));
  const savedTopics = saved.map((t) => t.id);

  // Published topics of the chosen subject, in curriculum order.
  useEffect(() => {
    setError("");
    if (!subject) {
      setCurriculumTopics([]);
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    api
      .get(`/curriculum/subjects/${subject.subjectId}/topics`)
      .then((list) => {
        if (cancelled) return;
        setCurriculumTopics(
          list
            .filter((t) => t.published)
            .map((t, i) => ({
              id: t.id,
              number: String(i + 1).padStart(2, "0"),
              title: t.title,
              description: t.description || "",
              lessons: t.lessons.length,
              subjectId: subject.subjectId,
              year: year || null,
            }))
        );
      })
      .catch((err) => !cancelled && setError(err.message || "Could not load the topics."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [subject, year]);

  const [activeTab, setActiveTab] = useState("curriculum");
  const [selectedTopics, setSelectedTopics] = useState([]);

  const visibleTopics =
    activeTab === "curriculum"
      ? curriculumTopics
      : saved;

  const toggleSelected = (id) => {
    setSelectedTopics((previous) =>
      previous.includes(id)
        ? previous.filter((topicId) => topicId !== id)
        : [...previous, id]
    );
  };

  const toggleSaved = (id) => {
    const topic = [...curriculumTopics, ...saved].find((t) => t.id === id);
    if (topic) setSaved(toggleSavedTopic(user?.id, topic));
  };

  const openTopic = (topic) => navigate(topicLink(topic));

  return (
    <main className="min-h-screen w-full bg-[#F4F6FC] p-3 font-sans sm:p-5">
      <div className="w-full">
        {/* Curriculum / Saved Topics Switch Tabs */}
        <div
          role="tablist"
          aria-label="Curriculum sections"
          className="flex h-10 w-full items-stretch gap-6 border-b border-[#E6EAF2] px-1"
        >
          <button
            id="curriculum-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "curriculum"}
            aria-controls="curriculum-panel"
            onClick={() => setActiveTab("curriculum")}
            className={`relative flex items-center px-1 pb-2 text-xs font-medium sm:text-sm ${
              activeTab === "curriculum"
                ? "font-semibold text-[#171717]"
                : "text-[#777D89] hover:text-[#252525]"
            }`}
          >
            Curriculum
            {activeTab === "curriculum" && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#3978FF]" />
            )}
          </button>

          <button
            id="saved-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "saved"}
            aria-controls="curriculum-panel"
            onClick={() => setActiveTab("saved")}
            className={`relative flex items-center gap-1.5 px-1 pb-2 text-xs font-medium sm:text-sm ${
              activeTab === "saved"
                ? "font-semibold text-[#171717]"
                : "text-[#777D89] hover:text-[#252525]"
            }`}
          >
            Saved topics
            {savedTopics.length > 0 && (
              <span className="rounded-full bg-[#E8EEFF] px-2 py-0.5 text-[10px] font-semibold text-[#3978FF]">
                {savedTopics.length}
              </span>
            )}
            {activeTab === "saved" && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#3978FF]" />
            )}
          </button>
        </div>

        {/* Topics Panel */}
        <section
          id="curriculum-panel"
          role="tabpanel"
          aria-labelledby={
            activeTab === "curriculum" ? "curriculum-tab" : "saved-tab"
          }
          className="mt-3 w-full rounded-lg border border-[#E8ECF4] bg-white p-3 shadow-sm sm:p-4"
        >
          {/* Panel Heading */}
          <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <h2 className="text-xs font-semibold leading-snug text-[#171717] sm:text-sm">
              {activeTab === "curriculum"
                ? `Topics in ${subject?.name ?? "your subjects"}${year ? ` · ${year}` : ""}`
                : "Saved topics"}
            </h2>

            <span className="shrink-0 text-[11px] font-medium text-[#9297A1] sm:text-xs">
              {activeTab === "curriculum"
                ? `${curriculumTopics.length} topics`
                : `${savedTopics.length} topics`}
            </span>
          </div>

          {/* Topic Rows */}
          <div className="flex w-full flex-col gap-2">
            {visibleTopics.length > 0 ? (
              visibleTopics.map((topic) => {
                const isSaved = savedTopics.includes(topic.id);
                const isSelected = selectedTopics.includes(topic.id);

                return (
                  <div
                    key={topic.id}
                    className="flex min-h-[48px] w-full items-center gap-2.5 rounded-md border border-[#E9ECF2] bg-white px-2.5 py-1.5 transition-colors hover:bg-[#FAFBFF] sm:gap-3.5 sm:px-3"
                  >
                    {/* Selection Checkbox */}
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelected(topic.id)}
                      aria-label={`Select ${topic.title}, topic ${topic.number}`}
                      className="h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#3978FF]"
                    />

                    {/* Topic Number */}
                    <span className="w-5 shrink-0 text-center text-xs font-medium text-[#9297A1]">
                      {topic.number}
                    </span>

                    {/* Topic Details Navigation */}
                    <button
                      type="button"
                      onClick={() => openTopic(topic)}
                      className="flex min-w-0 flex-1 flex-col justify-center text-left focus:outline-none"
                    >
                      <span className="truncate text-xs font-semibold text-[#242424] sm:text-sm">
                        {topic.title}
                      </span>

                      <span className="truncate text-[11px] text-[#777D89] sm:text-xs">
                        {topic.description}
                      </span>
                    </button>

                    {/* Lesson Count */}
                    <span className="shrink-0 whitespace-nowrap text-[10px] font-medium text-[#9297A1] sm:text-xs">
                      {topic.lessons} {topic.lessons === 1 ? "lesson" : "lessons"}
                    </span>

                    {/* Save / Unsave Topic */}
                    <button
                      type="button"
                      onClick={() => toggleSaved(topic.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${topic.title} from saved topics`
                          : `Save ${topic.title}`
                      }
                      title={isSaved ? "Unsave topic" : "Save topic"}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-slate-100 ${
                        isSaved
                          ? "text-[#3978FF]"
                          : "text-[#A0A6B1] hover:text-[#3978FF]"
                      }`}
                    >
                      <Bookmark
                        size={16}
                        strokeWidth={1.8}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>

                    {/* Open Topic */}
                    <button
                      type="button"
                      onClick={() => openTopic(topic)}
                      aria-label={`Open topic ${topic.number}`}
                      className="flex h-8 w-6 shrink-0 items-center justify-center text-[#737D8D] transition-colors hover:text-[#3978FF]"
                    >
                      <ChevronRight size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="flex min-h-[140px] w-full items-center justify-center rounded-md border border-dashed border-[#E6EAF2] p-4 text-center">
                <p
                  role={error ? "alert" : undefined}
                  className={`text-xs sm:text-sm ${error ? "text-red-600" : "text-[#858B97]"}`}
                >
                  {activeTab === "curriculum"
                    ? loading
                      ? "Loading topics…"
                      : error ||
                        (subject
                          ? "No published topics for this subject yet."
                          : "Courses you teach will show up here once they are assigned to you.")
                    : "No saved topics yet. Save a topic using the bookmark icon."}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}