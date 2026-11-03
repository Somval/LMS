import AssignedTutors from "./AssignedTutors";
import ChildUpcomingTutor from "./ChildUpcomingSessions";

export default function SessionActivity({ data }) {
  return (
    <div className="block lg:flex flex-col-3 gap-3 mt-10">
      <AssignedTutors data={data} />

      <ChildUpcomingTutor data={data} />
    </div>
  );
}
