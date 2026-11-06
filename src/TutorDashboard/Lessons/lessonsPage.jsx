import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import SelectedCourse from "./selectCourse";
import CurriculumTabs from "./Curriculum";

export default function LessonsPage() {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState(null);
  const [year, setYear] = useState(null);

  // The tutor's courses; the first one is selected to begin with.
  useEffect(() => {
    let cancelled = false;
    api
      .get("/tutors/subjects")
      .then((list) => {
        if (cancelled) return;
        setSubjects(list);
        if (list[0]) {
          setSubjectId(list[0].subjectId);
          setYear(list[0].yearLevel);
        }
      })
      .catch(() => {}); // the topics list shows its own empty state
    return () => {
      cancelled = true;
    };
  }, []);

  const subject = useMemo(() => {
    const hit = subjects.find((s) => s.subjectId === subjectId);
    return hit ? { subjectId: hit.subjectId, name: hit.name } : null;
  }, [subjects, subjectId]);

  return (
    <div>
      <SelectedCourse
        subjects={subjects}
        subjectId={subjectId}
        year={year}
        onChange={(id, yearLevel) => {
          setSubjectId(id);
          setYear(yearLevel);
        }}
      />
      <CurriculumTabs subject={subject} year={year} />
    </div>
  );
}
