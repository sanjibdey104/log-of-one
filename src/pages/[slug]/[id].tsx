import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

type fetchJournalDoc = {
  loading: Boolean;
  journalDocHTML: string;
  error: string;
};

export default function JournalEntry() {
  const router = useRouter();
  const { id } = router.query;

  const [fetchJournalDocState, setfetchJournalDocState] =
    useState<fetchJournalDoc>({
      loading: true,
      journalDocHTML: "",
      error: "",
    });

  const docId = useMemo(() => {
    return typeof router.query.id === "string" ? router.query.id : "";
  }, [router.query.id]);

  const fetchJournalDocs = useCallback(async () => {
    try {
      const res = await fetch(`/api/get-journal-doc?id=${id}`);
      const resData = await res.json();

      setfetchJournalDocState({
        loading: false,
        journalDocHTML: resData.html || "",
        error: "",
      });
    } catch (error: any) {
      console.log("Doc fetching failed with error: ", error);

      setfetchJournalDocState({
        loading: false,
        journalDocHTML: "",
        error: `Failed to fetch docs due to error: ${error}`,
      });
    }
  }, [docId]);

  useEffect(() => {
    if (!router.isReady || !docId) return;

    fetchJournalDocs();
  }, [router.isReady, fetchJournalDocs]);

  return (
    <div>
      {fetchJournalDocState.loading ? (
        "Fetching journal entry..."
      ) : fetchJournalDocState.error ? (
        <p>{fetchJournalDocState.error}</p>
      ) : fetchJournalDocState.journalDocHTML ? (
        <section className="journal-doc flex flex-col items-center justify-center gap-16 p-16 bg-gray-100">
          <div
            className="prose max-w-[100%] md:max-w-[70%] p-24 border border-gray-300 bg-gray-50"
            dangerouslySetInnerHTML={{
              __html: fetchJournalDocState.journalDocHTML,
            }}
          />
        </section>
      ) : (
        <p className="no-docs-found">No matching doc found.</p>
      )}
    </div>
  );
}
