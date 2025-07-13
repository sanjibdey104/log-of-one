import { google } from "googleapis";

export async function syncMetadataSheetWithDocs() {
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
      range: `${metadataSheetTab}!A2:A`, // skip header row
    });

    const existingDocIds = new Set((sheetRes.data.values ?? []).flat());

    // Append any missing docs to the sheet
    const newMetadataSheetRows = googleDriveDocs
      .filter((doc) => !existingDocIds.has(doc.id))
      .map((doc) => [
        doc.id,
        doc.name,
        "", // banner_image (manually fill later)
        new Date(doc.createdTime!).toISOString().slice(0, 10),
      ]);

    // Metadata sheet already up to date.
    if (newMetadataSheetRows.length === 0) return;

    await googleSheetsRef.spreadsheets.values.append({
      spreadsheetId: metadataSheetId,
      range: `${metadataSheetTab}!A:D`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: newMetadataSheetRows,
      },
    });

    console.log(
      `Added ${newMetadataSheetRows.length} new rows to metadata sheet.`
    );
  } catch (error: any) {
    throw new Error(`Failed to list documents: ${error.message}`);
  }
}
