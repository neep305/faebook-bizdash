var FB = require('fb');
var fs = require('fs');

//FB.setAccessToken('')

const access_token = fs.readFileSync('./token/accessToken.txt');

FB.setAccessToken(access_token);

FB.api('me', { fields: ['id', 'name'], access_token: access_token }, function (res) {
    console.log(res);
});