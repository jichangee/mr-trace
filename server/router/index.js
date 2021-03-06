const Router = require('koa-router')
const router = new Router()

// api
const { httpSearch } = require('../api')

router.get('/search', httpSearch)


module.exports = router;