
import { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Search,
  X,
} from "lucide-react";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtTime = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
const initialsOf = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "?";

const TAB_LABELS = ["All", "New", "In Progress", "Resolved", "Closed"];

const categoryStyles = {
  Billing: "bg-purple-50 text-purple-700",
  Technical: "bg-blue-50 text-blue-700",
  Account: "bg-green-50 text-green-700",
  Content: "bg-amber-50 text-amber-700",
  Academic: "bg-pink-50 text-pink-700",
  Schedule: "bg-cyan-50 text-cyan-700",
};

const statusStyles = {
  New: "bg-green-50 text-green-700",
  "In Progress": "bg-blue-50 text-blue-700",
  Resolved: "bg-purple-50 text-purple-700",
  Closed: "bg-gray-100 text-gray-700",
};

function Badge({ children, type = "category" }) {
  const styles =
    type === "status"
      ? statusStyles[children] || "bg-gray-100 text-gray-700"
      : categoryStyles[children] || "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-flex w-fit items-center whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="py-14 text-center">
      <p className="text-sm font-semibold text-gray-800">
        No complaints found
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Try changing your filters or search term.
      </p>
    </div>
  );
}

export default function Complaints() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .get("/admin/complaints")
      .then((res) => !cancelled && setRows(res))
      .catch((err) => !cancelled && setError(err.message || "Could not load complaints."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const complaints = useMemo(
    () =>
      rows.map((c) => ({
        id: `#${c.id}`,
        name: c.name,
        initials: initialsOf(c.name),
        role: c.role,
        subject: c.subject,
        description: c.description,
        category: c.category,
        status: c.status,
        date: fmtDate(c.createdAt),
        time: fmtTime(c.createdAt),
      })),
    [rows]
  );
  const tabs = TAB_LABELS.map((label) => ({
    label,
    count: label === "All" ? complaints.length : complaints.filter((c) => c.status === label).length,
  }));

  const [activeTab, setActiveTab] = useState("All");
  const [userFilter, setUserFilter] = useState("All Users");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [search, setSearch] = useState("");

  const openComplaint = (id) => {
    navigate(`/admin/complaints/${id.replace("#", "")}`);
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const matchesTab =
        activeTab === "All" || item.status === activeTab;

      const matchesUser =
        userFilter === "All Users" || item.role === userFilter;

      const matchesCategory =
        categoryFilter === "All Categories" ||
        item.category === categoryFilter;

      const matchesSearch =
        `${item.id} ${item.name} ${item.subject} ${item.description}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesTab &&
        matchesUser &&
        matchesCategory &&
        matchesSearch
      );
    });
  }, [complaints, activeTab, userFilter, categoryFilter, search]);

  return (
    <section className="w-full min-w-0 bg-transparent text-gray-800">

      {error && (
        <p role="alert" className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      {/* COMPLAINTS PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Complaints
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          View and manage all student, parent and tutor complaints.
        </p>
      </div>

      {/* STATUS TABS AND FILTERS */}
      <div className="mb-4">
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">

          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border px-3.5 text-xs font-medium transition-colors ${
                activeTab === tab.label
                  ? "border-blue-800 bg-blue-800 text-white"
                  : "border-gray-200 bg-transparent text-gray-800 hover:border-gray-400"
              }`}
            >
              <span>{tab.label}</span>
              <span className={activeTab === tab.label ? "text-blue-100" : "text-gray-600"}>
                ({tab.count})
              </span>
            </button>
          ))}

          <div className="relative shrink-0">
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="h-9 min-w-[105px] appearance-none rounded-md border border-gray-200 bg-transparent pl-3 pr-8 text-xs text-gray-800 outline-none hover:border-gray-400 focus:border-blue-500"
            >
              <option>All Users</option>
              <option>Parent</option>
              <option>Student</option>
              <option>Tutor</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-3 text-gray-500" />
          </div>

          <div className="relative shrink-0">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 min-w-[130px] appearance-none rounded-md border border-gray-200 bg-transparent pl-3 pr-8 text-xs text-gray-800 outline-none hover:border-gray-400 focus:border-blue-500"
            >
              <option>All Categories</option>
              {Object.keys(categoryStyles).map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-3 text-gray-500" />
          </div>
        </div>
      </div>

      {/* DATE FILTER */}
      <div className="mb-5">
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-transparent px-3 text-xs font-medium text-gray-700 hover:border-gray-400"
        >
          <CalendarDays size={15} className="text-gray-600" />
          <span>Oct 1, 2026 – Oct 31, 2026</span>
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex h-11 w-full max-w-md items-center gap-3 rounded-md border border-gray-200 px-3 focus-within:border-blue-500">
          <Search size={18} className="shrink-0 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search complaints..."
            className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
              <X size={17} className="text-gray-400 hover:text-gray-700" />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600">
          {filteredComplaints.length} complaints found
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-200 md:block">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-semibold text-gray-600">
              <th className="px-4 py-4">ID</th>
              <th className="px-4 py-4">Complainant</th>
              <th className="px-4 py-4">Subject</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Date Submitted</th>
              <th className="px-4 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.map((item) => (
              <tr
                key={item.id}
                onClick={() => openComplaint(item.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openComplaint(item.id);
                }}
                className="cursor-pointer border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/60 focus:outline-none focus:bg-gray-50"
              >
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                  {item.id}
                </td>

                <td className="min-w-[180px] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </td>

                <td className="min-w-[230px] px-4 py-4">
                  <p className="text-sm font-medium text-gray-800">{item.subject}</p>
                  <p className="mt-1 max-w-[260px] truncate text-xs text-gray-500">
                    {item.description}
                  </p>
                </td>

                <td className="px-4 py-4"><Badge>{item.category}</Badge></td>
                <td className="px-4 py-4"><Badge type="status">{item.status}</Badge></td>

                <td className="whitespace-nowrap px-4 py-4">
                  <p className="text-sm text-gray-700">{item.date}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.time}</p>
                </td>

                <td className="px-4 py-4 text-right">
                  <ChevronRight size={18} className="ml-auto text-gray-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading ? (
          <p className="py-14 text-center text-sm text-gray-500">Loading complaints…</p>
        ) : (
          filteredComplaints.length === 0 && <EmptyState />
        )}
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-3 md:hidden">
        {filteredComplaints.map((item) => (
          <article
            key={item.id}
            onClick={() => openComplaint(item.id)}
            className="cursor-pointer rounded-lg border border-gray-200 bg-transparent p-4 transition-colors hover:border-gray-300 active:bg-gray-50"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {item.id} · {item.role}
                  </p>
                </div>
              </div>
              <ChevronRight size={19} className="shrink-0 text-gray-500" />
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-900">{item.subject}</h3>
              <p className="mt-1.5 text-sm leading-5 text-gray-600">{item.description}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge>{item.category}</Badge>
              <Badge type="status">{item.status}</Badge>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-500">Submitted on</p>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {item.date} · {item.time}
              </p>
            </div>
          </article>
        ))}

        {loading ? (
          <p className="py-14 text-center text-sm text-gray-500">Loading complaints…</p>
        ) : (
          filteredComplaints.length === 0 && <EmptyState />
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <p>Showing {filteredComplaints.length} of {complaints.length} complaints</p>
        <p>Updated recently</p>
      </div>
    </section>
  );
}
