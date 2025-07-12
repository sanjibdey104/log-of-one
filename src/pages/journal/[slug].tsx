import Header from "@/components/layout/Header";
import {
  getJournalEntriesList,
  getJournalEntry,
} from "@/lib/fetchJournalEntries";
import { JournalDocSlugParam, JournalEntryDoc } from "@/lib/types";
import { formattedSlug } from "@/lib/utils";
import Head from "next/head";

export default function JournalEntry({
  journalDocTitle,
  journalDocHtml,
}: JournalEntryDoc) {
  return (
    <>
      <Head>
        <title>{`${journalDocTitle} — MyLogue`}</title>
        <meta
          name="description"
          content={`Reflections on: ${journalDocTitle}`}
        />
        <meta property="og:title" content={`${journalDocTitle} — My Journal`} />
        <meta
          property="og:description"
          content={`Reflections on: ${journalDocTitle}`}
        />
      </Head>

      <section className="journal-entry flex flex-col items-center justify-center gap-16">
        <Header>
          <h2 className="journal-entry-title text-lg fg-garamond">
            {journalDocTitle}
          </h2>
        </Header>

        <div
          className="prose p-16 border border-gray-300 bg-gray-50"
          dangerouslySetInnerHTML={{
            __html: journalDocHtml,
          }}
        />
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const journalDocsList = await getJournalEntriesList();

  return {
    paths: journalDocsList.map((journalDoc) => ({
      params: { slug: formattedSlug(journalDoc) },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: JournalDocSlugParam) {
  const docs = await getJournalEntriesList();
  const curJournalDoc = docs.find(
    (journalDoc) => formattedSlug(journalDoc) === params.slug
  );

  if (!curJournalDoc) {
    return { notFound: true };
  }

  const journalDocHtml = await getJournalEntry(curJournalDoc.id);

  return {
    props: {
      journalDocTitle: curJournalDoc.name,
      journalDocHtml,
    },
  };
}
