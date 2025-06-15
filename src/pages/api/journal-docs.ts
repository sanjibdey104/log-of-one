import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function fetchJournalDocs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const googleDriveFolderId = process.env.GOOGLE_FOLDER_ID;

  if (!googleDriveFolderId) {
    return res
      .status(400)
      .json({ error: "Missing GOOGLE_FOLDER_ID in environment" });
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

    const journalDocs = response.data.files || [];

    return res.status(200).json({ journalDocs });
  } catch (error: any) {
    console.error("Google Drive API Error:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to list documents", detail: error.message });
  }
}
