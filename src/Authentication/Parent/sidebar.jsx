
import React from "react";
import { BookOpen, Calendar, BarChart3 } from "lucide-react";
import Image from "../../assets/images/0ec2e3071c5946476d2dabc6293abaa7944d3a8d.png";

export default function Sidebar() {
  const features = [
    {
      icon: BookOpen,
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      title: "Quality Learning",
      description:
        "Access your child's courses, lessons, and learning resources.",
    },
    {
      icon: Calendar,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Flexible Schedule",
      description:
        "Stay informed about your child's classes and schedule.",
    },
    {
      icon: BarChart3,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Track Progress",
      description:
        "Monitor your child's progress, attendance, and achievements.",
    },
  ];

  return (
    <div className="flex h-full min-h-[320px] w-full flex-col overflow-hidden bg-[#EAF0FF] px-5 py-7 sm:px-6 lg:min-h-screen lg:px-7">

      {/* Brand */}
      <div className="shrink-0">
        <h2 className="flex items-center gap-1 text-[16px] font-bold leading-none tracking-tight text-[#172554]">
          <span>LMS</span>
          <span className="font-normal">SYSTEM</span>
        </h2>

        <p className="mt-1 text-[8px] leading-tight text-gray-500">
          Parent Portal
        </p>
      </div>

      {/* Welcome */}
      <div className="mt-10 shrink-0">
        <h1 className="text-[21px] font-bold leading-[1.2] tracking-tight text-black">
          Welcome to
          <br />
          LMS System
        </h1>

        <p className="mt-2.5 max-w-[235px] text-[10px] leading-[1.6] text-gray-500">
          Create your account to start monitoring your child's learning
          journey.
        </p>
      </div>

      {/* Features */}
      <div className="mt-6 space-y-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex items-start gap-2.5"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${feature.bgColor}`}
              >
                <Icon
                  className={`h-4 w-4 ${feature.iconColor}`}
                  strokeWidth={2.2}
                />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className="text-[10px] font-semibold leading-tight text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-1 text-[9px] leading-[1.5] text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Illustration */}
      <div className="mt-auto flex min-h-0 flex-1 items-end justify-center pt-5">
        <img
          src={Image}
          alt="LMS Portal Preview"
          className="h-auto max-h-full w-full max-w-[220px] object-contain object-bottom"
        />
      </div>
    </div>
  );
}
