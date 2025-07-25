import { google } from "googleapis";
import { JournalMetadata } from "./types";

export async function fetchMetadataSheet(): Promise<JournalMetadata[]> {
  const metadataSheetId = process.env.METADATA_SHEET_ID!;
  const metadataSheetTab = process.env.METADATA_SHEET_TAB || "Sheet1";

  if (!metadataSheetId) {
    throw new Error("Missing METADATA_SHEET_ID in environment");
  }

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const googleSheetsRef = google.sheets({ version: "v4", auth });

    const sheetRes = await googleSheetsRef.spreadsheets.values.get({
      spreadsheetId: metadataSheetId,
      range: `${metadataSheetTab}!A2:E`, // skip header row
    });

    const existingSheetRows = sheetRes.data.values ?? [];

    const completeMetadata = existingSheetRows.map(
      ([
        doc_id,
        doc_title,
        doc_excerpt,
        doc_color_theme,
        doc_creation_date,
      ]) => ({
        doc_id,
        doc_title,
        doc_excerpt,
        doc_color_theme,
        doc_creation_date,
      })
    );

    return completeMetadata;
  } catch (error: any) {
    throw new Error(`Failed to list documents: ${error.message}`);
  }
}
