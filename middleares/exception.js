/**
 * 错误中间件
 */
const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log('发生错误了--------------------------------------')
    console.log(error)
    const isDev = global.config.env === 'dev'
    const isHttpException = error instanceof HttpException
    // 不是自定义的错误类 抛出
    if (isDev && !isHttpException) {
      throw error
    }
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        code: error.code === 200 ? 0 : error.code,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: '未知错误！',
        errorInfo: isDev ? error.stack : error.message,
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError