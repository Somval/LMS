import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../../lib/api";
import { subjectLabel, subjectQuery } from "./subjectFormat";

// Reads ?subject=&year= from the URL and looks up the subject's name for the breadcrumb.
// Rewards and achievements belong to the tutor (not to one subject), so the subject is only context.
export default function useSubjectCrumb() {
  const [params] = useSearchParams();
  const subjectId = params.get("subject");
  const year = params.get("year");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!subjectId) return undefined;
    let cancelled = false;
    api
      .get("/tutors/subjects")
      .then((list) => {
        const hit = list.find((x) => String(x.subjectId) === subjectId);
        if (!cancelled && hit) setName(hit.name);
      })
      .catch(() => {}); // breadcrumb only, nothing to show on failure
    return () => {
      cancelled = true;
    };
  }, [subjectId]);

  return {
    query: subjectQuery(subjectId, year),
    label: name ? subjectLabel(name, year) : "",
  };
}
