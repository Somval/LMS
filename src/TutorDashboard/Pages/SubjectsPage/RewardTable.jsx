import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import badgeIcon from "../../../assets/images/c2582da116168ead7191b53b24caa4b4015bf713 (1).png";
import EditRewardModal from "../../Modals/EditRewardModal";
import { api } from "../../../lib/api";
import { toPayload, toRow } from "./rewardFormat";

export default function RewardsBadgesTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Rewards the tutor created (badges are listed on the Achievements page).
  useEffect(() => {
    let cancelled = false;
    api
      .get("/rewards")
      .then((list) => !cancelled && setItems(list.filter((a) => a.kind === "REWARD").map(toRow)))
      .catch((err) => !cancelled && setError(err.message || "Could not load rewards."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // Modal State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedItem) => {
    setError("");
    try {
      const saved = await api.put(`/rewards/${updatedItem.id}`, toPayload(updatedItem));
      setItems((current) =>
        current.map((item) =>
          item.id === updatedItem.id ? { ...updatedItem, ...toRow({ ...saved, studentsEarned: updatedItem.studentsEarned }) } : item
        )
      );
    } catch (err) {
      setError(err.message || "Could not save your changes.");
    }
  };

  const handleDelete = async (id) => {
    const target = items.find((item) => item.id === id);
    if (!window.confirm(`Delete "${target?.name ?? "this reward"}"? Students who already earned it will lose it.`)) return;
    setError("");
    try {
      await api.delete(`/rewards/${id}`);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message || "Could not delete this reward.");
    }
  };

  return (
    <div className="w-full">
      {error && (
        <p role="alert" className="mb-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
      {/* ===================================================
          TABLE CONTAINER
      ==================================================== */}
      <div className="w-full overflow-hidden rounded-[10px] border border-[#EAEAF0] bg-white shadow-sm">
        {/* =================================================
            RESPONSIVE TABLE SCROLL AREA
        ================================================== */}
        <div
          className="
            w-full
            overflow-x-auto
            overscroll-x-contain
            [scrollbar-width:thin]
          "
        >
          <table
            className="
              w-full
              min-w-[1050px]
              border-collapse
              text-left
            "
          >
            {/* =================================================
                TABLE HEADER
            ================================================== */}
            <thead>
              <tr className="border-b border-[#EAEAF0] bg-[#F8F9FC]">
                <th
                  className="
                    w-[23%]
                    whitespace-nowrap
                    py-4
                    pl-6
                    pr-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#64748B]
                  "
                >
                  Name
                </th>

                <th
                  className="
                    w-[22%]
                    whitespace-nowrap
                    px-4
                    py-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#64748B]
                  "
                >
                  Description
                </th>

                <th
                  className="
                    w-[27%]
                    whitespace-nowrap
                    px-4
                    py-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#64748B]
                  "
                >
                  Criteria
                </th>

                <th
                  className="
                    w-[13%]
                    whitespace-nowrap
                    px-4
                    py-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#64748B]
                  "
                >
                  Students Earned
                </th>

                <th
                  className="
                    w-[15%]
                    whitespace-nowrap
                    py-4
                    pl-4
                    pr-6
                    text-right
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#64748B]
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>

            {/* =================================================
                TABLE BODY
            ================================================== */}
            <tbody className="divide-y divide-[#F1F3F9]">
              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-[#64748B]">
                    {loading ? "Loading rewards…" : "No rewards yet. Create your first one."}
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="
                    transition-colors
                    duration-150
                    hover:bg-[#FAFAFC]
                  "
                >
                  {/* =================================================
                      NAME & BADGE ICON
                  ================================================== */}
                  <td className="py-5 pl-6 pr-4 align-middle">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-[10px]
                          border
                          border-[#E0E7FF]
                          bg-[#EEF2FF]
                          shadow-sm
                        "
                      >
                        <img
                          src={badgeIcon}
                          alt={item.name}
                          className="h-20 w-50 object-contain"
                        />
                      </div>

                      <span
                        className="
                          whitespace-nowrap
                          text-sm
                          font-semibold
                          text-[#1E293B]
                        "
                      >
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* =================================================
                      DESCRIPTION
                  ================================================== */}
                  <td className="px-4 py-5 align-middle">
                    <p
                      className="
                        max-w-[250px]
                        text-sm
                        font-normal
                        leading-6
                        text-[#64748B]
                      "
                    >
                      {item.description}
                    </p>
                  </td>

                  {/* =================================================
                      CRITERIA
                  ================================================== */}
                  <td className="px-4 py-5 align-middle">
                    <p
                      className="
                        max-w-[300px]
                        text-sm
                        font-normal
                        leading-6
                        text-[#64748B]
                      "
                    >
                      {item.criteria}
                    </p>
                  </td>

                  {/* =================================================
                      STUDENTS EARNED
                  ================================================== */}
                  <td className="px-4 py-5 align-middle">
                    <span
                      className="
                        whitespace-nowrap
                        text-sm
                        font-semibold
                        text-[#1E293B]
                      "
                    >
                      {item.studentsEarned}
                    </span>
                  </td>

                  {/* =================================================
                      ACTIONS
                  ================================================== */}
                  <td className="py-5 pl-4 pr-6 align-middle">
                    <div className="flex items-center justify-end gap-2.5">
                      {/* EDIT */}
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="
                          inline-flex
                          h-9
                          items-center
                          gap-1.5
                          whitespace-nowrap
                          rounded-[6px]
                          border
                          border-[#CBD5E1]
                          bg-white
                          px-3
                          text-xs
                          font-medium
                          text-[#334155]
                          shadow-sm
                          transition-all
                          duration-150
                          hover:border-[#94A3B8]
                          hover:bg-[#F8FAFC]
                          focus:outline-none
                          focus:ring-2
                          focus:ring-[#4F46E5]/20
                          focus:ring-offset-1
                        "
                      >
                        <Edit
                          size={13}
                          strokeWidth={1.8}
                          className="text-[#475569]"
                        />

                        <span>Edit</span>
                      </button>

                      {/* DELETE */}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="
                          inline-flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-[6px]
                          border
                          border-[#FCA5A5]/60
                          bg-white
                          text-[#EF4444]
                          shadow-sm
                          transition-all
                          duration-150
                          hover:border-[#EF4444]
                          hover:bg-[#FEF2F2]
                          focus:outline-none
                          focus:ring-2
                          focus:ring-[#EF4444]/20
                          focus:ring-offset-1
                        "
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal Component */}
      <EditRewardModal
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}