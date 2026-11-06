// Rewards and badges store one description string in the database. The create form saves the
// "how to earn" rule at the end of it ("How to earn: ..."), so these helpers split and rejoin it.
const RULE = /(?:^|\n\n)How to earn:\s*([\s\S]*)$/;

export function splitDescription(text = "") {
  const m = text.match(RULE);
  if (!m) return { description: text.trim(), criteria: "" };
  return { description: text.slice(0, m.index).trim(), criteria: m[1].trim() };
}

export function joinDescription(description, criteria) {
  return [description?.trim(), criteria?.trim() && `How to earn: ${criteria.trim()}`]
    .filter(Boolean)
    .join("\n\n")
    .slice(0, 1000);
}

// API record -> row the tables and edit modals use
export function toRow(a) {
  const { description, criteria } = splitDescription(a.description || "");
  return {
    id: a.id,
    name: a.title,
    description,
    criteria,
    studentsEarned: a.studentsEarned ?? 0,
    kind: a.kind,
    points: a.points ?? 0,
    icon: a.icon || undefined,
  };
}

// Edited row -> body for PUT /rewards/:id (kind and points are kept, otherwise the API resets them)
export function toPayload(row) {
  return {
    title: row.name.trim(),
    description: joinDescription(row.description, row.criteria) || undefined,
    kind: row.kind,
    points: row.points ?? 0,
    ...(row.icon ? { icon: row.icon } : {}),
  };
}
