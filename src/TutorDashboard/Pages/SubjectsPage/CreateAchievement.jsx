import React, { useState } from "react";
import { api } from "../../../lib/api";
import { joinDescription } from "./rewardFormat";
import {
  ArrowLeft,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

export default function CreateAchievement() {
  // =====================================================
  // FORM STATE
  // No hardcoded/preloaded form values
  // =====================================================
  const [formData, setFormData] = useState({
    achievementName: "",
    description: "",
    earningFrequency: "",
    selectedType: "",
    criteriaDescription: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // =====================================================
  // ACHIEVEMENT TYPES
  // =====================================================
  const earningTypes = [
    {
      id: "reach-a-target",
      title: "Reach a target",
      subtitle: "e.g score 90% or higher",
      icon: (
        <svg
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.75 2.5C28.0596 2.5 27.5 3.05964 27.5 3.75V31.25C27.5 31.9404 28.0596 32.5 28.75 32.5H31.25C31.9404 32.5 32.5 31.9404 32.5 31.25V3.75C32.5 3.05964 31.9404 2.5 31.25 2.5H28.75ZM25 3.75C25 1.67893 26.6789 0 28.75 0H31.25C33.3211 0 35 1.67893 35 3.75V31.25C35 33.3211 33.3211 35 31.25 35H28.75C26.6789 35 25 33.3211 25 31.25V3.75ZM16.25 12.5C15.5596 12.5 15 13.0597 15 13.75V31.25C15 31.9404 15.5596 32.5 16.25 32.5H18.75C19.4404 32.5 20 31.9404 20 31.25V13.75C20 13.0597 19.4404 12.5 18.75 12.5H16.25ZM12.5 13.75C12.5 11.6789 14.1789 10 16.25 10H18.75C20.8211 10 22.5 11.6789 22.5 13.75V31.25C22.5 33.3211 20.8211 35 18.75 35H16.25C14.1789 35 12.5 33.3211 12.5 31.25V13.75ZM3.75 22.5C3.05964 22.5 2.5 23.0597 2.5 23.75V31.25C2.5 31.9404 3.05964 32.5 3.75 32.5H6.25C6.94036 32.5 7.5 31.9404 7.5 31.25V23.75C7.5 23.0597 6.94036 22.5 6.25 22.5H3.75ZM0 23.75C0 21.679 1.67893 20 3.75 20H6.25C8.32107 20 10 21.679 10 23.75V31.25C10 33.3211 8.32107 35 6.25 35H3.75C1.67893 35 0 33.3211 0 31.25V23.75Z"
            fill="#0E1011"
          />
        </svg>
      ),
    },
    {
      id: "be-the-top-student",
      title: "Be the top student",
      subtitle: "e.g highest score in a quiz",
      icon: (
        <svg
          width="25"
          height="40"
          viewBox="0 0 25 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 0C5.59644 0 0 5.59644 0 12.5C0 16.5836 1.95815 20.2098 4.98669 22.4909L2.51454 38.5599C2.44157 39.0342 2.64653 39.5084 3.04198 39.7801C3.43743 40.0519 3.95355 40.0734 4.37017 39.8353L12.5 35.1897L20.6298 39.8353C21.0464 40.0734 21.5626 40.0519 21.958 39.7801C22.3535 39.5084 22.5584 39.0342 22.4855 38.5599L20.0133 22.4909C23.0419 20.2098 25 16.5836 25 12.5C25 5.59644 19.4036 0 12.5 0ZM2.5 12.5C2.5 6.97715 6.97715 2.5 12.5 2.5C18.0228 2.5 22.5 6.97715 22.5 12.5C22.5 18.0228 18.0228 22.5 12.5 22.5C6.97715 22.5 2.5 18.0228 2.5 12.5ZM17.6964 23.8721C16.1139 24.5963 14.3541 25 12.5 25C10.6459 25 8.88607 24.5963 7.30362 23.8721L5.37944 36.3792L11.8798 32.6647C12.2641 32.4451 12.7359 32.4451 13.1202 32.6647L19.6206 36.3792L17.6964 23.8721Z"
            fill="#0E1011"
          />
        </svg>
      ),
    },
    {
      id: "complete-task",
      title: "Complete task",
      subtitle: "e.g number of assignments",
      icon: (
        <svg
          width="30"
          height="40"
          viewBox="0 0 30 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.25 15.3125C5.73223 15.3125 5.3125 15.7322 5.3125 16.25C5.3125 16.7678 5.73223 17.1875 6.25 17.1875H13.75C14.2678 17.1875 14.6875 16.7678 14.6875 16.25C14.6875 15.7322 14.2678 15.3125 15.3125 13.75 15.3125H6.25Z"
            fill="#0E1011"
          />
          <path
            d="M6.25 20.3125C5.73223 20.3125 5.3125 20.7322 5.3125 21.25C5.3125 21.7678 5.73223 22.1875 6.25 22.1875H23.75C24.2678 22.1875 24.6875 21.7678 24.6875 21.25C24.6875 20.7322 24.2678 20.3125 23.75 20.3125H6.25Z"
            fill="#0E1011"
          />
          <path
            d="M6.25 25.3125C5.73223 25.3125 5.3125 25.7322 5.3125 26.25C5.3125 26.7678 5.73223 27.1875 6.25 27.1875H23.75C24.2678 27.1875 24.6875 26.7678 24.6875 26.25C24.6875 25.7322 24.2678 25.3125 23.75 25.3125H6.25Z"
            fill="#0E1011"
          />
          <path
            d="M6.25 30.3125C5.73223 30.3125 5.3125 30.7322 5.3125 31.25C5.3125 31.7678 5.73223 32.1875 6.25 32.1875H18.75C19.2678 32.1875 19.6875 31.7678 19.6875 31.25C19.6875 30.7322 19.2678 30.3125 18.75 30.3125H6.25Z"
            fill="#0E1011"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.375 0H5C2.23858 0 0 2.23858 0 5V35C0 37.7614 2.23858 40 5 40H25C27.7614 40 30 37.7614 30 35V10.625L19.375 0ZM5 37.5H25C26.3807 37.5 27.5 36.3807 27.5 35V12.5H21.25C19.1789 12.5 17.5 10.8211 17.5 8.75V2.5H5C3.61929 2.5 2.5 3.61929 2.5 5V35C2.5 36.3807 3.61929 37.5 5 37.5ZM20 4.16053L25.8395 10H21.25C20.5596 10 20 9.44036 20 8.75V4.16053Z"
            fill="#0E1011"
          />
        </svg>
      ),
    },
    {
      id: "show-improvement",
      title: "Show Improvement",
      subtitle: "e.g improve by 15% this month",
      icon: (
        <svg
          width="40"
          height="25"
          viewBox="0 0 40 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.366117 24.6339C0.854272 25.122 1.64573 25.122 2.13388 24.6339L16.25 10.5178L22.8661 17.1339C23.3543 17.622 24.1457 17.622 24.6339 17.1339L37.5 4.26777V11.25C37.5 11.9404 38.0596 12.5 38.75 12.5C39.4404 12.5 40 11.9404 40 11.25V1.25C40 0.559645 39.4404 0 38.75 0H28.75C28.0596 0 27.5 0.559645 27.5 1.25C27.5 1.94036 28.0596 2.5 28.75 2.5H35.7322L23.75 14.4822L17.1339 7.86612C16.6457 7.37796 15.8543 7.37796 15.3661 7.86612L0.366117 22.8661C-0.122039 23.3543 -0.122039 24.1457 0.366117 24.6339Z"
            fill="#0E1011"
          />
        </svg>
      ),
    },
    {
      id: "maintain-consistency",
      title: "Maintain Consistency",
      subtitle: "e.g attended up to 95% of classes",
      icon: (
        <svg
          width="37"
          height="40"
          viewBox="0 0 37 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.2988 10C26.2988 15.5228 21.8217 20 16.2988 20C10.776 20 6.29883 15.5228 6.29883 10C6.29883 4.47715 10.776 0 16.2988 0C21.8217 0 26.2988 4.47715 26.2988 10ZM23.7988 10C23.7988 14.1421 20.441 17.5 16.2988 17.5C12.1567 17.5 8.79883 14.1421 8.79883 10C8.79883 5.85786 12.1567 2.5 16.2988 2.5C20.441 2.5 23.7988 5.85786 23.7988 10Z"
            fill="#0E1011"
          />
          <path
            d="M16.2988 22.5V25H6.71965C4.85346 25 3.27126 26.3722 3.00734 28.2197L2.6218 30.9184C5.832 34.9343 10.7658 37.5 16.2988 37.5V40C9.5748 40 3.62581 36.6817 0 31.5934L0.532469 27.8661C0.972334 24.7871 3.60934 22.5 6.71965 22.5H16.2988Z"
            fill="#0E1011"
          />
          <path
            d="M35.9327 29.6339C36.4209 29.1457 36.4209 28.3543 35.9327 27.8661C35.4446 27.378 34.6531 27.378 34.1649 27.8661L25.0488 36.9822L20.9327 32.8661C20.4446 32.378 19.6531 32.378 19.1649 32.8661C18.6768 33.3543 18.6768 34.1457 19.1649 34.6339L24.1649 39.6339C24.6531 40.122 25.4446 40.122 25.9327 39.6339L35.9327 29.6339Z"
            fill="#0E1011"
          />
        </svg>
      ),
    },
  ];

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================
  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Remove validation alert once user starts correcting the form
    if (alert.show && alert.type === "error") {
      setAlert({
        show: false,
        type: "",
        message: "",
      });
    }
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      achievementName,
      description,
      earningFrequency,
      selectedType,
      criteriaDescription,
    } = formData;

    // Required field validation
    if (!achievementName.trim()) {
      setAlert({
        show: true,
        type: "error",
        message: "Please enter an achievement name before proceeding.",
      });
      return;
    }

    if (!description.trim()) {
      setAlert({
        show: true,
        type: "error",
        message: "Please enter a description for this achievement.",
      });
      return;
    }

    if (!earningFrequency) {
      setAlert({
        show: true,
        type: "error",
        message: "Please select when students should earn this achievement.",
      });
      return;
    }

    if (!selectedType) {
      setAlert({
        show: true,
        type: "error",
        message: "Please select how students should earn this achievement.",
      });
      return;
    }

    if (!criteriaDescription.trim()) {
      setAlert({
        show: true,
        type: "error",
        message: "Please provide the criteria details for this achievement.",
      });
      return;
    }

    // Start loading
    setIsLoading(true);

    setAlert({
      show: false,
      type: "",
      message: "",
    });

    try {
      // Achievements are saved as badges. The rule and how often it is earned are kept
      // together in the "How to earn" part of the description (shown in the achievements table).
      await api.post("/rewards", {
        title: achievementName.trim(),
        description: joinDescription(
          description,
          `${criteriaDescription.trim()} (${earningFrequency})`
        ),
        kind: "BADGE",
        points: 0,
      });

      setAlert({
        show: true,
        type: "success",
        message:
          "Achievement created successfully. The new achievement has been saved.",
      });

      // Optional:
      // Reset form after successful API submission
      setFormData({
        achievementName: "",
        description: "",
        earningFrequency: "",
        selectedType: "",
        criteriaDescription: "",
      });
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message:
          error?.message ||
          "Something went wrong while creating the achievement. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // ALERT STYLES
  // =====================================================
  const alertStyles =
    alert.type === "success"
      ? "bg-emerald-50 border-emerald-100 text-emerald-900"
      : "bg-red-50 border-red-100 text-red-900";

  const alertIconStyles =
    alert.type === "success"
      ? "text-emerald-600"
      : "text-red-600";

  return (
    <div className="min-h-screen bg-[#F4F6FB] text-slate-800 font-sans flex flex-col items-center py-6 px-4 sm:px-6">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="w-full max-w-[1073px] flex items-center mb-6 px-1 sm:px-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mr-3 text-slate-600 hover:text-slate-900 transition-colors shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Create Achievement
          </h1>

          <p className="text-xs text-slate-500 mt-0.5">
            Create a new achievement and set how students can earn it.
          </p>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}
      <div className="w-full max-w-[1073px] bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-6 md:p-8">

        {/* ===================================================
            ALERT
        =================================================== */}
        {alert.show && (
          <div
            className={`mb-6 p-4 border rounded-lg flex items-start gap-3 ${alertStyles}`}
            role="alert"
          >
            <AlertCircle
              className={`w-5 h-5 shrink-0 mt-0.5 ${alertIconStyles}`}
            />

            <div className="flex-1 text-xs leading-relaxed font-medium">
              {alert.message}
            </div>

            <button
              type="button"
              onClick={() =>
                setAlert({
                  show: false,
                  type: "",
                  message: "",
                })
              }
              className="text-slate-400 hover:text-slate-700 text-lg leading-none font-bold px-1"
              aria-label="Close alert"
            >
              &times;
            </button>
          </div>
        )}

        {/* ===================================================
            FORM
        =================================================== */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Achievement Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">
              Achievement Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={formData.achievementName}
              onChange={(e) =>
                handleChange("achievementName", e.target.value)
              }
              placeholder="e.g Top performer"
              maxLength={100}
              className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-400 text-slate-700 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">
              Description <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                placeholder="e.g Awarded to the student with the highest overall score in the class for the month."
                maxLength={100}
                className="w-full px-4 py-3 pr-16 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-400 text-slate-700 resize-none transition-all"
              />

              <span className="absolute bottom-3 right-3 text-[10px] text-slate-400">
                {formData.description.length}/100
              </span>
            </div>
          </div>

          {/* Earning Frequency */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">
              When Should Students earn this?
            </label>

            <div className="relative">
              <select
                value={formData.earningFrequency}
                onChange={(e) =>
                  handleChange("earningFrequency", e.target.value)
                }
                className="w-full px-4 py-3 pr-10 text-sm bg-white border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-700 transition-all cursor-pointer"
              >
                <option value="" disabled>
                  Select earning frequency
                </option>

                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Termly">Termly</option>
                <option value="Yearly">Yearly</option>
              </select>

              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Earning Types */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-3">
              How should students earn this?
            </label>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2  lg:grid-cols-5 gap-3">
              {earningTypes.map((type) => {
                const isSelected =
                  formData.selectedType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      handleChange("selectedType", type.id)
                    }
                    aria-pressed={isSelected}
                    className={`w-full text-left cursor-pointer rounded-xl p-4 min-h-[145px] flex flex-col justify-between border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-600 shadow-sm"
                        : "border-slate-200 hover:border-slate-300  bg-[#2E6DFF08]"
                    }`}
                  >
                    <div className="mb-6 h-10 flex items-center justify-center">
                      {type.icon}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1">
                        {type.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 leading-tight">
                        {type.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Criteria Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">
              Criteria Details
            </label>

            <div className="relative">
              <textarea
                rows={3}
                value={formData.criteriaDescription}
                onChange={(e) =>
                  handleChange(
                    "criteriaDescription",
                    e.target.value
                  )
                }
                placeholder="Enter specific criteria requirements..."
                maxLength={100}
                className="w-full px-4 py-3 pr-16 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-400 text-slate-600 resize-none transition-all"
              />

              <span className="absolute bottom-3 right-3 text-[10px] text-slate-400">
                {formData.criteriaDescription.length}/100
              </span>
            </div>
          </div>

          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#313075] hover:bg-[#27265e] text-white text-sm font-semibold rounded-xl shadow-md transition-all max-w-[480px] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>

                  <span>Creating Achievement...</span>
                </>
              ) : (
                "Create Achievement"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}