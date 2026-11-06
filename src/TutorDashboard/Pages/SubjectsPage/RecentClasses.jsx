import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDuration, formatTime, percent, splitDate } from "./subjectFormat";

const RecentClasses = ({ classes = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#F5F7FC] p-2 sm:p-3">
      {/* =====================================================
          MAIN CARD
      ====================================================== */}
      <div
        className="
          w-full
          overflow-hidden
          rounded-[9px]
          bg-white

          sm:rounded-[10px]
        "
      >
        {/* ===================================================
            CARD HEADER
        ==================================================== */}
        <div
          className="
            flex
            h-[48px]
            items-center
            px-[17px]

            sm:h-[51px]
            sm:px-[18px]

            md:h-[54px]
            md:px-[20px]
          "
        >
          <h2
            className="
              m-0
              text-[17px]
              font-bold
              leading-none
              tracking-[-0.2px]
              text-[#111111]

              sm:text-[18px]

              md:text-[19px]
            "
          >
            Recent Classes
          </h2>
        </div>

        {/* ===================================================
            TABLE
        ==================================================== */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed border-collapse">
            {/* =================================================
                TABLE HEADER
            ================================================== */}
            <thead>
              <tr
                className="
                  h-[38px]
                  bg-[#F0F2F5]
                  text-[#858B94]
                "
              >
                <th
                  className="
                    w-[18%]
                    px-[13px]
                    text-left
                    text-[11px]
                    font-medium
                    leading-none

                    sm:px-[15px]
                    sm:text-[12px]
                  "
                >
                  Date
                </th>

                <th
                  className="
                    w-[17%]
                    px-[10px]
                    text-left
                    text-[11px]
                    font-medium
                    leading-none

                    sm:px-[12px]
                    sm:text-[12px]
                  "
                >
                  Time
                </th>

                <th
                  className="
                    w-[20%]
                    px-[10px]
                    text-left
                    text-[11px]
                    font-medium
                    leading-none

                    sm:px-[12px]
                    sm:text-[12px]
                  "
                >
                  Topic
                </th>

                <th
                  className="
                    w-[20%]
                    px-[10px]
                    text-left
                    text-[11px]
                    font-medium
                    leading-none

                    sm:px-[12px]
                    sm:text-[12px]
                  "
                >
                  Duration
                </th>

                <th
                  className="
                    w-[25%]
                    px-[13px]
                    text-left
                    text-[11px]
                    font-medium
                    leading-none

                    sm:px-[15px]
                    sm:text-[12px]
                  "
                >
                  Attendance
                </th>
              </tr>
            </thead>

            {/* =================================================
                TABLE BODY
            ================================================== */}
            <tbody>
              {classes.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-[12px] font-medium text-[#858B94]">
                    No classes held for this subject yet.
                  </td>
                </tr>
              )}
              {classes.map((item) => (
                <tr
                  key={item.id}
                  className="
                    h-[55px]
                    border-b
                    border-[#EEEEEE]
                    transition-colors
                    duration-150
                    hover:bg-[#FAFBFC]
                  "
                >
                  {/* =================================================
                      DATE
                  ================================================== */}
                  <td
                    className="
                      px-[13px]
                      py-[8px]
                      align-middle
                      text-[10px]
                      font-medium
                      leading-[14px]
                      text-[#858B94]

                      sm:px-[15px]
                      sm:text-[11px]
                      sm:leading-[15px]
                    "
                  >
                    <span className="block">{splitDate(item.startsAt)[0]}</span>
                    <span className="block">{splitDate(item.startsAt)[1]}</span>
                  </td>

                  {/* =================================================
                      TIME
                  ================================================== */}
                  <td
                    className="
                      px-[10px]
                      py-[8px]
                      align-middle
                      whitespace-nowrap
                      text-[10px]
                      font-medium
                      leading-none
                      text-[#858B94]

                      sm:px-[12px]
                      sm:text-[11px]
                    "
                  >
                    {formatTime(item.startsAt)}
                  </td>

                  {/* =================================================
                      TOPIC
                  ================================================== */}
                  <td
                    className="
                      px-[10px]
                      py-[8px]
                      align-middle
                      text-[10px]
                      font-medium
                      leading-[14px]
                      text-[#858B94]

                      sm:px-[12px]
                      sm:text-[11px]
                      sm:leading-[15px]
                    "
                  >
                    <span className="block">{item.title}</span>
                  </td>

                  {/* =================================================
                      DURATION
                  ================================================== */}
                  <td
                    className="
                      px-[10px]
                      py-[8px]
                      align-middle
                      whitespace-nowrap
                      text-[10px]
                      font-medium
                      leading-none
                      text-[#858B94]

                      sm:px-[12px]
                      sm:text-[11px]
                    "
                  >
                    {formatDuration(item.startsAt, item.endsAt)}
                  </td>

                  {/* =================================================
                      ATTENDANCE
                  ================================================== */}
                  <td
                    className="
                      px-[13px]
                      py-[8px]
                      align-middle
                      text-[11px]
                      font-bold
                      leading-none
                      text-[#16D96A]

                      sm:px-[15px]
                      sm:text-[12px]
                    "
                  >
                    {percent(item.attendanceRate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===================================================
            FOOTER
        ==================================================== */}
        <div
          className="
            flex
            h-[50px]
            items-center
            justify-center
            bg-white
            px-4

            sm:h-[52px]
          "
        >
          <button
            type="button"
            onClick={() => navigate("/tutor/past-classes")}
            className="
              group
              inline-flex
              items-center
              gap-[10px]
              border-0
              bg-transparent
              p-0
              text-[12px]
              font-semibold
              leading-none
              text-[#151A70]
              transition-colors
              duration-200
              hover:text-[#252B91]
              cursor-pointer

              sm:text-[13px]
            "
          >
            <span>
              View all classes
            </span>

            <ArrowRight
              className="
                h-[16px]
                w-[16px]
                shrink-0
                transition-transform
                duration-200
                group-hover:translate-x-1

                sm:h-[17px]
                sm:w-[17px]
              "
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentClasses;