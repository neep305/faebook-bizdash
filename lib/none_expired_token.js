
const reissue_access_token = async() => {
    const axios = require('axios');
    const fs = require('fs');

    const config = {
        redirect_uri: '/fb/redirect',
        client_id: '567491550419839',
        client_secret: '1d95d9f1c7e011c42692c600a634fc52'
    };
    const fb_exchange_token = fs.readFileSync('./token/accessToken.txt','utf-8');
    console.log(fb_exchange_token);
    const client = axios.create({
       base_url: 'https://graph.facebook.com',
    });
    // console.log(client);
    let response = null;
    response = await client.get('/oauth/access_token', {
        // redirect_uri: config.redirect_uri,
        grant_type: 'fb_exchange_token',
        client_id: config.client_id,
        client_secret: config.client_secret,
        fb_exchange_token: fb_exchange_token
    }).then((data) => {
        console.log(data);
    }).catch((e) => {
        const message = e.response.data.error;
        console.error('Error occurred : ', message);
    });

    console.log(response);

    // const access_token = response.data.access_token

    // response = await client
    //     .get(`/me/accounts`, {
    //         headers: {
    //         'Authorization': `Bearer ${access_token}`
    //         },
    //     })
    //     .catch(e => {
    //         const message = e.response.data.error
    //         console.error(message)
    //     })

    // console.log(response);
    return response;
};

const renewal_access_token = async() => {
    const axios = require('axios');
    const fs = require('fs');

    const config = {
        redirect_uri: '/fb/redirect',
        client_id: '567491550419839',
        client_secret: '1d95d9f1c7e011c42692c600a634fc52'
    };
    const fb_exchange_token = fs.readFileSync('./token/accessToken.txt','utf-8');

    await axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${config.client_id}&client_secret=${config.client_secret}&grant_type=fb_exchange_token&fb_exchange_token=${fb_exchange_token}`)
    .then((response) => {
        console.log("Long Live Access Token");
        console.log(response.data.access_token);
    }).catch((err) => {
        console.log(err);
    });
}

const get_access_token = () => {
    const axios = require('axios');
    const fs = require('fs');

    const config = {
        redirect_uri: '/fb/redirect',
        client_id: '567491550419839',
        client_secret: '1d95d9f1c7e011c42692c600a634fc52'
    };

    axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${config.client_id}&client_secret=${config.client_secret}&grant_type=client_credentials`)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = {
    reissue_access_token,
    renewal_access_token,
    get_access_token
}