// ============================================================
// config.js — the ONLY file you should need to edit when your
// Google Apps Script URL or token change. reminder_app.html
// reads from window.APP_CONFIG and never needs to be touched
// (or re-deployed) again for backend changes.
// ============================================================
window.APP_CONFIG = {
  APPS_SCRIPT_URL: 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE',
  SYNC_TOKEN: 'PASTE_YOUR_SECRET_TOKEN_HERE',
  POLL_INTERVAL_MS: 20000
};
