import React, { useState } from "react";

export default function NeedHelpCard({ onSupportClick, onItemClick }) {
  const [openId, setOpenId] = useState(null);

  const helpItems = [
    {
      id: 1,
      title: "Where can I find the Learner ID?",
      answer:
        "The Learner ID is located at the top right of your child's student dashboard or printed on their official school ID card.",
    },
    {
      id: 2,
      title: "My child isn't registered yet.",
      answer:
        "If your child doesn't have an account, contact their school administrator or sign them up directly from the Student Portal home page.",
    },
    {
      id: 3,
      title: "I entered the wrong Learner ID.",
      answer:
        "Simply click 'Back' on the linking screen to re-enter the correct ID, or restart the linking process.",
    },
    {
      id: 4,
      title: "How does the verification work?",
      answer:
        "We send a 6-digit OTP code to the email address tied to the learner's account to ensure only authorized parents link accounts.",
    },
    {
      id: 5,
      title: "What if I didn't receive the OTP?",
      answer:
        "Check your spam/junk folder. You can also request a new verification code after waiting 60 seconds.",
    },
    {
      id: 6,
      title: "Can multiple parents link the same child?",
      answer:
        "Yes! Multiple verified parent or guardian accounts can link to the same student profile.",
    },
  ];

  const handleToggle = (item) => {
    setOpenId((prev) => (prev === item.id ? null : item.id));
    onItemClick?.(item);
  };

  const handleSupportClick = () => {
    if (onSupportClick) {
      onSupportClick();
    } else {
      window.location.href = "mailto:support@parentportal.com";
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-[369px] min-h-0 lg:min-h-[619px] rounded-2xl bg-white p-6 font-[Inter] border border-purple-100 shadow-sm flex flex-col justify-between mx-auto">
      {/* Content Area */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-purple-950 mb-4">
          Need Help?
        </h2>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-slate-100">
          {helpItems.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="py-2.5">
                <button
                  type="button"
                  onClick={() => handleToggle(item)}
                  aria-expanded={isOpen}
                  className="w-full py-1 flex items-center justify-between text-left group transition-colors px-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/30"
                >
                  <span
                    className={`text-xs sm:text-sm font-semibold transition-colors pr-2 leading-snug ${
                      isOpen
                        ? "text-purple-700"
                        : "text-slate-800 group-hover:text-purple-900"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-90 text-purple-600"
                        : "group-hover:text-purple-600"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-1.5 pt-2 pb-1 text-xs text-slate-500 leading-relaxed animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Footer */}
      <div className="pt-5 border-t border-slate-100 mt-4 space-y-2.5">
        <p className="text-xs text-slate-500 font-medium">Still need help?</p>
        <button
          type="button"
          onClick={handleSupportClick}
          className="w-full inline-flex items-center justify-center rounded-xl bg-[#F6F4FB] border border-purple-200/80 py-3 px-4 text-xs sm:text-sm font-semibold text-purple-700 shadow-sm transition-all hover:bg-purple-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}