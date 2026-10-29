import React, { useState, useEffect, useRef } from "react";
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Eye, 
  Trash2, 
  X, 
  BookOpen, 
  Calendar, 
  Layers, 
  Search,
  Filter,
  CheckCircle,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

// ==========================================
// SEPARATE COMPONENT: Edit Topic Modal
// ==========================================
function EditTopicModal({ isOpen, onClose, topic, onSave }) {
  const [title, setTitle] = useState("");
  const [lessons, setLessons] = useState("");
  const [status, setStatus] = useState("Published");

  useEffect(() => {
    if (topic) {
      setTitle(topic.title || "");
      setLessons(topic.lessons || "0 lessons");
      setStatus(topic.status || "Published");
    }
  }, [topic]);

  if (!isOpen || !topic) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...topic,
        title,
        lessons: lessons.includes("lesson") ? lessons : `${lessons} lessons`,
        status,
        updatedAt: "Just now",
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 rounded-lg text-[#08b927]">
              <Edit className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Edit Topic</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Topic Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#08b927] focus:ring-2 focus:ring-[#08b927]/20"
              placeholder="e.g. Numbers and Place Value"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Number of Lessons
            </label>
            <input
              type="text"
              required
              value={lessons}
              onChange={(e) => setLessons(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#08b927] focus:ring-2 focus:ring-[#08b927]/20"
              placeholder="e.g. 5 lessons"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#08b927] focus:ring-2 focus:ring-[#08b927]/20 cursor-pointer"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#08b927] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#079d21] transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// SEPARATE COMPONENT: View Topic Modal
// ==========================================
function ViewTopicModal({ isOpen, onClose, topic }) {
  if (!isOpen || !topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Eye className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Topic Overview</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Title</span>
            <h3 className="text-lg font-semibold text-slate-900 mt-0.5">{topic.title}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-xs font-medium text-slate-500">Total Lessons</span>
              <p className="text-sm font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#08b927]" />
                {topic.lessons}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500">Last Modified</span>
              <p className="text-sm font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-blue-500" />
                {topic.updatedAt}
              </p>
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-slate-500 block mb-1.5">Status</span>
            {topic.status === "Published" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200/60">
                <CheckCircle className="h-3.5 w-3.5" /> Published
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                <Layers className="h-3.5 w-3.5" /> Draft
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end pt-5 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT: Topics Table Application
// ==========================================
export default function App({ onAddTopic }) {
  const [subject, setSubject] = useState("Mathematics");
  const [yearLevel, setYearLevel] = useState("Year 1");

  const [topics, setTopics] = useState([
    { id: 1, title: "Numbers and Place Value", lessons: "5 lessons", updatedAt: "12 Oct 2026", status: "Published" },
    { id: 2, title: "Addition and Subtraction Basics", lessons: "6 lessons", updatedAt: "12 Oct 2026", status: "Published" },
    { id: 3, title: "Fractions & Decimals Intro", lessons: "4 lessons", updatedAt: "12 Oct 2026", status: "Draft" },
    { id: 4, title: "Shapes and Geometry Fundamentals", lessons: "8 lessons", updatedAt: "12 Oct 2026", status: "Published" },
    { id: 5, title: "Measurement & Time Patterns", lessons: "5 lessons", updatedAt: "12 Oct 2026", status: "Published" },
  ]);

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [viewingTopic, setViewingTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const menuRef = useRef(null);

  // Close popup dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (index, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === index ? null : index);
  };

  const handleOpenEdit = (topic) => {
    setEditingTopic(topic);
    setActiveMenuId(null);
  };

  const handleSaveEdit = (updatedTopic) => {
    setTopics((prevTopics) =>
      prevTopics.map((t) => (t.id === updatedTopic.id ? updatedTopic : t))
    );
  };

  const handleTogglePublish = (topic) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === topic.id
          ? { ...t, status: t.status === "Published" ? "Draft" : "Published" }
          : t
      )
    );
    setActiveMenuId(null);
  };

  const handleDeleteTopic = (topicId) => {
    setTopics((prev) => prev.filter((t) => t.id !== topicId));
    setActiveMenuId(null);
  };

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[#f4f7fb] p-4 sm:p-6 md:p-10 font-sans text-slate-800 antialiased">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Control Filter Row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Filter className="h-3.5 w-3.5 text-slate-400" /> Filters
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#08b927]/20 cursor-pointer"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
            <select
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#08b927]/20 cursor-pointer"
            >
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 py-1.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#08b927]"
            />
          </div>
        </div>

        {/* Main Header Section with Add Topic Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Topics
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Create and manage the topics for <span className="font-semibold text-slate-700">{subject}-{yearLevel}</span>.
            </p>
          </div>
          <Link to="/admin/addtopicLesson">
          
          <button
            type="button"
            onClick={() => {
              if (onAddTopic) onAddTopic();
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#08b927] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#079d21] hover:shadow-md focus-visible:outline-none cursor-pointer"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span>Add Topic</span>
          </button>
          </Link>
        </div>

        {/* Table Container Card */}
        <div className="w-full rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6 w-16">#</th>
                  <th className="py-3.5 px-4 sm:px-6">Topic Title</th>
                  <th className="py-3.5 px-4 sm:px-6">Lessons</th>
                  <th className="py-3.5 px-4 sm:px-6">Last Updated</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic, index) => {
                    const isMenuOpen = activeMenuId === index;

                    return (
                      <tr key={topic.id || index} className="hover:bg-slate-50/60 transition-colors">
                        {/* Index */}
                        <td className="py-4 px-4 sm:px-6 font-medium text-slate-400">
                          {topic.id}
                        </td>

                        {/* Topic Title */}
                        <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">
                          {topic.title}
                        </td>

                        {/* Lessons Count */}
                        <td className="py-4 px-4 sm:px-6 text-slate-500">
                          {topic.lessons}
                        </td>

                        {/* Last Updated */}
                        <td className="py-4 px-4 sm:px-6 text-slate-500">
                          {topic.updatedAt}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-4 sm:px-6">
                          {topic.status === "Published" ? (
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200/60">
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200/60">
                              Draft
                            </span>
                          )}
                        </td>

                        {/* Actions & Dropdown */}
                        <td className="py-4 px-4 sm:px-6 text-right relative">
                          <div className="inline-flex items-center gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => setViewingTopic(topic)}
                              className="hidden sm:inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              View Topic
                            </button>

                            <div className="relative" ref={isMenuOpen ? menuRef : null}>
                              <button
                                type="button"
                                onClick={(e) => toggleMenu(index, e)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 focus:outline-none cursor-pointer transition-colors"
                                aria-label="Actions menu"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>

                              {/* Action Menu Popup */}
                              {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-40 text-left animate-in fade-in zoom-in-95 duration-100">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEdit(topic)}
                                    className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                                  >
                                    <Edit className="h-3.5 w-3.5 text-slate-400" />
                                    <span>Edit Topic</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleTogglePublish(topic)}
                                    className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                                  >
                                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                                    <span>
                                      {topic.status === "Published" ? "Unpublish" : "Publish"}
                                    </span>
                                  </button>

                                  <div className="my-1 border-t border-slate-100" />

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteTopic(topic.id)}
                                    className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 cursor-pointer"
                                  >
                                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                    <span>Delete Topic</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400 text-xs sm:text-sm">
                      No topics found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Separated Edit Topic Modal */}
        <EditTopicModal
          isOpen={!!editingTopic}
          topic={editingTopic}
          onClose={() => setEditingTopic(null)}
          onSave={handleSaveEdit}
        />

        {/* Separated View Topic Modal */}
        <ViewTopicModal
          isOpen={!!viewingTopic}
          topic={viewingTopic}
          onClose={() => setViewingTopic(null)}
        />

      </div>
    </div>
  );
}

