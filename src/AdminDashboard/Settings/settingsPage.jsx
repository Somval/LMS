
import AccountSecurity from "./AccountSecurity";
import GeneralSettings from "./General";
import Notifications from "./Notifications";
import UserManagement from "./UserManagement";

export default function Settings() {
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

        {/* SETTINGS SECTIONS */}
        <div className="flex w-full flex-col gap-5">

          {/* GENERAL SETTINGS */}
          <GeneralSettings />

          {/* ACCOUNT & SECURITY */}
          <AccountSecurity />

          {/* USER MANAGEMENT */}
          <UserManagement />

          {/* NOTIFICATIONS */}
          <Notifications />

        </div>

      </div>
    </main>
  );
}
