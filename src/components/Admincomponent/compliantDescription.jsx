import {
  Image as ImageIcon,
  Download,
  ExternalLink,
  UserRound,
} from "lucide-react";

export default function ComplaintDetails() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/attachments/payment-receipt.pdf";
    link.download = "Payment receipt.pdf";
    link.click();
  };

  return (
    <div className="w-full rounded-md bg-white px-[13px] py-[14px]">

      {/* Description Section */}
      <section>
        <h3 className="text-[14px] font-semibold leading-5 text-[#171717]">
          Description
        </h3>

        <p className="mt-3 max-w-full text-[12px] font-normal leading-[20px] text-[#7B8794]">
          I was charged twice for the same subscription plan. The payment was
          deducted on October 14, 2026 but my account shows two transactions.
          Please help me resolve this.
        </p>
      </section>

      {/* Divider */}
      <div className="my-[13px] h-px w-full bg-[#EAECEF]" />

      {/* Attachments Section */}
      <section>
        <h3 className="text-[14px] font-semibold leading-5 text-[#171717]">
          Attachments (2)
        </h3>

        <div className="mt-[10px] flex w-fit min-w-[238px] items-center justify-between gap-5 rounded-[5px] bg-[#F5F6F8] px-[7px] py-[10px]">

          {/* File Information */}
          <div className="flex items-center gap-[10px]">
            <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px] bg-[#3478F6]">
              <ImageIcon
                size={16}
                strokeWidth={1.8}
                className="text-white"
              />
            </div>

            <div>
              <p className="text-[12px] font-medium leading-[17px] text-[#171717]">
                Payment receipt.pdf
              </p>

              <p className="text-[9px] leading-[13px] text-[#9AA2AD]">
                Oct 14, 2026 · 245 KB
              </p>
            </div>
          </div>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download payment receipt"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#414141] transition-colors hover:bg-gray-200"
          >
            <Download size={17} strokeWidth={1.6} />
          </button>
        </div>
      </section>

      {/* Divider */}
      <div className="my-[13px] h-px w-full bg-[#EAECEF]" />

      {/* Related Student Section */}
      <section>
        <h3 className="text-[14px] font-semibold leading-5 text-[#171717]">
          Related Student (1)
        </h3>

        <div className="mt-[9px] flex w-full items-center justify-between gap-4">

          {/* Student Information */}
          <div className="flex min-w-0 items-center gap-[18px]">

            {/* Student Avatar */}
            <div className="flex h-[41px] w-[41px] shrink-0 items-center justify-center rounded-full bg-[#D8D8D8]">
              <UserRound
                size={25}
                strokeWidth={1.3}
                className="text-[#D8D8D8]"
              />
            </div>

            {/* Student Details */}
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-5 text-[#171717]">
                Chloe Okafor
              </p>

              <p className="mt-[2px] text-[10px] leading-4 text-[#9299A3]">
                Mathematics - Year 1
              </p>
            </div>
          </div>

          {/* View Student Profile */}
          <button
            type="button"
            onClick={() => window.location.href = "/admin/users/students"}
            className="flex h-[36px] shrink-0 items-center gap-5 rounded-[4px] border border-[#E9EAED] px-[12px] text-[10px] font-medium text-[#69717C] transition-colors hover:bg-[#F8F9FB]"
          >
            <span>View Student Profile</span>
            <ExternalLink size={13} strokeWidth={1.5} />
          </button>

        </div>
      </section>

    </div>
  );
}