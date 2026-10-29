import React from "react";
import {
  CircleCheck,
  CalendarDays,
  BarChart3,
} from "lucide-react";

import LmsIllustration from "../src/assets/images/0ec2e3071c5946476d2dabc6293abaa7944d3a8d.png";

export default function LmsWelcome() {
  const features = [
    {
      icon: CircleCheck,
      iconClass: "bg-[#DDD9FF] text-[#5B3FF2]",
      title: "Quality Learning",
      description: "Access live classes, assignments and resources.",
    },
    {
      icon: CalendarDays,
      iconClass: "bg-[#CFF6E8] text-[#16C784]",
      title: "Flexible Schedule",
      description: "Learn at times that work best for you.",
    },
    {
      icon: BarChart3,
      iconClass: "bg-[#FBE4DC] text-[#F47B42]",
      title: "Track Progress",
      description: "Monitor your progress and achievements.",
    },
  ];

  return (
    <aside className="relative flex h-full w-full max-w-[270px] flex-col justify-between overflow-hidden bg-[#EEF2FF] px-6 py-8">
      {/* Top Content Container */}
      <div className="relative z-10 flex flex-col">
        {/* Brand */}
        <div>
          <h1 className="text-sm font-extrabold tracking-tight text-[#172B63]">
            LMS SYSTEM
          </h1>
          <p className="mt-0.5 text-[10px] font-medium tracking-wide text-[#8B94AD]">
            Student Portal
          </p>
        </div>

        {/* Welcome content */}
        <div className="mt-8">
          <h2 className="text-xl font-extrabold leading-snug tracking-tight text-[#111111]">
            Welcome to <br />
            LMS System
          </h2>

          <p className="mt-2.5 text-[11px] font-medium leading-relaxed text-[#A1A5B3]">
            Create your account to start <br />
            your learning journey.
          </p>
        </div>

        {/* Features */}
        <div className="mt-6 flex flex-col gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${feature.iconClass}`}
                >
                  <Icon size={14} strokeWidth={2.5} />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h3 className="text-[11px] font-bold leading-tight text-[#151515]">
                    {feature.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] font-medium leading-relaxed text-[#A1A5B3]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom illustration */}
      <div className="relative z-0 mt-auto w-full overflow-hidden pt-4 flex justify-start">
        <img
          src={LmsIllustration}
          alt="LMS dashboard illustration"
          className="h-auto w-full max-w-[170px] object-contain object-left"
        />
      </div>
    </aside>
  );
}