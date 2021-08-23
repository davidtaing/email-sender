import * as dotenv from "dotenv";
dotenv.config();

import * as sgMail from "@sendgrid/mail";
import * as XLSX from "XLSX";
import { Email, createEmail } from "./Email";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const XLSX_PATH: string = process.env.DATA_SOURCE_XLSX;

const RAW_XLSX_DATA = loadXLSXToJSON(XLSX_PATH);

const PARSED_EMAIL_DATA = 
  parseEmailsFromXLSX(RAW_XLSX_DATA)
    .then(
      data => Promise.resolve(data)
    )
    .catch(e => {
      console.log("Failed to parse spreadsheet data.");
      console.log(e);
    });

function sendEmail(msg) {
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

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
    console.log("Error occured while loading spreadsheet.");
    console.log(e);
  }
}

// Parses spreadsheet data into SendGrid Email API POJO (or Email Objects)
async function parseEmailsFromXLSX(data = RAW_XLSX_DATA) {
  let emails : Array<Email> = [];

  let item : any;
  for (item of data) {
    let { firstName, to, property, filepaths } = item;

    emails.push(await createEmail(firstName, to, property, filepaths));
  }
  
  return emails;
};

// Output parsed data.
console.log(PARSED_EMAIL_DATA);