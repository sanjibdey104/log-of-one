export function formattedSlug(journalDoc: any): string {
  if (!journalDoc?.name) return "";

  return journalDoc.name.trim().toLowerCase().replace(/\s+/g, "-");
}

export function formatDate(dateIsoString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateIsoString));
}
