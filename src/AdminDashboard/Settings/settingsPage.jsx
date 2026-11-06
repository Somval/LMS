import { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import AccountSecurity from "./AccountSecurity";
import GeneralSettings from "./General";
import Notifications from "./Notifications";
import UserManagement from "./UserManagement";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Settings() {
  const [saved, setSaved] = useState(null); // what the server has
  const [draft, setDraft] = useState(null); // what the admin is editing
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: "ok" | "error", text }

  useEffect(() => {
    let cancelled = false;
    api
      .get("/admin/settings")
      .then((data) => {
        if (cancelled) return;
        setSaved(data);
        setDraft(data);
      })
      .catch((err) => !cancelled && setLoadError(err.message || "Could not load settings."));
    return () => {
      cancelled = true;
    };
  }, []);

  const dirty = useMemo(() => JSON.stringify(saved) !== JSON.stringify(draft), [saved, draft]);

  // Updates one group (general, registration, notifications, admin) of the draft.
  const patch = (group) => (changes) => {
    setMessage(null);
    setDraft((d) => ({ ...d, [group]: { ...d[group], ...changes } }));
  };

  const save = async () => {
    if (saving || !dirty) return;
    const g = draft.general;
    if (!g.platformName.trim()) return setMessage({ type: "error", text: "Platform name is required." });
    if (!EMAIL_RE.test(g.supportEmail.trim())) return setMessage({ type: "error", text: "Enter a valid support email." });

    setSaving(true);
    setMessage(null);
    try {
      const data = await api.put("/admin/settings", draft);
      setSaved(data);
      setDraft(data);
      setMessage({ type: "ok", text: "Settings saved." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Could not save settings." });
    } finally {
      setSaving(false);
    }
  };

  const discard = () => {
    setDraft(saved);
    setMessage(null);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F5F7FC] px-3 py-5 sm:px-5 sm:py-6 lg:px-6">
      <div className="mx-auto w-full">
        {/* PAGE HEADER */}
        <header className="mb-5">
          <h1 className="text-[24px] font-bold leading-[32px] tracking-[-0.8px] text-[#111827] sm:text-[26px] sm:leading-[34px]">
            Settings
          </h1>
          <p className="mt-1 text-[13px] font-normal leading-[21px] tracking-[0.05px] text-[#64748B] sm:text-[14px]">
            Manage your platform settings and preferences.
          </p>
        </header>

        {loadError && (
          <p role="alert" className="mb-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {loadError}
          </p>
        )}

        {!draft && !loadError && <p className="text-sm text-[#64748B]">Loading settings…</p>}

        {draft && (
          <>
            {/* SETTINGS SECTIONS */}
            <div className="flex w-full flex-col gap-5">
              <GeneralSettings value={draft.general} onChange={patch("general")} />
              <AccountSecurity value={draft.admin} onChange={patch("admin")} />
              <UserManagement value={draft.registration} onChange={patch("registration")} />
              <Notifications value={draft.notifications} onChange={patch("notifications")} />
            </div>

            {/* SAVE BAR */}
            <div className="sticky bottom-0 -mx-3 mt-5 flex max-w-[1093px] flex-wrap items-center justify-end gap-3 border-t border-[#F0F1F4] bg-[#F5F7FC]/95 px-3 py-3 backdrop-blur sm:mx-0 sm:px-0">
              {message && (
                <p
                  role={message.type === "error" ? "alert" : "status"}
                  className={`mr-auto text-[12px] ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}
                >
                  {message.text}
                </p>
              )}
              <button
                type="button"
                onClick={discard}
                disabled={!dirty || saving}
                className="h-[35px] rounded-[6px] border border-[#DCDCDC] bg-white px-4 text-[12px] font-medium text-[#171717] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={save}
                disabled={!dirty || saving}
                className="h-[35px] rounded-[6px] bg-[#087333] px-5 text-[12px] font-semibold text-white transition hover:bg-[#065c29] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
