import { useEffect, useState } from "react";
import Link from "next/link";

type JournalInfo = {
  id: string;
  name: string;
  createdTime: string;
  modifiedTime: string;
};

type JournalInfoWithSlug = JournalInfo & {
  slug: string;
};

type FetchJournalDocs = {
  loading: Boolean;
  docs: JournalInfoWithSlug[];
  error: string;
};

export default function Home() {
  const [fetchJournalDocsState, setfetchJournalDocsState] =
    useState<FetchJournalDocs>({
      loading: true,
      docs: [],
      error: "",
    });

  const fetchJournalDocs = async () => {
    try {
      const res = await fetch("/api/get-journal-docs");
      const resData = await res.json();

      setfetchJournalDocsState({
        loading: false,
        docs: resData.journalDocs || [],
        error: "",
      });
    } catch (error: any) {
      console.log("Doc fetching failed with error: ", error);

      setfetchJournalDocsState({
        loading: false,
        docs: [],
        error: `Failed to fetch docs due to error: ${error}`,
      });
    }
  };

  useEffect(() => {
    fetchJournalDocs();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-8 gap-32 border-amber-600">
      <header className="w-full p-sm text-center text-xl font-semibold">
        Welcome to MyLogue
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto">
        {fetchJournalDocsState.loading ? (
          "Fetching journals..."
        ) : fetchJournalDocsState.error ? (
          <p>{fetchJournalDocsState.error}</p>
        ) : fetchJournalDocsState.docs.length ? (
          <section className="journal-docs flex flex-col gap-16">
            <h3>List of journals</h3>

            <ul className="flex flex-col gap-8 list-none p-0">
              {fetchJournalDocsState.docs
                .map((journalDoc: JournalInfo) => ({
                  ...journalDoc,
                  slug: journalDoc.name.toLowerCase().replace(/\s+/g, "-"),
                }))
                .map((journalDoc: JournalInfoWithSlug, index: number) => (
                  <li
                    key={journalDoc.id || index}
                    className="journal-doc flex flex-row justify-between"
                  >
                    <Link
                      href={`/${journalDoc.slug}/${journalDoc.id}`}
                      className="journal-name text-blue-900"
                    >
                      {journalDoc.name}
                    </Link>

                    <p className="created-time">{journalDoc.createdTime}</p>
                  </li>
                ))}
            </ul>
          </section>
        ) : (
          <p className="no-docs-found">No docs found.</p>
        )}
      </main>

      <footer className="w-full text-center text-sm text-gray-400">
        © 2025 MyLogue
      </footer>
    </div>
  );
}
