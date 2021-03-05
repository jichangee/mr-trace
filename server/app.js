const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
  ctx.body = {
    code: 200,
    data: {
      list: [
        {
          id: 1,
          name: 'tom'
        }
      ]
    }
  }
})

app.use(router.routes())

app.listen(8090)
console.log('listen in http://localhost:8090');