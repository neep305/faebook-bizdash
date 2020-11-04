const express = require('express');
const router = express.Router();

const winston = require(`${__basedir}/config/winston`);

// const fbSdk = require(`${__basedir}/lib/fb_ad`);
const fbSdk = require('../../lib/fb_ad');

const campaignService = require(`${__basedir}/services/campaign_admin_service`);

const isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/fb');
    }
}

router.get('/', async(req, res) => {
    
    let campaign = await campaignService.getAll();
    
    winston.debug(req.user);
    const accessToken = req.user.facebook.accessToken;

    // const campaigns = await fbSdk.getCampaigns(accessToken);
    
    // const adset = await fbSdk.getAdset(accessToken, '23843347244780759');
    // console.log(adset);

    res.render('main/index',{
        title:'BizDash',
        user: req.user.facebook.name,
        login: true,
        campaigns: campaign
    });
});

module.exports = router;