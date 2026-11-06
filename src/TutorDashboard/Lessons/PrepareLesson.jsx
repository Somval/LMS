
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { readPlan, savePlan } from "./lessonStore";
import {
  ArrowLeft,
  Check,
  FileText,
  ClipboardList,
  BookOpen,
  Video,
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Wrench,
  Clock3,
} from "lucide-react";

const resources = [
  {
    id: "lesson-note",
    title: "Standard Lesson Note",
    description: "Detailed explanations and examples.",
    renderIcon: (props) => <BookOpen {...props} />,
    color: "#FF4D5A",
    bg: "#FFE3E5",
  },
  {
    id: "powerpoint",
    title: "PowerPoint Presentation",
    description: "Visual slides for teaching.",
    renderIcon: (props) => (
      <svg
        width="22"
        height="24"
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3 2H14L19 7V21C19 21.6 18.5 22 18 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2Z"
          stroke="#C25B33"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M14 2V7H19"
          stroke="#C25B33"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect x="6" y="9" width="11" height="8" rx="1" fill="#C25B33" />
        <path
          d="M9 11V15L13 13L9 11Z"
          fill="white"
        />
      </svg>
    ),
    color: "#C25B33",
    bg: "#F9E9E2",
  },
  {
    id: "worksheet",
    title: "Worksheet",
    description: "Printable practice questions.",
    renderIcon: (props) => <FileText {...props} />,
    color: "#3978FF",
    bg: "#E4EDFF",
  },
  {
    id: "practice",
    title: "Practice Activity",
    description: "Hands-on activity to reinforce learning.",
    renderIcon: (props) => <Wrench {...props} />,
    color: "#12CDE2",
    bg: "#DDFBFF",
  },
  {
    id: "assessment",
    title: "Assessment",
    description: "End of lesson assessment.",
    renderIcon: (props) => <Clock3 {...props} />,
    color: "#D6AF00",
    bg: "#FFF7D7",
  },
  {
    id: "video",
    title: "Video",
    description: "Explainable video for this lesson.",
    renderIcon: (props) => <Video {...props} />,
    color: "#A832D1",
    bg: "#F5E0FC",
  },
];

const deliveryOptions = [
  { id: "prior-knowledge", label: "Prior Knowledge Check" },
  { id: "explanation", label: "Explanation" },
  { id: "worked-examples", label: "Worked Examples" },
  { id: "guided-practice", label: "Guided Practice" },
  { id: "interactive-activity", label: "Interactive Activity" },
  { id: "quiz", label: "Quiz" },
  { id: "exit-ticket", label: "Exit Ticket" },
  { id: "independent-practice", label: "Independent Practice" },
];

