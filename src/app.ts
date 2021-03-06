import * as dotenv from "dotenv";
dotenv.config();

import * as sgMail from "@sendgrid/mail";
import * as XLSX from "XLSX";
import { Email, createEmail } from "./Email";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const XLSX_PATH: string = process.env.DATA_SOURCE_XLSX;

let RAW_XLSX_DATA = [];
let PARSED_EMAIL_DATA = [];

// Loads XLSX spreadsheet and Parses to JSON
function loadXLSXToJSON(path: string = XLSX_PATH) {
  try {
    let wb = XLSX.readFile(path);
    let firstSheetName = wb.SheetNames[0];
    let ws = wb.Sheets[firstSheetName];

    if (ws === undefined) {
      throw "Failed to load spreadsheet.";
    }

    return XLSX.utils.sheet_to_json(ws, {raw: false});
  } catch (e) {
    console.log("An error occured while loading spreadsheet.");
    console.error(e);
  }
}

// Parses spreadsheet data into SendGrid Email API POJO (or Email Objects)
async function parseEmailsFromXLSX(data = RAW_XLSX_DATA) {
  try {
    let emails : Array<Email> = [];

    let item : any;
    for (item of data) {
      let { firstName, to, property, filepaths } = item;
      emails.push(await createEmail(firstName, to, property, filepaths));
    }
    return emails;
  } catch (err) {
    console.log("An error occured while loading the emails.");
    console.error(err);
  }
};

// Loads and parses email data. Internally calls loadXLSXToJson and parseEmailsFromXLSX
async function initEmailData(path: string = XLSX_PATH) {
  RAW_XLSX_DATA = loadXLSXToJSON(path);
  PARSED_EMAIL_DATA = await parseEmailsFromXLSX(RAW_XLSX_DATA);
}

async function sendEmail(msg) {
  try {
    await sgMail.send(msg);
  } catch (err) {
    console.log("An error occured while sending an email.");
    console.error(err);
    // TODO work on error handling here. This should log responses from the SendGrid API
    console.log(err.response.body.errors);
  }
}

async function main() : Promise<void> {
  await initEmailData();

  console.log(PARSED_EMAIL_DATA);

  PARSED_EMAIL_DATA.forEach(item => sendEmail(item));
}

main();