
import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  Plus,
  FileText,
  Presentation,
  ClipboardList,
  BrainCircuit,
  ClipboardCheck,
  Video,
  Check,
  Upload,
  X,
  Save,
  Link as LinkIcon,
  File,
  ExternalLink,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RESOURCE_TYPES = [
  {
    id: "lesson-notes",
    title: "Lesson Notes",
    description: "Notes and learning materials",
    Icon: FileText,
    color: "#F04468",
    background: "#FFF0F3",
    actions: [
      { id: "upload", label: "Upload File", icon: Upload },
      { id: "write", label: "Write Notes", icon: FileText },
    ],
    accept: ".pdf,.doc,.docx,.txt,.rtf",
  },
  {
    id: "presentation",
    title: "Presentation",
    description: "Slides for teaching",
    Icon: Presentation,
    color: "#E76A32",
    background: "#FFF1E8",
    actions: [
      { id: "upload", label: "Upload PPT", icon: Upload },
      { id: "link", label: "Add Link", icon: LinkIcon },
    ],
    accept: ".ppt,.pptx,.pdf",
  },
  {
    id: "worksheet",
    title: "Worksheet",
    description: "Practice exercises",
    Icon: ClipboardList,
    color: "#4775F5",
    background: "#EEF2FF",
    actions: [
      { id: "upload", label: "Upload File", icon: Upload },
      { id: "link", label: "Add Link", icon: LinkIcon },
    ],
    accept: ".pdf,.doc,.docx,.xls,.xlsx,.csv",
  },
  {
    id: "activity",
    title: "Activity",
    description: "Interactive learning activities",
    Icon: BrainCircuit,
    color: "#16A6B7",
    background: "#E6FAFC",
    actions: [
      { id: "upload", label: "Upload File", icon: Upload },
      { id: "link", label: "Add Link", icon: LinkIcon },
    ],
    accept: ".pdf,.doc,.docx,.html,.zip",
  },
  {
    id: "assessment",
    title: "Assessment",
    description: "Quizzes and tests",
    Icon: ClipboardCheck,
    color: "#C69B00",
    background: "#FFF9D9",
    actions: [
      { id: "upload", label: "Upload File", icon: Upload },
      { id: "link", label: "Add Link", icon: LinkIcon },
    ],
    accept: ".pdf,.doc,.docx,.xls,.xlsx,.csv",
  },
  {
    id: "video",
    title: "Video",
    description: "Learning videos",
    Icon: Video,
    color: "#B64AD9",
    background: "#F8EAFE",
    actions: [
      { id: "upload", label: "Upload Video", icon: Upload },
      { id: "link", label: "Add URL", icon: LinkIcon },
    ],
    accept: ".mp4,.webm,.mov,.m4v",
  },
];

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const STORAGE_KEY = "adminCurriculumTopics";

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const emptyLesson = (order = 1) => ({
  id: createId(),
  title: "",
  order,
  description: "",
  resources: [],
  attachments: [],
});

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const serializeLesson = (lesson) => ({
  id: lesson.id,
  title: lesson.title.trim(),
  order: Number(lesson.order),
  description: lesson.description.trim(),
  resources: [...lesson.resources],
  attachments: lesson.attachments.map((attachment) => ({
    id: attachment.id,
    resourceType: attachment.resourceType,
    name: attachment.name,
    size: attachment.size,
    type: attachment.type,
    url: attachment.url || "",
    status: attachment.status,
  })),
});

export default function AddTopicLesson({
  uploadEndpoint = "",
  saveEndpoint = "",
  onSave,
}) {
  const navigate = useNavigate();
  const fileInputRefs = useRef({});

  const [topicId] = useState(createId);

  const [topicTitle, setTopicTitle] = useState("");
  const [topicOrder, setTopicOrder] = useState("1");
  const [topicDescription, setTopicDescription] = useState("");

  // All lesson forms are stored independently and rendered simultaneously.
  const [lessons, setLessons] = useState(() => [emptyLesson()]);

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [dialog, setDialog] = useState(null);
  const [dialogValue, setDialogValue] = useState("");
  const [dialogError, setDialogError] = useState("");

  const inputClass = (hasError) =>
    `min-h-[38px] w-full min-w-0 rounded-md border bg-white px-3 py-2 text-xs text-[#20252D] outline-none transition placeholder:text-[#9AA3B2] focus:border-[#3974F6] focus:ring-2 focus:ring-[#3974F6]/10 sm:min-h-[40px] sm:text-sm ${
      hasError ? "border-red-400" : "border-[#E5E9F0]"
    }`;

  const textareaClass = (hasError) =>
    `min-h-[76px] w-full resize-y rounded-md border bg-white px-3 py-2.5 text-xs leading-5 text-[#20252D] outline-none transition placeholder:text-[#A0A8B5] focus:border-[#3974F6] focus:ring-2 focus:ring-[#3974F6]/10 sm:min-h-[88px] sm:text-sm ${
      hasError ? "border-red-400" : "border-[#E5E9F0]"
    }`;

  const fieldLabel =
    "mb-1.5 block text-xs font-medium leading-5 text-[#414B5A]";

  const errorText =
    "mt-1.5 flex items-start gap-1.5 text-xs leading-5 text-red-500";

  // Update a particular lesson without affecting any other lesson.
  const updateLesson = (lessonIndex, field, value) => {
    setLessons((current) =>
      current.map((lesson, index) =>
        index === lessonIndex
          ? { ...lesson, [field]: value }
          : lesson
      )
    );

    setErrors((current) => ({
      ...current,
      [`lesson-${lessonIndex}-${field}`]: "",
    }));

    setFeedback(null);
  };

  const toggleResource = (lessonIndex, resourceId) => {
    setLessons((current) =>
      current.map((lesson, index) => {
        if (index !== lessonIndex) return lesson;

        const exists = lesson.resources.includes(resourceId);

        return {
          ...lesson,
          resources: exists
            ? lesson.resources.filter((id) => id !== resourceId)
            : [...lesson.resources, resourceId],
        };
      })
    );

    setFeedback(null);
  };

  const openFilePicker = (lessonIndex, resource) => {
    fileInputRefs.current[`${lessonIndex}-${resource.id}`]?.click();
  };

  const handleFilesSelected = (lessonIndex, resource, event) => {
    const selectedFiles = Array.from(event.target.files || []);

    // Reset the input so the same file can be selected again.
    event.target.value = "";

    if (!selectedFiles.length) return;

    const acceptedFiles = [];
    const rejectedFiles = [];

    selectedFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        rejectedFiles.push(`${file.name} exceeds the 50 MB limit.`);
        return;
      }

      acceptedFiles.push({
        id: createId(),
        resourceType: resource.id,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        file,
        url: "",
        status: "pending",
      });
    });

    if (acceptedFiles.length) {
      setLessons((current) =>
        current.map((lesson, index) => {
          if (index !== lessonIndex) return lesson;

          return {
            ...lesson,
            resources: lesson.resources.includes(resource.id)
              ? lesson.resources
              : [...lesson.resources, resource.id],
            attachments: [...lesson.attachments, ...acceptedFiles],
          };
        })
      );
    }

    setFeedback(
      rejectedFiles.length
        ? {
            type: "error",
            message: rejectedFiles.join(" "),
          }
        : null
    );
  };

  const removeAttachment = (lessonIndex, attachmentId) => {
    setLessons((current) =>
      current.map((lesson, index) => {
        if (index !== lessonIndex) return lesson;

        const removedAttachment = lesson.attachments.find(
          (item) => item.id === attachmentId
        );

        const attachments = lesson.attachments.filter(
          (attachment) => attachment.id !== attachmentId
        );

        const removedResourceType = removedAttachment?.resourceType;

        const stillHasResourceAttachment = attachments.some(
          (attachment) =>
            attachment.resourceType === removedResourceType
        );

        return {
          ...lesson,
          attachments,
          resources:
            removedResourceType && !stillHasResourceAttachment
              ? lesson.resources.filter(
                  (resourceId) => resourceId !== removedResourceType
                )
              : lesson.resources,
        };
      })
    );

    setFeedback(null);
  };

  // FIX: Append a genuinely new lesson form.
  // Because every lesson is rendered below, the new input fields appear
  // immediately without hiding or replacing the existing lesson forms.
  const addLesson = () => {
    setLessons((current) => [
      ...current,
      emptyLesson(current.length + 1),
    ]);

    setErrors({});
    setFeedback(null);
  };

  const removeLesson = (lessonIndex) => {
    setLessons((current) =>
      current
        .filter((_, index) => index !== lessonIndex)
        .map((lesson, index) => ({
          ...lesson,
          order: index + 1,
        }))
    );

    setErrors({});
    setFeedback(null);
  };

  const openDialog = (type, lessonIndex, resourceId = null) => {
    setDialog({ type, lessonIndex, resourceId });
    setDialogValue("");
    setDialogError("");
  };

  const closeDialog = () => {
    setDialog(null);
    setDialogValue("");
    setDialogError("");
  };

  const handleDialogSubmit = (event) => {
    event?.preventDefault();

    if (!dialog) return;

    const { type, lessonIndex, resourceId } = dialog;
    const value = dialogValue.trim();

    if (!value) {
      setDialogError(
        type === "notes"
          ? "Please enter your lesson notes."
          : "Please enter a URL."
      );
      return;
    }

    if (type === "link" && !isValidUrl(value)) {
      setDialogError(
        "Enter a valid URL starting with https:// or http://."
      );
      return;
    }

    const isNotes = type === "notes";
    const actualResourceId = isNotes ? "lesson-notes" : resourceId;

    const attachment = isNotes
      ? {
          id: createId(),
          resourceType: actualResourceId,
          name: `Lesson-notes-${Date.now()}.txt`,
          size: new Blob([value]).size,
          type: "text/plain",
          file: new File(
            [value],
            `Lesson-notes-${Date.now()}.txt`,
            { type: "text/plain" }
          ),
          url: "",
          status: "pending",
        }
      : {
          id: createId(),
          resourceType: actualResourceId,
          name: value,
          size: 0,
          type: "text/uri-list",
          file: null,
          url: value,
          status: "linked",
        };

    setLessons((current) =>
      current.map((lesson, index) =>
        index === lessonIndex
          ? {
              ...lesson,
              resources: lesson.resources.includes(actualResourceId)
                ? lesson.resources
                : [...lesson.resources, actualResourceId],
              attachments: [...lesson.attachments, attachment],
            }
          : lesson
      )
    );

    closeDialog();
    setFeedback(null);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!topicTitle.trim()) {
      nextErrors.topicTitle = "Please enter a topic title.";
    }

    if (
      !topicOrder ||
      !Number.isInteger(Number(topicOrder)) ||
      Number(topicOrder) < 1
    ) {
      nextErrors.topicOrder =
        "Enter a whole number greater than zero.";
    }

    lessons.forEach((lesson, index) => {
      if (!lesson.title.trim()) {
        nextErrors[`lesson-${index}-title`] =
          `Please enter a title for Lesson ${index + 1}.`;
      }

      if (
        !lesson.order ||
        !Number.isInteger(Number(lesson.order)) ||
        Number(lesson.order) < 1
      ) {
        nextErrors[`lesson-${index}-order`] =
          "Enter a valid lesson order.";
      }

      if (!lesson.description.trim()) {
        nextErrors[`lesson-${index}-description`] =
          `Please enter a description for Lesson ${index + 1}.`;
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = (status, currentLessons = lessons) => ({
    id: topicId,
    topicTitle: topicTitle.trim(),
    topicOrder: Number(topicOrder),
    topicDescription: topicDescription.trim(),
    status,
    lessons: currentLessons.map(serializeLesson),
  });

  const uploadAttachment = async (attachment, lessonId) => {
    if (!attachment.file || attachment.url) {
      return attachment;
    }

    if (!uploadEndpoint) {
      return attachment;
    }

    const formData = new FormData();

    formData.append("file", attachment.file);
    formData.append("topicId", topicId);
    formData.append("lessonId", String(lessonId));
    formData.append("resourceType", attachment.resourceType);

    const response = await fetch(uploadEndpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed for ${attachment.name}.`);
    }

    const result = await response.json();

    const uploadedUrl =
      result.url ||
      result.fileUrl ||
      result.data?.url ||
      result.data?.fileUrl;

    if (!uploadedUrl) {
      throw new Error(
        `The server did not return a file URL for ${attachment.name}.`
      );
    }

    return {
      ...attachment,
      url: uploadedUrl,
      status: "uploaded",
    };
  };

  const handleSave = async (asDraft = false) => {
    setFeedback(null);

    if (!topicTitle.trim()) {
      setErrors((current) => ({
        ...current,
        topicTitle: "Enter a topic title before saving.",
      }));

      setFeedback({
        type: "error",
        message: "A topic title is required.",
      });

      return;
    }

    if (!asDraft && !validateForm()) {
      setFeedback({
        type: "error",
        message: "Please correct the highlighted fields.",
      });

      return;
    }

    setIsSaving(true);

    try {
      const status = asDraft ? "Draft" : "Published";
      let currentLessons = lessons;

      const hasPendingFiles = lessons.some((lesson) =>
        lesson.attachments.some(
          (attachment) => attachment.file && !attachment.url
        )
      );

      if (hasPendingFiles && uploadEndpoint) {
        currentLessons = await Promise.all(
          lessons.map(async (lesson) => {
            const attachments = await Promise.all(
              lesson.attachments.map((attachment) =>
                uploadAttachment(attachment, lesson.id)
              )
            );

            return { ...lesson, attachments };
          })
        );

        setLessons(currentLessons);
      }

      const payload = buildPayload(status, currentLessons);

      if (onSave) {
        await onSave({
          ...payload,
          lessons: currentLessons.map((lesson) => ({
            ...serializeLesson(lesson),
            attachments: lesson.attachments,
          })),
        });
      } else if (saveEndpoint) {
        const response = await fetch(saveEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(
            "Unable to save the topic. Please try again."
          );
        }
      } else {
        // Browser-only fallback: stores metadata, not file bytes.
        const stored = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "[]"
        );

        const topics = Array.isArray(stored) ? stored : [];
        const index = topics.findIndex(
          (topic) => topic.id === topicId
        );

        if (index >= 0) {
          topics[index] = payload;
        } else {
          topics.push(payload);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));

        window.dispatchEvent(
          new CustomEvent("topicLessonSaved", {
            detail: payload,
          })
        );
      }

      const filesStillPending = currentLessons.some((lesson) =>
        lesson.attachments.some(
          (attachment) => attachment.file && !attachment.url
        )
      );

      setFeedback({
        type: filesStillPending ? "warning" : "success",
        message: filesStillPending
          ? asDraft
            ? "Draft metadata saved, but files have not been uploaded. Configure uploadEndpoint to upload files to your server."
            : "Topic metadata saved, but files have not been uploaded. Configure uploadEndpoint to upload files to your server."
          : asDraft
            ? "Draft saved successfully."
            : "Topic and lessons saved successfully.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.message ||
          "Unable to save your changes. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen w-full min-w-0 bg-[#F4F7FD] px-3 pb-6 pt-3 font-sans text-[#20252D] sm:px-5 sm:pt-5 lg:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <header className="mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#505B6C] transition hover:text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3974F6]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Curriculum &amp; Lessons
          </button>

          <h1 className="text-lg font-semibold leading-7 tracking-tight text-[#171C25] sm:text-xl">
            Add Topic &amp; Lesson
          </h1>

          <p className="mt-1 text-xs leading-5 text-[#7B8798] sm:text-sm">
            Create a topic, add lessons, and attach teaching resources.
          </p>
        </header>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSave(false);
          }}
          noValidate
        >
          <div className="space-y-5 rounded-lg border border-[#EDF0F5] bg-white p-4 shadow-sm sm:p-6">
            <section>
              <h2 className="mb-4 text-sm font-semibold text-[#252B35]">
                Topic Information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(140px,0.45fr)] sm:gap-5">
                <div className="min-w-0">
                  <label htmlFor="topicTitle" className={fieldLabel}>
                    Topic Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="topicTitle"
                    value={topicTitle}
                    onChange={(event) => {
                      setTopicTitle(event.target.value);
                      setErrors((current) => ({
                        ...current,
                        topicTitle: "",
                      }));
                      setFeedback(null);
                    }}
                    placeholder="e.g. Addition"
                    maxLength={100}
                    aria-invalid={Boolean(errors.topicTitle)}
                    className={inputClass(errors.topicTitle)}
                  />

                  {errors.topicTitle && (
                    <p className={errorText}>
                      <AlertCircle size={13} />
                      {errors.topicTitle}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label htmlFor="topicOrder" className={fieldLabel}>
                    Topic Order <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="topicOrder"
                    type="number"
                    min="1"
                    step="1"
                    value={topicOrder}
                    onChange={(event) => {
                      setTopicOrder(event.target.value);
                      setErrors((current) => ({
                        ...current,
                        topicOrder: "",
                      }));
                      setFeedback(null);
                    }}
                    aria-invalid={Boolean(errors.topicOrder)}
                    className={inputClass(errors.topicOrder)}
                  />

                  {errors.topicOrder && (
                    <p className={errorText}>
                      <AlertCircle size={13} />
                      {errors.topicOrder}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="topicDescription" className={fieldLabel}>
                  Description
                </label>

                <textarea
                  id="topicDescription"
                  rows={3}
                  maxLength={250}
                  value={topicDescription}
                  onChange={(event) => {
                    setTopicDescription(event.target.value);
                    setErrors((current) => ({
                      ...current,
                      topicDescription: "",
                    }));
                    setFeedback(null);
                  }}
                  placeholder="Briefly describe what this topic covers..."
                  className={textareaClass(false)}
                />

                <div className="mt-1 text-right text-[11px] text-[#9AA1AC]">
                  {topicDescription.length}/250
                </div>
              </div>
            </section>

            <section className="border-t border-[#F0F2F6] pt-5">
              <div className="mb-4">
                <h2 className="text-sm font-semibold text-[#252B35]">
                  Lesson Details
                </h2>
                <p className="mt-1 text-xs text-[#818B9A]">
                  Add as many lessons as you need. Each lesson has its own
                  fields and teaching resources.
                </p>
              </div>

              {/* Every lesson renders its own complete set of inputs. */}
              <div className="space-y-6">
                {lessons.map((lesson, lessonIndex) => (
                  <section
                    key={lesson.id}
                    className="min-w-0 rounded-lg border border-[#E5E9F0] bg-[#FCFDFF] p-3 sm:p-5"
                  >
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FF] text-sm font-semibold text-[#285ED8]">
                          {lessonIndex + 1}
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-[#252B35]">
                            Lesson {lessonIndex + 1}
                          </h3>
                          <p className="mt-0.5 text-xs text-[#818B9A]">
                            Lesson information and resources
                          </p>
                        </div>
                      </div>

                      {lessons.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLesson(lessonIndex)}
                          aria-label={`Remove lesson ${lessonIndex + 1}`}
                          className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                        >
                          <X size={14} />
                          Remove Lesson
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(140px,0.45fr)] sm:gap-5">
                      <div className="min-w-0">
                        <label
                          htmlFor={`lessonTitle-${lesson.id}`}
                          className={fieldLabel}
                        >
                          Lesson Title{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <input
                          id={`lessonTitle-${lesson.id}`}
                          value={lesson.title}
                          onChange={(event) =>
                            updateLesson(
                              lessonIndex,
                              "title",
                              event.target.value
                            )
                          }
                          placeholder="e.g. Introduction to Addition"
                          maxLength={100}
                          aria-invalid={Boolean(
                            errors[`lesson-${lessonIndex}-title`]
                          )}
                          className={inputClass(
                            errors[`lesson-${lessonIndex}-title`]
                          )}
                        />

                        {errors[`lesson-${lessonIndex}-title`] && (
                          <p className={errorText}>
                            <AlertCircle size={13} />
                            {errors[`lesson-${lessonIndex}-title`]}
                          </p>
                        )}
                      </div>

                      <div className="min-w-0">
                        <label
                          htmlFor={`lessonOrder-${lesson.id}`}
                          className={fieldLabel}
                        >
                          Lesson Order{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <input
                          id={`lessonOrder-${lesson.id}`}
                          type="number"
                          min="1"
                          step="1"
                          value={lesson.order}
                          onChange={(event) =>
                            updateLesson(
                              lessonIndex,
                              "order",
                              event.target.value
                            )
                          }
                          aria-invalid={Boolean(
                            errors[`lesson-${lessonIndex}-order`]
                          )}
                          className={inputClass(
                            errors[`lesson-${lessonIndex}-order`]
                          )}
                        />

                        {errors[`lesson-${lessonIndex}-order`] && (
                          <p className={errorText}>
                            <AlertCircle size={13} />
                            {errors[`lesson-${lessonIndex}-order`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor={`lessonDescription-${lesson.id}`}
                        className={fieldLabel}
                      >
                        Description{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <textarea
                        id={`lessonDescription-${lesson.id}`}
                        rows={3}
                        maxLength={500}
                        value={lesson.description}
                        onChange={(event) =>
                          updateLesson(
                            lessonIndex,
                            "description",
                            event.target.value.slice(0, 500)
                          )
                        }
                        placeholder="Write the lesson description here..."
                        aria-invalid={Boolean(
                          errors[`lesson-${lessonIndex}-description`]
                        )}
                        className={textareaClass(
                          errors[`lesson-${lessonIndex}-description`]
                        )}
                      />

                      <div className="mt-1 flex justify-between gap-3">
                        {errors[
                          `lesson-${lessonIndex}-description`
                        ] ? (
                          <p className={errorText}>
                            <AlertCircle size={13} />
                            {
                              errors[
                                `lesson-${lessonIndex}-description`
                              ]
                            }
                          </p>
                        ) : (
                          <span />
                        )}

                        <span className="shrink-0 text-[11px] text-[#9AA1AC]">
                          {lesson.description.length}/500
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-[#EDF0F5] pt-5">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-[#252B35]">
                          Teaching Resources
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-[#818B9A]">
                          Upload files, write notes, or attach learning
                          links specifically to Lesson {lessonIndex + 1}.
                          Maximum file size: 50 MB.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {RESOURCE_TYPES.map((resource) => {
                          const Icon = resource.Icon;

                          const attachments = lesson.attachments.filter(
                            (attachment) =>
                              attachment.resourceType === resource.id
                          );

                          const selected = lesson.resources.includes(
                            resource.id
                          );

                          return (
                            <article
                              key={resource.id}
                              className={`flex min-w-0 flex-col rounded-lg border p-3 transition ${
                                selected
                                  ? "border-[#B9CCFF] bg-[#F8FAFF]"
                                  : "border-[#E8ECF2] bg-white hover:border-[#C9D4E6]"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
                                  style={{
                                    backgroundColor: resource.background,
                                    color: resource.color,
                                  }}
                                >
                                  <Icon size={21} strokeWidth={1.8} />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <h5 className="text-xs font-semibold text-[#303846]">
                                    {resource.title}
                                  </h5>
                                  <p className="mt-1 text-[11px] leading-4 text-[#929BA9]">
                                    {resource.description}
                                  </p>
                                </div>

                                {selected && (
                                  <Check
                                    size={16}
                                    className="shrink-0 text-[#2563EB]"
                                    aria-label="Selected"
                                  />
                                )}
                              </div>

                              <input
                                ref={(element) => {
                                  fileInputRefs.current[
                                    `${lessonIndex}-${resource.id}`
                                  ] = element;
                                }}
                                type="file"
                                accept={resource.accept}
                                multiple
                                className="hidden"
                                aria-label={`Choose ${resource.title} files for Lesson ${
                                  lessonIndex + 1
                                }`}
                                onChange={(event) =>
                                  handleFilesSelected(
                                    lessonIndex,
                                    resource,
                                    event
                                  )
                                }
                              />

                              <div className="mt-3 grid grid-cols-2 gap-2">
                                {resource.actions.map((action) => {
                                  const ActionIcon = action.icon;

                                  return (
                                    <button
                                      key={action.id}
                                      type="button"
                                      onClick={() => {
                                        if (action.id === "upload") {
                                          openFilePicker(
                                            lessonIndex,
                                            resource
                                          );
                                        } else if (action.id === "write") {
                                          openDialog(
                                            "notes",
                                            lessonIndex,
                                            resource.id
                                          );
                                        } else if (action.id === "link") {
                                          openDialog(
                                            "link",
                                            lessonIndex,
                                            resource.id
                                          );
                                        }
                                      }}
                                      className="inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-md border border-[#E4E8F0] bg-white px-2 py-2 text-[10px] font-medium text-[#566174] transition hover:border-[#B9CAEF] hover:bg-[#F4F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3974F6] sm:text-[11px]"
                                    >
                                      <ActionIcon
                                        size={13}
                                        className="shrink-0"
                                      />
                                      <span className="truncate">
                                        {action.label}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>

                              {attachments.length > 0 && (
                                <div className="mt-3 space-y-2 border-t border-[#E8ECF2] pt-3">
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#778295]">
                                    Attached resources ({attachments.length})
                                  </p>

                                  {attachments.map((attachment) => (
                                    <div
                                      key={attachment.id}
                                      className="flex min-w-0 items-center gap-2 rounded-md border border-[#E8ECF2] bg-white p-2"
                                    >
                                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F1F5F9] text-[#64748B]">
                                        <File size={15} />
                                      </div>

                                      <div className="min-w-0 flex-1">
                                        {attachment.url ? (
                                          <a
                                            href={attachment.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block truncate text-[11px] font-medium text-[#285ED8] hover:underline"
                                            title={attachment.name}
                                          >
                                            {attachment.name}
                                          </a>
                                        ) : (
                                          <p
                                            className="truncate text-[11px] font-medium text-[#303846]"
                                            title={attachment.name}
                                          >
                                            {attachment.name}
                                          </p>
                                        )}

                                        <p className="mt-0.5 text-[10px] text-[#929BA9]">
                                          {attachment.size
                                            ? formatFileSize(attachment.size)
                                            : "External link"}
                                          {attachment.status === "uploaded" &&
                                            " · Uploaded"}
                                          {attachment.status === "pending" &&
                                            " · Awaiting upload"}
                                          {attachment.status === "linked" &&
                                            " · Link attached"}
                                        </p>
                                      </div>

                                      {attachment.url && (
                                        <a
                                          href={attachment.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          aria-label={`Open ${attachment.name}`}
                                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#64748B] hover:bg-[#F1F5F9]"
                                        >
                                          <ExternalLink size={13} />
                                        </a>
                                      )}

                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeAttachment(
                                            lessonIndex,
                                            attachment.id
                                          )
                                        }
                                        aria-label={`Remove ${attachment.name}`}
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#929BA9] transition hover:bg-red-50 hover:text-red-500"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              {/* Each click adds another complete lesson form above this button. */}
              <div className="mt-5 border-t border-[#F0F2F6] pt-4">
                <button
                  type="button"
                  onClick={addLesson}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-[#BDE7C9] bg-[#F0FBF3] px-4 py-2.5 text-xs font-semibold text-[#159447] transition hover:border-[#159A42] hover:bg-[#E2F7E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
                >
                  <Plus size={16} />
                  Add Another Lesson
                </button>

                <p className="mt-2 text-center text-[11px] text-[#818B9A]">
                  {lessons.length}{" "}
                  {lessons.length === 1 ? "lesson" : "lessons"} added
                </p>
              </div>
            </section>
          </div>

          {feedback && (
            <div
              role={feedback.type === "error" ? "alert" : "status"}
              className={`mt-4 flex items-start gap-2 rounded-md border px-4 py-3 text-xs leading-5 ${
                feedback.type === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : feedback.type === "warning"
                    ? "border-amber-200 bg-amber-50 text-amber-800"
                    : "border-[#CDEAD5] bg-[#F0FBF3] text-[#176D37]"
              }`}
            >
              {feedback.type === "error" || feedback.type === "warning" ? (
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
              ) : (
                <Check size={16} className="mt-0.5 shrink-0" />
              )}

              <span>{feedback.message}</span>
            </div>
          )}

          <footer className="mt-4 flex flex-col-reverse gap-3 pb-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#DCE2EA] bg-white px-5 py-3 text-xs font-medium text-[#596476] transition hover:bg-[#F7F9FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3974F6] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[165px]"
            >
              {isSaving ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}
              Save As Draft
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#3269F6] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#2458DF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3269F6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[190px]"
            >
              {isSaving ? (
                <>
                  <LoaderCircle size={15} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={15} />
                  Save Topic &amp; Lessons
                </>
              )}
            </button>
          </footer>
        </form>

        {/* Resource dialog is outside the main form to prevent nested forms. */}
        {dialog && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#101828]/50 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeDialog();
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="resource-dialog-title"
              className="w-full max-w-[480px] rounded-xl border border-[#E5E9EF] bg-white shadow-2xl"
            >
              <header className="flex items-center justify-between gap-3 border-b border-[#E9EDF2] px-5 py-4">
                <div>
                  <h3
                    id="resource-dialog-title"
                    className="text-sm font-semibold text-[#20252D]"
                  >
                    {dialog.type === "notes"
                      ? "Write Lesson Notes"
                      : "Add Resource Link"}
                  </h3>

                  <p className="mt-1 text-xs text-[#7B8491]">
                    {dialog.type === "notes"
                      ? "Write notes and attach them to this lesson."
                      : "Paste a valid URL for this learning resource."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeDialog}
                  aria-label="Close dialog"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#737D88] hover:bg-[#F3F5F9]"
                >
                  <X size={18} />
                </button>
              </header>

              <form onSubmit={handleDialogSubmit} className="p-5">
                <label
                  htmlFor="resourceDialogValue"
                  className={fieldLabel}
                >
                  {dialog.type === "notes"
                    ? "Lesson notes"
                    : "Resource URL"}
                </label>

                {dialog.type === "notes" ? (
                  <textarea
                    id="resourceDialogValue"
                    rows={7}
                    autoFocus
                    value={dialogValue}
                    onChange={(event) => {
                      setDialogValue(event.target.value);
                      setDialogError("");
                    }}
                    placeholder="Write your lesson notes here..."
                    className={textareaClass(Boolean(dialogError))}
                  />
                ) : (
                  <input
                    id="resourceDialogValue"
                    type="url"
                    autoFocus
                    value={dialogValue}
                    onChange={(event) => {
                      setDialogValue(event.target.value);
                      setDialogError("");
                    }}
                    placeholder="https://example.com/resource"
                    className={inputClass(Boolean(dialogError))}
                  />
                )}

                {dialogError && (
                  <p className={errorText}>
                    <AlertCircle size={13} />
                    {dialogError}
                  </p>
                )}

                <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="min-h-10 rounded-md border border-[#DCE2EA] px-4 text-xs font-medium text-[#596476] hover:bg-[#F7F9FC]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#3269F6] px-5 text-xs font-semibold text-white hover:bg-[#2458DF]"
                  >
                    <Check size={14} />
                    Attach Resource
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
