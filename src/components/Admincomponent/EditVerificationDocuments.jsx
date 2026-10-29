import React, { useState } from "react";
import { Upload, FileText, X, Save } from "lucide-react";

const initialDocuments = [
  {
    id: 1,
    title: "Qualification Certificate",
    fileName: "Degree Certificate.pdf",
    size: "2.4 MB",
    accept: ".pdf,.jpg,.jpeg,.png",
  },
  {
    id: 2,
    title: "Government ID",
    fileName: "National ID.pdf",
    size: "1.2 MB",
    accept: ".pdf,.jpg,.jpeg,.png",
  },
  {
    id: 3,
    title: "Other Supporting Document",
    fileName: "CV.pdf",
    size: "2.4 MB",
    accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  },
];

export default function EditVerificationDocuments({ isOpen, onClose, onSave }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (id, file) => {
    if (!file) return;

    setDocuments((current) =>
      current.map((document) =>
        document.id === id
          ? {
              ...document,
              file,
              fileName: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            }
          : document
      )
    );

    setSaved(false);
  };

  const handleRemoveFile = (id) => {
    setDocuments((current) =>
      current.map((document) =>
        document.id === id
          ? {
              ...document,
              file: null,
              fileName: "",
              size: "",
            }
          : document
      )
    );

    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Verification documents saved:", documents);
    setSaved(true);
    
    if (onSave) {
      onSave(documents);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity">
      <div className="relative flex max-h-[90vh] w-full max-w-[800px] flex-col rounded-xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-[#171717]">
              Edit Verification Documents
            </h2>
            <p className="text-xs text-[#777D8A]">
              Update your verification files and supporting documents.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="min-w-0 rounded-lg border border-[#E5E7EB] p-4 bg-[#FAFBFD]/50"
                >
                  <label
                    htmlFor={`document-${document.id}`}
                    className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#525866]"
                  >
                    {document.title}
                  </label>

                  {/* Current or selected file */}
                  {document.fileName ? (
                    <div className="mb-3 flex min-w-0 items-center gap-3 rounded-lg border border-[#E8EAF0] bg-white p-3 shadow-sm">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-[#292D36]">
                          {document.fileName}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#9298A4]">
                          {document.size}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveFile(document.id)}
                        aria-label={`Remove ${document.fileName}`}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#9298A4] transition hover:bg-red-50 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="mb-3 rounded-lg border border-dashed border-[#D5D9E2] bg-white px-4 py-5 text-center">
                      <Upload
                        size={20}
                        className="mx-auto mb-1.5 text-[#8A91A0]"
                      />
                      <p className="text-xs font-medium text-[#525866]">
                        No document selected
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#9298A4]">
                        Choose a file to upload
                      </p>
                    </div>
                  )}

                  {/* File input */}
                  <input
                    id={`document-${document.id}`}
                    type="file"
                    accept={document.accept}
                    onChange={(event) =>
                      handleFileChange(
                        document.id,
                        event.target.files?.[0]
                      )
                    }
                    className="block w-full cursor-pointer text-xs text-[#667085] file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#F0F3FF] file:px-3 file:py-1.5 file:text-[11px] file:font-medium file:text-[#3458C5] hover:file:bg-[#E7ECFF]"
                  />

                  <p className="mt-2 text-[10px] leading-4 text-[#9298A4]">
                    Formats: {document.accept.replaceAll(".", "").replaceAll(",", ", ")}
                  </p>
                </div>
              ))}
            </div>

            {saved && (
              <p
                role="status"
                className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-700"
              >
                Changes saved successfully!
              </p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#D9DDE5] bg-white px-4 py-2 text-xs font-medium text-[#525866] transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#315EFB] px-4 text-xs font-medium text-white transition hover:bg-[#254DE0] focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <Save size={14} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}