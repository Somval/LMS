import React from 'react';
import { ArrowRight, Calendar, Award, Bell, Briefcase, BookOpen, Percent, MessageSquare } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative flex items-center justify-center min-h-[600px] w-full overflow-hidden bg-[#0a0f1d] px-4 py-16">
      {/* Background Gradient Container with Rounded Card Look */}
      <div className="relative w-full max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-[#0d3b4a] via-[#241b3d] to-[#361a38] p-8 md:p-16 text-white shadow-2xl overflow-hidden border border-white/10">
        
        {/* --- SCATTERED DECORATIVE ELEMENTS (AVATARS & ICONS) --- */}
        {/* Left Side Elements */}
        <div className="absolute top-12 left-12 w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-500/30 hidden md:block">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-28 left-24 w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/40 hidden md:block">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-16 left-12 w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400 shadow-lg hidden md:block">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Teacher and students" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-10 left-36 text-amber-300/80 hidden md:block">
          <Percent className="w-6 h-6 rotate-12" />
        </div>
        <div className="absolute top-1/2 left-8 text-cyan-300/60 hidden md:block">
          <MessageSquare className="w-5 h-5 -rotate-12" />
        </div>

        {/* Right Side Elements */}
        <div className="absolute top-8 right-16 text-amber-300/90 hidden md:block">
          <Award className="w-8 h-8" />
        </div>
        <div className="absolute top-24 right-8 w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400/40 hidden md:block">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Student" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-44 right-16 text-amber-300/80 hidden md:block">
          <Bell className="w-5 h-5 rotate-12" />
        </div>
        <div className="absolute top-1/2 right-4 w-14 h-14 rounded-full overflow-hidden border-2 border-pink-500/40 hidden md:block">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" alt="Student" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-24 right-12 text-amber-300/80 hidden md:block">
          <Briefcase className="w-6 h-6 -rotate-6" />
        </div>
        <div className="absolute bottom-12 right-28 text-amber-300/80 hidden md:block">
          <BookOpen className="w-6 h-6 rotate-6" />
        </div>

        {/* --- MAIN CONTENT CONTAINER --- */}
        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Give Your Child the <span className="text-blue-400">Confidence</span> to Succeed
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="text-sm sm:text-base text-gray-300/90 leading-relaxed mb-10 max-w-xl">
            Open the door to engaging lessons, expert guidance, and meaningful progress that helps every learner build confidence, strengthen essential skills, and achieve lasting academic success.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary Action Button */}
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 w-full sm:w-auto group">
              Get Started 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Action Button */}
            <button className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white font-medium px-8 py-3.5 rounded-xl border border-blue-500/40 hover:border-blue-400 transition-all duration-200 w-full sm:w-auto">
              <Calendar className="w-4 h-4 text-blue-400" />
              Book a Free Lesson
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}