import UpcomingSessions from "./UpcomingSessions";
import Recent from "./RecentActivity";

export default function Activity({ data }) {
  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-6">
        {/* Upcoming Sessions Section */}
        <div className="w-full lg:w-1/2">
          <UpcomingSessions classes={data?.upcomingClasses ?? []} />
        </div>

        {/* Recent Activity Section */}
        <div className="w-full lg:w-1/2">
          <Recent items={data?.recentActivity ?? []} />
        </div>
      </div>
    </div>
  );
}
