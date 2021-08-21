import { Attachment } from './Attachment';

export interface Email {
  to: string;
  from: string;
  subjec?: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
  templateId?: string;
  dynamicTemplateData?: {};
}

// This is intended to help me plan on how to create a data structure for our Email POJO
export function CreateEmail(): Email {
  return {
    to: '',
    from: '',
    attachments: [
      {
        content: '',
        filename: '',
        type: '',
        disposition: 'attachment',
      }
    ],
    templateId: '',
    dynamicTemplateData: {
      firstName: '',
      property: '',
    }
  };
}