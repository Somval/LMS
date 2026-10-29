import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ImagePath from "../assets/images/134a082cca973150969aa91355d8ac63a4934a6a (1).png"
export default function AchievementTimelineDetails() {
  const [selectedItem, setSelectedItem] = useState({
    title: "Mathematics Milestone",
    date: "Aug 8, 2026",
    fullDate: "August 8, 2026",
    description: "Olivia completed the required learning activities and reached this major milestone in Mathematics.",
    imagePath: ImagePath,
    achievements: [
      "Completed required learning activities",
      "Consistent effort and improvement",
      "Demonstrated strong understanding of key concepts"
    ]
  });

  const timelineData = [
    {
      month: "August 2026",
      items: [
        {
          id: 1,
          title: "Mathematics Milestone",
          description: "Completed a major Mathematics learning milestone.",
          date: "Aug 8, 2026",
          fullDate: "August 8, 2026",
          imagePath: ImagePath
        },
        {
          id: 2,
          title: "Mathematics Milestone",
          description: "Completed a major Mathematics learning milestone.",
          date: "Aug 8, 2026",
          fullDate: "August 8, 2026",
          imagePath:ImagePath
        }
      ]
    },
    {
      month: "July 2026",
      items: [
        {
          id: 3,
          title: "Mathematics Milestone",
          description: "Completed a major Mathematics learning milestone.",
          date: "Aug 8, 2026",
          fullDate: "August 8, 2026",
          imagePath: ImagePath
        },
        {
          id: 4,
          title: "Mathematics Milestone",
          description: "Completed a major Mathematics learning milestone.",
          date: "Aug 8, 2026",
          fullDate: "August 8, 2026",
          imagePath:ImagePath
        },
        {
          id: 5,
          title: "Mathematics Milestone",
          description: "Completed a major Mathematics learning milestone.",
          date: "Aug 8, 2026",
          fullDate: "August 8, 2026",
          imagePath: ImagePath
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6  rounded-3xl  grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Column: Achievement Timeline */}
      <div className="lg:col-span-7 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Achievement Timeline</h2>

        <div className="relative pl-6 space-y-8">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

          {timelineData.map((section, idx) => (
            <div key={idx} className="space-y-4">
              
              {/* Month Indicator Node */}
              <div className="relative flex items-center gap-3">
                <div 
                  className="absolute -left-[23px] w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: '#2E6DFF' }}
                ></div>
                <h3 className="text-base font-bold" style={{ color: '#2E6DFF' }}>{section.month}</h3>
              </div>

              {/* Items for the Month */}
              <div className="space-y-3 pl-2">
                {section.items.map((item) => {
                  const isSelected = selectedItem.title === item.title && selectedItem.date === item.date;
                  return (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`relative flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${
                        isSelected 
                          ? 'bg-[#e8f0fe] border-blue-200 shadow-sm' 
                          : 'bg-white hover:bg-gray-50 border-transparent'
                      }`}
                    >
                      {/* Timeline Dot on node line */}
                      <div 
                        className="absolute -left-[27px] w-2.5 h-2.5 rounded-full border-2 border-white"
                        style={{ backgroundColor: '#2E6DFF' }}
                      ></div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#d0e1fe] flex items-center justify-center p-2 shrink-0">
                          <img src={item.imagePath} alt={item.title} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>

                      <div className="text-xs font-medium text-gray-500 shrink-0 ml-4">
                        {item.date}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Achievement Details */}
      <div className="lg:col-span-5 pl-0 lg:pl-4 flex flex-col justify-start">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Achievement Details</h2>

        <div className="flex flex-col items-center text-center">
          {/* Badge Preview Image */}
          <div className="w-32 h-32 rounded-full bg-[#d0e1fe] flex items-center justify-center p-4 mb-4 shadow-sm">
            <img src={selectedItem.imagePath} alt="Selected Badge" className="w-full h-full object-contain" />
          </div>

          <h3 className="text-xl font-bold text-gray-900">{selectedItem.title}</h3>
          <p className="text-sm font-semibold mt-1" style={{ color: '#2E6DFF' }}>Achieved on {selectedItem.fullDate}</p>

          <div className="w-full border-t border-gray-100 my-6"></div>

          <p className="text-sm text-gray-600 text-left leading-relaxed w-full">
            {selectedItem.description}
          </p>

          <div className="w-full mt-6 text-left">
            <h4 className="text-sm font-bold text-gray-900 mb-4">What was achieved</h4>
            <div className="space-y-3">
              {selectedItem.achievements.map((ach, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50 shrink-0" />
                  <span className="text-sm text-gray-600">{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}