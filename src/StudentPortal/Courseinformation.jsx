import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronDown, 
  Lock, 
  Video, 
  FileText,
  ArrowRight
} from 'lucide-react';

const curriculumData = [
  {
    id: 1,
    number: "01",
    title: "Numbers",
    description: "Place value, rounding, ordering and more.",
    lessonsCount: "8 lessons",
    colorBg: "bg-emerald-500 text-white",
  },
  {
    id: 2,
    number: "02",
    title: "Numbers",
    description: "Place value, rounding, ordering and more.",
    lessonsCount: "8 lessons",
    colorBg: "bg-pink-600 text-white",
  },
  {
    id: 3,
    number: "03",
    title: "Numbers",
    description: "Place value, rounding, ordering and more.",
    lessonsCount: "8 lessons",
    colorBg: "bg-amber-400 text-white",
  },
  {
    id: 4,
    number: "04",
    title: "Numbers",
    description: "Place value, rounding, ordering and more.",
    lessonsCount: "8 lessons",
    colorBg: "bg-teal-500 text-white",
  },
  {
    id: 5,
    number: "05",
    title: "Numbers",
    description: "Place value, rounding, ordering and more.",
    lessonsCount: "8 lessons",
    colorBg: "bg-rose-400 text-white",
  },
  {
    id: 6,
    number: "06",
    title: "Numbers",
    description: "Place value, rounding, ordering and more.",
    lessonsCount: "8 lessons",
    colorBg: "bg-slate-500 text-white",
  },
  {
    id: 7,
    number: "07",
    title: "Numbers",
    description: "Place value, rounding, ordering and more.",
    lessonsCount: "8 lessons",
    colorBg: "bg-amber-700 text-white",
  },
  {
    id: 8,
    number: "08",
    title: "Numbers",
    description: "Place value, rounding, ordering and more.",
    lessonsCount: "8 lessons",
    colorBg: "bg-emerald-400 text-white",
  },
];

export default function CourseDetail({ course, onBack }) {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [openWeeks, setOpenWeeks] = useState({
    1: true,
    2: false
  });

  const toggleWeek = (weekNumber) => {
    setOpenWeeks(prev => ({
      ...prev,
      [weekNumber]: !prev[weekNumber]
    }));
  };

  const currentProgress = course ? course.progress : 72;
  const completedCount = course ? course.completedLessons : 24;
  const totalCount = course ? course.totalLessons : 32;
  const subjectName = course ? course.subject || course.title : 'Mathematics';

  const handleLessonClick = (item) => {
    // Fallback to ID '1' if courseId is undefined from URL params
    const activeCourseId = courseId || course?.id || '1';
    navigate(`/student/learning/${activeCourseId}/lesson/${item.id}`);
  };

  return (
    <div className="w-full min-h-screen p-6 md:p-10 font-sans text-slate-800 bg-transparent">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Navbar Header (Breadcrumb only) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
            <span 
              className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors" 
              onClick={onBack ? onBack : () => navigate('/student/learning')}
            >
              {course ? course.breadcrumbParent || 'My Learning Journey' : 'My Learning Journey'}
            </span>
            <ChevronRight className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 font-medium">
              {subjectName}
            </span>
          </div>
        </div>

        {/* Main Course Header Box */}
        <div className="space-y-6 bg-transparent">
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
               {subjectName}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl font-normal">
              {course ? course.description : 'Learn the fundamentals of algebra, linear equations, and problem solving.'}
            </p>
          </div>

          {/* Progress Section & Action Button Side-by-Side */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2 flex-1 max-w-xl">
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="font-bold text-[#2F327D]">
                  {currentProgress}% Complete
                </span>
                <span className="text-slate-400 font-medium">
                  {completedCount} of {totalCount} lessons completed
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-[#2F327D] rounded-full transition-all duration-500" 
                  style={{ width: `${currentProgress}%` }}
                />
                <div className="h-full bg-slate-100 flex-1" />
              </div>
            </div>

            {/* Continue Learning Action Button */}
            <div>
              <button className="flex items-center justify-center gap-2 bg-[#2F327D] hover:bg-[#252865] text-white text-sm font-medium py-3 px-6 rounded-xl transition-all shadow-sm group whitespace-nowrap">
                <span>Continue Learning</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Learning Content Section Card */}
        <div className="border border-slate-200/60 shadow-sm rounded-3xl p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
            Curriculum
          </h2>

          <div className="space-y-3">
            {curriculumData.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleLessonClick(item)}
                className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/70 hover:border-[#2F327D] hover:shadow-md transition-all cursor-pointer group bg-white"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 ${item.colorBg}`}>
                    {item.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm md:text-base group-hover:text-[#2F327D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                  <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                    {item.lessonsCount}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-400 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}