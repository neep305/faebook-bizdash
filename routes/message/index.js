const router = require('express').Router();

router.use(function timelog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', async (req, res) => {

    res.render('message/index', {
        title: 'Message'
    });
});

module.exports = router;