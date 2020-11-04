const bizSdk = require('facebook-nodejs-business-sdk');

const Campaign = bizSdk.Campaign;
const AdSet = bizSdk.AdSet;
const Ad = bizSdk.Ad;

const accountId = 'act_2242561505759459'; //디지털마케팅팀_SNS운영

const businessId = '1620245578206959';

// GET Campaign ID and Name
const getCampaigns = (accessToken) => {
    //FacebookAdsApi.init 미선언시 AdAccount 및 Campaign 정상 동작 안함
    const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
    const AdAccount = bizSdk.AdAccount;
    const Campaign = bizSdk.Campaign;
    const AdSet = bizSdk.AdSet;

    const account = new AdAccount(accountId);
    var campaigns;

    return new Promise((resolve,reject) => {
        let camp_id_name = [];

        account.read([AdAccount.Fields.name, AdAccount.Fields.age])
        .then((account) => {
            return account.getCampaigns([Campaign.Fields.id, Campaign.Fields.name]);
        })
        .then((result) => {
            campaigns = result
            
            campaigns.forEach((campaign) => {
                camp_id_name.push({id:campaign.id,name:campaign.name});
                
            });
            resolve(camp_id_name);
        }).catch(console.error);
    });
}

// GET Adset master field
const getAdset = (accessToken, campaignId) => {
    console.log('accessToken: ', accessToken);
    console.log('campaignId', typeof campaignId);
    
    const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);

    return new Promise((resolve,reject) => {
        let adset_result = [];

        let fields, params;
        fields = [
            'name',
            'start_time',
            'end_time',
            'daily_budget',
            'lifetime_budget',
            'objective'
        ];
        params = {
        };            
        
        (new Campaign(campaignId)).getAdSets(
            fields,
            params
        ).then((result) => {
            var adsets = result;
            adsets.forEach((adset) => {
                console.log(adset.name);
                adset_result.push({id:adset.id,name:adset.name,start_dt:adset.start_time,end_dt:adset.end_time});
            });
            resolve(adset_result);
        }).catch((error) => {
            reject(error);
        });        
    });
}

// GET Ad Insight data
const getAd = (accessToken, adsetId) => {
    let fields, params;
    fields = [
        'impressions',
        'ad_id',
        'ad_name',
        'inline_link_clicks',
        'campaign_id',
        'campaign_name',
        'cpc',
        'actions'
    ];
    params = {
        'level' : 'ad',
        'date_preset' : 'last_30d'
    };
    const insightss = (new Ad(id)).getInsights(
        fields,
        params
    );
}

module.exports = {
    getCampaigns,
    getAdset,
    getAd
}