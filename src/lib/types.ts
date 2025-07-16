export type JournalEntry = {
  id: string;
  name: string;
  slug: string;
  createdTime: string;
  modifiedTime: string;
  docColorTheme?: string;
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
  doc_excerpt: string;
  doc_color_theme: string;
  doc_creation_date: string;
};

export type PatternType = {
  patternId: string;
  patternThemeColor?: string;
  bannerHeight?: number;
};
