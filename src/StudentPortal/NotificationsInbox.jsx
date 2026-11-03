import React, { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { api } from "../lib/api";

const timeAgo = (date) => {
  const mins = Math.round((Date.now() - new Date(date)) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

export default function NotificationsInbox() {
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/notifications")
      .then((res) => {
        setItems(res.items);
        setUnread(res.unread);
      })
      .catch((err) => setError(err.message || "Could not load notifications."))
      .finally(() => setLoading(false));
  }, []);

  const markRead = async (ids) => {
    await api.post("/notifications/read", ids ? { ids } : {});
    setItems((prev) =>
      prev.map((n) => (!ids || ids.includes(n.id) ? { ...n, readAt: n.readAt ?? new Date().toISOString() } : n))
    );
    setUnread((u) => (ids ? Math.max(0, u - ids.length) : 0));
  };

  return (
    <section className="w-full max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Notifications</h2>
        {unread > 0 && (
          <button
            type="button"
            onClick={() => markRead()}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </button>
        )}
      </div>

      {error && <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {loading && <p className="py-8 text-center text-sm text-slate-400">Loading…</p>}
      {!loading && !error && items.length === 0 && (
        <div className="rounded-3xl border border-slate-100 bg-white py-12 text-center shadow-sm">
          <Bell className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-2 text-sm text-slate-500">You have no notifications yet.</p>
        </div>
      )}

      {items.length > 0 && (
        <ul className="divide-y divide-slate-100 rounded-3xl border border-slate-100 bg-white shadow-sm">
          {items.map((n) => (
            <li
              key={n.id}
              onClick={() => !n.readAt && markRead([n.id])}
              className={`flex cursor-pointer items-start gap-3 px-5 py-4 first:rounded-t-3xl last:rounded-b-3xl hover:bg-slate-50 ${
                n.readAt ? "" : "bg-indigo-50/40"
              }`}
            >
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.readAt ? "bg-transparent" : "bg-indigo-600"}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                {n.body && <p className="mt-0.5 text-sm text-slate-500">{n.body}</p>}
              </div>
              <span className="shrink-0 text-xs text-slate-400">{timeAgo(n.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
