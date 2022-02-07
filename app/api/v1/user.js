const Router = require('koa-router')
const { LoginValidator, RegisterValidator, PositiveIntegerValidator } = require('../../../validators/validators')
const { User } = require('../../../model/User')
const { successInfo, successData } = require('../../../lib/help')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middleares/auth')

const router = new Router({
  prefix: '/v1/user'
})

// 注册
router.post('/register', async ctx => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    username: v.get('body.username'),
    password: v.get('body.password')
  }
  const hadUser = await User.findOne({ username: user.username })
  if (hadUser) {
    throw new global.errs.AuthFailed('当前用户已存在')
  }
  await User.create(user)
  successInfo()
})

// 登录
router.post('/login', async ctx => {
  const v = await new LoginValidator().validate(ctx)
  const user = {
    username: v.get('body.username'),
    password: v.get('body.password')
  }
  const userInfo = await User.verifyUserPassword(user.username, user.password)
  const { id, username } = userInfo
  // 生成token
  const token = generateToken(id, username)
  successData(ctx, token)
})

// 查询用户信息
router.get('/info/:id', new Auth().v, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id')
  const user = await User.findByPk(id)
  if (!user) {
    throw new global.errs.NotFound('用户信息不存在')
  }
  successData(ctx, user)
})

module.exports = router