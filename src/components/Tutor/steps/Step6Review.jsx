
import React from "react";
import {
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  BookOpen,
  Files,
  Pencil,
  ChevronRight,
} from "lucide-react";

export default function ReviewApplication({
  onEdit = () => {},
  onContinue = () => {},
}) {
  const sections = [
    {
      id: "01",
      title: "Account Information",
      description: "Personal details and contact information",
      icon: UserRound,
      details: [
        "Amara Johnson",
        "amara@example.com | +234 801 234 5678",
      ],
    },
    {
      id: "02",
      title: "Professional Information",
      description: "Teaching subjects, availability and experience",
      icon: BriefcaseBusiness,
      details: [
        "Mathematics, English | Year 3–5",
        "3–5 Years Experience | 9:00 AM – 5:00 PM",
        "Monday, Tuesday",
      ],
    },
    {
      id: "03",
      title: "Qualifications",
      description: "Academic and professional certifications",
      icon: GraduationCap,
      details: [
        "B.Sc. Education, University of Lagos (2020)",
        "TEFL Certification (2022)",
      ],
    },
    {
      id: "04",
      title: "Teaching Experience",
      description: "Employment history and teaching background",
      icon: BookOpen,
      details: [
        "Bright Minds Academy | Primary School Tutor",
        "January 2021 – December 2023",
      ],
    },
    {
      id: "05",
      title: "Documents",
      description: "Supporting documents submitted with your application",
      icon: Files,
      details: [
        "Qualification Certificate",
        "Government ID",
        "Resume / CV",
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white px-4 py-6 font-sans text-gray-800 sm:px-6 sm:py-8 lg:px-8">
      <div className="w-full space-y-6">
        {/* Page Header */}
        <header className="w-full border-b border-gray-100 pb-5 text-left">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Review Your Application
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
            Please review your application details carefully before
            submitting. You can edit any section to make corrections.
          </p>
        </header>

        {/* Review Sections */}
        <div className="w-full space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.id}
                className="w-full rounded-xl border border-gray-200 bg-white p-4 transition-colors duration-200 hover:border-gray-300 sm:p-5"
              >
                <div className="flex w-full items-start gap-3 sm:gap-4">
                  {/* Section Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  {/* Section Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold tracking-wide text-gray-400">
                            {section.id}
                          </span>

                          <h2 className="text-sm font-bold leading-5 text-gray-900 sm:text-base">
                            {section.title}
                          </h2>
                        </div>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {section.description}
                        </p>
                      </div>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => onEdit(section.id)}
                        className="inline-flex min-h-9 w-fit shrink-0 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Edit ${section.title}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="my-4 border-t border-gray-100" />

                    {/* Information List */}
                    <div className="space-y-2">
                      {section.details.map((detail, index) => (
                        <p
                          key={`${section.id}-${index}`}
                          className="break-words text-sm leading-6 text-gray-600"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Submission Notice */}
        <div className="w-full rounded-xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Files className="h-4 w-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Almost there!
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Ensure that all the information provided is accurate
                and that your required documents are ready before
                submitting your application.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="flex w-full flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-gray-500">
            Review all sections before continuing.
          </p>

         
        </footer>
      </div>
    </div>
  );
}
