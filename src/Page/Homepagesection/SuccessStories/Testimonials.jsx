import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  GraduationCap,
  Users,
  BookOpen,
  Pause,
  Play,
} from "lucide-react";

import ImageOfStudent from "../../../assets/images/1000_F_595278130_pm019aWdqNojWHZsWiUcPi3sthitC1Gk.jpg"
import ImageStudentTwo from "../../../assets/images/black-college-student-going-back-school-with-crowd-students-college_1158146-15164.jpg"
import ImageStudentThrid from "../../../assets/images/1000_F_595278130_pm019aWdqNojWHZsWiUcPi3sthitC1Gk.jpg"
import ImageStudentFourth from "../../../assets/images/1000_F_595278130_pm019aWdqNojWHZsWiUcPi3sthitC1Gk.jpg"

//Parent
import ParentImageOne from "../../../assets/images/Gemini_Generated_Image_a0ct03a0ct03a0ct.jfif"

import ParentImageTwo from "../../../assets/images/361bfc4c-7394-4241-aee0-0b6dd5fdd6b3.jfif"
import ParentThree from "../../../assets/images/Gemini_Generated_Image_x6temx6temx6temx.jfif"

import IMageFourth from "../../../assets/images/5d90f09d-076d-45a5-bbdb-e590a233a93e.jfif"
 import ImageFifth from "../../../assets/images/f3cb601e-66e6-47b7-960d-094b291433b9.png"
 
 //Tutor Image

 import FirstImageTutor from "../../../assets/images/20fc32c0-41a8-42e1-9585-5a021547178a.png"
  
 import ThirdTutorImage from "../../../assets/images/05136118-0a3f-405b-b899-b600303a8c87.png"
 
  import FourthImage from "../../../assets/images/542313e4-9ee3-4c33-9114-dcd8bce94a61.png"
  import FifthImage from "../../../assets/images/a85e4137-8080-41e5-85b7-72f3a3bb6b8e.jfif"
  
import  TutorLastImage from "../../../assets/images/32895ee0-167f-4c14-91bf-310ee75b458f.jfif"
  

