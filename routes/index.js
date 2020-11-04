const express = require('express');
const router = express.Router();
const logger = require(`${__basedir}/config/winston.js`);

const fbRouter = require(`${__basedir}/routes/fb`);
const adminRouter = require(`${__basedir}/routes/admin`);
const mainRouter = require(`${__basedir}/routes/main`);
const apiRouter = require(`${__basedir}/routes/api`);
const messageRouter = require(`${__basedir}/routes/message`);

const isAuthenticated = (req,res,next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect('/fb');
  }
}

router.use('/admin', isAuthenticated, adminRouter);
router.use('/main', isAuthenticated, mainRouter);
router.use('/fb', fbRouter);
router.use('/api', apiRouter);
router.use('/message', messageRouter);

/* GET home page. */
router.get('/', (req, res)=>{
  res.redirect('/main');
});

router.get('/logout', (req,res)=>{
  logger.info('Logout');

  req.logout();
  res.redirect('/');
});

//nocache 처리
const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

// router.use('/api', nocache, require('./api'));

module.exports = router;
