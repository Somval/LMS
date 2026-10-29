
import React from "react";
import { Info } from "lucide-react";

export default function LinkChildOptionSelect({
  selectedOption,
  onSelectOption,
}) {
  const options = [
    {
      id: "link",
      title: "Link an Existing Learner Account",
      description:
        "Has your child already created an account? Enter their link code to connect their account.",
      icon: (
        <svg
          width="51"
          height="51"
          viewBox="0 0 51 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-8 w-8 shrink-0 sm:h-11 sm:w-11 lg:h-[51px] lg:w-[51px]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.4931 3.56866C28.7781 1.28369 31.8771 0 35.1086 0H35.6272C43.9793 0 50.75 6.77072 50.75 15.1228C50.75 18.2511 49.5073 21.2513 47.2953 23.4633L39.7839 30.9747C34.8291 35.9294 26.7959 35.9294 21.8411 30.9747L18.6559 27.7894C17.948 27.0816 17.948 25.934 18.6559 25.2262C19.3637 24.5184 20.5113 24.5184 21.2191 25.2262L24.4043 28.4114C27.9435 31.9505 33.6815 31.9505 37.2207 28.4114L44.732 20.9001C46.2642 19.3678 47.125 17.2897 47.125 15.1228C47.125 8.77275 41.9772 3.625 35.6272 3.625H35.1086C32.8386 3.625 30.6615 4.52677 29.0563 6.13193L24.8441 10.3441C24.1363 11.052 22.9887 11.052 22.2809 10.3441C21.573 9.63631 21.573 8.48869 22.2809 7.78087L26.4931 3.56866ZM26.3457 21.6589C22.8065 18.1198 17.0685 18.1198 13.5294 21.6589L6.13193 29.0563C4.52677 30.6615 3.625 32.8386 3.625 35.1086C3.625 41.7451 9.00493 47.125 15.6414 47.125C17.9114 47.125 20.0885 46.2232 21.6937 44.6181L25.9059 40.4059C26.6137 39.698 27.7613 39.698 28.4691 40.4059C29.177 41.1137 29.177 42.2613 28.4691 42.9691L24.2569 47.1813C21.972 49.4663 18.8729 50.75 15.6414 50.75C7.0029 50.75 0 43.7471 0 35.1086C0 31.8771 1.28369 28.7781 3.56866 26.4931L10.9661 19.0956C15.9209 14.1409 23.9541 14.1409 28.9089 19.0957L32.0941 22.2809C32.802 22.9887 32.802 24.1363 32.0941 24.8441C31.3863 25.552 30.2387 25.552 29.5309 24.8441L26.3457 21.6589Z"
            fill="#2F327D"
          />
        </svg>
      ),
    },
    {
      id: "create",
      title: "Create a New Learner Account",
      description:
        "Set up a new learner account for your child and select their courses.",
      icon: (
        <svg
          width="53"
          height="58"
          viewBox="0 0 53 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-9 w-8 shrink-0 sm:h-12 sm:w-11 lg:h-[58px] lg:w-[53px]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M38.1333 14.5C38.1333 22.5081 31.6414 29 23.6333 29C15.6252 29 9.1333 22.5081 9.1333 14.5C9.1333 6.49187 15.6252 0 23.6333 0C31.6414 0 38.1333 6.49187 38.1333 14.5ZM34.5083 14.5C34.5083 20.5061 29.6394 25.375 23.6333 25.375C17.6272 25.375 12.7583 20.5061 12.7583 14.5C12.7583 8.4939 17.6272 3.625 23.6333 3.625C29.6394 3.625 34.5083 8.4939 34.5083 14.5Z"
            fill="#2F327D"
          />
          <path
            d="M23.6335 54.375C15.6106 54.375 8.45644 50.6547 3.80161 44.8317L4.36065 40.9185C4.74333 38.2397 7.03752 36.25 9.7435 36.25H26.3802C27.2966 34.8811 28.4146 33.6585 29.6919 32.625H9.7435C5.23354 32.625 1.40988 35.9412 0.77208 40.4059L0 45.8104C5.25745 53.1885 13.8836 58 23.6335 58C25.4984 58 27.3221 57.824 29.0891 57.4876C28.02 56.5336 27.0773 55.4409 26.2894 54.2378C25.4165 54.3285 24.5304 54.375 23.6335 54.375Z"
            fill="#2F327D"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M52.6333 45.3125C52.6333 52.3196 46.9529 58 39.9458 58C32.9387 58 27.2583 52.3196 27.2583 45.3125C27.2583 38.3054 32.9387 32.625 39.9458 32.625C46.9529 32.625 52.6333 38.3054 52.6333 45.3125ZM39.9458 36.25C40.9468 36.25 41.7583 37.0615 41.7583 38.0625V43.5H47.1958C48.1968 43.5 49.0083 44.3115 49.0083 45.3125C49.0083 46.3135 48.1968 47.125 47.1958 47.125H41.7583V53.4688C41.7583 54.4698 40.9468 55.2812 39.9458 55.2812C38.9448 55.2812 38.1333 54.4698 38.1333 53.4688V47.125H32.6958C31.6948 47.125 30.8833 46.3135 30.8833 45.3125C30.8833 44.3115 31.6948 43.5 32.6958 43.5H38.1333V38.0625C38.1333 37.0615 38.9448 36.25 39.9458 36.25Z"
            fill="#2F327D"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="animate-in fade-in w-full min-w-0 font-[Nunito,sans-serif] text-slate-800 duration-200">
      {/* Heading */}
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
          Link a Child to Your Account
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          You can either link an existing learner account or create a new
          learner account for your child.
        </p>
      </div>

      {/* Selectable Options */}
      <div className="flex w-full min-w-0 flex-col gap-3 sm:gap-4">
        {options.map((option) => {
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectOption(option.id)}
              aria-pressed={isSelected}
              className={`flex min-h-[137px] w-full min-w-0 items-center gap-3 rounded-xl border-2 bg-[#D2D3D7] p-3 text-left shadow-sm transition-all duration-200 sm:gap-5 sm:p-5 ${
                isSelected
                  ? "border-[#2F327D] ring-2 ring-[#2F327D]/15"
                  : "border-transparent hover:border-indigo-300"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F327D] focus-visible:ring-offset-2`}
            >
              {/* Icon */}
              <div className="flex shrink-0 items-center justify-center">
                {option.icon}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1 break-words">
                <h3 className="text-sm font-bold leading-snug text-indigo-950 sm:text-base">
                  {option.title}
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                  {option.description}
                </p>
              </div>

              {/* Radio Indicator */}
              <div className="flex shrink-0 items-center">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected
                      ? "border-[#2F327D] bg-[#2F327D]"
                      : "border-slate-500 bg-white"
                  }`}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Information Callout */}
      <div className="mt-5 flex w-full min-w-0 items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 sm:mt-8 sm:p-5">
        <Info
          className="mt-0.5 h-5 w-5 shrink-0 fill-blue-600 text-white"
          aria-hidden="true"
        />

        <p className="min-w-0 break-words text-xs leading-relaxed text-slate-600 sm:text-sm">
          Your child's account will be linked to your Parent Portal, and you
          will be able to manage their learning and subscription.
        </p>
      </div>
    </div>
  );
}
