
import {
  GraduationCap,
  Users,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

const features = [
  {
    title: "Flexible Teaching",
    description:
      "Teach from anywhere, with classes scheduled around your learners.",
    icon: GraduationCap,
    iconColor: "text-violet-500",
    bgColor: "bg-violet-100",
  },
  {
    title: "Supportive Community",
    description:
      "Be part of a trusted learning community.",
    icon: Users,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Real Impact",
    description:
      "Help students build confidence and achieve success.",
    icon: ChartNoAxesColumnIncreasing,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-100",
  },
];

export default function LmsSidebar() {
  return (
    <aside className="relative flex h-full min-h-[394px] w-full max-w-[168px] flex-col overflow-hidden rounded-[7px] border-[2px] border-[#607b89] bg-[#fff7eb] px-[15px] pt-[23px] text-[#183c25] sm:max-w-[260px] sm:px-5">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-extrabold tracking-[-0.3px] text-[#172d75]">
            LMS
          </span>
          <span className="text-[8px] font-medium text-[#243d83]">
            SYSTEM
          </span>
        </div>

        <p className="mt-[1px] text-[4px] leading-none text-[#8b8b83]">
          Become a Tutor
        </p>
      </div>

      {/* Introduction */}
      <div className="mt-[24px]">
        <h1 className="text-[11px] font-bold leading-[1.3] tracking-[-0.3px] text-[#205e25] sm:text-[19px]">
          Teach. Inspire.
          <br />
          Make an Impact.
        </h1>

        <p className="mt-[8px] text-[6.5px] leading-[1.45] text-[#85847d] sm:text-[11px]">
          Join our community of passionate tutors and help students achieve
          their learning goals.
        </p>
      </div>

      {/* Features */}
      <div className="mt-[13px] flex flex-col gap-[10px]">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex items-start gap-[8px]"
            >
              <div
                className={`flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[6px] ${feature.bgColor}`}
              >
                <Icon
                  size={11}
                  strokeWidth={2.4}
                  className={feature.iconColor}
                />
              </div>

              <div className="min-w-0 pt-[1px]">
                <h2 className="text-[6.5px] font-bold leading-[1.3] text-[#20251f] sm:text-[11px]">
                  {feature.title}
                </h2>

                <p className="mt-[3px] text-[5.2px] leading-[1.45] text-[#85847d] sm:text-[9px]">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tutor illustration */}
      <div className="pointer-events-none mt-auto flex min-h-[112px] items-end justify-center sm:min-h-[190px]">
        <img
          src="/images/tutor-illustration.png"
          alt="Tutor working on a laptop at a desk"
          className="h-auto w-[155%] max-w-none object-contain object-bottom"
        />
      </div>
    </aside>
  );
}
