import React, { useState } from "react";
import { Edit2, Trash2, CheckCircle2, AlertTriangle } from "lucide-react";
import EditBadgeModal from "../../Modals/EditBadgeModal";

import badgeImage from "../../../assets/images/134a082cca973150969aa91355d8ac63a4934a6a (1).png";

const initialBadgesData = [
  {
    id: 1,
    name: "Perfect Attendance",
    description: "Awarded for attending all scheduled classes.",
    criteria: "Attend 100% of classes",
    studentsEarned: 12,
  },
  {
    id: 2,
    name: "Perfect Attendance",
    description: "Awarded for attending all scheduled classes.",
    criteria: "Attend 100% of classes",
    studentsEarned: 12,
  },
  {
    id: 3,
    name: "Perfect Attendance",
    description: "Awarded for attending all scheduled classes.",
    criteria: "Attend 100% of classes",
    studentsEarned: 12,
  },
  {
    id: 4,
    name: "Perfect Attendance",
    description: "Awarded for attending all scheduled classes.",
    criteria: "Attend 100% of classes",
    studentsEarned: 12,
  },
  {
    id: 5,
    name: "Perfect Attendance",
    description: "Awarded for attending all scheduled classes.",
    criteria: "Attend 100% of classes",
    studentsEarned: 12,
  },
];

export default function BadgesTable() {
  const [badgesData, setBadgesData] = useState(initialBadgesData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBadge, setCurrentBadge] = useState(null);
  
  // Alert message state: { type: 'success' | 'error', text: string } | null
  const [alert, setAlert] = useState(null);

  const showAlert = (text, type = "success") => {
    setAlert({ text, type });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const handleEditClick = (item) => {
    setCurrentBadge(item);
    setIsEditing(true);
  };

  const handleSaveBadge = (updatedBadge) => {
    setBadgesData((prev) =>
      prev.map((item) => (item.id === updatedBadge.id ? updatedBadge : item))
    );
    setIsEditing(false);
    setCurrentBadge(null);
    showAlert(`Successfully updated "${updatedBadge.name}" badge!`, "success");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the "${name}" badge?`)) {
      setBadgesData((prev) => prev.filter((item) => item.id !== id));
      showAlert(`Badge "${name}" has been deleted.`, "error");
    }
  };

  return (
    <div className="w-full relative space-y-4">
      {/* =====================================================
          FEEDBACK ALERT BANNER
      ====================================================== */}
      {alert && (
        <div
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium shadow-sm transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
            alert.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {alert.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
          )}
          <span>{alert.text}</span>
        </div>
      )}

      {/* =====================================================
          TABLE CONTAINER
      ====================================================== */}
      <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            {/* TABLE HEADER */}
            <thead>
              <tr className="border-b border-slate-200 bg-[#E0E7F57D] text-sm font-medium text-slate-500">
                <th className="whitespace-nowrap px-6 py-4">Name</th>
                <th className="whitespace-nowrap px-6 py-4">Description</th>
                <th className="whitespace-nowrap px-6 py-4">Criteria</th>
                <th className="whitespace-nowrap px-6 py-4">Students Earned</th>
                <th className="whitespace-nowrap px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {badgesData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    No badges found.
                  </td>
                </tr>
              ) : (
                badgesData.map((item) => (
                  <tr key={item.id} className="transition-colors duration-150 hover:bg-slate-50">
                    {/* NAME */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                          <img
                            src={badgeImage}
                            alt={`${item.name} badge`}
                            className="h-11 w-11 object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap font-semibold tracking-tight text-slate-900">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="px-6 py-5">
                      <p className="max-w-[300px] text-sm leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </td>

                    {/* CRITERIA */}
                    <td className="px-6 py-5">
                      <span className="whitespace-nowrap text-slate-600">
                        {item.criteria}
                      </span>
                    </td>

                    {/* STUDENTS EARNED */}
                    <td className="px-6 py-5">
                      <span className="font-semibold text-slate-900">
                        {item.studentsEarned}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(item)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm transition-all duration-150 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-slate-500" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.name)}
                          title="Delete badge"
                          aria-label={`Delete ${item.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-red-500 shadow-sm transition-all duration-150 hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          SEPARATE EDIT MODAL COMPONENT
      ====================================================== */}
      <EditBadgeModal
        isOpen={isEditing}
        badge={currentBadge}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveBadge}
      />
    </div>
  );
}