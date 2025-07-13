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

export default function JournalEntry({ journalDocData }: JournalEntryDoc) {
  const { journalMetadata, journalDocHtml } = journalDocData;
  const { doc_title, doc_creation_date, doc_banner_image } = journalMetadata;

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

      <section className="journal-entry flex flex-col items-center justify-center gap-16">
        <Header>
          <div className="journal-entry-header flex flex-col items-center fg-garamond">
            <h2 className="journal-entry-title text-xl">{doc_title}</h2>
            <span className="journal-entry-date text-xs text-gray-500">
              {doc_creation_date}
            </span>
          </div>
        </Header>

        <img src={doc_banner_image} alt="journale entry banner" />

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
    doc_banner_image: "",
    doc_creation_date: "",
  };

  const requiredJournalMetadata = {
    doc_title: matchingJournalMetadata.doc_title,
    doc_creation_date: matchingJournalMetadata.doc_creation_date,
    doc_banner_image: matchingJournalMetadata.doc_banner_image,
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
