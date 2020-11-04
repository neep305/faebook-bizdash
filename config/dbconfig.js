const app_name = 'facebook_bizdash';

module.exports = {
    applicationName: app_name,
    mongodb: {
        dsn: process.env.MONGODB_DNS || 'mongodb://localhost:27017/fb_biz',
    }
};