const testimonials = [
  // STUDENTS
  {
    id: 1,
    category: "Student",
    name: "Olivia Johnson",
    designation: "Student · Year 8",
    subject: "Mathematics",
    quote:
      "Mathematics used to be one of my most difficult subjects. With my tutor's guidance, interactive lessons and regular practice assignments, I now understand topics much better and feel more confident in class.",
    src: ImageOfStudent,
  },
  {
    id: 2,
    category: "Student",
    name: "Daniel Williams",
    designation: "Student · Year 10",
    subject: "Science",
    quote:
      "I enjoy learning because every lesson is organised and easy to follow. I can revisit my learning materials, complete assignments and track my progress whenever I need to.",
    src: ImageStudentTwo,
  },
  {
    id: 3,
    category: "Student",
    name: "Sophia Anderson",
    designation: "Student · Year 6",
    subject: "English",
    quote:
      "My reading and writing have improved so much. My tutor explains everything patiently and gives me activities that make learning interesting. I look forward to my lessons every week.",
    src:ImageStudentThrid ,
  },
  {
    id: 4,
    category: "Student",
    name: "Ethan Brown",
    designation: "Student · Year 9",
    subject: "Mathematics",
    quote:
      "The lessons are structured in a way that helps me understand each topic before moving to the next. I can see my completed assignments and know what I need to improve.",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Student",
    name: "Amelia Davis",
    designation: "Student · Year 7",
    subject: "Coding",
    quote:
      "I never thought learning how to code could be this exciting. My tutor breaks down difficult ideas into simple steps, and I enjoy completing practical activities during lessons.",
    src: ImageStudentFourth,
  },

  // PARENTS
  {
    id: 6,
    category: "Parent",
    name: "Mrs. Grace Thompson",
    designation: "Parent",
    subject: "Student Progress",
    quote:
      "One of the things I appreciate most is being able to follow my child's learning journey. I can see assignments, monitor progress and stay informed about upcoming lessons without constantly having to ask.",
    src: ParentImageOne,
  },
  {
    id: 7,
    category: "Parent",
    name: "Mr. David Wilson",
    designation: "Parent",
    subject: "Tutor Support",
    quote:
      "Finding the right learning support for my daughter was important to us. The platform makes it easier to connect with tutors, follow lesson activities and understand where she needs additional support.",
    src: ParentImageTwo,
  },
  {
    id: 8,
    category: "Parent",
    name: "Mrs. Rebecca Miller",
    designation: "Parent",
    subject: "Learning Development",
    quote:
      "I have noticed a positive change in my son's attitude towards schoolwork. He is more organised, completes his assignments and feels comfortable asking questions when he does not understand something.",
    src: ParentThree,
  },
  {
    id: 9,
    category: "Parent",
    name: "Mr. Michael Carter",
    designation: "Parent",
    subject: "Learning Updates",
    quote:
      "The progress information gives me a clearer picture of how my child is doing. I particularly value the visibility into lessons, attendance and assignments because it helps me support learning at home.",
    src:IMageFourth,
  },
  
  {
    id: 10,
    category: "Parent",
    name: "Mrs. Patricia Evans",
    designation: "Parent",
    subject: "Academic Confidence",
    quote:
      "My child has become more confident about learning. Having dedicated tutors and a structured learning environment has made it easier for us to support her academic development.",
    src: ImageFifth,
  },

  // TUTORS
  {
    id: 11,
    category: "Tutor",
    name: "James Anderson",
    designation: "Mathematics Tutor",
    subject: "Mathematics",
    quote:
      "The platform makes it easier to organise my classes, manage student information and monitor individual progress. I can spend more time focusing on teaching and helping learners improve.",
    src: FirstImageTutor,
  },
  {
    id: 12,
    category: "Tutor",
    name: "Sarah Williams",
    designation: "English Tutor",
    subject: "English Language",
    quote:
      "Having lesson materials, assignments and student progress in one place makes my teaching workflow much more organised. It also helps me identify the areas where each learner needs attention.",
    src: ThirdTutorImage,
  },
  {
    id: 13,
    category: "Tutor",
    name: "Michael Roberts",
    designation: "Science Tutor",
    subject: "Science",
    quote:
      "I appreciate how easy it is to plan lessons, record session notes and follow up on student assignments. It gives me a better way to manage my teaching responsibilities.",
    src: FourthImage,
  },
  {
    id: 14,
    category: "Tutor",
    name: "Emily Thompson",
    designation: "Primary School Tutor",
    subject: "Primary Education",
    quote:
      "Every learner has different needs, and the platform helps me keep track of those differences. I can organise learning activities, review performance and provide more focused support.",
    src: FifthImage,
  },
  {
    id: 15,
    category: "Tutor",
    name: "Daniel Lewis",
    designation: "Coding Tutor",
    subject: "Computer Science",
    quote:
      "Managing classes and following student development has become more straightforward. I can focus on creating engaging lessons while keeping track of assignments and learning outcomes.",
    src: TutorLastImage,
  },
 
];

const categories = [
  { label: "All Stories", value: "All", icon: Users },
  { label: "Students", value: "Student", icon: GraduationCap },
  { label: "Parents", value: "Parent", icon: Users },
  { label: "Tutors", value: "Tutor", icon: BookOpen },
];

const categoryStyles = {
  Student: "bg-[#E9F1FF] text-[#315FA8]",
  Parent: "bg-[#FFF0E9] text-[#D66B43]",
  Tutor: "bg-[#E9F8EF] text-[#26834C]",
};

