const router = require('express').Router();

const winston = require(`${__basedir}/config/winston`);

const messages = [
    {name: 'Jason', message: 'Hi Jason'}, 
    {name: 'Tim', message: 'Hello Tim'}
];

router.get('/', async (req, res, next) => {
    winston.debug('get message');
    res.send(messages);
});

router.post('/', async (req, res, next) => {

});

module.exports = router;