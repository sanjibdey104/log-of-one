import Head from "next/head";
import Header from "@/components/layout/Header";
import {
  getJournalEntriesList,
  getJournalEntry,
} from "@/lib/fetchJournalEntries";
import { syncMetadataSheetWithDocs } from "@/lib/syncMetadataSheet";
import {
  JournalDocSlugParam,
  JournalEntryDoc,
  JournalMetadata,
} from "@/lib/types";
import { formattedSlug } from "@/lib/utils";
import Pattern from "@/components/Pattern";

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

      <section className="journal-entry-page flex flex-col items-center justify-center gap-16">
        <Header>
          <div className="journal-entry-header flex flex-col items-center fg-garamond">
            <h2 className="journal-entry-title text-xl">{doc_title}</h2>
            <span className="journal-entry-date text-xs text-gray-500">
              {doc_creation_date}
            </span>
          </div>
        </Header>

        <Pattern
          patternId={`journal-entry-${doc_id}-pattern`}
          patternThemeColor={doc_color_theme || ""}
          bannerHeight={80}
          className="shadow-(--box-shadow)"
        />

        <section className="journal-entry-content flex flex-col items-center justify-center gap-16">
          <div
            className="prose p-16 border border-gray-300 bg-gray-50"
            dangerouslySetInnerHTML={{
              __html: journalDocHtml,
            }}
          />
        </section>
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
  const completeMetadata = await syncMetadataSheetWithDocs();
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

  const requiredJournalMetadata = {
    doc_id: matchingJournalMetadata.doc_id,
    doc_title: matchingJournalMetadata.doc_title,
    doc_excerpt: matchingJournalMetadata.doc_excerpt,
    doc_color_theme: matchingJournalMetadata.doc_color_theme,
    doc_creation_date: matchingJournalMetadata.doc_creation_date,
  };

  return {
    props: {
      journalDocData: {
        journalMetadata: requiredJournalMetadata,
        journalDocHtml,
      },
    },
  };
}
