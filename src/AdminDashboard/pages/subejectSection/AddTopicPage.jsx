import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import AddTopicLesson from "../../../components/Admincomponent/AddTopicLesson";
import { API_BASE, api } from "../../../lib/api";

// Connects the topic/lesson form to the server. The first save creates the topic;
// later saves of the same form update it instead of creating a duplicate.
export default function AddTopicPage() {
  const [params] = useSearchParams();
  const subjectId = params.get("subjectId");
  const savedId = useRef(null);

  if (!subjectId) {
    return (
      <p className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500">
        Choose a subject on the Curriculum &amp; Content page first, then use “Add topic”.
      </p>
    );
  }

  const save = async (payload) => {
    const body = {
      topicTitle: payload.topicTitle,
      topicOrder: payload.topicOrder,
      topicDescription: payload.topicDescription,
      status: payload.status,
      lessons: payload.lessons.map((l) => ({
        title: l.title,
        order: l.order,
        description: l.description,
        attachments: l.attachments
          .filter((a) => a.url)
          .map((a) => ({
            resourceType: a.resourceType,
            name: a.name,
            size: typeof a.size === "number" ? a.size : undefined,
            type: a.type || undefined,
            url: a.url,
          })),
      })),
    };
    if (savedId.current) {
      await api.put(`/curriculum/topics/${savedId.current}`, body);
    } else {
      const res = await api.post(`/curriculum/subjects/${subjectId}/topics`, body);
      savedId.current = res.id;
    }
  };

  return <AddTopicLesson uploadEndpoint={`${API_BASE}/uploads/lessons`} onSave={save} />;
}