export default function PrepareLesson() {
  const navigate = useNavigate();
  const location = useLocation();

  const topic = location.state?.topic;
  const lesson = location.state?.lesson;

  const { user } = useAuth();

  // A plan saved earlier for this lesson is picked up again; otherwise start with the usual three.
  const earlierPlan = lesson ? readPlan(user?.id, lesson.id) : null;
  const [selectedResources, setSelectedResources] = useState(
    earlierPlan?.resources ?? ["lesson-note", "powerpoint", "worksheet"]
  );

  const [selectedDelivery, setSelectedDelivery] = useState(earlierPlan?.delivery ?? []);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "info") => {
    setAlert({ message, type });
  };

  const clearAlert = () => setAlert(null);

  const toggleResource = (id) => {
    setSelectedResources((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

    clearAlert();
  };

  const toggleDelivery = (id) => {
    setSelectedDelivery((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

    clearAlert();
  };

  const handleSave = () => {
    if (selectedResources.length === 0) {
      showAlert("Please select at least one resource before saving.", "error");
      return;
    }

    savePlan(user?.id, lesson.id, {
      resources: selectedResources,
      delivery: selectedDelivery,
    });
    showAlert("Lesson plan saved on this device.", "success");
  };

  // Opened directly (for example after a refresh) there is no lesson to prepare.
  if (!lesson) {
    return (
      <main className="min-h-screen w-full bg-[#F4F6FC] px-4 py-6 font-sans sm:px-6">
        <p className="text-sm font-medium text-[#5F6979]">
          Choose a lesson from a topic to prepare it.
        </p>
        <button
          type="button"
          onClick={() => navigate("/tutor/lessons")}
          className="mt-3 text-sm font-semibold text-[#306BFF] hover:underline"
        >
          Go to lesson notes
        </button>
      </main>
    );
  }

  const lessonTitle = lesson.title;
  const lessonNumber = lesson.number;
  const subjectLine = [topic?.subject, topic?.year, topic?.title].filter(Boolean).join(" · ");

  return (
    <main className="min-h-screen w-full bg-[#F4F6FC] px-3 pb-8 pt-4 font-sans sm:px-6">
      <div className="w-full">
        {/* Alert */}
        {alert && (
          <div
            className={`mb-4 flex w-full items-center justify-between gap-3 rounded-lg border p-3.5 shadow-sm ${
              alert.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : alert.type === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-blue-200 bg-blue-50 text-blue-800"
            }`}
            role="status"
          >
            <div className="flex items-center gap-2.5">
              {alert.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0" />
              )}

              <span className="text-xs font-medium sm:text-sm">
                {alert.message}
              </span>
            </div>

            <button
              type="button"
              onClick={clearAlert}
              aria-label="Close alert"
              className="rounded-full p-1 hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Page Header */}
        <header className="mb-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#30343B] shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ArrowLeft size={18} strokeWidth={1.8} />
          </button>

          <div className="min-w-0">
            <h1 className="text-lg font-bold leading-snug tracking-tight text-[#171717] sm:text-xl">
              Prepare Lesson
            </h1>

            <p className="text-xs text-[#737B8C] sm:text-sm">
              Select the resources and learning activities you want to use for
              this lesson.
            </p>
          </div>
        </header>

        {/* Step 1: Selected Lesson */}
        <section className="mb-4 rounded-2xl border border-[#EDF0F5] bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#326BFF] text-base font-semibold text-white">
              1
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold leading-tight text-[#171717] sm:text-lg">
                Selected Lesson
              </h2>

              <div className="mt-3 flex min-w-0 items-center gap-3 rounded-xl border border-[#E9EDF3] bg-[#FAFBFF] p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7E9ED] text-xs font-bold text-[#30343B]">
                  {lessonNumber}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-[#242424]">
                    {lessonTitle}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-[#777F8E]">
                    {subjectLine}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Choose Resources */}
        <section className="mb-4 rounded-2xl border border-[#EDF0F5] bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            {/* Step Number */}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#326BFF] text-base font-semibold text-white">
              2
            </span>

            <div className="min-w-0 flex-1">
              {/* Section Heading */}
              <div>
                <h2 className="text-base font-semibold leading-tight text-[#171717] sm:text-lg">
                  Choose Resources
                </h2>

                <p className="mt-1 text-sm leading-5 text-[#7B7F85]">
                  Select the approved resources you want to use for this lesson.
                </p>
              </div>

              {/* Resource Cards */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {resources.map((resource) => {
                  const selected = selectedResources.includes(resource.id);

                  return (
                    <button
                      key={resource.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleResource(resource.id)}
                      className={`group relative flex min-h-[78px] w-full min-w-0 items-start gap-3 rounded-lg border px-2.5 py-2.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#326BFF] focus-visible:ring-offset-2 sm:px-3 ${
                        selected
                          ? "border-[#DDE5F5] bg-white hover:border-[#326BFF]"
                          : "border-[#E2E4E8] bg-white hover:border-[#B9CAEF] hover:bg-[#FCFDFF]"
                      }`}
                    >
                      {/* Checkbox */}
                      <span
                        className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
                          selected
                            ? "border-[#326BFF] bg-[#326BFF] text-white"
                            : "border-[#C7CBE0] bg-white"
                        }`}
                        aria-hidden="true"
                      >
                        {selected && <Check size={12} strokeWidth={2.8} />}
                      </span>

                      {/* Resource Icon */}
                      <span
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: resource.bg,
                          color: resource.color,
                        }}
                        aria-hidden="true"
                      >
                        {resource.renderIcon({
                          size: 21,
                          strokeWidth: 1.7,
                        })}
                      </span>

                      {/* Resource Information */}
                      <span className="min-w-0 flex-1 py-0.5">
                        <span className="block text-[12px] font-semibold leading-[18px] text-[#171717] sm:text-[13px]">
                          {resource.title}
                        </span>

                        <span className="mt-0.5 block text-[10px] leading-[15px] text-[#87909E] sm:text-[11px]">
                          {resource.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Lesson Delivery */}
        <section className="mb-6 rounded-2xl border border-[#EDF0F5] bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#326BFF] text-base font-semibold text-white">
              3
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold leading-tight text-[#252525] sm:text-lg">
                How would you like to deliver this lesson?
              </h2>

              <p className="mt-1 text-sm text-[#737B8C]">
                Choose the learning options to guide your teaching.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {deliveryOptions.map((option) => {
                  const selected = selectedDelivery.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleDelivery(option.id)}
                      className={`flex min-h-[44px] min-w-0 items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#326BFF] ${
                        selected
                          ? "border-[#AFC7FF] bg-[#F1F5FF] font-medium text-[#244FBB]"
                          : "border-[#E2E4E8] bg-white text-[#666F7E] hover:border-[#CAD7F1]"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          selected
                            ? "border-[#326BFF] bg-[#326BFF] text-white"
                            : "border-[#D6DAE2] bg-white"
                        }`}
                      >
                        {selected && <Check size={10} strokeWidth={3} />}
                      </span>

                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Save Lesson */}
        <div className="w-full">
          <button
            type="button"
            onClick={handleSave}
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#326BFF] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2458E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#326BFF] focus-visible:ring-offset-2"
          >
            Save Lesson
          </button>
        </div>
      </div>
    </main>
  );
}
