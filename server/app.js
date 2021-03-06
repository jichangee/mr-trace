const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const router = require('./router')

app.use(cors({
  origin: function () {
    return 'http://192.168.31.109:3000'
  },
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


app.use(router.routes())

app.listen(8090)
console.log('listen in http://localhost:8090');