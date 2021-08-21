"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var sgMail = require("@sendgrid/mail");
var XLSX = require("XLSX");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var XLSX_PATH = process.env.DATA_SOURCE_XLSX;
var emails = loadXlsxToJSON();
console.log(emails);
function sendEmail(msg) {
    sgMail
        .send(msg)
        .then(function () {
        console.log('Email sent');
    })
        .catch(function (error) {
        console.error(error);
    });
}
function loadXlsxToJSON(path) {
    if (path === void 0) { path = XLSX_PATH; }
    try {
        // this isn't working
        var wb = XLSX.readFile(path);
        var firstSheetName = wb.SheetNames[0];
        var ws = wb.Sheets[firstSheetName];
        if (ws === undefined) {
            throw 'Failed to load spreadsheet.';
        }
        return XLSX.utils.sheet_to_json(ws);
    }
    catch (e) {
        console.log("Error occured while loading spreadsheet.");
        console.log(e);
    }
}
// dataArray.forEach(email => sendEmail(email));
