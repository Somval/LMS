import DashBoardAnalytics from "./DashboardAnalaytics";
import LearningAnalytics from "./LearningProgress";
import AttendanceAllaytics from "./AttendanceOverview";

export default function AnalyticsHome({ data }) {
  return (
    <div className="block lg:flex flex-col-3 gap-3 mt-10">
      <DashBoardAnalytics data={data} />
      <LearningAnalytics data={data} />
      <AttendanceAllaytics data={data} />
    </div>
  );
}
