import React from 'react';
import { Clock, CheckCircle2, AlertCircle, PlayCircle, Calendar } from 'lucide-react';

export default function WeeklySchedule({ currentChild, weekOffset }) {
  // Days of the week header data (can be customized per week offset if needed)
  const days = [
    { name: 'MON', date: 'May 18' },
    { name: 'TUE', date: 'May 19' },
    { name: 'WED', date: 'May 20' },
    { name: 'THU', date: 'May 21' },
    { name: 'FRI', date: 'May 22' },
    { name: 'SAT', date: 'May 23' },
    { name: 'SUN', date: 'May 24' },
  ];

  // Time slots from 8:00 AM to 5:00 PM
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
    '4:00 PM', '5:00 PM'
  ];

  // Sample schedule events that dynamically vary slightly based on child ID and week offset
  const baseEvents = [
    {
      id: 1,
      childId: 1,
      weekOffset: 0,
      dayIndex: 1, // Tuesday
      startHourIndex: 6, // 2:00 PM
      duration: 1,
      title: 'English',
      time: '2:00 PM - 3:00 PM',
      teacher: 'David James',
      durationMinutes: '60 min',
      status: 'Completed',
      statusColor: 'text-emerald-600',
      bgTheme: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    },
    {
      id: 2,
      childId: 1,
      weekOffset: 0,
      dayIndex: 2, // Wednesday
      startHourIndex: 4, // 12:00 PM
      duration: 1,
      title: 'Science',
      time: '12:00 PM - 1:00 PM',
      teacher: 'Sarah Johnson',
      durationMinutes: '60 min',
      status: 'Ongoing',
      statusColor: 'text-purple-600',
      bgTheme: 'bg-purple-50 border-purple-200 text-purple-900',
      icon: <PlayCircle className="w-3.5 h-3.5 text-purple-600" />,
    },
    {
      id: 3,
      childId: 1,
      weekOffset: 0,
      dayIndex: 3, // Thursday
      startHourIndex: 6, // 2:00 PM
      duration: 1,
      title: 'Coding',
      time: '2:00 PM - 3:00 PM',
      teacher: 'Michael Brown',
      durationMinutes: '60 min',
      status: 'Upcoming',
      statusColor: 'text-blue-600',
      bgTheme: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
    },
    {
      id: 4,
      childId: 2,
      weekOffset: 0,
      dayIndex: 0, // Monday
      startHourIndex: 2, // 10:00 AM
      duration: 1,
      title: 'Mathematics',
      time: '10:00 AM - 11:00 AM',
      teacher: 'Amanda Lee',
      durationMinutes: '60 min',
      status: 'Completed',
      statusColor: 'text-emerald-600',
      bgTheme: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    },
    {
      id: 5,
      childId: 3,
      weekOffset: 0,
      dayIndex: 4, // Friday
      startHourIndex: 3, // 11:00 AM
      duration: 1,
      title: 'Art & Design',
      time: '11:00 AM - 12:00 PM',
      teacher: 'Clara Oswald',
      durationMinutes: '60 min',
      status: 'Upcoming',
      statusColor: 'text-blue-600',
      bgTheme: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
    }
  ];

  // Filter events matching the selected child, or fallback to general demo events
  const events = baseEvents.filter(
    (e) => e.childId === currentChild?.id && e.weekOffset === (weekOffset % 2)
  );

  return (
    <div className="mx-auto w-full max-w-6xl bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-x-auto font-sans">
      
      {/* Header Title with Active Child Indicator */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-slate-600" />
          Weekly Schedule — <span className="text-blue-600 font-semibold">{currentChild?.name}</span>
        </h2>
      </div>

      {/* Schedule Grid Wrapper */}
      <div className="min-w-[768px]">
        
        {/* Days Header Row */}
        <div className="grid grid-cols-8 border-b border-slate-200 pb-3 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase"></div>
          {days.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-700">{day.name}</span>
              <span className="text-xs text-slate-500">{day.date}</span>
            </div>
          ))}
        </div>

        {/* Time Rows & Events */}
        <div className="relative">
          {timeSlots.map((time, timeIdx) => (
            <div key={timeIdx} className="grid grid-cols-8 h-16 border-b border-slate-100 items-start">
              
              {/* Time Label */}
              <div className="text-xs font-medium text-slate-400 pr-4 pt-1 text-right select-none">
                {time}
              </div>

              {/* 7 Columns for Days */}
              {days.map((_, dayIdx) => (
                <div key={dayIdx} className="border-r border-slate-100 h-full relative"></div>
              ))}
            </div>
          ))}

          {/* Absolute Positioned Event Cards */}
          {events.map((event) => {
            const topOffset = event.startHourIndex * 64; 
            const leftPercent = ((event.dayIndex + 1) / 8) * 100;
            const widthPercent = (1 / 8) * 100;

            return (
              <div
                key={event.id}
                style={{
                  top: `${topOffset + 4}px`,
                  left: `calc(${leftPercent}% + 4px)`,
                  width: `calc(${widthPercent}% - 8px)`,
                }}
                className={`absolute rounded-lg p-3 border shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${event.bgTheme}`}
              >
                <div>
                  <div className="text-[10px] font-semibold opacity-75 mb-0.5">
                    {event.time}
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {event.title}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {event.teacher}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" /> {event.durationMinutes}
                  </span>
                  <span className={`flex items-center gap-1 font-semibold ${event.statusColor}`}>
                    {event.icon} {event.status}
                  </span>
                </div>
              </div>
            );
          })}

          {events.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-xs">
              <p className="text-sm font-medium text-slate-500">No scheduled sessions for {currentChild?.name} this week.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}