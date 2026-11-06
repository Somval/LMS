import {
  Image as ImageIcon,
  Download,
  ExternalLink,
  UserRound,
} from "lucide-react";

export default function ComplaintDetails({ complaint }) {

  return (
    <div className="w-full rounded-md bg-white px-[13px] py-[14px]">

      {/* Description Section */}
      <section>
        <h3 className="text-[14px] font-semibold leading-5 text-[#171717]">
          Description
        </h3>

        <p className="mt-3 max-w-full whitespace-pre-wrap text-[12px] font-normal leading-[20px] text-[#7B8794]">
          {complaint.description}
        </p>
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