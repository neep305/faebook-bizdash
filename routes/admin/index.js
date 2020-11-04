const router = require('express').Router();
const winston = require(`${__basedir}/config/winston`);
const fbSdk = require('../../lib/fb_ad');
const userService = require('../../services/user_service');
const campaignService = require(`${__basedir}/services/campaign_admin_service`);
const data = require(`${__basedir}/data/category.json`);

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/fb');
};

router.get('/', async(req, res, next) => {
// router.get('/', async(req, res, next) => {
    winston.debug('enter admin');
    let name = '';
    
    if (req.user) {
        name = req.user.facebook.name;
    };

    var user = await userService.getOneByName(name);

    if (user) {
        console.log('user accessToken : ', user.facebook.accessToken);

        var campaigns = await fbSdk.getCampaigns(user.facebook.accessToken);
        console.log('campaigns : ', campaigns);
        res.render('admin/index', 
            {   
                title: 'Admin',
                user: user.facebook.name,
                login: true,
                campaigns: campaigns,
                categoryList: data.category_list
            }
        );
    }    
});

router.post('/', async(req, res, next) => {
    console.log('POST body: ', req.body);
    try {
        // DB 저장
        await campaignService.create(req.body);    

        req.session.messages.push({
            type: 'success',
            text: '캠페인 등록 완료'
        });

        
    } catch (error) {
        req.session.messages.push({
            type: 'error',
            text: '캠페인 등록 오류 : ' + error.message
        });
    }
    
    res.redirect('/admin');
});

module.exports = router;