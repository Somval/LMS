
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  UploadCloud,
  FileText,
  X,
  AlertCircle,
} from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export default function Step3Qualifications({ formData, onChange, onExtra }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  useEffect(() => { onExtra?.('certificate', uploadedFile); }, [uploadedFile, onExtra]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");

  const fileInputRef = useRef(null);

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: 40 },
    (_, index) => currentYear - index
  );

  const fieldClass =
    "block w-full min-w-0 appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-800";

  const handleFileChange = (file) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError("Please select a PDF, JPG, or PNG file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("The file must not exceed 5 MB.");
      return;
    }

    if (file.size === 0) {
      setFileError("This file is empty. Please select another file.");
      return;
    }

    setUploadedFile(file);
    setFileError("");
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    handleFileChange(file);

    // Allow the same file to be selected again.
    event.target.value = "";
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    handleFileChange(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (size) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(0)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const renderSelect = ({
    name,
    value,
    placeholder,
    options,
  }) => (
    <div className="relative w-full">
      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className={`${fieldClass} cursor-pointer pr-10 ${
          value ? "text-slate-800" : "text-slate-400"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => {
          const item =
            typeof option === "string"
              ? { value: option, label: option }
              : option;

          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>

      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      />
    </div>
  );

  return (
    <div className="w-full min-w-0 bg-white font-sans text-left text-slate-800">
      {/* Header */}
      <header className="mb-7 w-full border-b border-slate-100 pb-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Your Qualifications
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Provide details about your academic background and
          relevant certifications.
        </p>
      </header>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="w-full min-w-0 space-y-6"
      >
        {/* Highest Qualification */}
        <div className="w-full min-w-0">
          <label htmlFor="highestQualification" className={labelClass}>
            Highest Qualification
          </label>

          {renderSelect({
            name: "highestQualification",
            value: formData?.highestQualification || "",
            placeholder: "Select your highest qualification",
            options: [
              "High School Diploma",
              "Associate Degree",
              "Bachelor's Degree",
              "Master's Degree",
              "Doctorate / Ph.D.",
              "Postgraduate Diploma",
            ],
          })}
        </div>

        {/* Field of Study */}
        <div className="w-full min-w-0">
          <label htmlFor="fieldOfStudy" className={labelClass}>
            Field of Study
          </label>

          {renderSelect({
            name: "fieldOfStudy",
            value: formData?.fieldOfStudy || "",
            placeholder: "Select your field of study",
            options: [
              "Computer Science & Engineering",
              "Education & Teaching",
              "Mathematics & Statistics",
              "Business Administration",
              "Physical & Biological Sciences",
              "Arts & Humanities",
              "Social Sciences",
              "Health Sciences",
              "Law",
              "Other",
            ],
          })}
        </div>

        {/* Institution Name */}
        <div className="w-full min-w-0">
          <label htmlFor="institutionName" className={labelClass}>
            Institution Name
          </label>

          {renderSelect({
            name: "institutionName",
            value: formData?.institutionName || "",
            placeholder: "Select your institution",
            options: [
              "University of Lagos",
              "Ahmadu Bello University",
              "University of Ibadan",
              "Covenant University",
              "Obafemi Awolowo University",
              "University of Nigeria, Nsukka",
              "Lagos State University",
              "Other / International University",
            ],
          })}
        </div>

        {/* Graduation Year */}
        <div className="w-full min-w-0">
          <label htmlFor="graduationYear" className={labelClass}>
            Graduation Year
          </label>

          {renderSelect({
            name: "graduationYear",
            value: formData?.graduationYear || "",
            placeholder: "Select year of graduation",
            options: years.map((year) => ({
              value: String(year),
              label: String(year),
            })),
          })}
        </div>

        {/* Supporting Certificates */}
        <div className="w-full min-w-0 pt-1">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-slate-800">
              Additional Certificates
              <span className="ml-2 text-xs font-normal text-slate-400">
                (Optional)
              </span>
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Upload any additional certificates relevant to your application.
            </p>
          </div>

          {!uploadedFile ? (
            <label
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsDragging(false);
                }
              }}
              onDrop={handleFileDrop}
              className={`flex min-h-28 w-full cursor-pointer items-center gap-4 rounded-xl border border-dashed p-4 transition-colors sm:p-5 ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50"
                  : fileError
                    ? "border-red-300 bg-red-50/30"
                    : "border-slate-300 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                name="additionalCertificate"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={handleFileSelect}
                className="sr-only"
                aria-label="Upload additional certificate"
                aria-invalid={Boolean(fileError)}
              />

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-white text-indigo-600">
                <UploadCloud className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm leading-6 text-slate-600">
                  <span className="font-semibold text-indigo-600">
                    Click to upload
                  </span>{" "}
                  <span>or drag and drop</span>
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  PDF, JPG or PNG · Maximum file size: 5 MB
                </p>
              </div>
            </label>
          ) : (
            <div className="flex w-full min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {uploadedFile.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRemoveFile}
                aria-label="Remove uploaded certificate"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {fileError && (
            <p
              role="alert"
              className="mt-2 flex items-start gap-2 text-xs leading-5 text-red-600"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{fileError}</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
