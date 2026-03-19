import { JournalEntry } from "@/lib/types";
import JournalEntryCard from "./JournalEntryCard";
import BlinkingCursor from "../BlinkingCursor";

const JournalEntriesGrid = ({
  journalDocsList = [],
}: {
  journalDocsList: JournalEntry[];
}) => {
  return (
    <section className="journal-enrtries-grid-wrapper w-full flex flex-col gap-16">
      <h3 className="journal-entries-grid-title text-md font-semibold flex items-center">
        <BlinkingCursor />

        <span>Entries</span>
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
