import { google } from "googleapis";
import { JournalMetadata } from "./types";
import { formatDate } from "./utils";

export async function syncMetadataSheetWithDocs(): Promise<JournalMetadata[]> {
  const googleDriveFolderId = process.env.GOOGLE_FOLDER_ID;
  const metadataSheetId = process.env.METADATA_SHEET_ID!;
  const metadataSheetTab = process.env.METADATA_SHEET_TAB || "Sheet1";

  if (!googleDriveFolderId || !metadataSheetId) {
    throw new Error(
      "Missing GOOGLE_FOLDER_ID or METADATA_SHEET_ID in environment"
    );
  }

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: [
        "https://www.googleapis.com/auth/drive.readonly",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const googleDriveRef = google.drive({ version: "v3", auth });
    const googleSheetsRef = google.sheets({ version: "v4", auth });

    const docsRes = await googleDriveRef.files.list({
      q: `'${googleDriveFolderId}' in parents and mimeType='application/vnd.google-apps.document' and trashed=false`,
      fields: "files(id, name, createdTime)",
    });

    const googleDriveDocs = docsRes.data.files || [];

    // Read existing metadata rows (first col = docId)
    const sheetRes = await googleSheetsRef.spreadsheets.values.get({
      spreadsheetId: metadataSheetId,
      range: `${metadataSheetTab}!A2:D`, // skip header row
    });

    const existingSheetRows = sheetRes.data.values ?? [];
    const existingDocIds = new Set(existingSheetRows.map((row) => row[0]));

    // Append any missing docs to the sheet
    const newSheetRows = googleDriveDocs
      .filter((doc) => !existingDocIds.has(doc.id))
      .map((doc) => [
        doc.id,
        doc.name,
        "", // banner_image (manually fill later)
        formatDate(doc.createdTime!),
      ]);

    // Metadata sheet already up to date.
    if (newSheetRows.length > 0) {
      await googleSheetsRef.spreadsheets.values.append({
        spreadsheetId: metadataSheetId,
        range: `${metadataSheetTab}!A:D`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: newSheetRows,
        },
      });
    }

    console.log(`Added ${newSheetRows.length} new rows to metadata sheet.`);

    const allSheetRows = [...existingSheetRows, ...newSheetRows];
    const completeMetadata = allSheetRows.map(
      ([doc_id, doc_title, doc_banner_image, doc_creation_date]) => ({
        doc_id,
        doc_title,
        doc_banner_image,
        doc_creation_date,
      })
    );

    return completeMetadata;
  } catch (error: any) {
    throw new Error(`Failed to list documents: ${error.message}`);
  }
}
