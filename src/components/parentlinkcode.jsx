import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function ParentLinkCode({ link, error }) {
  const [copied, setCopied] = useState(false);

  // The parent needs both values, so the copy button copies both.
  const learnerId = link?.learnerId;
  const parentCode = link ? `${link.code.slice(0, 3)} - ${link.code.slice(3)}` : "";
  const days = link ? Math.max(1, Math.round((new Date(link.expiresAt) - Date.now()) / 86400000)) : 30;

  const handleCopy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(`Learner ID: ${learnerId}\nLink code: ${link.code}`);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy parent link code:", error);
    }
  };

  return (
    <div className="flex w-full justify-center px-4 sm:px-6">
      {/* Increased width container */}
      <div className="w-full max-w-[900px] rounded-[7px] bg-[#FFA50021] p-4 sm:p-5">
        {/* Heading */}
        <div className="flex items-center gap-2">
          <h1 className="font-poppins text-sm font-bold leading-5 text-[#2F327D] sm:text-base">
            Your Parent Link Code
          </h1>

          <svg
            className="h-4 w-4 shrink-0"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Information"
          >
            <path
              d="M10.9492 0C16.9963 0 21.8984 4.90213 21.8984 10.9492C21.8984 16.9963 16.9963 21.8984 10.9492 21.8984C4.90213 21.8984 0 16.9963 0 10.9492C0 4.90213 4.90213 0 10.9492 0ZM10.9492 1.5C5.73056 1.5 1.5 5.73056 1.5 10.9492C1.5 16.1679 5.73056 20.3984 10.9492 20.3984C16.1679 20.3984 20.3984 16.1679 20.3984 10.9492C20.3984 5.73056 16.1679 1.5 10.9492 1.5ZM10.957 10.1992C11.3712 10.1992 11.7069 10.5351 11.707 10.9492V15.4492C11.707 15.8634 11.3712 16.1992 10.957 16.1992C10.5428 16.1992 10.207 15.8634 10.207 15.4492V10.9492C10.2071 10.5351 10.5429 10.1992 10.957 10.1992ZM10.957 6.44922C11.3712 6.44922 11.7069 6.78508 11.707 7.19922V7.94922C11.707 8.36343 11.3712 8.69922 10.957 8.69922C10.5428 8.69922 10.207 8.36343 10.207 7.94922V7.19922C10.2071 6.78508 10.5429 6.44922 10.957 6.44922Z"
              fill="#2A2D70"
            />
          </svg>
        </div>

        {/* Description */}
        <p className="mt-1 font-inter text-[11px] leading-[1.5] text-[#757D84] sm:text-xs">
          Share this code with your parent/guardian so they can link your
          account and complete the subscription payment.
        </p>

        {/* Parent link code box (increased inner max-width to scale with the component) */}
        <div className="mx-auto mt-3 flex h-[42px] w-full max-w-[840px] items-center justify-between rounded-[3px] border border-[#E8E8EE] bg-white px-3 sm:px-4">
          <span className="flex-1 text-center font-poppins text-sm font-bold tracking-wide text-[#33368E] sm:text-base">
            {error ? "Unavailable" : link ? `${learnerId}  •  ${parentCode}` : "Generating…"}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Code copied" : "Copy parent link code"}
            title={copied ? "Copied!" : "Copy code"}
            className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#33368E] transition-colors hover:bg-[#F1F1FA] focus:outline-none focus:ring-2 focus:ring-[#33368E]/30"
          >
            {copied ? (
              <Check size={15} strokeWidth={2} />
            ) : (
              <Copy size={15} strokeWidth={1.8} />
            )}
          </button>
        </div>

        {/* Security note */}
        <p className="mt-1.5 text-[9px] leading-3 text-[#929292]">
          <span className="mr-1">ⓘ</span>
          {error ? error : `Your parent needs both the Learner ID and the code. It expires in ${days} days.`}
        </p>
      </div>
    </div>
  );
}