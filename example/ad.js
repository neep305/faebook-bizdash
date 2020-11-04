
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Ad = bizSdk.Ad;

const access_token = 'EAAIEIWxGm38BAEATXjiGvZBMfZCOBdcffC3DHkxfUSTCwRcFq3UgGrJx0ZBnXJcOcXqdL39LobvFSLbOTj8tUwil1lwEkiFsJJWmpHmv1oCzPILu5Tvn37t05r2BehZC0ZCzcEJxkRL6hZBqOmCVZCRQcFNUo0IhtUfX8nePy2mt2zJnNjkZArSNrr8uxeYXlUoZD';
const app_secret = '<APP_SECRET>';
const app_id = '<APP_ID>';
const id = '<AD_ACCOUNT_ID>';
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
  'name' : 'My Ad',
  'adset_id' : '<adSetID>',
  'creative' : {'creative_id':'<adCreativeID>'},
  'status' : 'PAUSED',
};
const ads = (new AdAccount(id)).createAd(
  fields,
  params
);
logApiCallResult('ads api call complete.', ads);

