import { JournalEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

import Link from "next/link";
import Pattern from "../Pattern";

const JournalEntryCard = ({ journalDoc }: { journalDoc: JournalEntry }) => {
  return (
    <Link href={`/journal/${journalDoc.slug}`}>
      <div className="journal-entry-card h-full shadow-(--box-shadow) rounded-sm p-12 flex flex-col gap-8">
        <section className="card-header">
          <Pattern
            patternId={`journal-entry-${journalDoc.id}-pattern`}
            patternThemeColor={journalDoc.docColorTheme || ""}
            bannerHeight={80}
          />
        </section>

        <section className="card-footer flex flex-col gap-5">
          <h2 className="journal-entry-title text-gray-900 text-xl font-bold">
            {journalDoc.name}
          </h2>

          <p className="journal-entry-excerpt text-gray-600 text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
            voluptates magnam? Ea debitis quas pariatur!
          </p>

          <span className="journal-entry-date text-gray-400 text-xs">
            {formatDate(journalDoc.createdTime)}
          </span>
        </section>
      </div>
    </Link>
  );
};

export default JournalEntryCard;
