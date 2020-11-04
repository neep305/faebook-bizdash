'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccountActivity = bizSdk.AdAccountActivity;

const access_token = 'EAAIEIWxGm38BAEATXjiGvZBMfZCOBdcffC3DHkxfUSTCwRcFq3UgGrJx0ZBnXJcOcXqdL39LobvFSLbOTj8tUwil1lwEkiFsJJWmpHmv1oCzPILu5Tvn37t05r2BehZC0ZCzcEJxkRL6hZBqOmCVZCRQcFNUo0IhtUfX8nePy2mt2zJnNjkZArSNrr8uxeYXlUoZD';
const app_secret = '<APP_SECRET>';
const app_id = '<APP_ID>';
const id = '<ACTIVITY_ID>';
const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};

let fields, params;
fields = [
];
params = {
};
const sample_code = (new AdAccountActivity(id)).get(
  fields,
  params
);
logApiCallResult('sample_code api call complete.', sample_code);