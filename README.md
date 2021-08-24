# Description
Sends email using data from a XLSX spreadsheet using the SendGrid API.

Working in real estate, there exists certain pain points within our organisation where we have repetitve tasks. 
This project aims to address a need to batch send emails with individual attachments. This is basically a mail merge program with individual attachments.

This project is intended as a proof of concept only. I do not intend to use this in my day-to-day task.

# Overview
1 - Loads data from XLSX spreadsheet and converts to an array of JSON objects.

2 - Loops through this array and parses each JSON object for the SendGrid Email API. Returns a new array with the parsed data.

3 - Loops through the parsed data and indivially sends each email.
