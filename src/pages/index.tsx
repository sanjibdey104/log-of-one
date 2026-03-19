import Head from "next/head";

import { JournalEntry } from "@/lib/types";
import { getJournalEntriesList } from "@/lib/fetchJournalEntries";
import { syncMetadataSheetWithDocs } from "@/lib/syncMetadataSheet";

import HomepagePatternBanner from "@/components/Pattern";
import JournalEntriesGrid from "@/components/JournalEntriesGrid";
import BlinkingCursor from "@/components/BlinkingCursor";

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
        <HomepagePatternBanner patternId="homepage-pattern-banner" />

        <main className="flex-1 flex flex-col gap-48 pb-16">
          <section className="platform-intro text-sm flex flex-col gap-16">
            <h2 className="welcome-title font-semibold text-xl flex items-center">
              <BlinkingCursor />

              <span className="welcome-text">Welcome to Log of One</span>
            </h2>

            <p>
              I've been meaning to share few snippets from different phases my
              life for a while now.
            </p>
            <p>
              No it's not some extraordinary tale of a being and not that
              anyones's life needs validation for being exciting enough to be
              shared, rather it's more like a silent reflection on the bits and
              pieces that makes the whole of who I am and where I stand today.
            </p>
            <p>
              All the highs and lows that shape us, sometimes molding us into
              someone new and at times into an old self that got dropped off
              somewhere along the way.
            </p>
            <p>
              Consider these entries as simple accounts of self-introspection or
              a rambling spree.
            </p>
            <p>
              The spectrum ranges from finding the cracks and the mends, to
              things that excite me to explore more of. From my likes to quirks,
              from my grief to smirks.
            </p>
            <p>
              One such tear in the seams of my self has been my gluttony for
              overthinking. Riding with a one way ticket on the train of
              thoughts until it derails.
            </p>
            <p>
              So this can very well be considered as my first line of defense,
              as an effort to sit down with the chaos and look for the eye of
              the storm.
            </p>
            <p>A space to be more vulnerable, more open to life.</p>
            {/* discuss the way the journal entries work:
            - mention that most entries get updated as i tend to revisit them (a mind wanders) 
            - sort them by last updated (check if we can get that data from google doc)
            - allow users to bookmark them?
            - allow users to like or unlike thme?
            */}
          </section>

          <JournalEntriesGrid journalDocsList={journalDocsList} />

          <blockquote className="note border-l-2 pl-8 border-amber-200 text-xs text-md text-gray-500">
            <p>A quick note on the dynamic nature of these entries:</p>
            <p>
              I would be visiting many of these pieces over time to edit them or
              add more to them.
            </p>
            <p>
              They would be sorted by latest edits, so you can follow up on
              those changes, or maybe not. LOL!!!
            </p>
          </blockquote>
        </main>
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
      (docMetadata) => docMetadata.doc_id === doc.id,
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
