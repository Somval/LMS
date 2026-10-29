
import HomeworkStatus from "./HomeworkStatus";
import RecentReports from "./RecentReport";
import AchievementCards from "./Achievementbatch";

export default function ActivityHome({ studentId, student }) {
  return (
    <div className="block lg:flex flex-col-3 gap-3 mt-10">
      <HomeworkStatus
        studentId={studentId}
        student={student}
      />

      <RecentReports
        studentId={studentId}
        student={student}
      />

      <AchievementCards
        studentId={studentId}
        student={student}
      />
    </div>
  );
}
