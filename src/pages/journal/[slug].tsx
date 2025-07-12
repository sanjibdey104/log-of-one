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
        <title>{journalDocTitle} — MyLogue</title>
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

      <section className="journal-entry flex flex-col items-center justify-center gap-16 p-16 bg-gray-100">
        <h3 className="journal-entry-title">{journalDocTitle}</h3>

        <div
          className="prose max-w-[100%] md:max-w-[70%] p-24 border border-gray-300 bg-gray-50"
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
