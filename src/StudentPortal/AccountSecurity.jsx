import React, { useState } from "react";
import { Lock, Users, ChevronRight, X } from "lucide-react";
import { api } from "../lib/api";

function ChangePasswordModal({ onClose }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError(""); };

  const submit = async (e) => {
    e.preventDefault();
    if (saving) return;
    if (form.newPassword !== form.confirm) return setError("The new passwords do not match.");
    if (form.newPassword.length < 8 || !/[A-Za-z]/.test(form.newPassword) || !/\d/.test(form.newPassword)) {
      return setError("The new password must be at least 8 characters with a letter and a number.");
    }
    setSaving(true);
    try {
      await api.post("/account/change-password", { currentPassword: form.currentPassword, newPassword: form.newPassword });
      setDone(true);
    } catch (err) {
      setError(err.message || "Could not change your password.");
    } finally {
      setSaving(false);
    }
  };

  const field = "h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Change password</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-slate-400 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        {done ? (
          <>
            <p className="text-sm text-emerald-600">Your password has been updated.</p>
            <button type="button" onClick={onClose} className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">Done</button>
          </>
        ) : (
          <>
            <input type="password" placeholder="Current password" autoComplete="current-password" value={form.currentPassword} onChange={set("currentPassword")} className={field} />
            <input type="password" placeholder="New password" autoComplete="new-password" value={form.newPassword} onChange={set("newPassword")} className={field} />
            <input type="password" placeholder="Confirm new password" autoComplete="new-password" value={form.confirm} onChange={set("confirm")} className={field} />
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={saving} className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving…" : "Update password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default function AccountSecurity() {
  const [showPassword, setShowPassword] = useState(false);

  const handleCardClick = (actionName) => {
    if (actionName === "Change Password") setShowPassword(true);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      {showPassword && <ChangePasswordModal onClose={() => setShowPassword(false)} />}

      {/* Section Header */}
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Account & Security
      </h2>

      {/* Action Cards Grid */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">

        {/* Change Password Card */}
        <button
          type="button"
          onClick={() => handleCardClick("Change Password")}
          className="
            group
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            p-5
            text-left
            transition-all
            outline-none
            hover:border-blue-300
            hover:shadow-sm
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <div className="flex min-w-0 items-center gap-4">

            {/* Icon */}
            <div
              className="
                shrink-0
                rounded-xl
                bg-blue-50/50
                p-3
                text-blue-600
                transition-colors
                group-hover:bg-blue-100/50
              "
            >
              <Lock className="h-6 w-6" />
            </div>

            {/* Text */}
            <div className="flex min-w-0 flex-col">
              <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                Change Password
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Update your password regularly
              </p>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight
            className="
              ml-4
              h-5
              w-5
              shrink-0
              text-slate-400
              transition-all
              group-hover:translate-x-1
              group-hover:text-blue-600
            "
          />
        </button>

        {/* Linked Accounts Card */}
        <button
          type="button"
          onClick={() => handleCardClick("Linked Accounts")}
          className="
            group
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            p-5
            text-left
            transition-all
            outline-none
            hover:border-blue-300
            hover:shadow-sm
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <div className="flex min-w-0 items-center gap-4">

            {/* Icon */}
            <div
              className="
                shrink-0
                rounded-xl
                bg-blue-50/50
                p-3
                text-blue-600
                transition-colors
                group-hover:bg-blue-100/50
              "
            >
              <Users className="h-6 w-6" />
            </div>

            {/* Text */}
            <div className="flex min-w-0 flex-col">
              <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                Linked Accounts
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                View parent or guardian linked to your profile
              </p>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight
            className="
              ml-4
              h-5
              w-5
              shrink-0
              text-slate-400
              transition-all
              group-hover:translate-x-1
              group-hover:text-blue-600
            "
          />
        </button>

      </div>
    </div>
  );
}