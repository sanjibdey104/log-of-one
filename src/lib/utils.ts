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

export function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b].map((val) => val.toString(16).padStart(2, "0")).join("");
}

export function getRandomDarkerHexShade(): string {
  const r = Math.floor(Math.random() * 128);
  const g = Math.floor(Math.random() * 128);
  const b = Math.floor(Math.random() * 128);
  return rgbToHex(r, g, b);
}
