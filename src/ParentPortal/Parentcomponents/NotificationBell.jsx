import React, { useCallback, useEffect, useRef, useState } from "react";
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

// Bell in the parent top bar: GET /notifications, POST /notifications/read.
export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const wrapRef = useRef(null);

  const load = useCallback(() => {
    api
      .get("/notifications")
      .then((res) => {
        setItems(res.items);
        setUnread(res.unread);
        setError("");
      })
      .catch((err) => setError(err.message || "Could not load notifications."))
      .finally(() => setLoading(false));
  }, []);

  // Load once, then refresh every minute so the badge stays current.
  useEffect(() => {
    load();
    const timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, [load]);

  // Close when clicking outside or pressing Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => wrapRef.current && !wrapRef.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const markRead = async (ids) => {
    try {
      await api.post("/notifications/read", ids ? { ids } : {});
      setItems((prev) =>
        prev.map((n) => (!ids || ids.includes(n.id) ? { ...n, readAt: n.readAt ?? new Date().toISOString() } : n))
      );
      setUnread((u) => (ids ? Math.max(0, u - ids.length) : 0));
    } catch (err) {
      setError(err.message || "Could not update notifications.");
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-label={unread > 0 ? `View notifications (${unread} unread)` : "View notifications"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors duration-200"
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
        {unread > 0 && (
          <span className="absolute top-[2px] right-[2px] sm:top-[4px] sm:right-[4px] min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold leading-none text-white ring-2 ring-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-slate-100 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
            {unread > 0 && (
              <button
                type="button"
                onClick={() => markRead()}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                <CheckCheck className="h-3.5 w-3.5" /> Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {error && <p className="m-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
            {loading && <p className="py-8 text-center text-sm text-slate-400">Loading…</p>}
            {!loading && !error && items.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">You have no notifications yet.</p>
            )}
            <ul className="divide-y divide-slate-100">
              {items.map((n) => (
                <li
                  key={n.id}
                  onClick={() => !n.readAt && markRead([n.id])}
                  className={`flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-slate-50 ${n.readAt ? "" : "bg-indigo-50/40"}`}
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.readAt ? "bg-transparent" : "bg-indigo-600"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                    {n.body && <p className="mt-0.5 text-xs text-slate-500">{n.body}</p>}
                  </div>
                  <span className="shrink-0 text-[11px] text-slate-400">{timeAgo(n.createdAt)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
