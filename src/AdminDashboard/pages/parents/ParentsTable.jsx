
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle
        cx="10.8"
        cy="10.8"
        r="6.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m15.5 15.5 4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="m6 8 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <circle cx="10" cy="4" r="1.4" />
      <circle cx="10" cy="10" r="1.4" />
      <circle cx="10" cy="16" r="1.4" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="m12 5-5 5 5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="m8 5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ParentsTable({ parents = [], loading = false, error = "" }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [subscription, setSubscription] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  const rowsPerPage = 8;

  const filteredParents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return parents.filter((parent) => {
      const matchesSearch =
        !query ||
        parent.name.toLowerCase().includes(query) ||
        parent.parentId.toLowerCase().includes(query) ||
        parent.email.toLowerCase().includes(query) ||
        parent.children.some((child) =>
          child.toLowerCase().includes(query)
        );

      return (
        matchesSearch &&
        (!subscription || parent.payment === subscription) &&
        (!status || parent.status === status)
      );
    });
  }, [parents, search, subscription, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredParents.length / rowsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const visibleParents = filteredParents.slice(
    (safePage - 1) * rowsPerPage,
    safePage * rowsPerPage
  );

  const start =
    filteredParents.length === 0
      ? 0
      : (safePage - 1) * rowsPerPage + 1;

  const end = Math.min(
    safePage * rowsPerPage,
    filteredParents.length
  );

  const resetPage = () => {
    setCurrentPage(1);
    setOpenMenu(null);
  };

  const viewParent = (parentId) => {
    setOpenMenu(null);
    navigate(`/admin/users/parents/${parentId}`);
  };

  const copyParentId = async (parentId) => {
    try {
      await navigator.clipboard.writeText(parentId);
    } catch (error) {
      console.error("Unable to copy parent ID:", error);
    } finally {
      setOpenMenu(null);
    }
  };

  return (
    <section className="w-full min-w-0 rounded-xl border border-[#E6E9EF] bg-white p-4 sm:p-5 lg:p-6">
      {error && (
        <p role="alert" className="mb-4 rounded-md bg-[#FCE4E4] px-3 py-2 text-sm text-[#C62828]">
          {error}
        </p>
      )}

      {/* Search and filters */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px_150px] lg:grid-cols-[minmax(220px,1fr)_190px_160px]">
        <div className="relative min-w-0">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]">
            <SearchIcon />
          </span>

          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
            }}
            placeholder="Search parent name or ID..."
            aria-label="Search parents by name or ID"
            className="h-12 w-full rounded-lg border border-[#E1E5EB] bg-white pl-11 pr-4 text-sm text-[#263445] outline-none transition focus:border-[#8DA2D6] focus:ring-2 focus:ring-[#8DA2D6]/20 sm:text-base"
          />
        </div>

        <div className="relative">
          <select
            value={subscription}
            onChange={(e) => {
              setSubscription(e.target.value);
              resetPage();
            }}
            aria-label="Filter by payment status"
            className="h-12 w-full appearance-none rounded-lg border border-[#E1E5EB] bg-white px-3.5 pr-10 text-sm text-[#263445] outline-none focus:border-[#8DA2D6] sm:text-base"
          >
            <option value="">Payment</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="No payment">No payment</option>
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8699]">
            <ChevronDown />
          </span>
        </div>

        <div className="relative">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              resetPage();
            }}
            aria-label="Filter by status"
            className="h-12 w-full appearance-none rounded-lg border border-[#E1E5EB] bg-white px-3.5 pr-10 text-sm text-[#263445] outline-none focus:border-[#8DA2D6] sm:text-base"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8699]">
            <ChevronDown />
          </span>
        </div>
      </div>

      {/* Responsive table */}
      <div className="-mx-1 overflow-x-auto rounded-lg sm:mx-0">
        <table className="w-full min-w-[900px] table-auto border-collapse text-left">
          <thead>
            <tr className="h-12 bg-[#EDF2F8] text-xs font-semibold text-[#34465A] sm:text-sm">
              <th className="w-[19%] rounded-l-lg px-4">
                Parent Name/ID
              </th>
              <th className="w-[21%] px-4">Email</th>
              <th className="w-[16%] px-4">Children</th>
              <th className="w-[14%] px-4">Payment</th>
              <th className="w-[13%] px-4">Status</th>
              <th className="w-[17%] rounded-r-lg px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {visibleParents.map((parent) => (
              <tr
                key={parent.id}
                className="border-b border-[#EEF0F3] transition-colors last:border-b-0 hover:bg-[#FAFBFD]"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E0E0E0] text-white">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="4"
                          fill="currentColor"
                        />
                        <path
                          d="M4 21v-2a8 8 0 0 1 16 0v2"
                          fill="currentColor"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-5 text-[#171717]">
                        {parent.name}
                      </p>
                      <p className="mt-0.5 break-all text-xs leading-4 text-[#7C8794]">
                        {parent.parentId}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span className="break-words text-sm text-[#475467]">
                    {parent.email}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="space-y-1 text-sm leading-5 text-[#475467]">
                    {parent.children.map((child) => (
                      <p key={child}>{child}</p>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span className="text-sm text-[#475467]">
                    {parent.payment}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium ${
                      parent.status === "Active"
                        ? "bg-[#DDF5E3] text-[#15803D]"
                        : "bg-[#FCE4E4] text-[#C62828]"
                    }`}
                  >
                    {parent.status}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {/* Navigate to parent details */}
                    <button
                      type="button"
                      onClick={() => viewParent(parent.id)}
                      className="inline-flex h-9 min-w-[68px] items-center justify-center rounded-md border border-[#929DD2] px-4 text-sm font-medium text-[#344580] transition hover:bg-[#EEF1FF] focus:outline-none focus:ring-2 focus:ring-[#929DD2]/40"
                    >
                      View
                    </button>

                    {/* More actions */}
                    <div className="relative">
                      <button
                        type="button"
                        aria-label={`More actions for ${parent.name}`}
                        aria-expanded={openMenu === parent.id}
                        onClick={() =>
                          setOpenMenu(
                            openMenu === parent.id
                              ? null
                              : parent.id
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-md text-[#687587] hover:bg-[#F0F2F6] focus:outline-none focus:ring-2 focus:ring-[#929DD2]/40"
                      >
                        <MoreIcon />
                      </button>

                      {openMenu === parent.id && (
                        <div className="absolute right-0 top-10 z-30 w-40 overflow-hidden rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                          <button
                            type="button"
                            onClick={() => viewParent(parent.id)}
                            className="block w-full px-4 py-2.5 text-left text-sm text-[#344054] hover:bg-[#F5F7FC]"
                          >
                            View details
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              copyParentId(parent.parentId)
                            }
                            className="block w-full px-4 py-2.5 text-left text-sm text-[#344054] hover:bg-[#F5F7FC]"
                          >
                            Copy parent ID
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}

            {visibleParents.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-16 text-center text-sm text-[#7C8794]"
                >
                  {loading ? "Loading parents…" : "No parents found. Try adjusting your search or filters."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex flex-col gap-4 border-t border-[#EEF0F3] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#475467] sm:text-sm">
          Showing{" "}
          <span className="font-medium text-[#1F2937]">
            {start}–{end}
          </span>{" "}
          of{" "}
          <span className="font-medium text-[#1F2937]">
            {filteredParents.length}
          </span>{" "}
          parents
        </p>

        <nav
          aria-label="Parent table pagination"
          className="flex flex-wrap items-center gap-1.5"
        >
          <button
            type="button"
            aria-label="Previous page"
            disabled={safePage === 1}
            onClick={() => {
              setCurrentPage((page) => Math.max(1, page - 1));
              setOpenMenu(null);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E1E5EB] text-[#526071] hover:bg-[#F3F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft />
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          )
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(page - safePage) <= 1
            )
            .reduce((items, page, index, pages) => {
              if (
                index > 0 &&
                page - pages[index - 1] > 1
              ) {
                items.push(
                  <span
                    key={`ellipsis-${page}`}
                    className="px-1 text-sm text-[#667085]"
                  >
                    ...
                  </span>
                );
              }

              items.push(
                <button
                  key={page}
                  type="button"
                  aria-label={`Page ${page}`}
                  aria-current={
                    safePage === page ? "page" : undefined
                  }
                  onClick={() => {
                    setCurrentPage(page);
                    setOpenMenu(null);
                  }}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition ${
                    safePage === page
                      ? "border border-[#B6CCFF] bg-[#DCE8FF] font-semibold text-[#2563EB]"
                      : "text-[#526071] hover:bg-[#F3F5F9]"
                  }`}
                >
                  {page}
                </button>
              );

              return items;
            }, [])}

          <button
            type="button"
            aria-label="Next page"
            disabled={safePage === totalPages}
            onClick={() => {
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              );
              setOpenMenu(null);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E1E5EB] text-[#526071] hover:bg-[#F3F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight />
          </button>
        </nav>
      </div>
    </section>
  );
}
