const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const fs = require('fs');

router.get('/', (req, res, next) => {
    console.log(req.user);
    res.render('fb/index', {title:'Facebook'});
});

router.get('/redirect', (req, res, next) => {
    console.log('Facebook Redirect');
    console.log('accessToken : ', req.query.token);

    const accessToken = req.query.token;

    if (accessToken) {
        fs.readdir('./token/', function(err, files) {
            console.log(files);
            fs.writeFileSync('./token/accessToken.txt',accessToken);
        });
    }

    res.redirect('/');
});

router.get('/auth', passport.authenticate('facebook'));

// Facebook Authentication
router.get('/auth/callback', passport.authenticate('facebook',{
    // successRedirect: '/fb/login_success',
    failureRedirect: '/fb/login_failure'    
}), (req,res)=>{
    // successful authentication, redirect home
    loginSuccessHandler(req,res);
});

router.get('/login_success', (req, res) => {
    res.status(200).json(req.user);
});

// 로그인 성공시 처리
const loginSuccessHandler = (req, res) => {
    let successRedirectUrl = "/";

    if (req.cookies.redirectUrl) {
        successRedirectUrl = req.cookies.redirectUrl;
        res.clearCookie("redirectUrl");
    }

    return res.redirect(successRedirectUrl);
}

module.exports = router;