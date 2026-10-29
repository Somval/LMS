import React from "react";
import SuccessImage from "../../assets/images/5ef1e0f9d2c50905138cb0c9a7e6f15fd7f95c37 (1).png";
import ParentLinkCode from "../../components/parentlinkcode";
import SelectedCourse from "../../components/StudentComponent/SelectedCourses";
import AccountVerification from "../../components/StudentComponent/AccountVerificationstatus";

export default function RegistrationSuccess({ onGoToDashboard }) {
  return (
    <div className="flex w-full flex-col items-center bg-white px-4 py-8 font-inria">
      {/* Success Image */}
      <div className="h-[238px] w-full max-w-[383px]">
        <img
          src={SuccessImage}
          alt="Registration successful"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Success Heading */}
      <h1 className="mt-4 font-inria text-3xl font-bold text-[#2F327D]">
        You’re all set!
      </h1>

      <p className="text-center font-inter text-sm text-[#757D84] sm:text-base">
        Your learner account has been created successfully.
      </p>

      {/* Parent Link Code */}
      <div className="mt-6 w-full max-w-[820px]">
        <ParentLinkCode />
      </div>

      {/* Selected Courses */}
      <div className="mt-6 w-full max-w-[776px]">
        <SelectedCourse />
      </div>

      {/* Account Verification */}
      <div className="mt-6 w-full max-w-[776px]">  
        <AccountVerification />
      </div>

      {/* Action Button */}
      <button
        onClick={onGoToDashboard}
        className="group mt-8 flex h-[81px] w-full max-w-[776px] items-center justify-center gap-4 rounded-[10px] bg-[#2F327D] transition-all hover:bg-[#252865] focus:outline-none focus:ring-2 focus:ring-[#2F327D] focus:ring-offset-2"
      >
        <span className="font-[nunito] text-lg font-bold text-white sm:text-xl">
          Go to Login
        </span>
        <svg
          width="27"
          height="15"
          viewBox="0 0 27 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:translate-x-1"
        >
          <path
            d="M26.01 4.73152L21.6562 0.332773C21.5517 0.227329 21.4272 0.143635 21.2901 0.08652C21.1531 0.0294053 21.006 0 20.8575 0C20.709 0 20.5619 0.0294053 20.4249 0.08652C20.2878 0.143635 20.1633 0.227329 20.0587 0.332773V0.332773C19.8492 0.543556 19.7316 0.828689 19.7316 1.1259C19.7316 1.42311 19.8492 1.70824 20.0587 1.91902L24.0637 5.95777H1.125C0.826631 5.95777 0.540483 6.0763 0.329505 6.28728C0.118526 6.49826 0 6.7844 0 7.08277H0C0 7.38114 0.118526 7.66729 0.329505 7.87827C0.540483 8.08925 0.826631 8.20777 1.125 8.20777H24.1313L20.0587 12.269C19.9533 12.3736 19.8696 12.498 19.8125 12.6351C19.7554 12.7722 19.726 12.9193 19.726 13.0678C19.726 13.2163 19.7554 13.3633 19.8125 13.5004C19.8696 13.6375 19.9533 13.7619 20.0587 13.8665C20.1633 13.972 20.2878 14.0557 20.4249 14.1128C20.5619 14.1699 20.709 14.1993 20.8575 14.1993C21.006 14.1993 21.1531 14.1699 21.2901 14.1128C21.4272 14.0557 21.5517 13.972 21.6562 13.8665L26.01 9.50152C26.642 8.86871 26.997 8.0109 26.997 7.11652C26.997 6.22214 26.642 5.36434 26.01 4.73152V4.73152Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}