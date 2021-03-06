const Koa = require('koa')
const Router = require('koa-router')
const { search } = require('./dom')
const app = new Koa()
const cors = require('koa2-cors')
const router = new Router()

app.use(cors({
  origin: function () {
    return 'http://192.168.31.109:3000'
  },
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

router.get('/search', async (ctx) => {
  const { q } = ctx.query
  let code = 200
  let data = null
  let msg = ''
  if (q === '' || q === undefined || q === null) {
    msg = '请输入搜索关键词'
  } else {
    try {
      data = await search(q)
      msg = '搜索成功'
    } catch (error) {
      code = 500
      msg = JSON.stringify(error)
    }
  }
  ctx.body = {
    code,
    msg,
    data
  }
})

app.use(router.routes())

app.listen(8090)
console.log('listen in http://localhost:8090');