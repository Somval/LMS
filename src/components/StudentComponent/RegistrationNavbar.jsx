import React from "react";

export default function RegistrationNavbar() {
  return (
    <header className="w-full border-b border-[#F1F3F7] bg-white">
      <div
        className="
          flex
          min-h-[60px]
          w-full
          items-center
          justify-end
          px-4

          sm:min-h-[68px]
          sm:px-6

          lg:min-h-[64px]
          lg:px-8
        "
      >
        <p
          className="
            whitespace-nowrap
            text-[11px]
            font-medium
            text-[#8B94AD]

            sm:text-xs
          "
        >
          Already have an account?
          <a
            href="/student-auth/login"
            className="
              ml-1
              font-semibold
              text-[#3C2EFF]
              transition-colors
              hover:text-[#3224d6]
            "
          >
            Log in
          </a>
        </p>
      </div>
    </header>
  );
}