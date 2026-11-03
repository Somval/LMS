import React, { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { toCompleted, toTodo } from "./courseworkFormat";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CompletedTasks from "./completedTask";

const baseTabs = [
  {
    id: "all",
    label: "All",
    count: 7,
  },
  {
    id: "assignment",
    label: "Assignments",
    count: 6,
  },
  {
    id: "quiz",
    label: "Quizzes",
    count: 5,
  },
  {
    id: "completed",
    label: "Completed",
    count: 8,
  },
];

export default function TodoClasses() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/coursework")
      .then((list) => {
        setTodos(list.map(toTodo));
        setCompleted(list.filter((w) => w.submission).map(toCompleted));
      })
      .catch((err) => setError(err.message || "Could not load your coursework."))
      .finally(() => setLoading(false));
  }, []);

  const countOf = (id) =>
    id === "all" ? todos.length : todos.filter((t) => t.type === id).length;
  const tabs = baseTabs.map((t) => ({ ...t, count: countOf(t.id) }));

  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredTodos = useMemo(() => {
    switch (activeTab) {
      case "assignment":
        return todos.filter((item) => item.type === "assignment");

      case "quiz":
        return todos.filter((item) => item.type === "quiz");

      case "completed":
        return todos.filter((item) => item.type === "completed");

      case "all":
      default:
        return todos;
    }
  }, [activeTab, todos]);

  const visibleTodos = showAll
    ? filteredTodos
    : filteredTodos.slice(0, 3);

  const currentTab = tabs.find(
    (tab) => tab.id === activeTab
  );

  const hasMore = filteredTodos.length > 3;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowAll(false);
  };

  const handleToggleView = () => {
    setShowAll((prev) => !prev);
  };

  /*
   * Handle navigation for each action
   */
  const handleActionClick = (item) => {
    navigate(`/student/assignment/${item.id}`);
  };

  return (
    <>
      <section className="w-full px-4 py-5 sm:px-5">
        <div className="w-full">
          {error && (
            <p role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
          )}
          {loading && <p className="mb-4 text-xs text-[#747ca1]">Loading…</p>}

          {/* FILTER TABS */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    flex
                    h-[30px]
                    items-center
                    justify-center
                    rounded-[5px]
                    border
                    px-4
                    text-[11px]
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "border-[#326df5] bg-[#326df5] text-white shadow-[0_1px_3px_rgba(50,109,245,0.2)]"
                        : "border-[#cbd3e1] bg-transparent text-[#171b24] hover:border-[#9fb1d1] hover:bg-white"
                    }
                  `}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>

          {/* SECTION TITLE */}
          <h2 className="mb-4 text-[17px] font-semibold leading-none text-[#101828]">
            To Do
          </h2>

          {/* TABLE CARD */}
          <div
            className="
              w-full
              overflow-hidden
              rounded-[9px]
              border
              border-[#d2d8e3]
              bg-white
            "
          >

            {/* DESKTOP */}
            <div className="hidden md:block">

              {/* TABLE HEADER */}
              <div
                className="
                  grid
                  grid-cols-[108px_114px_minmax(145px,1.25fr)_108px_118px_100px]
                  items-center
                  px-5
                  pb-3
                  pt-4
                "
              >
                <div className="text-[13px] font-medium text-[#747ca1]">
                  Date
                </div>

                <div className="text-[13px] font-medium text-[#747ca1]">
                  Subject
                </div>

                <div className="text-[13px] font-medium text-[#747ca1]">
                  Task
                </div>

                <div className="text-[13px] font-medium text-[#747ca1]">
                  Due
                </div>

                <div className="text-[13px] font-medium text-[#747ca1]">
                  Status
                </div>

                <div className="text-[13px] font-medium text-[#747ca1]">
                  Action
                </div>
              </div>

              {/* DESKTOP ROWS */}
              {visibleTodos.length > 0 ? (
                visibleTodos.map((item) => (
                  <div
                    key={item.id}
                    className="
                      grid
                      min-h-[71px]
                      grid-cols-[108px_114px_minmax(145px,1.25fr)_108px_118px_100px]
                      items-center
                      border-t
                      border-[#e5e7eb]
                      px-5
                    "
                  >
                    {/* DATE */}
                    <div className="leading-tight">
                      <p className="text-[12px] font-semibold text-[#161b26]">
                        {item.date}
                      </p>

                      <p className="mt-[2px] text-[12px] text-[#747ca1]">
                        {item.dateSub}
                      </p>
                    </div>

                    {/* SUBJECT */}
                    <div>
                      <p className="text-[12px] font-medium text-[#171b24]">
                        {item.subject}
                      </p>
                    </div>

                    {/* TASK */}
                    <div className="leading-tight">
                      <p className="text-[12px] font-semibold text-[#171b24]">
                        {item.task}
                      </p>

                      <p className="mt-[3px] text-[12px] text-[#747ca1]">
                        {item.taskType}
                      </p>
                    </div>

                    {/* DUE */}
                    <div className="leading-tight">
                      <p className="text-[12px] text-[#747ca1]">
                        {item.due}
                      </p>

                      <p className="mt-[3px] text-[12px] text-[#747ca1]">
                        {item.dueTime}
                      </p>
                    </div>

                    {/* STATUS */}
                    <div className="flex items-center gap-[7px]">
                      <span
                        className={`
                          h-[7px]
                          w-[7px]
                          shrink-0
                          rounded-full
                          ${
                            item.status === "Completed"
                              ? "bg-[#16c766]"
                              : "bg-[#ff8517]"
                          }
                        `}
                      />

                      <span
                        className={`
                          whitespace-nowrap
                          text-[11px]
                          font-medium
                          ${
                            item.status === "Completed"
                              ? "text-[#10b958]"
                              : "text-[#ff7600]"
                          }
                        `}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* ACTION */}
                    <div>
                      <button
                        type="button"
                        onClick={() => handleActionClick(item)}
                        className="
                          flex
                          h-[27px]
                          min-w-[87px]
                          items-center
                          justify-center
                          rounded-[4px]
                          bg-[#326df5]
                          px-2
                          text-[9px]
                          font-medium
                          text-white
                          shadow-[0_1px_3px_rgba(50,109,245,0.18)]
                          transition-all
                          duration-200
                          hover:bg-[#255edc]
                          active:scale-[0.98]
                        "
                      >
                        {item.action}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex min-h-[150px] items-center justify-center border-t border-[#e5e7eb]">
                  <div className="text-center">
                    <p className="text-[13px] font-medium text-[#475467]">
                      No tasks found
                    </p>

                    <p className="mt-1 text-[11px] text-[#98a2b3]">
                      There are no items in this category.
                    </p>
                  </div>
                </div>
              )}

              {/* DESKTOP FOOTER */}
              {hasMore && (
                <div
                  className="
                    flex
                    h-[43px]
                    items-center
                    justify-center
                    border-t
                    border-[#e5e7eb]
                  "
                >
                  <button
                    type="button"
                    onClick={handleToggleView}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      text-[12px]
                      font-medium
                      text-[#246bff]
                      transition-colors
                      duration-200
                      hover:text-[#1554d1]
                    "
                  >
                    <span>
                      {showAll
                        ? "Show Less"
                        : `View All To Do (${currentTab?.count || 0})`}
                    </span>

                    <ArrowRight
                      size={16}
                      strokeWidth={1.4}
                      className={`
                        transition-transform
                        duration-200
                        ${
                          showAll
                            ? "rotate-[-90deg]"
                            : "group-hover:translate-x-1"
                        }
                      `}
                    />
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE */}
            <div className="md:hidden">

              {visibleTodos.length > 0 ? (
                visibleTodos.map((item) => (
                  <div
                    key={item.id}
                    className="
                      border-b
                      border-[#e5e7eb]
                      p-4
                      last:border-b-0
                    "
                  >
                    <div className="flex items-start justify-between gap-4">

                      {/* LEFT CONTENT */}
                      <div className="min-w-0">

                        <div className="flex items-center gap-2">
                          <p className="text-[12px] font-semibold text-[#161b26]">
                            {item.date}
                          </p>

                          <span className="text-[11px] text-[#747ca1]">
                            {item.dateSub}
                          </span>
                        </div>

                        <p className="mt-2 text-[13px] font-medium text-[#171b24]">
                          {item.subject}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-[#171b24]">
                          {item.task}
                        </p>

                        <p className="mt-[2px] text-[11px] text-[#747ca1]">
                          {item.taskType}
                        </p>

                        <p className="mt-2 text-[11px] text-[#747ca1]">
                          Due: {item.due} · {item.dueTime}
                        </p>
                      </div>

                      {/* RIGHT CONTENT */}
                      <div className="flex shrink-0 flex-col items-end gap-3">

                        {/* STATUS */}
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`
                              h-[7px]
                              w-[7px]
                              rounded-full
                              ${
                                item.status === "Completed"
                                  ? "bg-[#16c766]"
                                  : "bg-[#ff8517]"
                              }
                            `}
                          />

                          <span
                            className={`
                              text-[10px]
                              font-medium
                              ${
                                item.status === "Completed"
                                  ? "text-[#10b958]"
                                  : "text-[#ff7600]"
                              }
                            `}
                          >
                            {item.status}
                          </span>
                        </div>

                        {/* ACTION */}
                        <button
                          type="button"
                          onClick={() => handleActionClick(item)}
                          className="
                            flex
                            h-[29px]
                            min-w-[90px]
                            items-center
                            justify-center
                            rounded-[4px]
                            bg-[#326df5]
                            px-2
                            text-[9px]
                            font-medium
                            text-white
                            transition-all
                            duration-200
                            hover:bg-[#255edc]
                            active:scale-[0.98]
                          "
                        >
                          {item.action}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex min-h-[150px] items-center justify-center">
                  <div className="text-center">
                    <p className="text-[13px] font-medium text-[#475467]">
                      No tasks found
                    </p>

                    <p className="mt-1 text-[11px] text-[#98a2b3]">
                      There are no items in this category.
                    </p>
                  </div>
                </div>
              )}

              {/* MOBILE FOOTER */}
              {hasMore && (
                <div
                  className="
                    flex
                    h-[45px]
                    items-center
                    justify-center
                    border-t
                    border-[#e5e7eb]
                  "
                >
                  <button
                    type="button"
                    onClick={handleToggleView}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      text-[12px]
                      font-medium
                      text-[#246bff]
                    "
                  >
                    <span>
                      {showAll
                        ? "Show Less"
                        : `View All To Do (${currentTab?.count || 0})`}
                    </span>

                    <ArrowRight
                      size={16}
                      strokeWidth={1.4}
                      className={`
                        transition-transform
                        duration-200
                        ${
                          showAll
                            ? "rotate-[-90deg]"
                            : "group-hover:translate-x-1"
                        }
                      `}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CompletedTasks tasks={completed} />
    </>
  );
}