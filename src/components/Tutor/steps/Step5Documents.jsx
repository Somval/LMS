
import React, { useRef, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export default function VerificationDocumentsForm() {
  const [files, setFiles] = useState({
    qualification: null,
    governmentId: null,
    supportingDoc: null,
  });

  const [errors, setErrors] = useState({});
  const [dragging, setDragging] = useState(null);

  const inputRefs = {
    qualification: useRef(null),
    governmentId: useRef(null),
    supportingDoc: useRef(null),
  };

  const documents = [
    {
      key: "qualification",
      label: "Qualification Certificate",
      description:
        "Upload a copy of your degree certificate or highest academic qualification.",
      required: true,
    },
    {
      key: "governmentId",
      label: "Government ID",
      description:
        "Upload a valid National ID, international passport, or driver's licence.",
      required: true,
    },
    {
      key: "supportingDoc",
      label: "Other Supporting Document",
      description: "Upload your latest Resume or CV.",
      required: false,
    },
  ];

  const formatFileSize = (size) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(0)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileChange = (key, file) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [key]: "Invalid file format. Please upload a PDF, JPG, or PNG.",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        [key]: "File exceeds 5 MB. Please choose a smaller file.",
      }));
      return;
    }

    if (file.size === 0) {
      setErrors((prev) => ({
        ...prev,
        [key]: "This file is empty. Please select another file.",
      }));
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [key]: file,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const handleRemoveFile = (key) => {
    setFiles((prev) => ({
      ...prev,
      [key]: null,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));

    if (inputRefs[key].current) {
      inputRefs[key].current.value = "";
    }
  };

  const handleDrop = (event, key) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(null);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFileChange(key, file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    documents.forEach(({ key, required }) => {
      if (required && !files[key]) {
        nextErrors[key] = "Please upload this required document.";
      }
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Connect your API submission logic here.
    const formData = new FormData();

    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    console.log("Documents ready for submission:", formData);
  };

  const renderUploadBox = ({
    key,
    label,
    description,
    required,
  }) => {
    const file = files[key];
    const error = errors[key];
    const isDragging = dragging === key;

    return (
      <div key={key} className="w-full min-w-0">
        <div className="mb-2.5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <label
              htmlFor={`document-${key}`}
              className="text-sm font-semibold text-gray-900"
            >
              {label}
              {required ? (
                <span className="ml-1 text-red-500" aria-label="required">
                  *
                </span>
              ) : (
                <span className="ml-2 text-xs font-normal text-gray-400">
                  (Optional)
                </span>
              )}
            </label>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              {description}
            </p>
          </div>

          {file && (
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
              aria-label="File uploaded"
            />
          )}
        </div>

        {!file ? (
          <label
            htmlFor={`document-${key}`}
            onDragEnter={(event) => {
              event.preventDefault();
              setDragging(key);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              event.preventDefault();

              if (!event.currentTarget.contains(event.relatedTarget)) {
                setDragging(null);
              }
            }}
            onDrop={(event) => handleDrop(event, key)}
            className={`flex min-h-[112px] w-full cursor-pointer items-center gap-4 rounded-xl border border-dashed p-4 transition-colors sm:px-5 ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : error
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/30"
            }`}
          >
            <input
              ref={inputRefs[key]}
              id={`document-${key}`}
              name={key}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              className="sr-only"
              onChange={(event) => {
                handleFileChange(key, event.target.files?.[0]);
                event.target.value = "";
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={`${key}-hint ${key}-error`}
            />

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
              <UploadCloud className="h-5 w-5 text-blue-600" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm leading-5 text-gray-700">
                <span className="font-semibold text-blue-600">
                  Click to upload
                </span>{" "}
                <span className="text-gray-500">or drag and drop</span>
              </p>

              <p
                id={`${key}-hint`}
                className="mt-1.5 text-xs leading-5 text-gray-400"
              >
                PDF, JPG or PNG <span className="mx-1">·</span> Max 5 MB
              </p>
            </div>
          </label>
        ) : (
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 sm:p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-800">
                {file.name}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {formatFileSize(file.size)}{" "}
                <span className="mx-1">·</span> Ready to upload
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleRemoveFile(key)}
              aria-label={`Remove ${label}`}
              title="Remove file"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {error && (
          <p
            id={`${key}-error`}
            role="alert"
            className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-red-600"
          >
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white px-4 py-6 font-sans text-gray-800 sm:px-6 sm:py-8 lg:px-8">
      <div className="w-full max-w-5xl space-y-7">
        {/* Page heading: aligned to the left */}
        <div className="border-b border-gray-100 pb-5 text-left">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Verification Documents
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Upload the required documents to complete your application.
            Ensure that all documents are clear and legible.
          </p>
        </div>

        {/* Document upload form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6" noValidate>
          <div className="w-full space-y-6">
            {documents.map((document) => renderUploadBox(document))}
          </div>

          <div className="border-t border-gray-100 pt-5">
            <p className="text-xs leading-5 text-gray-500">
              Accepted formats: PDF, JPG and PNG. Each file must not exceed
              5 MB. Fields marked with an asterisk (*) are required.
            </p>

            <div className="mt-5 flex w-full justify-start">
            
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
