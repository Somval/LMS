import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { dayLabel, durationLabel, fullDate, openLink } from './classFormat';
import AllRecordedLessons from "./AllRecordedLessons"
import ImageTutorial from "../assets/images/19fad061fbe0cc8aa7726aacc749b1ccd57c8161.jpg"
// Sample data for recently recorded lessons

const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || 'T';

export default function RecordedLessons() {
  const [lessonsData, setLessonsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Recordings are past classes that have a recording link.
    api
      .get('/classes', { to: new Date().toISOString() })
      .then((classes) => {
        const now = new Date();
        setLessonsData(
          classes
            .filter((c) => c.recordingUrl)
            .map((c) => {
              const start = new Date(c.startsAt);
              const day = dayLabel(c.startsAt);
              return {
                id: c.id,
                subject: c.subject.name,
                title: c.title,
                instructor: c.tutor.user.fullName,
                date: fullDate(c.startsAt),
                shortDate: day.date,
                subDate: day.day,
                duration: durationLabel(c.startsAt, c.endsAt),
                image: ImageTutorial,
                recordingUrl: c.recordingUrl,
                timeframe: start.getMonth() === now.getMonth() && start.getFullYear() === now.getFullYear() ? 'This Month' : 'Earlier',
              };
            })
        );
      })
      .catch((err) => setError(err.message || 'Could not load your recordings.'))
      .finally(() => setLoading(false));
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Month');
  
  // Dropdown open/closed states
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);

  const subjects = ['All Subjects', ...new Set(lessonsData.map((l) => l.subject))];
  const timeframes = ['This Month', 'Earlier', 'All Time'];

  // Filter logic based on search and dropdowns
  const filteredLessons = lessonsData.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lesson.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All Subjects' || lesson.subject === selectedSubject;
    const matchesTimeframe = selectedTimeframe === 'All Time' || lesson.timeframe === selectedTimeframe;

    return matchesSearch && matchesSubject && matchesTimeframe;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lessons..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-sm transition-all"
            />
          </div>

          {/* Subject Dropdown */}
          <div className="relative w-full md:w-56">
            <button
              onClick={() => { setIsSubjectOpen(!isSubjectOpen); setIsTimeframeOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            >
              <span className="font-medium">{selectedSubject}</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${isSubjectOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isSubjectOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg py-1">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => { setSelectedSubject(sub); setIsSubjectOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Timeframe Dropdown */}
          <div className="relative w-full md:w-56">
            <button
              onClick={() => { setIsTimeframeOpen(!isTimeframeOpen); setIsSubjectOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            >
              <span className="font-medium">{selectedTimeframe}</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${isTimeframeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isTimeframeOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg py-1">
                {timeframes.map((time) => (
                  <button
                    key={time}
                    onClick={() => { setSelectedTimeframe(time); setIsTimeframeOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Section Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recently Recorded Lessons</h2>

        {/* Lesson Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative rounded-xl overflow-hidden mb-4 aspect-video">
                    <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Subject Tag */}
                  <span className="text-indigo-900 font-semibold text-sm mb-1 block">
                    {lesson.subject}
                  </span>

                  {/* Lesson Title */}
                  <h3 className="text-gray-900 font-bold text-base mb-4 leading-snug">
                    {lesson.title}
                  </h3>

                  {/* Instructor Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-900">{initials(lesson.instructor)}</span>
                    <span className="text-gray-600 text-sm font-medium">{lesson.instructor}</span>
                  </div>

                  {/* Date and Duration metadata */}
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-5 border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{lesson.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Watch Lesson Button */}
                <button type="button" onClick={() => openLink(lesson.recordingUrl)} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-indigo-900/30 rounded-xl text-indigo-950 font-medium text-sm hover:bg-indigo-50/50 transition-colors">
                  <svg className="w-4 h-4 fill-indigo-950" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Lesson
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-400">
              {loading ? 'Loading…' : error || (lessonsData.length === 0 ? 'No recorded lessons yet. Recordings appear here after your tutor adds them to a class.' : 'No lessons found matching your filters.')}
            </div>
          )}
        </div>

      </div>
      <AllRecordedLessons lessons={lessonsData} />
    </div>
  );
}