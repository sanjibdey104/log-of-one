export function formattedSlug(journalDoc: any): string {
  if (!journalDoc?.name) return "";

  return journalDoc.name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-") // replace spaces with hyphen
    .replace(/-+/g, "-");
}

export function cleanSlug(slugString: string): string {
  return slugString
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-") // replace spaces with hyphen
    .replace(/-+/g, "-"); // collapse multiple (consecutive) hyphens
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
