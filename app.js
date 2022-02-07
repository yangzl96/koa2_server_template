const Koa = require('koa')
const bodyParse = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middleares/exception')


const app = new Koa()
// 先捕获错误再解析参数
app.use(catchError)
app.use(bodyParse())
InitManager.initCore(app)



app.listen('3001', (err) => {
  if (err) {
    console.log('server started error')
  }
  console.log('server port on 3001')
})