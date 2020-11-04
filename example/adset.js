
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const Campaign = bizSdk.Campaign;
const AdSet = bizSdk.AdSet;

const access_token = require('fs').readFileSync('./token/accessToken.txt', 'utf-8');
const app_secret = '<APP_SECRET>';
const app_id = '<APP_ID>';
const id = '23843347244780759';
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
  'name',
  'start_time',
  'end_time',
  'daily_budget',
  'lifetime_budget',
];
params = {
};
const adsetss = (new Campaign(id)).getAdSets(
  fields,
  params
);
logApiCallResult('adsetss api call complete.', adsetss);

