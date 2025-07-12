import Head from "next/head";
import Link from "next/link";
import { JournalEntry } from "@/lib/types";
import { getJournalEntriesList } from "@/lib/fetchJournalEntries";
import { formatDate } from "@/lib/utils";

export default function Home({
  journalDocsList,
}: {
  journalDocsList: JournalEntry[];
}) {
  return (
    <>
      <Head>
        <title>MyLogue</title>
        <meta
          name="mylogue"
          content="A space to share my internal reflections and much more."
        />
      </Head>

      <section className="min-h-screen flex flex-col gap-32">
        <header className="p-16 text-center flex flex-col gap-8">
          <h1 className="text-xl font-semibold">Welcome to ReflectWell</h1>

          <div className="platform-brief text-gray-600 text-sm">
            <p>Created this space to share my internal reflections.</p>
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-32">
          {journalDocsList.length ? (
            <section className="journal-entries-section flex flex-col gap-16">
              <ul className="journal-entries-list flex flex-col gap-8 p-0 list-none">
                {journalDocsList.map((journalDoc, index) => (
                  <li
                    key={index}
                    className="journal-doc flex flex-row justify-between"
                  >
                    <Link
                      href={`/journal/${journalDoc.slug}`}
                      className="journal-name text-blue-900"
                    >
                      {journalDoc.name}
                    </Link>

                    <p className="created-time text-gray-400 text-xs">
                      {formatDate(journalDoc.createdTime)}
                    </p>
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
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const journalDocsList = await getJournalEntriesList();

  return {
    props: {
      journalDocsList,
    },
  };
};