const slideVariants = {
  initial: {
    opacity: 0,
    x: 35,
    filter: "blur(5px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -25,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export default function AnimatedTestimonials() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState("All");
  const [isPaused, setIsPaused] = useState(false);

  const filteredTestimonials =
    filter === "All"
      ? testimonials
      : testimonials.filter((item) => item.category === filter);

  const current = filteredTestimonials[active];

  const next = () => {
    setActive((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const previous = () => {
    setActive(
      (prev) =>
        (prev - 1 + filteredTestimonials.length) %
        filteredTestimonials.length
    );
  };

  const changeFilter = (value) => {
    setFilter(value);
    setActive(0);
  };

  useEffect(() => {
    if (isPaused || filteredTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % filteredTestimonials.length);
    }, 7500);

    return () => clearInterval(interval);
  }, [isPaused, filteredTestimonials.length, filter]);

  return (
    <section className="relative w-full overflow-hidden bg-[#fff8f6] px-5 py-20 sm:px-8 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ffe8df] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d96e4c]">
            <GraduationCap size={15} />
            Success Stories
          </span>

          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[#202020] sm:text-4xl md:text-5xl">
            Real Stories. Meaningful Learning Progress.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Every learner has a unique journey. Discover experiences from
            students, parents and tutors who are part of a more connected,
            supportive and engaging learning community.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => changeFilter(value)}
              aria-pressed={filter === value}
              className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                filter === value
                  ? "bg-[#e77b5b] text-white shadow-lg shadow-[#e77b5b]/20"
                  : "border border-[#f0ded6] bg-white/80 text-gray-600 hover:border-[#e77b5b] hover:text-[#d96e4c]"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Main testimonial */}
        <div
          className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Image area */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative aspect-[4/4.5] w-full"
            >
              {/* Decorative image background */}
              <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] bg-[#ffd9ca]" />

              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.src}
                  alt={`${current.category} ${current.name}`}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 h-full w-full rounded-[2rem] object-cover shadow-xl"
                  loading="eager"
                />
              </AnimatePresence>

              {/* Category label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.category + current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className={`absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-bold shadow-sm ${categoryStyles[current.category]}`}
                >
                  {current.category} Story
                </motion.div>
              </AnimatePresence>

              {/* Floating quote icon */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -right-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl sm:h-20 sm:w-20"
              >
                <Quote size={34} className="text-[#e77b5b]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Testimonial text */}
          <div className="flex min-h-[390px] flex-col justify-center pt-4 md:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-1 flex-col justify-center"
              >
                {/* Subject */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#ffe9e1] px-4 py-2 text-xs font-bold text-[#d96e4c]">
                    {current.subject}
                  </span>

                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Learning Community
                  </span>
                </div>

                {/* Quote */}
                <span className="mb-3 block font-serif text-6xl leading-none text-[#e77b5b]">
                  “
                </span>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12 }}
                  className="text-lg font-medium leading-[1.85] text-[#292929] sm:text-xl md:text-[23px]"
                >
                  {current.quote}
                </motion.p>

                {/* Person */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.28 }}
                  className="mt-8 flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe8df] text-[#d96e4c]">
                    {current.category === "Student" ? (
                      <GraduationCap size={22} />
                    ) : current.category === "Parent" ? (
                      <Users size={22} />
                    ) : (
                      <BookOpen size={22} />
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#202020] sm:text-lg">
                      {current.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {current.designation}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-10 border-t border-[#efded7] pt-6">
              <div className="flex items-center justify-between gap-5">
                {/* Progress indicators */}
                <div className="flex flex-1 items-center gap-1.5">
                  {filteredTestimonials.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setActive(index)}
                      aria-label={`View story ${index + 1}`}
                      aria-current={active === index ? "true" : undefined}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        active === index
                          ? "w-7 bg-[#e77b5b]"
                          : "w-1.5 bg-[#e9cfc4] hover:bg-[#e77b5b]"
                      }`}
                    />
                  ))}
                </div>

                {/* Pause and navigation */}
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => setIsPaused((prev) => !prev)}
                    aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadbd5] bg-white text-gray-600 transition hover:border-[#e77b5b] hover:text-[#e77b5b]"
                  >
                    {isPaused ? <Play size={16} /> : <Pause size={16} />}
                  </button>

                  <button
                    onClick={previous}
                    aria-label="Previous story"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadbd5] bg-white text-[#292929] transition-all duration-300 hover:border-[#e77b5b] hover:bg-[#e77b5b] hover:text-white"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next story"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e77b5b] text-white shadow-md shadow-[#e77b5b]/20 transition-all duration-300 hover:bg-[#d96848]"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}