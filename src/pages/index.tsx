import { getJournalEntriesList } from "@/lib/fetchJournalEntries";
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

export default function Home({ journalDocsList }: any) {
  console.log("journalDocsList: ", journalDocsList);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-8 gap-32">
      <header className="w-full p-sm text-center text-xl font-semibold">
        Welcome to MyLogue
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto">
        {journalDocsList.length ? (
          <section className="journal-docs flex flex-col gap-16">
            <h3>List of journals</h3>

            <ul className="flex flex-col gap-8 list-none p-0">
              {journalDocsList
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

export const getStaticProps = async () => {
  const journalDocsList = await getJournalEntriesList();

  return {
    props: {
      journalDocsList,
    },
    // revalidate: 3600, // optional
  };
};
