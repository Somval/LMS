import React, { useState } from "react";
import { Pencil, Eye, X, FileText } from "lucide-react";
import EditVerificationDocuments from "../../../components/Admincomponent/EditVerificationDocuments";

const initialVerificationDocuments = [
  {
    id: 1,
    title: "Qualification Certificate",
    documents: [
      {
        id: 1,
        name: "Degree Certificate.pdf",
        size: "2.4 MB",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
  {
    id: 2,
    title: "Government ID",
    documents: [
      {
        id: 2,
        name: "National ID.pdf",
        size: "1.2 MB",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
  {
    id: 3,
    title: "Other Supporting Document",
    documents: [
      {
        id: 3,
        name: "CV.pdf",
        size: "2.4 MB",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
];

function PdfIcon() {
  return (
    <svg width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1.42277C0 0.636994 0.649187 0 1.45 0H20.8736C21.2547 0 21.6206 0.147281 21.8919 0.409969L28.5684 6.87341C28.8445 7.14076 29 7.50554 29 7.8862V33.5772C29 34.363 28.3508 35 27.55 35H1.45C0.649187 35 0 34.363 0 33.5772V1.42277Z" fill="#FF4B42"/>
<path d="M0 33.5772V1.42276C3.95416e-07 0.649276 0.629051 0.0199293 1.41256 0.000444614L1.45 0H20.8735L20.9092 0.000444614C21.2775 0.0093266 21.6291 0.155505 21.8919 0.40999L28.5684 6.8734C28.8446 7.14075 29 7.50557 29 7.88623V33.5772L28.9995 33.614C28.98 34.3706 28.3585 34.9804 27.5874 34.9996L27.55 35V34.9431C28.3188 34.9431 28.942 34.3316 28.942 33.5772V7.88623C28.942 7.5208 28.7928 7.17057 28.5277 6.91391L21.8512 0.450505C21.5907 0.198324 21.2395 0.0569106 20.8735 0.0569106H1.45C0.68122 0.0569106 0.0580004 0.668424 0.058 1.42276V33.5772C0.058 34.3316 0.68122 34.9431 1.45 34.9431V35L1.41256 34.9996C0.641492 34.9804 0.0199955 34.3706 0.000453125 33.614L0 33.5772ZM27.55 34.9431V35H1.45V34.9431H27.55Z" fill="#E4E4E4"/>
<path d="M0 23.9023H29V34.9999H0V23.9023Z" fill="#E01C12"/>
<path d="M12.5642 6.14196C12.6484 4.64902 14.5283 4.46727 15.0193 6.14196C15.4121 7.48171 14.7804 9.63414 14.3783 11.1711C14.7804 12.0748 16.0942 13.7494 16.8772 14.4894C19.4916 14.0999 20.9646 14.1434 21.9334 14.5933C23.2472 15.2034 22.9686 16.7046 21.6945 16.8262C20.6063 16.93 19.0005 16.8261 16.7179 14.9697C16.1251 15.0476 14.3584 15.3826 12.2457 16.0992C11.4361 17.3714 10.3081 19.1115 9.35256 19.864C7.7866 21.0973 6.6055 20.6948 6.27372 20.0198C5.82252 18.8254 7.65389 17.7089 10.9849 16.0992C11.5113 15.0779 12.726 12.5239 13.3737 10.4779C13.0905 9.81586 12.458 8.02434 12.5642 6.14196ZM10.5337 16.8002C5.99503 18.7161 6.20739 20.0068 7.05673 20.1366C7.90607 20.2664 8.95446 19.2148 10.5337 16.8002ZM21.6415 15.6578C21.5884 14.4375 19.6774 14.4375 17.1824 14.8529C20.0888 16.8781 21.6415 16.5146 21.6415 15.6578ZM14.1567 11.6593C13.456 13.6845 12.7765 15.1082 12.5243 15.5669C14.4141 14.9957 15.9129 14.6885 16.426 14.6062C15.3749 13.4431 14.4752 12.1569 14.1567 11.6593ZM13.6125 9.82882C14.714 6.38861 14.3425 5.29812 13.5064 5.41494C12.6305 5.55775 12.7499 7.99836 13.6125 9.82882Z" fill="white"/>
<path d="M18.7102 26.6094V31.8692H17.6978V26.6094H18.7102ZM20.8713 28.8816V29.6655H18.4451V28.8816H20.8713ZM21.1548 26.6094V27.3933H18.4451V26.6094H21.1548Z" fill="white"/>
<path d="M14.3881 31.8692H13.2321L13.2395 31.0889H14.3881C14.6998 31.0889 14.9612 31.0214 15.1723 30.8866C15.3834 30.7493 15.5429 30.553 15.6509 30.2977C15.7589 30.04 15.8129 29.7318 15.8129 29.3729V29.102C15.8129 28.825 15.7822 28.5806 15.7209 28.3687C15.6595 28.1567 15.5687 27.9785 15.4484 27.834C15.3306 27.6895 15.1846 27.5799 15.0103 27.5053C14.8361 27.4306 14.636 27.3933 14.4102 27.3933H13.21V26.6094H14.4102C14.7686 26.6094 15.095 26.6684 15.3895 26.7864C15.6865 26.9044 15.943 27.0742 16.159 27.2957C16.3774 27.5149 16.5443 27.7774 16.6597 28.0833C16.7775 28.3891 16.8364 28.7311 16.8364 29.1092V29.3729C16.8364 29.7486 16.7775 30.0906 16.6597 30.3989C16.5443 30.7047 16.3774 30.9672 16.159 31.1864C15.943 31.4056 15.6853 31.5741 15.3859 31.6921C15.0864 31.8102 14.7538 31.8692 14.3881 31.8692ZM13.7991 26.6094V31.8692H12.7866V26.6094H13.7991Z" fill="white"/>
<path d="M10.0104 29.9509H8.62983V29.1706H10.0104C10.2363 29.1706 10.4191 29.1345 10.559 29.0623C10.7014 28.9876 10.8057 28.8864 10.872 28.7588C10.9382 28.6288 10.9714 28.4806 10.9714 28.3145C10.9714 28.1531 10.9382 28.0026 10.872 27.8629C10.8057 27.7232 10.7014 27.61 10.559 27.5233C10.4191 27.4366 10.2363 27.3933 10.0104 27.3933H8.96118V31.8692H7.94873V26.6094H10.0104C10.4277 26.6094 10.7836 26.6828 11.0781 26.8297C11.3751 26.9742 11.6009 27.1753 11.7555 27.433C11.9126 27.6883 11.9912 27.9797 11.9912 28.3072C11.9912 28.6468 11.9126 28.9394 11.7555 29.1851C11.6009 29.4307 11.3751 29.6198 11.0781 29.7522C10.7836 29.8847 10.4277 29.9509 10.0104 29.9509Z" fill="white"/>
</svg>

  );
}

// PDF Modal Viewer Component
function ViewPdfModal({ isOpen, onClose, document }) {
  if (!isOpen || !document) return null;

  const docSrc = document.file
    ? URL.createObjectURL(document.file)
    : document.url || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative flex h-[85vh] w-full max-w-[850px] flex-col rounded-xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 bg-white">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{document.name}</h3>
              <p className="text-[11px] text-gray-500">{document.size}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* PDF Frame */}
        <div className="flex-1 bg-gray-100 p-2">
          <iframe
            src={docSrc}
            title={document.name}
            className="h-full w-full rounded-md border border-gray-200 bg-white"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-5 py-2.5">
          <a
            href={docSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Open in New Tab
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerificationDocuments() {
  const [documents, setDocuments] = useState(initialVerificationDocuments);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDocForViewing, setSelectedDocForViewing] = useState(null);

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  const handleSaveDocuments = (updatedDocuments) => {
    setDocuments(updatedDocuments);
    setIsEditOpen(false);
  };

  const handleViewDocument = (document) => {
    setSelectedDocForViewing(document);
  };

  return (
    <>
      <section className="w-full min-w-0 bg-[#F5F7FF] p-3 sm:p-4">
        <div className="mx-auto w-full max-w-[1200px] rounded-[6px] bg-white p-3 sm:p-[10px]">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-[16px] font-semibold leading-6 text-[#171717]">
              Verification Documents
            </h2>

            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex h-[28px] shrink-0 items-center justify-center gap-1.5 rounded-[4px] border border-[#D7D9E2] bg-white px-3 text-[12px] font-medium text-[#555866] transition-colors hover:border-[#B8BBC7] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <Pencil size={12} strokeWidth={1.8} />
              Edit
            </button>
          </div>

          {/* Document cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-[18px] sm:gap-y-[9px]">
            {documents.map((group) => (
              <article
                key={group.id}
                className="min-w-0 rounded-[6px] border border-[#E5E7EB] px-2 py-[9px]"
              >
                <h3 className="mb-[6px] border-b border-[#EEEEF1] pb-[6px] text-[13px] font-semibold leading-[18px] text-[#171717]">
                  {group.title}
                </h3>

                <div>
                  {group.documents.map((document) => (
                    <div
                      key={document.id}
                      className="flex min-w-0 items-center gap-2 border-b border-[#EEEEF1] px-3 py-[6px] last:border-b-0"
                    >
                      <PdfIcon />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-medium leading-[15px] text-[#292929]">
                          {document.name}
                        </p>

                        <p className="text-[10px] font-normal leading-[14px] text-[#92929B]">
                          {document.size}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleViewDocument(document)}
                        aria-label={`View ${document.name}`}
                        className="inline-flex h-[24px] shrink-0 items-center justify-center gap-1 rounded-[4px] border border-[#EEEEF1] px-[10px] text-[10px] font-normal text-[#777985] transition-colors hover:border-[#D4D4DC] hover:bg-[#F8F8FA] focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      >
                        <Eye size={11} strokeWidth={1.6} />
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Edit Modal (Imported component) */}
      {isEditOpen && (
        <EditVerificationDocuments
          isOpen={isEditOpen}
          onClose={handleCloseEdit}
          documents={documents}
          onSave={handleSaveDocuments}
        />
      )}

      {/* PDF View Modal */}
      <ViewPdfModal
        isOpen={Boolean(selectedDocForViewing)}
        onClose={() => setSelectedDocForViewing(null)}
        document={selectedDocForViewing}
      />
    </>
  );
}