import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Users,
  UserRound,
  ArrowLeft,
} from "lucide-react";

import StudentImage from "../assets/images/a91aa928c569b30aaea81469aa8ddb1fe46ed665 (2).jpg";
import TutorImage from "../assets/images/TutorImage.png";
import ParentImage from "../assets/images/5d90f09d-076d-45a5-bbdb-e590a233a93e.jfif";

const roles = [
  {
    id: "student",
    title: "Student",
    description:
      "Access lessons, complete assignments and track your learning progress.",
    icon: BookOpen,
    image: StudentImage,
    imagePosition: "center 40%",
  },
  {
    id: "parent",
    title: "Parent",
    description:
      "Manage learner profiles, choose courses and monitor your child's progress.",
    icon: Users,
    image: ParentImage,
    imagePosition: "center 35%",
  },
  {
    id: "tutor",
    title: "Tutor",
    description:
      "Manage classes, teach students and monitor academic performance.",
    icon: UserRound,
    image: TutorImage,
    imagePosition: "center 35%",
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("parent");

  const selectedRoleData = roles.find(
    (role) => role.id === selectedRole
  );

  const handleContinue = () => {
    const routes = {
      student: "/student/onboarding",
      parent: "/parent/onboarding",
      tutor: "/tutor/onboarding",
    };

    navigate(routes[selectedRole]);
  };

  return (
    <main className="min-h-screen bg-[#fff8f6] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col">

        {/* HEADER */}
        <header className="flex items-center justify-end">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#6344E3] sm:text-base"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back to home
          </Link>
        </header>

        {/* MAIN CONTENT */}
        <section className="flex flex-1 flex-col justify-center py-9 sm:py-12 lg:py-14">
          <div className="mx-auto w-full max-w-5xl">

            {/* HEADING */}
            <div className="mb-8 text-center sm:mb-10">
              <h1 className="text-[27px] font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[42px]">
                How will you use the platform?
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-gray-500 sm:text-base">
                Select the account type that best describes you.
              </p>
            </div>

            {/* ROLE CARDS */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    aria-pressed={isSelected}
                    className={`
                      group relative overflow-hidden rounded-2xl
                      border bg-white text-left
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-lg
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#6344E3]
                      focus-visible:ring-offset-2

                      ${
                        isSelected
                          ? "border-[#30317f] ring-1 ring-[#30317f] shadow-md shadow-[#30317f]/10"
                          : "border-gray-200 shadow-sm hover:border-[#30317f]/50"
                      }
                    `}
                  >
                    {/* IMAGE */}
                    <div className="relative h-44 overflow-hidden sm:h-40 lg:h-48">
                      <img
                        src={role.image}
                        alt={`${role.title} account`}
                        loading="lazy"
                        style={{
                          objectPosition: role.imagePosition,
                        }}
                        className="
                          h-full w-full object-cover
                          transition-transform duration-500
                          group-hover:scale-[1.04]
                        "
                      />

                      {/* IMAGE OVERLAY */}
                      <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/5" />

                      {/* SELECTION INDICATOR */}
                      <div
                        className={`
                          absolute right-4 top-4
                          flex h-8 w-8 items-center justify-center
                          rounded-full shadow-sm
                          transition-all duration-200

                          ${
                            isSelected
                              ? "bg-[#f5d900] text-[#30317f]"
                              : "border border-white bg-white/90 text-transparent"
                          }
                        `}
                      >
                        <CheckCircle2 size={19} strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* CARD CONTENT */}
                    <div className="p-5 sm:p-5 lg:p-6">

                      {/* TITLE AND ICON */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`
                              flex h-10 w-10 shrink-0
                              items-center justify-center
                              rounded-xl transition-colors duration-200

                              ${
                                isSelected
                                  ? "bg-[#f5d900] text-[#30317f]"
                                  : "bg-gray-100 text-gray-500 group-hover:bg-[#f5f3ff] group-hover:text-[#6344E3]"
                              }
                            `}
                          >
                            <Icon size={21} strokeWidth={2} />
                          </div>

                          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                            {role.title}
                          </h2>
                        </div>

                        {isSelected && (
                          <span className="shrink-0 text-[11px] font-semibold text-[#6344E3] sm:text-xs">
                            Selected
                          </span>
                        )}
                      </div>

                      {/* DESCRIPTION */}
                      <p className="mt-4 min-h-[72px] text-[14px] leading-[1.7] text-gray-500 sm:text-[14px] lg:text-[15px]">
                        {role.description}
                      </p>

                      {/* SELECTION INDICATOR LINE */}
                      <div
                        className={`
                          mt-5 h-1 w-full rounded-full
                          transition-colors duration-300
                          ${
                            isSelected
                              ? "bg-[#30317f]"
                              : "bg-gray-100"
                          }
                        `}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CONTINUE SECTION */}
            <div className="mx-auto mt-9 max-w-md sm:mt-10">

              {/* CONTINUE BUTTON */}
              <button
                type="button"
                onClick={handleContinue}
                className="
                  group flex w-full items-center justify-center gap-3
                  rounded-xl bg-[#30317f]
                  px-6 py-4
                  text-[15px] font-semibold text-white
                  shadow-md shadow-[#6344E3]/15
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#5236C5]
                  hover:shadow-lg
                  active:scale-[0.99]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#6344E3]
                  focus-visible:ring-offset-2
                  sm:py-[18px] sm:text-base
                "
              >
                <span>
                  Continue as {selectedRoleData?.title}
                </span>

                <ArrowRight
                  size={20}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              {/* LOGIN LINK */}
              <p className="mt-6 text-center text-[14px] text-gray-500 sm:text-[15px]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="
                    font-semibold text-[#6344E3]
                    transition-colors
                    hover:text-[#4C32BD]
                    hover:underline
                  "
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
