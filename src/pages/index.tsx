import Head from "next/head";
import Link from "next/link";
import { JournalEntry } from "@/lib/types";
import { getJournalEntriesList } from "@/lib/fetchJournalEntries";
import { formatDate } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Banner from "@/components/Banner";

export default function Home({
  journalDocsList,
}: {
  journalDocsList: JournalEntry[];
}) {
  return (
    <>
      <Head>
        <title>Log Of One</title>
        <meta
          name="logofone"
          content="A space to share my internal reflections and much more."
        />
      </Head>

      <section className="min-h-screen flex flex-col gap-32">
        <Header />

        <main className="flex-1 flex flex-col gap-48">
          <Banner />

          <section className="platform-intro text-sm flex flex-col gap-8">
            <p>
              Welcome to Log of One - A space to share my internal reflections.
            </p>
            <p>
              There's a heap of thoughts wriggling inside that I've been meaning
              to put out there for a while. The spectrum of experiences over the
              past few years feels like a new life altogether. A part of me got
              dropped off somewhere in that past, in a time long lost.
            </p>
            <p>
              And over those year dynamics of my relationships has evolved so
              much. I've opened up even more, been more vocal of my vulnerable
              self, which in turn has greatly help me find some things to latch
              on to as the storm passes. Something to hold my ground, keep me
              sane.
            </p>
            <p>
              One thing that clearly inflanted during this period has been my
              over-thinking. Even writing down all these has been in the back
              seat for so long. So many train of thoughts has simply derailed.
            </p>
            <p>
              And this platform is an effort to bring it back on track, to have
              more intent with my writing, and at the very least try to be
              regular with the entries.
            </p>

            <p className="blog-guide">Have a look around.</p>
            <p>Read some. Ponder more.</p>
          </section>

          {journalDocsList.length ? (
            <section className="journal-entries-section flex flex-col gap-16">
              <ul className="journal-entries-list flex flex-col gap-16 p-0">
                {journalDocsList.map((journalDoc, index) => (
                  <li
                    key={index}
                    className="journal-doc flex flex-row justify-between"
                  >
                    <Link
                      href={`/journal/${journalDoc.slug}`}
                      className="journal-name text-sm text-blue-900"
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

        <footer className="w-full text-center text-xs text-gray-400 fg-garamond">
          © 2025 Log Of One
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
