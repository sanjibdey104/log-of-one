import Head from "next/head";
import { JournalEntry } from "@/lib/types";
import { getJournalEntriesList } from "@/lib/fetchJournalEntries";
import { syncMetadataSheetWithDocs } from "@/lib/syncMetadataSheet";

import Header from "@/components/layout/Header";
import HomepagePatternBanner from "@/components/Pattern";
import JournalEntriesGrid from "@/components/JournalEntriesGrid";

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

        <HomepagePatternBanner patternId="homepage-pattern-banner" />

        <main className="flex-1 flex flex-col gap-48 pb-16">
          <section className="platform-intro text-sm flex flex-col gap-8">
            <p>
              Welcome to Log of One - A space to share my internal reflections.
            </p>
            <p>
              The spectrum of experiences over the past few years has made the
              present feel like a new life altogether, like a part of me got
              dropped off somewhere along the way and these entries are in an
              effort to rediscover that old self.
            </p>
            <p>
              Over those years the dynamics of my relationships has evolved,
              I've opened up more, been more vulnerable, which has greatly
              helped me find things to latch on to as the storm passes by.
            </p>
            <p>
              One major culprit derailing my train of thoughts has been my
              overthinking and procrastination. So sitting down with my thoughts
              is my first line of defense to make some sense out of them, be
              regular with it and eventually find my way through.
            </p>
            <p>
              I've also realized many out there might struggling with similar
              vices, so putting these thoughts out here is in hopes of sharing a
              common ground and be there for each other.
            </p>
            <p>
              I'll be sharing everything -- from my likes to quirks, from my
              grief to smirks.
            </p>
            <p>Go ahead. Read some. Ponder more.</p>
          </section>

          <JournalEntriesGrid journalDocsList={journalDocsList} />
        </main>

        <footer className="w-full text-center text-xs text-gray-400 fg-garamond">
          © 2025 Log Of One
        </footer>
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const docsMetadata = await syncMetadataSheetWithDocs();
  const journalDocsList = await getJournalEntriesList();

  // complete the metadata with existing color theme
  const hydratedDocsList = journalDocsList.map((doc) => {
    const matchingDoc = docsMetadata.find(
      (docMetadata) => docMetadata.doc_id === doc.id
    );

    if (matchingDoc) {
      return {
        ...doc,
        docColorTheme: matchingDoc.doc_color_theme,
        docExcerpt: matchingDoc.doc_excerpt,
      };
    }
  });

  return {
    props: {
      journalDocsList: hydratedDocsList,
    },
  };
};
