
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  Code,
  Palette,
  Languages,
  Brain,
  GraduationCap,
  Sparkles,
  BadgeCheck,
  BookMarked,
} from "lucide-react";
import Footer from "../../../components/footer";

const individualCourses = [
  {
    name: "Mathematics",
    description: "Build strong mathematical foundations.",
    price: 15000,
    icon: Calculator,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "English Language",
    description: "Improve grammar, reading and communication.",
    price: 12000,
    icon: BookOpen,
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "Physics",
    description: "Understand scientific principles and concepts.",
    price: 15000,
    icon: Atom,
    color: "bg-orange-50 text-orange-600",
  },
  {
    name: "Chemistry",
    description: "Explore chemical reactions and applications.",
    price: 15000,
    icon: FlaskConical,
    color: "bg-green-50 text-green-600",
  },
  {
    name: "Coding",
    description: "Develop practical programming skills.",
    price: 18000,
    icon: Code,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "Further Mathematics",
    description: "Explore advanced mathematical concepts.",
    price: 18000,
    icon: Calculator,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    name: "Creative Arts",
    description: "Develop creativity and artistic skills.",
    price: 10000,
    icon: Palette,
    color: "bg-pink-50 text-pink-600",
  },
  {
    name: "Quantitative Reasoning",
    description: "Strengthen logical and numerical thinking.",
    price: 12000,
    icon: Brain,
    color: "bg-amber-50 text-amber-600",
  },
  {
    name: "Verbal Reasoning",
    description: "Improve comprehension and reasoning skills.",
    price: 12000,
    icon: Languages,
    color: "bg-rose-50 text-rose-600",
  },
  {
    name: "Languages",
    description: "Build confidence in language learning.",
    price: 12000,
    icon: Languages,
    color: "bg-teal-50 text-teal-600",
  },
  {
    name: "Vocational Aptitude",
    description: "Discover practical and problem-solving skills.",
    price: 14000,
    icon: GraduationCap,
    color: "bg-violet-50 text-violet-600",
  },
];

const comboPackages = [
  {
    name: "Core Subjects",
    description: "A strong foundation in essential subjects.",
    courses: ["Mathematics", "English Language"],
    originalPrice: 27000,
    price: 24300,
    discount: "10%",
    popular: false,
  },
  {
    name: "Science Package",
    description: "A focused package for science learners.",
    courses: ["Mathematics", "Physics", "Chemistry"],
    originalPrice: 45000,
    price: 40500,
    discount: "10%",
    popular: true,
  },
  {
    name: "Complete Learning",
    description: "A broader learning experience across core subjects.",
    courses: [
      "Mathematics",
      "English Language",
      "Physics",
      "Chemistry",
    ],
    originalPrice: 57000,
    price: 45600,
    discount: "20%",
    popular: false,
  },
];

const formatPrice = (amount) =>
  `₦${amount.toLocaleString("en-NG")}`;

function SectionHeading() {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#30317f]/10 px-4 py-2 text-sm font-semibold text-[#30317f]">
       
        Simple and flexible pricing
      </span>

      <h2 className="text-3xl font-bold leading-tight text-[#20204d] sm:text-4xl lg:text-5xl">
        Invest in your child's{" "}
        <span className="text-[#30317f]">learning journey</span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-500 sm:text-lg">
        Choose individual subjects or save more with our carefully
        designed learning packages. Pay only for the courses you need.
      </p>
    </div>
  );
}

function PayNowButton({ plan, amount, type }) {
  return (
    <Link
      to="/student-auth/login"
      state={{
        selectedPlan: plan,
        amount,
        planType: type,
      }}
      className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#30317f] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#252665] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#30317f]/20"
    >
      Pay Now
      <ArrowRight size={18} />
    </Link>
  );
}

function IndividualCourseCard({ course, index }) {
  const Icon = course.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(30,30,80,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(30,30,80,0.09)]"
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${course.color}`}>
          <Icon size={23} />
        </div>

        <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
          Per subject
        </span>
      </div>

      <div className="mt-6 flex-1">
        <h3 className="text-lg font-bold text-[#20204d]">
          {course.name}
        </h3>

        <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
          {course.description}
        </p>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-5">
        <p className="text-xs font-medium text-gray-400">
          Course fee
        </p>

        <div className="mt-1 flex items-end gap-1">
          <span className="text-2xl font-bold text-[#20204d]">
            {formatPrice(course.price)}
          </span>
        </div>

        <PayNowButton
          plan={course.name}
          amount={course.price}
          type="individual"
        />
      </div>
    </motion.div>
  );
}

function ComboPackageCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 shadow-[0_8px_30px_rgba(30,30,80,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        plan.popular
          ? "border-[#30317f] ring-1 ring-[#30317f]"
          : "border-gray-100"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#30317f] px-4 py-1.5 text-xs font-semibold text-white shadow-md">
          Most Popular
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#30317f]/10 text-[#30317f]">
          <BookMarked size={23} />
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
          Save {plan.discount}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-[#20204d]">
          {plan.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {plan.description}
        </p>
      </div>

      <div className="my-6 space-y-3">
        {plan.courses.map((course) => (
          <div key={course} className="flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Check size={13} />
            </span>

            <span className="text-sm text-gray-600">{course}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-gray-100 pt-5">
        <p className="text-sm text-gray-400 line-through">
          {formatPrice(plan.originalPrice)}
        </p>

        <div className="mt-1 flex items-end gap-1">
          <span className="text-3xl font-bold text-[#20204d]">
            {formatPrice(plan.price)}
          </span>
        </div>

        <p className="mt-2 text-xs font-medium text-green-600">
          You save {formatPrice(plan.originalPrice - plan.price)}
        </p>

        <PayNowButton
          plan={plan.name}
          amount={plan.price}
          type="combo"
        />
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="overflow-hidden bg-[#fff8f6] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading />

        {/* Individual course pricing */}
        <div>
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-2xl font-bold text-[#20204d]">
                Individual Courses
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Select and pay for each subject independently.
              </p>
            </div>

            <span className="text-sm font-medium text-[#30317f]">
              11 subjects available
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {individualCourses.map((course, index) => (
              <IndividualCourseCard
                key={course.name}
                course={course}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Combo packages */}
        <div className="mt-24">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
              <BadgeCheck size={15} />
              Better value for families
            </span>

            <h3 className="text-2xl font-bold text-[#20204d] sm:text-3xl">
              Combo Learning Packages
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Get access to multiple subjects at a reduced price.
              The more you learn, the more you save.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
            {comboPackages.map((plan, index) => (
              <ComboPackageCard
                key={plan.name}
                plan={plan}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bottom information */}
        <div className="mt-16 rounded-2xl bg-[#30317f] px-6 py-8 text-center sm:px-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
              <GraduationCap size={25} />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-white">
              Give your child the right learning support
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/75">
              Choose a subject or package that works for your child's
              learning needs and get started.
            </p>

            <Link
              to="/student/onboarding"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#30317f] transition-all hover:-translate-y-0.5 hover:bg-gray-100"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

       
      </div>
      <Footer/>
    </section>
  );
}
