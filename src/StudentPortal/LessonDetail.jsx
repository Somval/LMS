import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle2, 
  Clock,
  Layers
} from 'lucide-react';

const lessonsList = [
  {
    id: 1,
    number: "01",
    title: "Introduction to Place Value",
    description: "Understand what equivalent fractions are and how to identify them.",
    status: "Completed", // Completed, In Progress, Not Started
    statusColor: "bg-[#2EE59D]/20 text-[#00A859] border border-[#2EE59D]/30",
    tags: [
      { label: "Lesson Note", icon: BookOpen, color: "text-rose-500 bg-rose-50 border-rose-100" },
      { label: "Video", icon: Video, color: "text-purple-500 bg-purple-50 border-purple-100" },
      { label: "Worksheet", icon: FileText, color: "text-blue-500 bg-blue-50 border-blue-100" },
      { label: "Practice Activity", icon: Layers, color: "text-cyan-500 bg-cyan-50 border-cyan-100" },
      { label: "Assessment", icon: CheckCircle2, color: "text-amber-500 bg-amber-50 border-amber-100" },
    ]
  },
  {
    id: 2,
    number: "01",
    title: "Introduction to Place Value",
    description: "Understand what equivalent fractions are and how to identify them.",
    status: "In Progress",
    statusColor: "bg-amber-400/20 text-amber-700 border border-amber-400/30",
    tags: [
      { label: "Lesson Note", icon: BookOpen, color: "text-rose-500 bg-rose-50 border-rose-100" },
      { label: "Video", icon: Video, color: "text-purple-500 bg-purple-50 border-purple-100" },
      { label: "Practice Activity", icon: Layers, color: "text-cyan-500 bg-cyan-50 border-cyan-100" },
    ]
  },
  {
    id: 3,
    number: "01",
    title: "Introduction to Place Value",
    description: "Understand what equivalent fractions are and how to identify them.",
    status: "Not Started",
    statusColor: "bg-slate-200/70 text-slate-600 border border-slate-300/50",
    tags: [
      { label: "Lesson Note", icon: BookOpen, color: "text-rose-500 bg-rose-50 border-rose-100" },
      { label: "Video", icon: Video, color: "text-purple-500 bg-purple-50 border-purple-100" },
      { label: "Practice Activity", icon: Layers, color: "text-cyan-500 bg-cyan-50 border-cyan-100" },
    ]
  }
];

export default function LessonDetail() {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const [activeTab, setActiveTab] = useState("lessons");

  return (
    <div className="w-full min-h-screen p-6 md:p-10 font-sans text-slate-800 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
            <span 
              className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors" 
              onClick={() => navigate('/student/learning')}
            >
              My Learning Journey
            </span>
            <ChevronRight className="w-4 h-4 text-blue-500" />
            <span 
              className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
              onClick={() => navigate(-1)}
            >
              Mathematics
            </span>
            <ChevronRight className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 font-medium">
              Numbers
            </span>
          </div>
        </div>

        {/* Main Topic Header Section */}
        <div className="space-y-6 bg-transparent pt-2">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
               Numbers
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl font-normal">
              Understand numbers, place value, and how to work with them.
            </p>
          </div>

          {/* Progress Section & Continue Learning Button Side-by-Side */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2.5 flex-1 max-w-xl">
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="font-bold text-slate-900">
                  82% Complete
                </span>
                <span className="text-slate-500 font-medium text-xs">
                  6 of 8 lessons completed
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-slate-900 rounded-full transition-all duration-500" 
                  style={{ width: `82%` }}
                />
              </div>
            </div>

            {/* Dark Continue Learning Button */}
            <div>
              <button className="flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs md:text-sm font-medium py-3 px-6 rounded-xl transition-all shadow-md group whitespace-nowrap">
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Tabs Navigation (Lessons / About this topic) */}
          <div className="flex items-center gap-8 border-b border-slate-200 pt-4 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab("lessons")}
              className={`pb-3 relative transition-colors ${activeTab === "lessons" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
              Lessons
              {activeTab === "lessons" && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-full" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("about")}
              className={`pb-3 relative transition-colors ${activeTab === "about" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
              About this topic
              {activeTab === "about" && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Lessons Cards List */}
        <div className="space-y-4 pt-2">
          {lessonsList.map((lesson) => (
            <div 
              key={lesson.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-sm hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left: Number circle & Title/Desc */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 font-bold text-base flex items-center justify-center shrink-0">
                    {lesson.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg">
                      {lesson.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                {/* Right: Status Badge */}
                <div className="self-start md:self-center">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${lesson.statusColor}`}>
                    {lesson.status}
                  </span>
                </div>
              </div>

              {/* Bottom Tags / Resource Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                {lesson.tags.map((tag, idx) => {
                  const IconComp = tag.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${tag.color}`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{tag.label}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}