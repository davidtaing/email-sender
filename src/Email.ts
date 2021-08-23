import { fileURLToPath } from 'url';
import { Attachment, loadAttachment } from './Attachment';

const FROM_EMAIL: string = process.env.SENDGRID_FROM_EMAIL;
const TEMPLATE_ID: string = process.env.SENDGRID_TEMPLATE_ID;

export interface Email {
  to: string[];
  from: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: Promise<Attachment>[];
  templateId?: string;
  dynamicTemplateData?: {};
}

// Init Email object to send to the SendGrid Email API
// The input spreadsheet may have multiple emails (to field) and attachments (filepath field) delimted by a semi colon (;)
export function createEmail(
  firstName, 
  to, 
  property, 
  filepaths, 
  from = FROM_EMAIL, 
  templateId = TEMPLATE_ID,
): Email {
  let paths = splitDelimitedString(filepaths);
  console.log('Before');
  let attachments = paths.map(async (path) => await loadAttachment(path));
  console.log('After');
  return {
    to: splitDelimitedString(to),
    from: from,
    attachments: attachments,
    templateId: templateId,
    dynamicTemplateData: {
      firstName: firstName,
      property: property,
    }
  };
}

// Splits a string that is delimited by a semi colon.
// Primarily used to split multiple emails or attachments in a single spreadsheet cell.
function splitDelimitedString(string: string) : string[] {
  return string.split(';');
}