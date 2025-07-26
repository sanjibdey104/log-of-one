import Head from "next/head";
import Header from "@/components/layout/Header";
import {
  getJournalEntriesList,
  getJournalEntry,
} from "@/lib/fetchJournalEntries";
import {
  JournalDocSlugParam,
  JournalEntryDoc,
  JournalMetadata,
} from "@/lib/types";
import { formattedSlug } from "@/lib/utils";
import Pattern from "@/components/Pattern";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { fetchMetadataSheet } from "@/lib/fetchMetadataSheet";

export default function JournalEntry({ journalDocData }: JournalEntryDoc) {
  const { journalMetadata, journalDocHtml } = journalDocData;
  const { doc_id, doc_title, doc_creation_date, doc_color_theme } =
    journalMetadata;

  return (
    <>
      <Head>
        <title>{`${doc_title} — Log of One`}</title>
        <meta name="description" content={`Reflections on: ${doc_title}`} />
        <meta property="og:title" content={`${doc_title} — My Journal`} />
        <meta
          property="og:description"
          content={`Reflections on: ${doc_title}`}
        />
      </Head>

      <section className="journal-entry-page flex flex-col items-center justify-center gap-24">
        <Header />

        <div className="journal-entry-header flex flex-col gap-5 items-center fg-garamond">
          <h2 className="journal-entry-title text-xl text-center font-semibold">
            {doc_title} longer title to test length
          </h2>
          <span className="journal-entry-date text-sm text-gray-500">
            {doc_creation_date}
          </span>
        </div>

        <Pattern
          patternId={`journal-entry-${doc_id}-pattern`}
          patternThemeColor={doc_color_theme || ""}
          bannerHeight={80}
          className="shadow-(--box-shadow)"
        />

        <section className="journal-entry-content flex flex-col items-center justify-center gap-16">
          <div
            className="prose p-16 border border-gray-300 bg-gray-50 flex flex-col gap-8 sm:gap-4"
            dangerouslySetInnerHTML={{
              __html: journalDocHtml,
            }}
          />
        </section>
      </section>

      <ScrollToTopButton />
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
  const completeMetadata = await fetchMetadataSheet();
  const docs = await getJournalEntriesList();
  const curJournalDoc = docs.find(
    (journalDoc) => formattedSlug(journalDoc) === params.slug
  );

  if (!curJournalDoc) {
    return { notFound: true };
  }

  const journalDocHtml = await getJournalEntry(curJournalDoc.id);

  const matchingJournalMetadata: JournalMetadata = completeMetadata.find(
    (metadata) => metadata.doc_id === curJournalDoc.id
  ) || {
    doc_id: "",
    doc_title: "",
    doc_excerpt: "",
    doc_color_theme: "",
    doc_creation_date: "",
  };

  return {
    props: {
      journalDocData: {
        journalMetadata: matchingJournalMetadata,
        journalDocHtml,
      },
    },
  };
}
