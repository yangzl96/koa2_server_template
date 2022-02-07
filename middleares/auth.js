
const jwt = require('jsonwebtoken')

class Auth {
  // 验证token
  get v() {
    return async (ctx, next) => {
      let userToken, decodeInfo
      let errMsg = 'token不存在'
      if (!ctx.headers.authorization) {
        throw new global.errs.Forbidden(errMsg)
      }
      userToken = ctx.headers.authorization.split(' ')[1]
      try {
        decodeInfo = jwt.verify(userToken, global.config.security.secretKey)
      } catch (error) {
        // 错误的token 过期的token
        switch (error.name) {
          case 'JsonWebTokenError':
            errMsg = 'token校验失败'
            break;
          case 'TokenExpiredError':
            errMsg = 'token已过期'
            break;
          default:
            break;
        }
        throw new global.errs.Forbidden(errMsg)
      }
      // 存储用户信息
      ctx.auth = {
        uid: decodeInfo.uid,
        username: decodeInfo.username
      }
      await next()
    }
  }
}

module.exports = {
  Auth
}