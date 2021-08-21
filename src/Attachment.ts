import { readFile } from "fs/promises";
import * as path from "path";
import { mime } from "mime-types";

export interface Attachment {
  content: string;
  filename: string;
  type: string;
  disposition?: string;
  content_id?: string;
}

export function LoadAttachment(filepath: string): Attachment {
  readFile(filepath)
    .then((data) => {
      const attachment: Attachment = {
        content: data.toString('base64'),
        filename: path.basename(filepath),
        type: mime.lookup(filepath),
      }
      return attachment;
    })
    .catch((err) => {
      console.log("Failed to load attachment");
      console.log(err);
    });

    return null;
};
