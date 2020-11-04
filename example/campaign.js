'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

// const access_token = 'EAAIEIWxGm38BAJ4xQJRzUPnqbqbAjt11ZBWwNHZCqx5MeRyedx181C2PRPqP1DqC72qNjJwK2Sfte0hHo8b1LI935fGXOsLhNWEl4BdV1BZBuUnWd0GvnudfCZCOnWxX1lCZC3n779hZAm5ZBuzU6GroZCY9QYdAhmlFyXJOQCZAcl8X3VlhWz8dZB0onNZBQwKxgvycstFw8r12QZDZD';
const access_token = require('fs').readFileSync('./token/accessToken.txt','utf-8');
const app_secret = '<APP_SECRET>';
const app_id = '<APP_ID>';
const id = 'act_1801782130053302';//'<AD_ACCOUNT_ID>';
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
  'objective',
];
params = {
  'effective_status' : ['ACTIVE','PAUSED'],
};
const campaignss = (new AdAccount(id)).getCampaigns(
  fields,
  params
);
logApiCallResult('campaignss api call complete.', campaignss);