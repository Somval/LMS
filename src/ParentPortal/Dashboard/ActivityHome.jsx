import HomeworkStatus from "./HomeworkStatus";
import RecentReports from "./RecentReport";
import AchievementCards from "./Achievementbatch";

export default function ActivityHome({ data }) {
  return (
    <div className="block lg:flex flex-col-3 gap-3 mt-10">
      <HomeworkStatus data={data} />

      <RecentReports
        studentId={data.student.id}
        student={{ name: data.student.fullName }}
      />

      <AchievementCards data={data} />
    </div>
  );
}
