import {
  getJournalEntriesList,
  getJournalEntry,
} from "@/lib/fetchJournalEntries";
import { JournalDocSlugParam, JournalEntryDoc } from "@/lib/types";
import { formattedSlug } from "@/lib/utils";

export default function JournalEntry({
  title,
  journalDocHtml,
}: JournalEntryDoc) {
  return (
    <section className="journal-entry flex flex-col items-center justify-center gap-16 p-16 bg-gray-100">
      <h3 className="journal-entry-title">{title}</h3>

      <div
        className="prose max-w-[100%] md:max-w-[70%] p-24 border border-gray-300 bg-gray-50"
        dangerouslySetInnerHTML={{
          __html: journalDocHtml,
        }}
      />
    </section>
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
      title: curJournalDoc.name,
      journalDocHtml,
    },
  };
}
