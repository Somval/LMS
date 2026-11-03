import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import Image from "../../assets/images/f8032fd0f249f3e29bb1d22d52d131500a6714a0 (1).png";

export default function PaymentSuccess({ 
  childName = "your child",
  successImageSrc = Image,
  onDashboardClick,
  pending = false,
}) {
  return (
    <div className="w-full min-h-[500px] flex flex-col items-center justify-between px-4 py-6 sm:p-8 bg-white font-sans text-center">
      <div className="w-full max-w-md mx-auto flex flex-col items-center pt-2 sm:pt-6">
        
        {/* Success Illustration Image - Fully Responsive */}
        <div className="mb-6 flex items-center justify-center w-full">
          <img 
            src={successImageSrc} 
            alt="Payment Successful" 
            className="w-full max-w-[280px] sm:max-w-[380px] md:max-w-[450px] h-auto max-h-[180px] sm:max-h-[220px] object-contain"
          />
        </div>

        {/* Heading & Subtitles */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
          {pending ? "Receipt Received!" : "Payment Successful!"}
        </h2>
        
        <p className="text-sm sm:text-base font-bold text-emerald-500 mb-2 sm:mb-3">
          {pending ? "We are confirming your payment" : `${childName} is all set!`}
        </p>

        <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed mb-6 sm:mb-8">
          {pending
            ? `${childName}'s account will be activated as soon as your transfer is confirmed.`
            : `${childName}'s account is now active.`}<br />
          {pending ? "You can follow the status from your dashboard." : "They can now log in and start learning."}
        </p>

        {/* Go to Dashboard Button with Link Wrapper */}
        <Link to="/parent/dashboard" className="w-full max-w-sm">
          <button
            type="button"
            onClick={onDashboardClick}
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 transition-all"
          >
            <LayoutGrid className="w-5 h-5 flex-shrink-0" />
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0" />
          </button>
        </Link>
      </div>

      {/* Footer Note */}
      <div className="pt-6 sm:pt-8 pb-2">
        <p className="text-[10px] sm:text-[11px] text-gray-400 italic leading-normal">
          Thank you for choosing LMS. We are excited to be part of your child's learning journey!
        </p>
      </div>
    </div>
  );
}