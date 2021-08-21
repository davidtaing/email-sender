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
  attachments?: Attachment[];
  templateId?: string;
  dynamicTemplateData?: {};
}

// Init Email object to send to the SendGrid Email API
export function createEmail(
  firstName, 
  to, 
  property, 
  filepaths, 
  from = FROM_EMAIL, 
  templateId = TEMPLATE_ID,
): Email {
  return {
    to: splitDelimitedString(to),
    from: from,
    attachments: splitDelimitedString(filepaths).map(filepath => loadAttachment(filepath)),
    templateId: templateId,
    dynamicTemplateData: {
      firstName: firstName,
      property: property,
    }
  };
}

// Allows us to convert the email and attachment cells to be converted into arrays.
function splitDelimitedString(string: string) : string[] {
  return string.split(';');
}