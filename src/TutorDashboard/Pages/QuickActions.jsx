import React from "react";
import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PATHS = {
  "Create Lesson Note": "/tutor/lessons",
  "Create Assignment": "/tutor/create-assignment",
  "Create Quiz": "/tutor/create-quize",
  "Attendance Overview": "/tutor/attendance",
};

const quickActions = [
  {
    title: "Create Lesson Note",
    description: "Create and share a new lesson note",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 1.25C4.30964 1.25 3.75 1.80964 3.75 2.5V17.5C3.75 18.1904 4.30964 18.75 5 18.75H10C10.3452 18.75 10.625 19.0298 10.625 19.375C10.625 19.7202 10.3452 20 10 20H5C3.61929 20 2.5 18.8807 2.5 17.5V2.5C2.5 1.11929 3.61929 0 5 0H12.1339L17.5 5.36612V9.375C17.5 9.72018 17.2202 10 16.875 10C16.5298 10 16.25 9.72018 16.25 9.375V6.25H13.75C12.3693 6.25 11.25 5.13071 11.25 3.75V1.25H5ZM12.5 2.13388L15.3661 5H13.75C13.0596 5 12.5 4.44036 12.5 3.75V2.13388Z"
          fill="#2E6DFF"
        />
        <path
          d="M16.25 11.875C16.25 11.5298 15.9702 11.25 15.625 11.25C15.2798 11.25 15 11.5298 15 11.875V15H11.875C11.5298 15 11.25 15.2798 11.25 15.625C11.25 15.9702 11.5298 16.25 11.875 16.25H15V19.375C15 19.7202 15.2798 20 15.625 20C15.9702 20 16.25 19.7202 16.25 19.375V16.25H19.375C19.7202 16.25 20 15.9702 20 15.625C20 15.2798 19.7202 15 19.375 15H16.25V11.875Z"
          fill="#2E6DFF"
        />
      </svg>
    ),
    iconBg: "bg-[#e8edff]",
  },

  {
    title: "Create Assignment",
    description: "Set homework for your students",
    icon: (
      <svg
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.875 0C0.839466 0 0 0.839466 0 1.875V13.75C0 15.1307 1.11929 16.25 2.5 16.25H9.375V15H2.5C1.80964 15 1.25 14.4404 1.25 13.75V3.75H7.34835C8.01139 3.75 8.64727 3.48661 9.11612 3.01777L9.63388 2.5H17.5C18.1904 2.5 18.75 3.05964 18.75 3.75V9.375H20V3.75C20 2.36929 18.8807 1.25 17.5 1.25H9.63388L9.11612 0.732233C8.64728 0.263392 8.01139 0 7.34835 0H1.875ZM7.34835 2.5H1.25V1.875C1.25 1.52982 1.52982 1.25 1.875 1.25H7.34835C7.67987 1.25 7.99781 1.3817 8.23223 1.61612L8.49112 1.875L8.23223 2.13388C7.99781 2.3683 7.67987 2.5 7.34835 2.5Z"
          fill="#0ED753"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 14.375C20 16.7912 18.0412 18.75 15.625 18.75C13.2088 18.75 11.25 16.7912 11.25 14.375C11.25 11.9588 13.2088 10 15.625 10C18.0412 10 20 11.9588 20 14.375ZM15.625 11.25C15.9702 11.25 16.25 11.5298 16.25 11.875V13.75H18.125C18.4702 13.75 18.75 14.0298 18.75 14.375C18.75 14.7202 18.4702 15 18.125 15H16.25V17.1875C16.25 17.5327 15.9702 17.8125 15.625 17.8125C15.2798 17.8125 15 17.5327 15 17.1875V15H13.125C12.7798 15 12.5 14.7202 12.5 14.375C12.5 14.0298 12.7798 13.75 13.125 13.75H15V11.875C15 11.5298 15.2798 11.25 15.625 11.25Z"
          fill="#0ED753"
        />
      </svg>
    ),
    iconBg: "bg-[#e4f8ea]",
  },

  {
    title: "Create Quiz",
    description: "Create a new assessment",
    icon: <ClipboardList size={20} strokeWidth={1.8} />,
    iconBg: "bg-[#fff1d9]",
    iconColor: "text-[#f59e0b]",
  },

  {
    title: "Attendance Overview",
    description: "View student attendance and participation",
    icon: (
      <svg
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.1494 5C13.1494 7.76142 10.9108 10 8.14941 10C5.38799 10 3.14941 7.76142 3.14941 5C3.14941 2.23858 5.38799 0 8.14941 0C10.9108 0 13.1494 2.23858 13.1494 5ZM11.8994 5C11.8994 7.07107 10.2205 8.75 8.14941 8.75C6.07835 8.75 4.39941 7.07107 4.39941 5C4.39941 2.92893 6.07835 1.25 8.14941 1.25C10.2205 1.25 11.8994 2.92893 11.8994 5Z"
          fill="#FB06E7"
        />
        <path
          d="M8.14941 11.25V12.5H3.35983C2.42673 12.5 1.63563 13.1861 1.50367 14.1098L1.3109 15.4592C2.916 17.4671 5.38291 18.75 8.14941 18.75V20C4.7874 20 1.8129 18.3408 0 15.7967L0.266235 13.9331C0.486167 12.3935 1.80467 11.25 3.35983 11.25H8.14941Z"
          fill="#FB06E7"
        />
        <path
          d="M17.9664 14.8169C18.2104 14.5729 18.2104 14.1771 17.9664 13.9331C17.7223 13.689 17.3266 13.689 17.0825 13.9331L12.5244 18.4911L10.4664 16.4331C10.2223 16.189 9.82655 16.189 9.58247 16.4331C9.33839 16.6771 9.33839 17.0729 9.58247 17.3169L12.0825 19.8169C12.3266 20.061 12.7223 20.061 12.9664 19.8169L17.9664 14.8169Z"
          fill="#FB06E7"
        />
      </svg>
    ),
    iconBg: "bg-[#fde2f8]",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <section
      className="
        flex
        h-full
        w-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-lg
        bg-white
        p-4
        shadow-[0_1px_4px_rgba(0,0,0,0.08)]
        sm:p-5
      "
    >
      {/* Heading */}
      <div className="shrink-0">
        <h2 className="text-lg font-semibold leading-7 text-gray-950 sm:text-[20px]">
          Quick Actions
        </h2>
      </div>

      {/* Action Grid */}
      <div
        className="
          mt-5
          grid
          w-full
          min-w-0
          flex-1
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
      >
        {quickActions.map((action) => (
          <button
            key={action.title}
            type="button"
            onClick={() => navigate(PATHS[action.title])}
            className="
              flex
              min-h-[110px]
              w-full
              min-w-0
              flex-col
              items-center
              justify-center
              rounded-md
              border
              border-[#dedede]
              bg-[#FFFBFB]
              px-3
              py-3
              text-center
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_3px_10px_rgba(0,0,0,0.07)]
              active:translate-y-0
              sm:min-h-[120px]
            "
          >
            {/* Icon */}
            <div
              className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-md
                ${action.iconBg}
                ${action.iconColor || ""}
              `}
            >
              {action.icon}
            </div>

            {/* Title */}
            <h3
              className="
                mt-2
                w-full
                truncate
                px-1
                text-[12px]
                font-bold
                leading-5
                text-[#000000]
                sm:text-[13px]
              "
            >
              {action.title}
            </h3>

            {/* Description */}
            <p
              className="
                mt-0.5
                max-w-[190px]
                text-[10px]
                font-normal
                leading-[15px]
                text-gray-500
                sm:text-[11px]
              "
            >
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;