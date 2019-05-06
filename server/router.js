const Router = require('koa-router');
const HomeControl = require('./controllers/home.js');

const router = new Router();
router.post('/api/summary', HomeControl.summary);
router.get('/api/text', HomeControl.randomText);

module.exports = router;