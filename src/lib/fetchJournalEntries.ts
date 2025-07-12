import { google } from "googleapis";

export async function getJournalEntriesList() {
  const googleDriveFolderId = process.env.GOOGLE_FOLDER_ID;

  if (!googleDriveFolderId) {
    throw new Error("Missing GOOGLE_FOLDER_ID in environment");
  }

  try {
    const googleDriveAuth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const googleDriveRef = google.drive({
      version: "v3",
      auth: googleDriveAuth,
    });

    const response = await googleDriveRef.files.list({
      q: `'${googleDriveFolderId}' in parents and mimeType='application/vnd.google-apps.document' and trashed=false`,
      fields: "files(id, name, createdTime, modifiedTime)",
    });

    return response.data.files || [];
  } catch (error: any) {
    throw new Error(`Failed to list documents: ${error.message}`);
  }
}
