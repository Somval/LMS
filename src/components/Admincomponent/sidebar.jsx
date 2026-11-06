
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../Avatar";
import {
  House,
  UsersRound,
  BookOpen,
  CalendarDays,
  Clipboard,
  UserRoundCheck,
  FileText,
  BadgeCheck,
  Mail,
  TriangleAlert,
  CreditCard,
  Shield,
  Settings,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  FilePlus2,
  UserRound,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    icon: House,
    path: "/admin/dashboard",
  },
  {
    label: "Users",
    icon: UsersRound,
    children: [
      {
        label: "Students",
        icon: UserRound,
        path: "/admin/users/students",
      },
      {
        label: "Tutors",
        icon: GraduationCap,
        path: "/admin/users/tutors",
      },
      {
        label: "Parents",
        icon: UsersRound,
        path: "/admin/users/parents",
      },
      {
        label: "Tutor Applications",
        icon: BadgeCheck,
        path: "/admin/users/applications",
      },
    ],
  },
  {
    label: "Subjects",
    icon: BookOpen,
    children: [
      {
        label: "Subjects",
        icon: BookOpen,
        path: "/admin/subjects",
      },
      {
        label: "Curriculum & Content",
        icon: FilePlus2,
        path: "/admin/curriculum",
      },
    ],
  },
  {
    label: "Classes & Schedule",
    icon: CalendarDays,
    path: "/admin/classes",
  },
  {
    label: "Assignments & Quizzes",
    icon: Clipboard,
    path: "/admin/assignmenthome",
  },
  {
    label: "Attendance",
    icon: UserRoundCheck,
    path: "/admin/attendance",
  },
  {
    label: "Progress & Reports",
    icon: FileText,
    path: "/admin/reports",
  },
  {
    label: "Achievements & Rewards",
    icon: BadgeCheck,
    path: "/admin/achievements",
  },
  {
    label: "Messages",
    icon: Mail,
    path: "/admin/messages",
  },
  {
    label: "Complaints",
    icon: TriangleAlert,
    path: "/admin/complaints",
  },
  {
    label: "Revenue & Payments",
    icon: CreditCard,
    path: "/admin/revenue-payments",
  },
  {
    label: "Audit Logs",
    icon: Shield,
    path: "/admin/audit-logs",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const isPathActive = (currentPath, targetPath) =>
  currentPath === targetPath ||
  currentPath.startsWith(`${targetPath}/`);

// "Platform Admin" -> "PA"
const initialsOf = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export default function LMSSidebar({
  isOpen = false,
  onClose = () => {},
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // the signed-in admin, shown in the footer
  const currentPath = location.pathname;

  const previousPath = useRef(currentPath);

  const getActiveItem = () => {
    for (const item of navigation) {
      if (item.path && isPathActive(currentPath, item.path)) {
        return item.label;
      }

      if (item.children) {
        const activeChild = item.children.find((child) =>
          isPathActive(currentPath, child.path)
        );

        if (activeChild) {
          return activeChild.label;
        }
      }
    }

    return "Dashboard";
  };

  const [activeItem, setActiveItem] = useState(getActiveItem);

  const [openDropdowns, setOpenDropdowns] = useState({
    Users: true,
  });

  // Keep the active item and dropdowns synchronized with the URL.
  useEffect(() => {
    setActiveItem(getActiveItem());

    const activeDropdowns = {};

    navigation.forEach((item) => {
      if (
        item.children?.some((child) =>
          isPathActive(currentPath, child.path)
        )
      ) {
        activeDropdowns[item.label] = true;
      }
    });

    setOpenDropdowns((previous) => ({
      ...previous,
      ...activeDropdowns,
    }));
  }, [currentPath]);

  // Close the drawer only when the route actually changes.
  useEffect(() => {
    if (previousPath.current !== currentPath) {
      previousPath.current = currentPath;
      onClose();
    }
  }, [currentPath, onClose]);

  // Support closing the mobile drawer with Escape.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent background scrolling while the mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const toggleDropdown = (label) => {
    setOpenDropdowns((previous) => ({
      ...previous,
      [label]: !previous[label],
    }));
  };

  const handleNavigation = (label, path) => {
    setActiveItem(label);

    if (path && !isPathActive(currentPath, path)) {
      navigate(path);
    }

    onClose();
  };

  const renderIcon = (Icon, active = false, size = 17) => (
    <Icon
      size={size}
      strokeWidth={1.6}
      aria-hidden="true"
      className={`shrink-0 transition-colors duration-200 ${
        active ? "text-[#159A42]" : "text-[#8181A5]"
      }`}
    />
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        aria-label="Admin sidebar"
        aria-hidden={undefined}
        className={`fixed inset-y-0 left-0 z-[70] flex h-screen h-dvh w-[250px] max-w-[85vw] flex-col overflow-hidden border-r border-[#E9E9EF] bg-white transition-transform duration-300 ease-in-out motion-reduce:transition-none lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:w-[250px] lg:max-w-none lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="relative flex h-[76px] shrink-0 flex-col items-center justify-center">
          <h1 className="text-[13px] font-medium leading-4 tracking-tight text-[#2B3674]">
            <span className="font-bold">LMS</span> SYSTEM
          </h1>

          <p className="text-[9px] leading-3 text-[#8181A5]">
            Admin Portal
          </p>

          {/* Mobile Close Button */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-md p-2 text-[#8181A5] transition-colors hover:bg-[#F4F7FE] hover:text-[#159A42] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] lg:hidden"
          >
            <X size={18} strokeWidth={1.7} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="custom-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-5 pt-2"
        >
          <div className="space-y-[3px]">
            {navigation.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpenDropdown = Boolean(
                openDropdowns[item.label]
              );

              const isActive =
                !hasChildren &&
                item.path &&
                isPathActive(currentPath, item.path);

              const hasActiveChild = item.children?.some((child) =>
                isPathActive(currentPath, child.path)
              );

              return (
                <div key={item.label}>
                  {/* Parent Navigation Item */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        if (hasChildren) {
                          toggleDropdown(item.label);
                        } else {
                          handleNavigation(item.label, item.path);
                        }
                      }}
                      aria-expanded={
                        hasChildren ? isOpenDropdown : undefined
                      }
                      aria-current={
                        isActive ? "page" : undefined
                      }
                      className={`relative flex min-h-[38px] w-full items-center gap-[11px] px-[14px] py-[8px] text-left text-[10px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#159A42] ${
                        isActive
                          ? "font-semibold text-[#159A42]"
                          : hasActiveChild
                          ? "font-medium text-[#8181A5]"
                          : "font-normal text-[#8181A5] hover:bg-[#F4F7FE] hover:text-[#159A42]"
                      }`}
                    >
                      <span className="flex w-[12px] shrink-0 items-center justify-center">
                        {renderIcon(item.icon, Boolean(isActive), 15)}
                      </span>

                      <span className="min-w-0 flex-1 truncate">
                        {item.label}
                      </span>

                      {hasChildren &&
                        (isOpenDropdown ? (
                          <ChevronDown
                            size={12}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="shrink-0 text-[#8181A5]"
                          />
                        ) : (
                          <ChevronRight
                            size={12}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="shrink-0 text-[#8181A5]"
                          />
                        ))}
                    </button>

                    {/* Green Active Indicator */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 right-0 top-0 w-[2px] bg-[#159A42]"
                      />
                    )}
                  </div>

                  {/* Dropdown Children */}
                  {hasChildren && isOpenDropdown && (
                    <div className="py-[1px]">
                      {item.children.map((child) => {
                        const isChildActive = isPathActive(
                          currentPath,
                          child.path
                        );

                        return (
                          <div key={child.path} className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                handleNavigation(
                                  child.label,
                                  child.path
                                )
                              }
                              aria-current={
                                isChildActive ? "page" : undefined
                              }
                              className={`relative flex min-h-[32px] w-full items-center gap-[9px] py-[6px] pl-[20px] pr-[12px] text-left text-[9px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#159A42] ${
                                isChildActive
                                  ? "font-semibold text-[#159A42]"
                                  : "text-[#8181A5] hover:bg-[#F4F7FE] hover:text-[#159A42]"
                              }`}
                            >
                              <span className="flex w-[12px] shrink-0 items-center justify-center">
                                {renderIcon(
                                  child.icon,
                                  isChildActive,
                                  12
                                )}
                              </span>

                              <span className="min-w-0 flex-1 truncate">
                                {child.label}
                              </span>
                            </button>

                            {/* Submenu Active Indicator */}
                            {isChildActive && (
                              <span
                                aria-hidden="true"
                                className="absolute bottom-0 right-0 top-0 w-[2px] bg-[#159A42]"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Profile Footer */}
        <div className="shrink-0 border-t border-[#E9E9EF] bg-white px-3 py-3">
          <div className="flex items-center gap-2">
            {user?.avatarUrl ? (
              <Avatar
                name={user.fullName}
                avatarUrl={user.avatarUrl}
                className="h-7 w-7 rounded-full"
                textClassName="text-[10px]"
              />
            ) : (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8F7ED] text-[10px] font-semibold text-[#159A42]">
                {initialsOf(user?.fullName) || "A"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-medium text-[#2B3674]">
                {user?.fullName || "Administrator"}
              </p>

              <p className="truncate text-[9px] text-[#8181A5]">
                {user?.email || ""}
              </p>
            </div>

            <button
              type="button"
              aria-label="Open settings"
              onClick={() =>
                handleNavigation("Settings", "/admin/settings")
              }
              className="shrink-0 rounded-md p-1 text-[#8181A5] transition-colors hover:bg-[#F4F7FE] hover:text-[#159A42] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
            >
              <Settings size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
