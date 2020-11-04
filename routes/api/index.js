const router = require('express').Router();
const winston = require(`${__basedir}/config/winston`);

// database
const campaignService = require(`${__basedir}/services/campaign_admin_service`);
const userService = require(`${__basedir}/services/user_service`);
const fbSdk = require(`${__basedir}/lib/fb_ad`);
// const messageRouter = require(`${__basedir}/routes/api/message`);

router.get('/', function(req, res, next) {
  winston.debug("API CALL")
  
  try {
    res.status(200).json({result:'OK'});
  } catch (error) {
    winston.debug(error);
    res.status(500).json({result:'Error'});
  }
});

// get campaign data from database
router.get('/fb/campaign', async(req, res) => {
  try {
    console.log('isAuthenticated: ', req.isAuthenticated());

    const query = req.query || {};
    const campaignId = query.campaignId;
    winston.debug('campaignId to query : ' + campaignId);

    // fetch campaign data
    const campaign = await campaignService.getCampaignById(campaignId);     

    // 특정 캠페인에 속해있는 Adset 추출
    const adset = await fbSdk.getAdset(req.user.facebook.accessToken,campaignId);
    winston.debug('fetch adset data: ', adset);

    res.status(200).json({result:'success',data:campaign,adset:adset});
  } catch (error) {
    winston.debug(error);
    res.status(500).json({result:'fail',data:error.statusText});
  }  
});

// get campaigns
router.get('/fb/campaigns', function(req, res, next) {

  account.read([AdAccount.Fields.name, AdAccount.Fields.age])
  .then((account) =>{
    // return account.getCampaigns([Campaign.Fields.name], { limit: 100 }) // fields array and params
    return account.getCampaigns([Campaign.Fields.id])
  })
  .then((result) =>{
    campaigns = result
    let camp_id_name = [];
    campaigns.forEach((campaign) => {
        
        camp_id_name.push({id:campaign.id});
      }
    );
    res.status(200).json({campaigns:camp_id_name});  
  }).catch(console.error);  
});

router.get('/fb/:campaign/adsets', async(req,res,next) => {
  winston.debug("Adset data call : " + req.params.campaign);
  const curCampaign = req.params.campaign;
  var adsets = await fbSdk.getAdset(curCampaign);
  // console.log(adsets);
  res.status(200).json(adsets);
});

// GET Ad Data
router.get('/fb/:campaign/ad', async(req,res) => {
  const campaignId = req.params.campaign;
  try {
    const user = userService.getOne(req.user.facebook.id);
    const accessToken = user.accessToken;
    var ad = await fbSdk.getAd(accessToken,campaignId);

    res.status(200).json(ad);
  } catch (error) {
    res.status(200).json({'error':error});
  }
  
});

router.use('/message', require('./message/index'));

module.exports = router;