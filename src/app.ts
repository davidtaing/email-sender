import * as dotenv from 'dotenv';
dotenv.config();

import * as sgMail from '@sendgrid/mail';
import * as XLSX from 'XLSX';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const XLSX_PATH: string = process.env.DATA_SOURCE_XLSX;

const inputXlsxData = loadXlsxToJSON();

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

function loadXlsxToJSON(path: string = XLSX_PATH) : XLSX.WorkSheet {
  try {
    let wb = XLSX.readFile(path);
    let firstSheetName = wb.SheetNames[0]
    let ws = wb.Sheets[firstSheetName];

    if (ws === undefined) {
      throw 'Failed to load spreadsheet.';
    }

    return XLSX.utils.sheet_to_json(ws);
  } catch (e) {
    console.log("Error occured while loading spreadsheet.");
    console.log(e);
  }
}

// dataArray.forEach(email => sendEmail(email));