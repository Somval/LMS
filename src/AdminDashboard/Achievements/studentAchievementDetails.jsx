import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import StudentAchievementDetails from "../../components/Admincomponent/StudentRecognitionHeader";
import StudenAchievementCard from "../../components/Admincomponent/AchievementsCard";
import RewardsAndBadges from "../../components/Admincomponent/RewardsAndBadges";
import AwardToStudentModal from "../../components/Admincomponent/AwardToStudentModal";

// GET /rewards/earned?studentId=:id -> { totalPoints, earned: [{ id, title, description, kind, points, awardedAt, note }] }
export default function StudentAchievement() {
  const { id } = useParams(); // the student's profile id
  const { state } = useLocation(); // { name, learnerId } when opened from the table
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [awarding, setAwarding] = useState(null); // "BADGE" | "REWARD"

  const load = useCallback(() => {
    api
      .get("/rewards/earned", { studentId: id })
      .then((res) => { setData(res); setError(""); })
      .catch((err) => setError(err.message || "Could not load this student's awards."));
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const earned = data?.earned ?? [];
  const student = { name: state?.name || "Student", studentId: state?.learnerId || id };

  return (
    <div>
      <StudentAchievementDetails student={student} totalPoints={data?.totalPoints} />
      {error && (
        <p role="alert" className="mx-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 sm:mx-6">{error}</p>
      )}
      <StudenAchievementCard
        items={earned.filter((a) => a.kind !== "REWARD")}
        loading={!data && !error}
        onAward={() => setAwarding("BADGE")}
      />
      <div className="mt-10">
        <RewardsAndBadges
          items={earned.filter((a) => a.kind === "REWARD")}
          loading={!data && !error}
          onAward={() => setAwarding("REWARD")}
        />
      </div>
      {awarding && (
        <AwardToStudentModal
          kind={awarding}
          studentId={Number(id)}
          earnedIds={earned.map((a) => a.id)}
          onClose={() => setAwarding(null)}
          onAwarded={() => { setAwarding(null); load(); }}
        />
      )}
    </div>
  );
}
