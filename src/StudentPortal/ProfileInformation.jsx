
import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Avatar, { forgetAvatar } from "../components/Avatar";
import {
  User,
  Mail,
  Phone,
  Camera,
  Edit3,
  Check,
  X,
} from "lucide-react";

import AccountSecurity from "./AccountSecurity";
import NotificationsSettings from "./Notifications";
import PrivacySupportAccount from "./PrivacySupportAccount";

export default function ProfileInformation() {
  const [isEditing, setIsEditing] = useState(false);

  const { updateUser } = useAuth();
  const [profile, setProfile] = useState({ fullName: "", email: "", phone: "", learnerId: "" });
  const [savedProfile, setSavedProfile] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const fileInput = React.useRef(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    api
      .get("/auth/me")
      .then((me) => {
        const loaded = {
          fullName: me.fullName,
          email: me.email,
          phone: me.phoneNumber ?? "",
          learnerId: me.learnerId ?? "",
        };
        setAvatarUrl(me.avatarUrl ?? null);
        setProfile(loaded);
        setSavedProfile(loaded);
      })
      .catch((err) => setMessage({ type: "error", text: err.message || "Could not load your profile." }));
  }, []);

  const choosePhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again later
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return setMessage({ type: "error", text: "Please choose a JPG, PNG or WebP image." });
    }
    if (file.size > 5 * 1024 * 1024) {
      return setMessage({ type: "error", text: "The photo must not be larger than 5 MB." });
    }
    setPhotoBusy(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await api.upload("/account/avatar", file);
      forgetAvatar(avatarUrl);
      setAvatarUrl(res.avatarUrl);
      updateUser({ avatarUrl: res.avatarUrl });
      setMessage({ type: "success", text: "Profile photo updated." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Could not upload your photo." });
    } finally {
      setPhotoBusy(false);
    }
  };

  const removePhoto = async () => {
    setPhotoBusy(true);
    try {
      await api.delete("/account/avatar");
      forgetAvatar(avatarUrl);
      setAvatarUrl(null);
      updateUser({ avatarUrl: null });
      setMessage({ type: "success", text: "Profile photo removed." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Could not remove your photo." });
    } finally {
      setPhotoBusy(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    if (!isEditing) {
      setSavedProfile(profile);
      setMessage({ type: "", text: "" });
      setIsEditing(true);
      return;
    }
    if (saving) return;
    if (profile.fullName.trim().length < 2) {
      return setMessage({ type: "error", text: "Enter your full name." });
    }
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      const updated = await api.patch("/account/profile", {
        fullName: profile.fullName.trim(),
        phoneNumber: profile.phone.trim() || undefined,
      });
      const next = { ...profile, fullName: updated.fullName, phone: updated.phoneNumber ?? "" };
      setProfile(next);
      setSavedProfile(next);
      updateUser({ fullName: updated.fullName });
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Could not save your profile." });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setIsEditing(false);
  };

  const inputClass = `h-9 w-full rounded-[9px] border border-[#E2E2E2] bg-white py-2 pl-9 pr-3 text-[12px] font-normal text-[#202020] outline-none transition-colors disabled:cursor-default disabled:bg-white focus:border-[#A5BFFF]`;

  return (
    <main className="min-h-screen w-full bg-[#F5F6FC] font-sans">
      <div className="w-full p-3 sm:p-4 lg:p-[10px_14px]">
        {/* Profile Information Card */}
        <section className="w-full rounded-[7px] border border-[#E7E8EF] bg-white px-4 py-3 sm:px-5">
          <h2 className="mb-2 text-[15px] font-semibold leading-5 text-[#171717]">
            Profile Information
          </h2>

          {message.text && (
            <p role={message.type === "error" ? "alert" : "status"}
               className={`mb-2 text-[12px] ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}>
              {message.text}
            </p>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-[125px_minmax(0,1fr)] md:gap-5">
            {/* Profile Photo and Button */}
            <div className="flex flex-col items-center gap-3 md:items-start">
              <div className="relative ml-0 md:ml-3">
                <Avatar name={profile.fullName} avatarUrl={avatarUrl} className="h-[86px] w-[86px] rounded-full" textClassName="text-2xl" />

                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  disabled={photoBusy}
                  title="Change profile photo"
                  aria-label="Change profile photo"
                  className="absolute -bottom-0.5 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#E4E7ED] bg-white text-[#61758E] shadow-sm transition hover:text-blue-600 disabled:opacity-60"
                >
                  <Camera size={15} strokeWidth={1.6} />
                </button>
                <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={choosePhoto} />
              </div>
              {avatarUrl && (
                <button type="button" onClick={removePhoto} disabled={photoBusy}
                  className="text-[10px] font-medium text-[#8585B1] underline hover:text-red-600 disabled:opacity-60 md:ml-3">
                  Remove photo
                </button>
              )}


              <button
                type="button"
                onClick={handleEdit}
                className={`flex h-[29px] w-[103px] items-center justify-center gap-2 rounded-[5px] border text-[10px] font-medium transition-colors ${
                  isEditing
                    ? "border-[#159A42] bg-[#159A42] text-white hover:bg-[#128438]"
                    : "border-[#477BFF] bg-white text-[#2865FF] hover:bg-[#F5F8FF]"
                }`}
              >
                {isEditing ? (
                  <>
                    <Check size={13} strokeWidth={1.8} />
                    <span>Save Profile</span>
                  </>
                ) : (
                  <>
                    <Edit3 size={13} strokeWidth={1.7} />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1 text-[11px] text-[#707070] hover:text-[#222222]"
                >
                  <X size={13} />
                  Cancel
                </button>
              )}
            </div>

            {/* Profile Fields */}
            <div className="grid min-w-0 grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
              {/* Full Name */}
              <div className="min-w-0">
                <label
                  htmlFor="fullName"
                  className="mb-[7px] block text-[12px] font-medium leading-[14px] text-[#8585B1]"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={15}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]"
                  />
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="min-w-0">
                <label
                  htmlFor="email"
                  className="mb-[7px] block text-[12px] font-medium leading-[14px] text-[#8585B1]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={15}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]"
                  />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled readOnly
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="min-w-0">
                <label
                  htmlFor="phone"
                  className="mb-[7px] block text-[12px] font-medium leading-[14px] text-[#8585B1]"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={15}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]"
                  />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Learner ID */}
              <div className="min-w-0">
                <label
                  htmlFor="learnerId"
                  className="mb-[7px] block text-[12px] font-medium leading-[14px] text-[#8585B1]"
                >
                  Learner ID
                </label>

                <input
                  id="learnerId"
                  type="text"
                  name="learnerId"
                  value={profile.learnerId}
                  disabled
                  readOnly
                  className="h-9 w-full rounded-[9px] border border-[#E2E2E2] bg-white px-3 text-[12px] font-normal text-[#202020] outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Other Account Sections */}
        <div className="mt-5 flex w-full flex-col gap-5">
          <AccountSecurity />
          <NotificationsSettings />
          <PrivacySupportAccount />
        </div>
      </div>
    </main>
  );
}
