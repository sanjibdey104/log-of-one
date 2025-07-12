import { google } from "googleapis";
import { JournalEntry } from "./types";
import { formattedSlug } from "./utils";

export async function getJournalEntriesList(): Promise<JournalEntry[]> {
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

    const rawDocs = response.data.files || [];
    const sanitizedDocs: JournalEntry[] = [];

    for (const file of rawDocs) {
      // Skip if any required field is missing
      if (!file.id || !file.name || !file.createdTime || !file.modifiedTime) {
        continue;
      }

      sanitizedDocs.push({
        id: file.id,
        name: file.name,
        slug: formattedSlug(file),
        createdTime: file.createdTime,
        modifiedTime: file.modifiedTime,
      });
    }

    return sanitizedDocs;
  } catch (error: any) {
    throw new Error(`Failed to list documents: ${error.message}`);
  }
}

export async function getJournalEntry(id: string) {
  if (!id || typeof id !== "string") {
    throw new Error("Missing or invalid doc ID");
  }

  try {
    const googleDriveAuth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth: googleDriveAuth });

    const result = await drive.files.export(
      {
        fileId: id,
        mimeType: "text/html",
      },
      { responseType: "text" } // Needed to get raw HTML string
    );

    return result.data as string;
  } catch (error: any) {
    throw new Error(`Failed to list documents: ${error.message}`);
  }
}
