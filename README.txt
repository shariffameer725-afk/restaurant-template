# MedAxis Global Consultancy Website

## Lead form setup — Google Sheets

The form is prepared to send enquiries to a Google Sheet owned by MedAxis.

### 1. Create the company Google Sheet
Create a spreadsheet in the MedAxis company's Google account. Suggested columns:
Timestamp | Name | Phone | Email | NEET Status | Preferred Country | Message

### 2. Open Apps Script
In the Sheet, go to Extensions → Apps Script and paste:

```javascript
const SHEET_NAME = "Sheet1";

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.email || "",
    data.neet || "",
    data.country || "",
    data.message || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Deploy
Apps Script → Deploy → New deployment → Web app.
Set:
- Execute as: Me
- Who has access: Anyone

Copy the Web App URL.

### 4. Connect the website
Open `script.js` and replace:

PASTE_MEDAXIS_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE

with the Web App URL.

### 5. Test
Submit a test enquiry on the website and confirm that a new row appears in the MedAxis Sheet.

## Important
The current package intentionally does NOT contain a real company endpoint or credentials. The client should own the Google Sheet and Apps Script account.

Before launch, replace:
- Placeholder phone numbers
- Placeholder email
- Sample countries
- Sample destination images
- Any sample statistics
- Sample logo/branding if the client has a real logo

Also add the client's privacy policy/terms and verify all admission, university and visa information before publishing.
