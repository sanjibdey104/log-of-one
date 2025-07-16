import { JournalEntry } from "@/lib/types";
import JournalEntryCard from "./JournalEntryCard";

const JournalEntriesGrid = ({
  journalDocsList = [],
}: {
  journalDocsList: JournalEntry[];
}) => {
  return (
    <section className="journal-enrtries-grid-wrapper w-full flex flex-col gap-16">
      <h3 className="journal-entries-grid-title pl-8 border-l-4  border-amber-200 text-md font-semibold text-gray-700">
        Entries
      </h3>

      {journalDocsList.length ? (
        <ul className="journal-entries-grid grid grid-cols-1 sm:grid-cols-2 gap-16">
          {journalDocsList.map((journalDoc) => (
            <JournalEntryCard key={journalDoc.id} journalDoc={journalDoc} />
          ))}
        </ul>
      ) : (
        <p className="no-docs-found">
          Sorry, failed to fetch entries. Fix in progress...
        </p>
      )}
    </section>
  );
};

export default JournalEntriesGrid;
