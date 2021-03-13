const Router = require('koa-router')
const router = new Router()

// api
const { httpSearch, httpSubscribe, httpSubscribeList, httpunSubscribe } = require('../api')

router.get('/search', httpSearch)

router.get('/subscribe', httpSubscribeList)
router.post('/subscribe', httpSubscribe)
router.post('/unsubscribe', httpunSubscribe)


module.exports = router;