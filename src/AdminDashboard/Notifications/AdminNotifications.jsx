import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck } from "lucide-react";
import { api } from "../../lib/api";

const timeAgo = (date) => {
  const mins = Math.round((Date.now() - new Date(date)) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

// Where a notification should take the admin. Notifications only carry a title and a message,
// so the page is worked out from the title the backend writes.
const destinationFor = (n) => {
  const complaint = n.title.match(/complaint #(\d+)/i);
  if (complaint) return `/admin/complaints/${complaint[1]}`;
  if (/tutor application/i.test(n.title)) return "/admin/users/applications";
  if (/bank transfer|payment/i.test(n.title)) return "/admin/revenue-payments";
  return null;
};

// The bell in the header listens for this to refresh its unread count.
const announceChange = () => window.dispatchEvent(new Event("notifications-changed"));

export default function AdminNotifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [tab, setTab] = useState("all"); // "all" | "unread"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await api.get("/notifications");
      setItems(res.items);
      setUnread(res.unread);
      setError("");
    } catch (err) {
      setError(err.message || "Could not load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (ids) => {
    try {
      await api.post("/notifications/read", ids ? { ids } : {});
      setItems((prev) =>
        prev.map((n) => (!ids || ids.includes(n.id) ? { ...n, readAt: n.readAt ?? new Date().toISOString() } : n))
      );
      setUnread((u) => (ids ? Math.max(0, u - ids.length) : 0));
      announceChange();
    } catch (err) {
      setError(err.message || "Could not update your notifications.");
    }
  };

  const open = async (n) => {
    if (!n.readAt) await markRead([n.id]);
    const to = destinationFor(n);
    if (to) navigate(to);
  };

  const shown = useMemo(() => (tab === "unread" ? items.filter((n) => !n.readAt) : items), [items, tab]);

  return (
    <section className="w-full min-w-0 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#171717]">Notifications</h1>
            <p className="mt-0.5 text-sm text-[#6B7280]">
              {unread > 0 ? `${unread} unread` : "You're all caught up."}
            </p>
          </div>

          {unread > 0 && (
            <button
              type="button"
              onClick={() => markRead()}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#159A42] hover:text-[#0F7A33]"
            >
              <CheckCheck className="h-4 w-4" /> Mark all as read
            </button>
          )}
        </div>

        <div className="mb-3 flex gap-2" role="tablist" aria-label="Filter notifications">
          {[
            ["all", "All"],
            ["unread", "Unread"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                tab === key ? "bg-[#159A42] text-white" : "bg-[#F2F4F8] text-[#475467] hover:bg-[#E6EBF4]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <p role="alert" className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {loading && <p className="py-10 text-center text-sm text-[#9CA3AF]">Loading…</p>}

        {!loading && !error && shown.length === 0 && (
          <div className="rounded-xl border border-[#E9ECF2] bg-white py-12 text-center">
            <Bell className="mx-auto h-8 w-8 text-[#CBD2DC]" />
            <p className="mt-2 text-sm text-[#6B7280]">
              {tab === "unread" ? "No unread notifications." : "You have no notifications yet."}
            </p>
          </div>
        )}

        {shown.length > 0 && (
          <ul className="divide-y divide-[#F0F1F4] overflow-hidden rounded-xl border border-[#E9ECF2] bg-white">
            {shown.map((n) => {
              const to = destinationFor(n);
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => open(n)}
                    className={`flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-[#FAFBFF] ${
                      n.readAt ? "" : "bg-[#F1FAF4]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.readAt ? "bg-transparent" : "bg-[#159A42]"}`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-[#171717]">{n.title}</span>
                      {n.body && <span className="mt-0.5 block break-words text-sm text-[#6B7280]">{n.body}</span>}
                      {to && <span className="mt-1 block text-xs font-medium text-[#159A42]">View details</span>}
                    </span>
                    <span className="shrink-0 text-xs text-[#9CA3AF]">{timeAgo(n.createdAt)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
