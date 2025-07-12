export function formattedSlug(journalDoc: any): string {
  if (!journalDoc?.name) return "";

  return journalDoc.name.trim().toLowerCase().replace(/\s+/g, "-");
}
