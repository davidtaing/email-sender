# Description
Sends email using data from a XLSX spreadsheet using the SendGrid API.

Working in real estate, there exists certain pain points within our organisation where we have repetitve tasks. 
This project aims to address a need to batch send emails with individual attachments.

This project is intended as a proof of concept only. I do not intend to use this "in the wild".

# Overview
1 - Loads data from XLSX spreadsheet and converts to an array of JSON objects.

2 - Loops through this array and parses each JSON object for the SendGrid Email API. Returns a new array with the parsed data.

3 - Loops through the parsed data and indivially sends each email.

# Setup
You will need to put the following in a .env file in the root directory of the project:

SENDGRID_API_KEY='YOUR_SENDGRID_API_KEY'

SENDGRID_FROM_EMAIL='YOUR_EMAIL'

SENDGRID_TEMPLATE_ID='YOUR_SENDGRID_TEMPLATE_ID'

DATA_SOURCE_XLSX ='PATH_TO_SPREADSHEET'
