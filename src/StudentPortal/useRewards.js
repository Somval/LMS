import { useEffect, useState } from "react";
import { api } from "../lib/api";

// Loads the student's earned badges/rewards and the badges still locked.
export default function useRewards({ withLocked = false } = {}) {
  const [state, setState] = useState({ earned: [], locked: [], totalPoints: 0, loading: true, error: "" });

  useEffect(() => {
    const calls = [api.get("/rewards/earned")];
    if (withLocked) calls.push(api.get("/rewards/locked"));
    Promise.all(calls)
      .then(([earned, locked]) =>
        setState({ earned: earned.earned, locked: locked ?? [], totalPoints: earned.totalPoints, loading: false, error: "" })
      )
      .catch((err) => setState((s) => ({ ...s, loading: false, error: err.message || "Could not load your achievements." })));
  }, [withLocked]);

  return state;
}

const fmt = (iso, opts) => new Date(iso).toLocaleDateString("en-US", opts);
export const shortDate = (iso) => fmt(iso, { month: "short", day: "numeric", year: "numeric" });
export const longDate = (iso) => fmt(iso, { month: "long", day: "numeric", year: "numeric" });
export const monthLabel = (iso) => fmt(iso, { month: "long", year: "numeric" });

// What "What was achieved" shows for one earned item.
export const detailsOf = (a) => {
  const lines = [];
  if (a.note) lines.push(`Tutor's note: ${a.note}`);
  if (a.points > 0) lines.push(`${a.points} points earned`);
  lines.push(a.kind === "REWARD" ? "Reward given by your tutor" : "Badge awarded by your tutor");
  return lines;
};
