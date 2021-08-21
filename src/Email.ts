import { Attachment } from './Attachment';

export interface Email {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
}