
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import BankTransferDetails from "./BankTransferDetails";

const selectedCourses = [
  {
    id: 1,
    name: "Mathematics",
    level: "Year 1",
    price: 5,
    icon: (
      <svg
        width="53"
        height="53"
        viewBox="0 0 53 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          width="52.0811"
          height="52.0811"
          rx="6"
          fill="#2F327D"
        />
        <path
          d="M32.7502 40H18.2502C16.6484 39.9981 15.1128 39.3609 13.9802 38.2283C12.8476 37.0957 12.2104 35.5601 12.2085 33.9583V17.0417C12.2104 15.4399 12.8476 13.9043 13.9802 12.7717C15.1128 11.6391 16.6484 11.0019 18.2502 11H32.7502C34.3519 11.0019 35.8875 11.6391 37.0201 12.7717C38.1528 13.9043 38.7899 15.4399 38.7918 17.0417V33.9583C38.7899 35.5601 38.1528 37.0957 37.0201 38.2283C35.8875 39.3609 34.3519 39.9981 32.7502 40Z"
          fill="white"
        />
      </svg>
    ),
  },
];

export default function CompletePayment({
  selectedCourses: coursesProp,
  onEditCourses,
  onPaymentMethodChange,
  bank,
  error,
}) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showBankDetails, setShowBankDetails] = useState(false);

  const courses = Array.isArray(coursesProp)
    ? coursesProp
    : selectedCourses;

  const total = courses.reduce(
    (sum, course) => sum + Number(course.price || 0),
    0
  );

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    onPaymentMethodChange?.(method);

    setShowBankDetails(method === "bank-transfer");
  };

  const closeBankDetails = () => {
    setShowBankDetails(false);
  };

  // Allow the popup to close with the Escape key.
  useEffect(() => {
    if (!showBankDetails) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeBankDetails();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showBankDetails]);

  return (
    <div className="w-full min-w-0 font-[Nunito,sans-serif] text-black">
      {/* Heading */}
      <div className="mb-5">
        <h1 className="text-[30px] font-bold leading-tight">
          Review and Complete Payment
        </h1>

        <p className="mt-1.5 max-w-2xl text-[18px] font-medium leading-relaxed text-[#8181A5]">
          Review the selected courses and choose a payment method to activate
          your child&apos;s account.
        </p>
      </div>

      {/* Selected Courses Heading */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold sm:text-base">
          Selected Courses ({courses.length})
        </h2>

        <button
          type="button"
          onClick={onEditCourses}
          className="shrink-0 text-sm font-semibold text-[#3366FF] transition-colors hover:text-[#2F327D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3366FF] focus-visible:ring-offset-2"
        >
          Edit
        </button>
      </div>

      {/* Course List */}
      <div className="w-full space-y-3 sm:space-y-3.5">
        {courses.map((course, index) => (
          <div
            key={course.id ?? index}
            className="flex w-full min-w-0 items-center gap-3"
          >
            <div className="h-[30px] w-[30px] shrink-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full">
              {course.icon}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-xs font-bold leading-snug sm:text-sm">
                {course.name}
              </h3>

              <p className="mt-0.5 text-[10px] leading-snug text-[#2F327D] sm:text-xs">
                {course.level}
              </p>
            </div>

            <div className="shrink-0 text-right text-xs sm:text-sm">
              <span className="font-semibold">
                ₦{Number(course.price || 0).toLocaleString()}
              </span>

              <span className="ml-1 text-[#8181A5]">/ month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Total */}
      <div className="mt-7 flex items-center justify-between gap-4 sm:mt-8">
        <h2 className="text-sm font-bold sm:text-base">
          Total (Monthly)
        </h2>

        <p className="shrink-0 text-xl font-bold text-[#3366FF] sm:text-2xl">
          ₦{total.toLocaleString()}
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="mt-8 sm:mt-9">
        <h2 className="mb-3 text-sm font-bold sm:text-base">
          Payment Method
        </h2>

        <div className="space-y-3">
          {/* Pay with Card */}
          <label className="flex w-fit cursor-pointer select-none items-center gap-3 text-xs sm:text-sm">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => handlePaymentMethodChange("card")}
              className="h-4 w-4 shrink-0 cursor-pointer accent-[#2F327D]"
            />

            <span>Pay with Card</span>
          </label>

          {/* Bank Transfer */}
          <label className="flex w-fit cursor-pointer select-none items-center gap-3 text-xs sm:text-sm">
            <input
              type="radio"
              name="paymentMethod"
              value="bank-transfer"
              checked={paymentMethod === "bank-transfer"}
              onChange={() =>
                handlePaymentMethodChange("bank-transfer")
              }
              className="h-4 w-4 shrink-0 cursor-pointer accent-[#2F327D]"
            />

            <span className="font-medium">Bank Transfer</span>
          </label>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {/* Bank Transfer Details Popup */}
      {showBankDetails && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeBankDetails();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="bank-details-title"
            className="my-auto max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl sm:p-8"
          >
            {/* Popup Header */}
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2
                  id="bank-details-title"
                  className="text-lg font-bold text-gray-900 sm:text-xl"
                >
                  Bank Transfer Details
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  Please make a transfer to the account details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeBankDetails}
                aria-label="Close bank transfer details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F327D]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Bank Transfer Component */}
            <div className="py-2">
              <BankTransferDetails totalAmount={total} bank={bank} />
            </div>

            {/* Close Popup */}
            <button
              type="button"
              onClick={closeBankDetails}
              className="mt-6 w-full rounded-xl bg-[#2F327D] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2F327D]/20 transition hover:bg-[#24265f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F327D] focus-visible:ring-offset-2"
            >
              Close
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
