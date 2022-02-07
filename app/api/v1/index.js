const Router = require('koa-router')

const router = new Router({
  prefix: '/v1/bilibili'
})

router.get('/', async ctx => {
  ctx.body = 'sssssss'
})

module.exports = router