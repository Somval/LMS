// The database has no place for a tutor's saved topics or lesson plans yet, so they are kept
// in this browser's storage, separately for each signed-in tutor.

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode): the choice just won't be remembered
  }
};

const savedKey = (userId) => `tutor-saved-topics:${userId}`;
const plansKey = (userId) => `tutor-lesson-plans:${userId}`;

// Saved topics: [{ id, subjectId, year, title, description, lessons, number, lessonIds }]
export const readSaved = (userId) => read(savedKey(userId), []);

export const toggleSavedTopic = (userId, topic) => {
  const current = readSaved(userId);
  const next = current.some((t) => t.id === topic.id)
    ? current.filter((t) => t.id !== topic.id)
    : [...current, topic];
  write(savedKey(userId), next);
  return next;
};

// Save (or update) a topic together with the lessons the tutor picked from it.
export const saveTopic = (userId, topic) => {
  const current = readSaved(userId).filter((t) => t.id !== topic.id);
  const next = [...current, topic];
  write(savedKey(userId), next);
  return next;
};

// Lesson plans: { [lessonId]: { resources: [...], delivery: [...] } }
export const readPlan = (userId, lessonId) => read(plansKey(userId), {})[lessonId] ?? null;

export const savePlan = (userId, lessonId, plan) => {
  const all = read(plansKey(userId), {});
  write(plansKey(userId), { ...all, [lessonId]: plan });
};

export const topicLink = (topic) =>
  `/tutor/curriculum/topics/${topic.id}?subject=${topic.subjectId}${
    topic.year ? `&year=${encodeURIComponent(topic.year)}` : ""
  }`;
