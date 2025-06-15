import { useEffect, useState } from "react";

type JournalDocsInfoType = {
  loading: Boolean;
  docs: any[];
  error: string;
};

export default function Home() {
  const [journalDocsInfo, setJournalDocsInfo] = useState<JournalDocsInfoType>({
    loading: true,
    docs: [],
    error: "",
  });

  useEffect(() => {
    const fetchJournalDocs = async () => {
      try {
        const res = await fetch("/api/journal-docs");
        const resData = await res.json();
        console.log("resData: ", resData);

        setJournalDocsInfo({
          loading: false,
          docs: resData.journalDocs || [],
          error: "",
        });
      } catch (error: any) {
        console.log("Doc fetching failed with error: ", error);
        setJournalDocsInfo({
          loading: false,
          docs: [],
          error: `Failed to fetch docs due to error: ${error}`,
        });
      }
    };

    fetchJournalDocs();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-8 gap-32 border-amber-600">
      <header className="w-full p-sm text-center text-xl font-semibold">
        Welcome to MyLogue
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto">
        {journalDocsInfo.loading ? (
          "Fetching journal docs..."
        ) : journalDocsInfo.error ? (
          <p>{journalDocsInfo.error}</p>
        ) : journalDocsInfo.docs.length ? (
          <section className="journal-docs flex flex-col gap-16">
            <h3>List of journals</h3>

            <ul className="flex flex-col gap-8 list-none p-0">
              {journalDocsInfo.docs.map(
                (
                  journalDoc: {
                    id: string;
                    name: string;
                    createdTime: string;
                    modifiedTime: string;
                  },
                  index: number
                ) => (
                  <li
                    key={journalDoc.id || index}
                    className="journal-doc flex flex-row justify-between"
                  >
                    <h5 className="journal-name text-blue-900">
                      {journalDoc.name}
                    </h5>
                    <p className="created-time">{journalDoc.createdTime}</p>
                  </li>
                )
              )}
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
