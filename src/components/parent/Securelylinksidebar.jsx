import React from "react";
import illustrationImg from "../../assets/images/796785666e67492048bade921c71f14a82823b0d.png";

export default function SecureLinkInfo({ imageSrc = illustrationImg }) {
  return (
    <div className="w-full max-w-md lg:max-w-[369px] min-h-0 sm:min-h-[619px] rounded-2xl bg-[#F6F4FB] p-5 sm:p-6 font-[Inter] border border-purple-100 shadow-sm flex flex-col justify-between mx-auto">
      {/* Top Illustration Area */}
      <div className="relative mb-4 flex justify-center">
        <div className="w-full max-w-[281px] h-auto flex items-center justify-center">
          <img
            src={imageSrc}
            alt="Parent and child using a laptop to link accounts"
            width={281}
            height={243}
            className="w-full h-auto max-h-[243px] object-contain"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-3.5 flex-1 flex flex-col justify-center">
        <h2 className="text-lg sm:text-xl font-[Inter] font-black tracking-tight text-purple-950">
          Securely link your child's account
        </h2>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
          To protect every learner, we verify your request before a child can be
          linked to your Parent Portal account.
        </p>

        {/* Bullet Points / Security Features */}
        <div className="space-y-3 pt-1">
          {/* Feature 1 */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-100/80 text-purple-700">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_210_3124)">
                  <path d="M17.0327 1.96228L11.2898 0.0473675C11.1018 -0.0152602 10.8985 -0.0152602 10.7105 0.0473675L4.96758 1.96228C4.05449 2.26559 3.26021 2.84894 2.69759 3.62944C2.13496 4.40993 1.83261 5.34789 1.8335 6.31003V11.0006C1.8335 17.9334 10.2668 21.7623 10.628 21.9218C10.7452 21.9738 10.872 22.0007 11.0002 22.0007C11.1284 22.0007 11.2552 21.9738 11.3723 21.9218C11.7335 21.7623 20.1668 17.9334 20.1668 11.0006V6.31003C20.1677 5.34789 19.8654 4.40993 19.3027 3.62944C18.7401 2.84894 17.9458 2.26559 17.0327 1.96228ZM18.3335 11.0006C18.3335 16.001 12.5411 19.2809 11.0002 20.0655C9.45741 19.2836 3.66683 16.0139 3.66683 11.0006V6.31003C3.66688 5.73279 3.84858 5.1702 4.18618 4.70196C4.52378 4.23373 5.00016 3.88361 5.54783 3.7012L11.0002 1.88345L16.4525 3.7012C17.0002 3.88361 17.4765 4.23373 17.8141 4.70196C18.1517 5.1702 18.3334 5.73279 18.3335 6.31003V11.0006Z" fill="#7A06E6"/>
                  <path d="M14.0247 7.60865L10.1857 11.4587L8.12873 9.31365C8.04618 9.22339 7.9464 9.15057 7.83527 9.09947C7.72414 9.04837 7.6039 9.02003 7.48165 9.01611C7.3594 9.0122 7.2376 9.03279 7.12342 9.07667C7.00925 9.12056 6.90502 9.18685 6.81686 9.27164C6.7287 9.35643 6.65841 9.45801 6.61012 9.57039C6.56182 9.68277 6.53651 9.80368 6.53567 9.92599C6.53482 10.0483 6.55847 10.1695 6.60521 10.2826C6.65195 10.3956 6.72083 10.4982 6.80781 10.5842L8.92165 12.7842C9.07929 12.9544 9.26983 13.091 9.48174 13.1855C9.69366 13.28 9.92255 13.3306 10.1546 13.3342H10.1848C10.4122 13.3349 10.6375 12.2905 10.8475 13.2035C11.0576 13.1164 11.2483 12.9886 11.4086 12.8272L15.3246 8.91123C15.4101 8.82588 15.478 8.72453 15.5243 8.61294C15.5707 8.50136 15.5946 8.38174 15.5947 8.26091C15.5949 8.14008 15.5712 8.02041 15.5251 7.90873C15.479 7.79705 15.4113 7.69555 15.3259 7.61002C15.2406 7.52449 15.1392 7.45661 15.0276 7.41025C14.9161 7.3639 14.7964 7.33997 14.6756 7.33984C14.5548 7.33972 14.4351 7.36339 14.3234 7.40951C14.2118 7.45563 14.1103 7.5233 14.0247 7.60865Z" fill="#7A06E6"/>
                </g>
                <defs>
                  <clipPath id="clip0_210_3124">
                    <rect width="22" height="22" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700">
              We keep your child's information private and secure
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-100/80 text-purple-700">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.625 14.4375C9.625 13.6781 10.2406 13.0625 11 13.0625C11.7594 13.0625 12.375 13.6781 12.375 14.4375C12.375 15.1969 11.7594 15.8125 11 15.8125C10.2406 15.8125 9.625 15.1969 9.625 14.4375Z" fill="#7C0CE4"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11 0C7.96243 0 5.5 2.46243 5.5 5.5V8.25C3.98122 8.25 2.75 9.48122 2.75 11V19.25C2.75 20.7688 3.98122 22 5.5 22H16.5C18.0188 22 19.25 20.7688 19.25 19.25V11C19.25 9.48122 18.0188 8.25 16.5 8.25V5.5C16.5 2.46243 14.0376 0 11 0ZM15.125 8.25V5.5C15.125 3.22183 13.2782 1.375 11 1.375C8.72183 1.375 6.875 3.22183 6.875 5.5V8.25H15.125ZM5.5 9.625C4.74061 9.625 4.125 10.2406 4.125 11V19.25C4.125 20.0094 4.74061 20.625 5.5 20.625H16.5C17.2594 20.625 17.875 20.0094 17.875 19.25V11C17.875 10.2406 17.2594 9.625 16.5 9.625H5.5Z" fill="#7C0CE4"/>
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700">
              Only authorized parents or guardians can link accounts
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-100/80 text-purple-700">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5625 2.75C20.461 2.75 22 4.28902 22 6.1875V15.8125C22 17.711 20.461 19.25 18.5625 19.25H3.4375C1.53902 19.25 0 17.711 0 15.8125V6.1875C0 4.28902 1.53902 2.75 3.4375 2.75H18.5625ZM3.4375 4.125C2.29841 4.125 1.375 5.04841 1.375 6.1875V15.8125C1.375 16.9516 2.29841 17.875 3.4375 17.875H18.5625C19.7016 17.875 20.625 16.9516 20.625 15.8125V6.1875C20.625 5.04841 19.7016 4.125 18.5625 4.125H3.4375ZM17.9746 6.9873C18.2923 6.77954 18.7179 6.86893 18.9258 7.18652C19.1337 7.50415 19.0451 7.92972 18.7275 8.1377L11.0049 13.1934L3.06836 8.14258C2.7481 7.9387 2.65359 7.51366 2.85742 7.19336C3.06129 6.87318 3.48637 6.77869 3.80664 6.98242L10.9951 11.5566L17.9746 6.9873Z" fill="#7C0CE4"/>
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700">
              A verification code will be sent to your child's registered email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}