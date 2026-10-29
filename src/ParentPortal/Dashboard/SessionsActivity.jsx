
import AssignedTutors from "./AssignedTutors";
import ChildUpcomingTutor from "./ChildUpcomingSessions";

export default function SessionActivity({ studentId, student }) {
  return (
    <div className="block lg:flex flex-col-3 gap-3 mt-10">
      <AssignedTutors
        studentId={studentId}
        student={student}
      />

      <ChildUpcomingTutor
        studentId={studentId}
        student={student}
      />
    </div>
  );
}
