import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import StudentsHeader from "../../../components/Admincomponent/parentheader";
import ParentOverviewCards from "../../../components/Admincomponent/ParentOverviewCards";
import ParentSections from "../../../components/Admincomponent/ParentSections";

export default function ParentDetails() {
  const { id } = useParams();
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setParent(await api.get(`/admin/parents/${id}`));
      setError("");
    } catch (err) {
      setError(err.status === 404 ? "This parent could not be found." : err.message || "Could not load the parent.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setParent(null);
    load();
  }, [load]);

  if (loading) return <p className="p-6 text-sm text-[#667085]">Loading parent…</p>;
  if (error || !parent) {
    return (
      <p role="alert" className="m-6 rounded-md bg-[#FDE7E7] px-4 py-3 text-sm text-[#D14343]">
        {error || "This parent could not be found."}
      </p>
    );
  }

  return (
    <main className="min-h-screen w-full min-w-0 bg-[#F5F7FD]">
      <div className="flex w-full min-w-0 flex-col gap-4 p-3 sm:gap-5 sm:p-5 lg:gap-6 lg:p-6">
        <section className="w-full min-w-0">
          <StudentsHeader parent={parent} />
        </section>

        <section className="w-full min-w-0">
          <ParentOverviewCards parent={parent} />
        </section>

        <section className="w-full min-w-0">
          <ParentSections parent={parent} onChanged={load} />
        </section>
      </div>
    </main>
  );
}
