
import React, { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Trash2,
  X,
  UserRound,
  BookOpen,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import LinkChild from "../../../components/Admincomponent/LinkChild";

const initialChildren = [
  {
    id: "child-1",
    name: "Ethan Smith",
    subjects: ["Mathematics Year 3", "English Year 3"],
    dateLinked: "12 Mar 2024",
    status: "Active",
  },
  {
    id: "child-2",
    name: "Ethan Smith",
    subjects: ["Mathematics Year 3", "English Year 3"],
    dateLinked: "12 Mar 2024",
    status: "Active",
  },
];

export default function LinkedChildren() {
  const [children, setChildren] = useState(initialChildren);
  const [isLinking, setIsLinking] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [childToRemove, setChildToRemove] = useState(null);

  const closeViewModal = () => setSelectedChild(null);
  const closeRemoveModal = () => setChildToRemove(null);

  useEffect(() => {
    if (!selectedChild && !childToRemove && !isLinking) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeViewModal();
        closeRemoveModal();
        setIsLinking(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedChild, childToRemove, isLinking]);

  const handleLinkChild = (child) => {
    setChildren((current) => [
      ...current,
      {
        ...child,
        dateLinked:
          child.dateLinked ||
          new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        status: child.status || "Active",
      },
    ]);
  };

  const handleRemoveChild = () => {
    if (!childToRemove) return;

    setChildren((current) =>
      current.filter((child) => child.id !== childToRemove.id)
    );

    if (selectedChild?.id === childToRemove.id) {
      setSelectedChild(null);
    }

    setChildToRemove(null);
  };

  return (
    <>
      <section className="w-full min-w-0 rounded-[10px] bg-white p-4 sm:p-6">
        {/* Header */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[21px] font-semibold leading-7 tracking-[-0.35px] text-black sm:text-[22px]">
            Linked Children
          </h2>

          <button
            type="button"
            onClick={() => setIsLinking(true)}
            className="inline-flex h-[36px] shrink-0 items-center justify-center gap-2 rounded-[5px] border border-[#16C65A] bg-white px-5 text-[13px] font-medium text-[#16C65A] transition hover:bg-[#EFFFF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C65A] focus-visible:ring-offset-2"
          >
            <Plus size={17} strokeWidth={1.7} />
            Link Child
          </button>
        </div>

        {/* Children Table */}
        <div className="w-full min-w-0 overflow-hidden rounded-[9px] border border-[#D6DDE6]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[24%]" />
                <col className="w-[44%]" />
                <col className="w-[16%]" />
                <col className="w-[16%]" />
              </colgroup>

              <thead>
                <tr className="h-[63px] bg-[#EEF3FB] text-[#737D88]">
                  <th className="px-7 text-[17px] font-semibold">
                    Child Name
                  </th>

                  <th className="px-7 text-[17px] font-semibold">
                    Enrolled Subjects
                  </th>

                  <th
                    colSpan={2}
                    className="px-7 text-[17px] font-semibold"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {children.map((child) => (
                  <tr
                    key={child.id}
                    className="border-t border-[#E0E4EA] bg-white transition-colors hover:bg-[#FCFCFD]"
                  >
                    {/* Child Name */}
                    <td className="border-r border-[#D9DEE6] px-7 py-[18px]">
                      <span className="block break-words text-[17px] font-medium text-black">
                        {child.name}
                      </span>
                    </td>

                    {/* Enrolled Subjects */}
                    <td className="border-r border-[#D9DEE6] px-5 py-[18px]">
                      <div className="flex flex-wrap items-center gap-3">
                        {child.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="inline-flex min-h-[33px] items-center whitespace-nowrap rounded-[4px] bg-[#E6EAF2] px-[10px] py-1.5 text-[13px] font-normal text-[#6E7885]"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* View */}
                    <td className="border-r border-[#D9DEE6] px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedChild(child)}
                        aria-label={`View ${child.name}`}
                        className="inline-flex w-full items-center justify-center gap-3 rounded-md px-2 py-2 text-[16px] text-[#85858D] transition hover:bg-[#F3F5F9] hover:text-[#159A42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
                      >
                        <Eye size={21} strokeWidth={1.6} />
                        <span>View</span>
                      </button>
                    </td>

                    {/* Remove */}
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setChildToRemove(child)}
                        aria-label={`Remove ${child.name}`}
                        className="inline-flex w-full items-center justify-center gap-3 rounded-md px-2 py-2 text-[16px] text-[#FF2929] transition hover:bg-[#FFF1F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      >
                        <Trash2 size={20} strokeWidth={1.6} />
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {children.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm text-[#85858D]"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F3F8]">
                          <UserRound
                            size={22}
                            className="text-[#7B8491]"
                          />
                        </div>

                        <p className="font-medium text-[#374151]">
                          No linked children yet
                        </p>

                        <p className="text-xs text-[#85858D]">
                          Select Link Child to add a child to your list.
                        </p>

                        <button
                          type="button"
                          onClick={() => setIsLinking(true)}
                          className="mt-1 inline-flex items-center gap-2 rounded-md bg-[#159A42] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#128238]"
                        >
                          <Plus size={16} />
                          Link Child
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Link Child Modal */}
      <LinkChild
        isOpen={isLinking}
        onClose={() => setIsLinking(false)}
        onLink={handleLinkChild}
      />

      {/* View Child Details Modal */}
      {selectedChild && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-[#111827]/45 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeViewModal();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-child-title"
            className="my-auto w-full max-w-[520px] overflow-hidden rounded-xl border border-[#E6EAF0] bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#E8EBF2] px-5 py-5 sm:px-6">
              <div>
                <h3
                  id="view-child-title"
                  className="text-lg font-semibold text-[#111827]"
                >
                  Child Details
                </h3>

                <p className="mt-1 text-xs text-[#85858D]">
                  View the child's linked account information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeViewModal}
                aria-label="Close child details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#69737D] transition hover:bg-[#F3F5F9] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Child Profile */}
            <div className="px-5 py-6 sm:px-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E9F8EE] text-[#159A42]">
                  <UserRound size={31} strokeWidth={1.5} />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="break-words text-xl font-semibold text-[#111827]">
                    {selectedChild.name}
                  </h4>

                  <p className="mt-1 break-all text-sm text-[#85858D]">
                    Child ID: {selectedChild.id}
                  </p>

                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#E9F8EE] px-2.5 py-1 text-xs font-medium text-[#159A42]">
                    <CheckCircle2 size={13} />
                    {selectedChild.status || "Active"}
                  </span>
                </div>
              </div>

              {/* Linked Information */}
              <div className="mt-6 overflow-hidden rounded-lg border border-[#E5E9F0]">
                <div className="flex items-center justify-between gap-4 border-b border-[#E5E9F0] px-4 py-3.5">
                  <span className="text-sm text-[#737D88]">
                    Child Name
                  </span>

                  <span className="break-words text-right text-sm font-medium text-[#111827]">
                    {selectedChild.name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-[#E5E9F0] px-4 py-3.5">
                  <span className="text-sm text-[#737D88]">
                    Child ID
                  </span>

                  <span className="break-all text-right text-sm font-medium text-[#111827]">
                    {selectedChild.id}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <span className="inline-flex items-center gap-2 text-sm text-[#737D88]">
                    <CalendarDays size={16} />
                    Date Linked
                  </span>

                  <span className="text-right text-sm font-medium text-[#111827]">
                    {selectedChild.dateLinked || "Not provided"}
                  </span>
                </div>
              </div>

              {/* Subjects */}
              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen size={17} className="text-[#159A42]" />

                  <h4 className="text-sm font-semibold text-[#111827]">
                    Enrolled Subjects
                  </h4>

                  <span className="ml-auto rounded-full bg-[#F0F3F8] px-2.5 py-1 text-xs text-[#69737D]">
                    {selectedChild.subjects.length}
                  </span>
                </div>

                {selectedChild.subjects.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedChild.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded-md bg-[#E6EAF2] px-3 py-2 text-xs font-medium text-[#667180]"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-md bg-[#F5F7FB] px-3 py-4 text-sm text-[#85858D]">
                    No subjects have been added.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-[#E8EBF2] bg-[#FAFBFD] px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={closeViewModal}
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#159A42] px-5 text-sm font-medium text-white transition hover:bg-[#128238] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2"
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {childToRemove && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeRemoveModal();
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="remove-child-title"
            className="w-full max-w-[400px] rounded-xl border border-[#E8EBF2] bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF0F0] text-red-500">
              <Trash2 size={21} />
            </div>

            <h3
              id="remove-child-title"
              className="text-lg font-semibold text-[#111827]"
            >
              Remove linked child?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#69737D]">
              Are you sure you want to remove{" "}
              <span className="font-medium text-[#374151]">
                {childToRemove.name}
              </span>{" "}
              from your linked children list?
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeRemoveModal}
                className="inline-flex items-center justify-center rounded-md border border-[#DADDE5] px-4 py-2.5 text-sm font-medium text-[#4B5563] transition hover:bg-[#F5F7FD]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRemoveChild}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FF2929] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
              >
                <Trash2 size={16} />
                Remove Child
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
