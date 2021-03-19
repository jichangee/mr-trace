const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const startSubscribeTask = require('./task/subscribe')

app.use(cors({
  origin: function () {
    return '*'
  },
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())
app.use(router.routes())

app.listen(8090)

setTimeout(startSubscribeTask, 5000)

console.log('listen in http://localhost:8090');