import { readFile } from "fs/promises";
import * as path from "path";
import * as mime from "mime-types";

export interface Attachment {
  content: string;
  filename: string;
  type: string;
  disposition?: string;
  content_id?: string;
}

// Loads attachment from desinated filepath and parses into an POJO (Attachment object).
// Assumes single filepath.
export async function loadAttachment(filepath: string) {
  try {
    // load file
    let data : Buffer = await readFile(filepath);

    // then parse to a POJO
    let attachment : Attachment = {
      content: data.toString('base64'),
      filename: path.basename(filepath),
      type: mime.lookup(path.basename(filepath)),
    }
    return attachment;
  } catch (err) {
    console.log("Failed to load attachment");
    console.log(err);
  }
};