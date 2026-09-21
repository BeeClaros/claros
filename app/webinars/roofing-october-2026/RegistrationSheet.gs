const SPREADSHEET_ID = "1E7hKWgfdaBs1aM9aJQomdB4Jpn2HhuvlWZIgieGHyl0";
const SHEET_NAME = "Registrations";

/**
 * Column layout — keep this order. New tracking fields are appended at the
 * end so existing rows and formulas stay aligned.
 *
 *  1 submission_id
 *  2 submitted_at
 *  3 firstName
 *  4 lastName
 *  5 workEmail
 *  6 company
 *  7 existingSystems
 *  8 primaryRoofingSystem
 *  9 workflowInterest
 * 10 webinar_id
 * 11 vertical
 * 12 webinar_title
 * 13 landing_page
 * 14 utm_source
 * 15 utm_medium
 * 16 utm_campaign
 * 17 utm_content
 * 18 cid
 * 19 registration_status   "Partial" | "Registered"
 * 20 attended_live
 * 21 recording_sent
 * 22 workflow_session_requested
 * 23 notes
 * 24 utm_term
 * 25 landing_version
 * 26 referrer
 * 27 cta_source
 */
const COL = {
  SUBMISSION_ID: 1,
  SUBMITTED_AT: 2,
  FIRST_NAME: 3,
  LAST_NAME: 4,
  WORK_EMAIL: 5,
  COMPANY: 6,
  EXISTING_SYSTEMS: 7,
  PRIMARY_ROOFING_SYSTEM: 8,
  WORKFLOW_INTEREST: 9,
  WEBINAR_ID: 10,
  VERTICAL: 11,
  WEBINAR_TITLE: 12,
  LANDING_PAGE: 13,
  UTM_SOURCE: 14,
  UTM_MEDIUM: 15,
  UTM_CAMPAIGN: 16,
  UTM_CONTENT: 17,
  CID: 18,
  REGISTRATION_STATUS: 19,
  ATTENDED_LIVE: 20,
  RECORDING_SENT: 21,
  WORKFLOW_SESSION_REQUESTED: 22,
  NOTES: 23,
  UTM_TERM: 24,
  LANDING_VERSION: 25,
  REFERRER: 26,
  CTA_SOURCE: 27,
};

const ROW_WIDTH = 27;

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .openById(SPREADSHEET_ID)
      .getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + SHEET_NAME + '" not found');
    }

    const data = JSON.parse(e.postData.contents || "{}");

    // Optional honeypot protection
    if (data.website) {
      return jsonResponse({ success: true });
    }

    const email = clean(data.workEmail).toLowerCase();
    const incomingStatus = data.status === "partial" ? "Partial" : "Registered";

    if (!email) {
      return jsonResponse({
        success: false,
        error: "Missing required fields"
      });
    }

    // Full submit still requires firstName, matching the original script.
    // Partial saves (email blur) only need workEmail.
    if (incomingStatus === "Registered" && !clean(data.firstName)) {
      return jsonResponse({
        success: false,
        error: "Missing required fields"
      });
    }

    const existing = findRowByEmail_(sheet, email);

    if (
      existing &&
      existing.status === "Registered" &&
      incomingStatus === "Partial"
    ) {
      return jsonResponse({
        success: true,
        skipped: true,
        submission_id: existing.submissionId
      });
    }

    const now = new Date();
    const submissionId = existing
      ? existing.submissionId
      : Utilities.getUuid();
    const submittedAt =
      !existing || incomingStatus === "Registered"
        ? now
        : existing.submittedAt;

    const row = [
      submissionId,
      submittedAt,
      fill(clean(data.firstName), existing, COL.FIRST_NAME, incomingStatus),
      fill(clean(data.lastName), existing, COL.LAST_NAME, incomingStatus),
      email,
      fill(clean(data.company), existing, COL.COMPANY, incomingStatus),
      fill(clean(data.existingSystems), existing, COL.EXISTING_SYSTEMS, incomingStatus),
      fill(clean(data.primaryRoofingSystem), existing, COL.PRIMARY_ROOFING_SYSTEM, incomingStatus),
      fill(clean(data.workflowInterest), existing, COL.WORKFLOW_INTEREST, incomingStatus),
      fill(clean(data.webinar_id), existing, COL.WEBINAR_ID, incomingStatus),
      fill(clean(data.vertical), existing, COL.VERTICAL, incomingStatus),
      fill(clean(data.webinar_title), existing, COL.WEBINAR_TITLE, incomingStatus),
      fill(clean(data.landing_page), existing, COL.LANDING_PAGE, incomingStatus),
      fill(clean(data.utm_source), existing, COL.UTM_SOURCE, incomingStatus),
      fill(clean(data.utm_medium), existing, COL.UTM_MEDIUM, incomingStatus),
      fill(clean(data.utm_campaign), existing, COL.UTM_CAMPAIGN, incomingStatus),
      fill(clean(data.utm_content), existing, COL.UTM_CONTENT, incomingStatus),
      fill(clean(data.cid), existing, COL.CID, incomingStatus),
      incomingStatus,
      existing ? existing.attendedLive : "Unknown",
      existing ? existing.recordingSent : "No",
      existing ? existing.workflowSessionRequested : "No",
      existing ? existing.notes : "",
      fill(clean(data.utm_term), existing, COL.UTM_TERM, incomingStatus),
      fill(clean(data.landing_version), existing, COL.LANDING_VERSION, incomingStatus),
      fill(clean(data.referrer), existing, COL.REFERRER, incomingStatus),
      fill(clean(data.cta_source), existing, COL.CTA_SOURCE, incomingStatus),
    ];

    if (existing) {
      sheet.getRange(existing.rowIndex, 1, 1, ROW_WIDTH).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return jsonResponse({
      success: true,
      submission_id: submissionId
    });

  } catch (error) {
    console.error(error);

    return jsonResponse({
      success: false,
      error: String(error)
    });
  }
}

function doGet() {
  return jsonResponse({
    success: true,
    service: "Claros Webinar Registration",
    status: "online"
  });
}

function findRowByEmail_(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const lastCol = Math.max(sheet.getLastColumn(), ROW_WIDTH);
  const values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  for (var i = 0; i < values.length; i++) {
    var cells = values[i];
    if (clean(cells[COL.WORK_EMAIL - 1]).toLowerCase() === email) {
      return {
        rowIndex: i + 2,
        values: cells,
        submissionId: cells[COL.SUBMISSION_ID - 1] || Utilities.getUuid(),
        submittedAt: cells[COL.SUBMITTED_AT - 1] || new Date(),
        status: String(cells[COL.REGISTRATION_STATUS - 1] || ""),
        attendedLive: cells[COL.ATTENDED_LIVE - 1] || "Unknown",
        recordingSent: cells[COL.RECORDING_SENT - 1] || "No",
        workflowSessionRequested: cells[COL.WORKFLOW_SESSION_REQUESTED - 1] || "No",
        notes: cells[COL.NOTES - 1] || "",
      };
    }
  }

  return null;
}

function fill(incoming, existing, col, incomingStatus) {
  if (incomingStatus !== "Partial") return incoming;
  if (incoming !== "") return incoming;
  if (!existing) return "";
  var prev = existing.values[col - 1];
  return prev === undefined || prev === null ? "" : prev;
}

function clean(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
