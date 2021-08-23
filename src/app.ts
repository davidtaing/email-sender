import * as dotenv from 'dotenv';
dotenv.config();

import * as sgMail from '@sendgrid/mail';
import * as XLSX from 'XLSX';
import { createEmail } from './Email';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const XLSX_PATH: string = process.env.DATA_SOURCE_XLSX;

const parsedEmailData = loadXLSXToJSON().map((data: any) => {
  let { firstName, to, property, filepaths } = data;
  return createEmail(firstName, to, property, filepaths);
});

function sendEmail(msg) {
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}

// Loads XLSX spreadsheet and Parses to JSON
function loadXLSXToJSON(path: string = XLSX_PATH) {
  try {
    let wb = XLSX.readFile(path);
    let firstSheetName = wb.SheetNames[0]
    let ws = wb.Sheets[firstSheetName];

    if (ws === undefined) {
      throw 'Failed to load spreadsheet.';
    }

    return XLSX.utils.sheet_to_json(ws, {raw: false});
  } catch (e) {
    console.log("Error occured while loading spreadsheet.");
    console.log(e);
  }
}

// Output parsed data.
console.log(parsedEmailData);