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
  journalDocTitle: string;
  journalDocHtml: string;
};
