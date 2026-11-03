
import React, { useState } from "react";
import { LockKeyhole, X } from "lucide-react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

// Change-password modal: POST /account/change-password
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
      await api.post("/account/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setDone(true);
    } catch (err) {
      setError(err.message || "Could not change your password.");
    } finally {
      setSaving(false);
    }
  };

  const field = "h-10 w-full rounded-md border border-[#DCDCDC] px-3 text-[12px] outline-none focus:border-[#A5B4C8]";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Change password</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        {done ? (
          <>
            <p className="text-sm text-emerald-600">Your password has been updated.</p>
            <button type="button" onClick={onClose} className="w-full rounded-md bg-[#087333] py-2.5 text-sm font-semibold text-white">Done</button>
          </>
        ) : (
          <>
            <input type="password" placeholder="Current password" autoComplete="current-password" value={form.currentPassword} onChange={set("currentPassword")} className={field} />
            <input type="password" placeholder="New password" autoComplete="new-password" value={form.newPassword} onChange={set("newPassword")} className={field} />
            <input type="password" placeholder="Confirm new password" autoComplete="new-password" value={form.confirm} onChange={set("confirm")} className={field} />
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={saving} className="w-full rounded-md bg-[#087333] py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving…" : "Update password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}


export default function AccountSecurity({ onChangePassword }) {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // 2FA / login alerts have no backend yet, so they stay as local toggles.
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(false);

  const inputClass =
    "h-[35px] w-full min-w-0 rounded-[6px] border border-[#DCDCDC] bg-white px-3 text-[11px] font-normal text-[#171717] outline-none transition focus:border-[#A5B4C8]";

  const labelClass =
    "mb-[7px] block text-[11px] font-normal leading-[15px] text-[#788391]";

  // REUSABLE SECURITY SWITCH
  const ToggleSwitch = ({ enabled, onToggle, label }) => (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onToggle(!enabled)}
      className={`relative flex h-[17px] w-[28px] shrink-0 items-center rounded-full transition-colors duration-200 ${
        enabled ? "bg-[#087333]" : "bg-[#C8CDD5]"
      }`}
    >
      <span
        className={`absolute h-[11px] w-[11px] rounded-full bg-white shadow-sm transition-all duration-200 ${
          enabled ? "left-[14px]" : "left-[3px]"
        }`}
      />
    </button>
  );

  return (
    <section className="w-full">

      {/* ACCOUNT & SECURITY CARD */}
      <div className="min-h-[188px] w-full max-w-[1093px] rounded-[10px] border border-[#F0F1F4] bg-white p-4 sm:p-5">

        <div className="grid h-full grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">

          {/* LEFT SECTION */}
          <div className="flex items-start gap-4 border-b border-[#F0F1F4] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">

            {/* SECURITY ICON */}
            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#E0F4E6]">
              <LockKeyhole
                size={19}
                strokeWidth={1.8}
                className="text-[#17652F]"
              />
            </div>

            {/* TITLE AND DESCRIPTION */}
            <div className="min-w-0 pt-[1px]">

              <h2 className="text-[16px] font-semibold leading-[21px] tracking-[-0.2px] text-[#111111]">
                Account & Security
              </h2>

              <p className="mt-[2px] max-w-[190px] text-[11px] font-normal leading-[15px] text-[#788391]">
                Manage your account, password and security settings.
              </p>

            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-5 pt-5 lg:grid-cols-8 lg:pl-[15px] lg:pt-[9px]">

            {/* ADMIN NAME */}
            <div className="min-w-0 lg:col-span-4">

              <label className={labelClass}>
                Admin Name
              </label>

              <input
                type="text"
                name="adminName"
                defaultValue={user?.fullName || ""}
                readOnly
                className={inputClass}
              />

            </div>

            {/* ADMIN EMAIL */}
            <div className="min-w-0 lg:col-span-4">

              <label className={labelClass}>
                Admin Email
              </label>

              <input
                type="email"
                name="adminEmail"
                defaultValue={user?.email || ""}
                readOnly
                className={inputClass}
              />

            </div>

            {/* CHANGE PASSWORD */}
            <div className="flex min-w-0 flex-col gap-2 lg:col-span-2">

              <h3 className="text-[11px] font-semibold leading-[15px] text-[#171717]">
                Change Password
              </h3>

              <button
                type="button"
                onClick={() => (onChangePassword ? onChangePassword() : setShowPassword(true))}
                className="h-[35px] w-full max-w-[130px] rounded-[6px] border border-[#DCDCDC] bg-white px-3 text-[11px] font-medium text-[#171717] transition hover:border-[#A5B4C8] hover:bg-[#F9FAFB] active:bg-[#F1F3F5]"
              >
                Change Password
              </button>

            </div>

            {/* TWO-FACTOR AUTHENTICATION */}
            <div className="flex min-w-0 flex-col gap-2 border-t border-[#F0F1F4] pt-4 lg:col-span-3 lg:border-l lg:border-t-0 lg:py-2 lg:pl-3 lg:pt-0">

              <div className="flex items-center justify-between gap-2">

                <h3 className="text-[11px] font-semibold leading-[15px] text-[#171717]">
                  Two-factor authentication (2FA)
                </h3>

                <ToggleSwitch
                  enabled={twoFactorEnabled}
                  onToggle={setTwoFactorEnabled}
                  label="Two-factor authentication"
                />

              </div>

              <p className="max-w-[180px] text-[10px] font-normal leading-[15px] text-[#788391]">
                Add an extra layer of security to your account.
              </p>

            </div>

            {/* LOGIN ALERTS */}
            <div className="flex min-w-0 flex-col gap-2 border-t border-[#F0F1F4] pt-4 lg:col-span-3 lg:border-l lg:border-t-0 lg:py-2 lg:pl-3 lg:pt-0">

              <div className="flex items-center justify-between gap-2">

                <h3 className="text-[11px] font-semibold leading-[15px] text-[#171717]">
                  Login alerts
                </h3>

                <ToggleSwitch
                  enabled={loginAlertsEnabled}
                  onToggle={setLoginAlertsEnabled}
                  label="Login alerts"
                />

              </div>

              <p className="max-w-[180px] text-[10px] font-normal leading-[15px] text-[#788391]">
                Get notified of new login attempts on your account.
              </p>

            </div>

          </div>
        </div>
      </div>
          {showPassword && <ChangePasswordModal onClose={() => setShowPassword(false)} />}
    </section>
  );
}
