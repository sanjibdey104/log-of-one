import Head from "next/head";
import Link from "next/link";
import { JournalEntry } from "@/lib/types";
import { getJournalEntriesList } from "@/lib/fetchJournalEntries";

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
          content="A space to share my internal reflections and much more..."
        />
      </Head>

      <div className="min-h-screen w-full flex flex-col justify-between p-8 gap-32">
        <header className="w-full p-sm text-center text-xl font-semibold">
          Welcome to MyLogue
        </header>

        <main className="flex-1 w-full max-w-3xl mx-auto">
          {journalDocsList.length ? (
            <section className="journal-docs flex flex-col gap-16">
              <h3>List of journals</h3>

              <ul className="flex flex-col gap-8 list-none p-0">
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
