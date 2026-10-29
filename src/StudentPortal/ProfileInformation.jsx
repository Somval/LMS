
import React, { useState } from "react";
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

  const [profile, setProfile] = useState({
    fullName: "Amaka Johnson",
    email: "amaka@gmail.com",
    phone: "+234 801 234 5678",
    learnerId: "11111ID",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
  });

  const [savedProfile, setSavedProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    if (isEditing) {
      setSavedProfile(profile);
      setIsEditing(false);
      return;
    }

    setSavedProfile(profile);
    setIsEditing(true);
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

          <div className="grid grid-cols-1 gap-5 md:grid-cols-[125px_minmax(0,1fr)] md:gap-5">
            {/* Profile Photo and Button */}
            <div className="flex flex-col items-center gap-3 md:items-start">
              <div className="relative ml-0 md:ml-3">
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="h-[86px] w-[86px] rounded-full object-cover"
                />

                <button
                  type="button"
                  disabled={!isEditing}
                  title="Change profile photo"
                  aria-label="Change profile photo"
                  className="absolute -bottom-0.5 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#E4E7ED] bg-white text-[#61758E] shadow-sm transition hover:text-blue-600 disabled:cursor-default"
                >
                  <Camera size={15} strokeWidth={1.6} />
                </button>
              </div>

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
                    disabled={!isEditing}
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
