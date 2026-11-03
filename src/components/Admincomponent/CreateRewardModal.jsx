
import React, { useRef, useState } from "react";
import {
  X,
  Award,
  Upload,
  ImagePlus,
  Trash2,
} from "lucide-react";

export default function CreateRewardModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const fileInputRef = useRef(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [imageError, setImageError] = useState("");

  if (!isOpen) return null;

  // Handle badge image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must not exceed 5 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };

    reader.onerror = () => {
      setImageError("Unable to load this image. Please try another file.");
    };

    reader.readAsDataURL(file);
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage("");
    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Reset form and close modal
  const handleClose = () => {
    setNewTitle("");
    setNewDate("");
    setSelectedImage("");
    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose();
  };

  // Create reward
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle || !selectedImage) return;

    const formattedDate = newDate
      ? `Earned ${new Date(`${newDate}T00:00:00`).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )}`
      : "Earned Aug 8, 2026";

    const newReward = {
      title: trimmedTitle,
      date: formattedDate,
      icon: selectedImage,
    };

    onCreate(newReward);

    setNewTitle("");
    setNewDate("");
    setSelectedImage("");
    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reward-modal-title"
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:rounded-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Award className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h3
                id="reward-modal-title"
                className="text-base font-bold leading-tight text-slate-900 sm:text-lg"
              >
                Create Reward & Badge
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Create a new reward and upload its badge image.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[calc(100dvh-190px)] space-y-5 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
            {/* Badge Image Upload */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Badge Image
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-[#F8FAFC] p-4 sm:p-5">
                {/* Image Preview */}
                <div className="mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white sm:h-32 sm:w-32">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected badge preview"
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-300">
                      <ImagePlus className="h-9 w-9" strokeWidth={1.4} />
                      <span className="mt-2 text-[10px] font-medium text-slate-400">
                        No image selected
                      </span>
                    </div>
                  )}
                </div>

                <p className="mb-1 text-sm font-semibold text-slate-800">
                  {selectedImage
                    ? "Badge image selected"
                    : "Upload your badge image"}
                </p>

                <p className="mb-4 max-w-xs text-center text-xs leading-relaxed text-slate-500">
                  Choose an image from your device to use as the badge.
                  Maximum file size: 5 MB.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#3b82f6] bg-white px-4 py-2 text-xs font-semibold text-[#3b82f6] transition-colors hover:bg-blue-50 sm:text-sm"
                  >
                    {selectedImage ? (
                      <Upload className="h-4 w-4" />
                    ) : (
                      <ImagePlus className="h-4 w-4" />
                    )}

                    {selectedImage ? "Change Image" : "Upload Image"}
                  </button>

                  {selectedImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 sm:text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {imageError && (
                  <p className="mt-3 text-center text-xs font-medium text-red-500">
                    {imageError}
                  </p>
                )}
              </div>
            </div>

            {/* Badge Title */}
            <div>
              <label
                htmlFor="reward-title"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Badge Title
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="reward-title"
                type="text"
                required
                autoFocus
                maxLength={80}
                placeholder="e.g. Mathematics Star"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Earned Date */}
            <div>
              <label
                htmlFor="reward-date"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Earned Date
              </label>

              <input
                id="reward-date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              className="min-h-10 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!newTitle.trim() || !selectedImage}
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save Reward
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
