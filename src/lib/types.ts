export type JournalEntry = {
  id: string;
  name: string;
  slug: string;
  createdTime: string;
  modifiedTime: string;
};

export type JournalDocSlugParam = {
  params: {
    slug: string;
  };
};

export type JournalEntryDoc = {
  journalDocData: {
    journalDocDate: string;
    journalDocTitle: string;
    journalDocHtml: string;
    journalMetadata: JournalMetadata;
  };
};

export type JournalMetadata = {
  doc_id: string;
  doc_title: string;
  doc_banner_image: string;
  doc_creation_date: string;
};
