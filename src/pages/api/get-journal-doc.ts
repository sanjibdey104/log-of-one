import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getJournalDoc(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing or invalid doc ID" });
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

    const htmlContent = result.data as string;

    res.status(200).json({ html: htmlContent });
  } catch (error: any) {
    console.error("Error exporting Google Doc as HTML:", error);
    res.status(500).json({ error: "Failed to fetch document" });
  }
}
